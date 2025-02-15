import { cardModel } from "../models/cardModel";


interface createCardforUser {
    userId: string;
};
const createCardforUser = async ({ userId }: createCardforUser) => {
    const card = await cardModel.create({ userId, totalAmount: 0 });
    await card.save();
    return card;
};




interface getActiveCardFourUser{
    userId: string;
}
export const getActiveCardFourUser = async ({ userId }: getActiveCardFourUser) => {
    let card = await cardModel.findOne({ userId, status: "active" });

    if (!card) {
        card = await createCardforUser({ userId });
    }

    return card; 
}