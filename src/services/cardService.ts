import { cardModel } from "../models/cardModel";
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