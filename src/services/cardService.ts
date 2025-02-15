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
