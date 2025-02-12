import mongoose, {Document, Schema} from "mongoose";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    emaile: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    emaile: {type: String, required: true},
    password: {type: String, required: true},
})

const userModel = mongoose.model<IUser>('User', userSchema);

export default userModel;