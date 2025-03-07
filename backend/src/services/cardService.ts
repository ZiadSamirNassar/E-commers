import { cardModel } from "../models/cardModel";
import { IOrderItem, orderModel } from "../models/orderModel";
import productModel from "../models/productModel";

interface createCardforUser {
    userId: string;
}
const createCardforUser = async ({ userId }: createCardforUser) => {
    const card = await cardModel.create({ userId, totalAmount: 0 });
    await card.save();
    return card;
};

interface getActiveCardFourUser {
    userId: string;
}
export const getActiveCardFourUser = async ({
    userId,
}: getActiveCardFourUser) => {
    let card = await cardModel.findOne({ userId, status: "active" });

    if (!card) {
        card = await createCardforUser({ userId });
    }

    return card;
};

interface clearCard{
    userId: string;
}
export const clearCard = async ({ userId }: clearCard) => {
    const card = await getActiveCardFourUser({ userId });
    card.totalAmount = 0;
    card.items = [];
    const cleardCard = await card.save();
    return { data: cleardCard, statuscode: 200 };
};

interface addItemsToCard {
    userId: string;
    productId: any;
    quantity: number;
}
export const addItemsToCard = async ({
    userId,
    productId,
    quantity,
}: addItemsToCard) => {
    const card = await getActiveCardFourUser({ userId });

    //Dose the item in the card
    const existtsInCard = card.items.find((p) => p.product.toString() === productId);
    if (existtsInCard) {
        return { data: "Item already exists in the card", statuscode: 400 };
    }

    //fetch the product from database
    const product = await productModel.findById(productId);
    if (!product) {
        return { data: "Product not found", statuscode: 400 };
    }

    if (product.stock < quantity) {
        return { data: "Product out of stock", statuscode: 400 };
    }

    card.items.push({ product: productId, unitPrice: product.price, quantity });

    //update the total amount
    card.totalAmount += product.price * quantity;

    const updatedCard = await card.save();

    return { data: updatedCard, statuscode: 200 };
};

interface updateItemsInCard {
    userId: string;
    productId: any;
    quantity: number;
}
export const updateItemsInCard = async ({ userId, productId, quantity }: updateItemsInCard) => {
    const card = await getActiveCardFourUser({ userId });

    //Dose the item in the card
    const existtsInCard = card.items.find((p) => p.product.toString() === productId);
    if (!existtsInCard) {
        return { data: "Item Dos'n exists in the card", statuscode: 400 };
    }

    const product = await productModel.findById(productId);

    if (!product) {
        return { data: "Item Dos'n exists in the card", statuscode: 400 };
    }

    if (product.stock < quantity) {
        return { data: "There is no stok", statuscode: 400 };
    }

    existtsInCard.quantity = quantity;

    //calclaute total amount
    const otherCardItems = card.items.filter((p) => p.product.toString() !== productId);

    let total = otherCardItems.reduce((sum, product) => {
        sum += product.unitPrice * product.quantity;
        return sum;
    }, 0);

    total += existtsInCard.quantity * existtsInCard.unitPrice;

    card.totalAmount = total;

    const updatedCard = await card.save();

    return { data: updatedCard, statuscode: 200 };
}

interface deleteItemsFromCard {
    userId: string;
    productId: string;
}
export const deleteItemsFromCard = async ({ userId, productId }: deleteItemsFromCard) => {
    const card = await getActiveCardFourUser({ userId });

    const existtsInCard = card.items.find((p) => p.product.toString() === productId)

    if (!existtsInCard) {
        return { data: "Item Dos'n exists in the card.", statuscode: 400 };
    }

    const otherItemsInCard = card.items.filter((p) => p.product.toString() !== productId);

    let total = otherItemsInCard.reduce((sum, product) => {
        sum += product.unitPrice * product.quantity;
        return sum;
    }, 0);

    card.items = otherItemsInCard;
    card.totalAmount = total;

    const updatedCard = await card.save();

    return { data: updatedCard, statuscode: 200 };
};

interface checkout {
    userId: string;
    address: string;
}
export const checkout = async ({ userId, address }: checkout) => {
    if (!address) {
        return { data: "Address is required", statuscode: 400 };
    }

    const card = await getActiveCardFourUser({ userId });
    console.log("Card:", card); // Debugging: Check the card object

    if (!card || !card.items || card.items.length === 0) {
        return { data: "Card is empty", statuscode: 400 };
    }

    const orderItems: IOrderItem[] = [];

    // Use a for...of loop to handle async operations properly
    for (const item of card.items) {
        console.log("Product ID:", item.product); // Debugging: Check the product ID
        const product = await productModel.findById(item.product);
        console.log("Product:", product); // Debugging: Check the product

        if (!product) {
            return { data: "Product not found", statuscode: 400 };
        }

        const orderItem: IOrderItem = {
            productTitel: product.title,
            productImage: product.image,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
        };

        orderItems.push(orderItem);
    }

    console.log("Order Items:", orderItems); // Debugging: Check the orderItems array
    if (orderItems.length === 0) {
        return { data: "Card is empty", statuscode: 400 };
    }

    // Create order
    const order = await orderModel.create({
        items: orderItems,
        totalAmount: card.totalAmount,
        userId,
        address,
    });
    console.log("Order:", order); // Debugging: Check the created order

    await order.save();

    // Update card status
    card.status = "completed";
    await card.save();

    return { data: order, statuscode: 200 };
};