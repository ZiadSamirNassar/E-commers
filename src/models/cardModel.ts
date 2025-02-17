import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IProduct } from "./productModel";

const cardStatusEnum = ["active", "completed"];

interface ICardItem {
    product: IProduct | string,
    unitPrice: number,
    quantity: number,
};

interface ICard extends Document {
    userId: ObjectId | string,
    items: ICardItem[],
    totalAmount: number,
    status: "active" | "completed",
};

const cardItemSchema = new Schema<ICardItem>({
    product: { type: Schema.Types.ObjectId, ref: "product", required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
});

const cardSchema = new Schema<ICard>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [cardItemSchema], required: true },
    totalAmount: { type: Number, required: true, default: 1 },
    status: { type: String, enum: cardStatusEnum, default: "active" },
});

export const cardModel = mongoose.model<ICard>("Card", cardSchema);
