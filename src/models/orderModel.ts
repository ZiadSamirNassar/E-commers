import mongoose, { Schema, ObjectId, Document} from "mongoose";

export interface IOrderItem{
    productTitel: string;
    productImage: string;
    unitPrice: number;
    quantity: number;
};

const orderItemSchema = new Schema<IOrderItem>({
    productTitel: { type: String, required: true },
    productImage: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
});


export interface IOrder{
    items: IOrderItem[];
    totalAmount: number;
    address: string;
    userId: ObjectId | string;
};

const orderSchema = new Schema<IOrder>({
    items: { type: [orderItemSchema], required: true },
    totalAmount: { type: Number, required: true },
    address: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});



export const orderModel = mongoose.model<IOrder>("order", orderSchema);