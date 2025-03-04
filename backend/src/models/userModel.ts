import mongoose, {Document, Schema} from "mongoose";


export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

const userSchema = new Schema<IUser>({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: "0"},
})

const userModel = mongoose.model<IUser>('User', userSchema);

export default userModel;