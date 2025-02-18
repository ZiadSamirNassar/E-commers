import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//registering input type interface
interface registerPaamsr {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const register = async ({
    firstName,
    lastName,
    email,
    password,
}: registerPaamsr) => {
    //search user in database
    const user = await userModel.findOne({ email });

    //if user is exist he have to login not register
    if (user) {
        return { data: "this user already exists", statuscode: 400 };
    }

    //hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    //else we will create a new user AND save him in database
    const newUser = new userModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });
    await newUser.save();

    return { data: generateToken({ firstName, lastName, email }), statuscode: 200 };
};

//login input type interface
interface loginParams {
    email: string;
    password: string;
}

export const login = async ({ email, password }: loginParams) => {
    //search user in database
    const user = await userModel.findOne({ email });

    //if user is not exist : this means he's intered incorect emaile
    if (!user) {
        return { data: "Incorect Emaile", statuscode: 400 };
    }

    //if emaile is corect we cheack his password
    const corectPassword = await bcrypt.compare(password, user.password);

    //if not coreckt throw error
    if (!corectPassword) {
        return { data: "Wrong Password", statuscode: 400 };
    }

    //else return his data
    return { data: generateToken({ firstName: user.firstName, lastName: user.lastName, email: user.email }), statuscode: 200 };
};

//generateToken function
const generateToken = (data: any) => {
    return jwt.sign(data, process.env.JWT_SECRET || " ", { expiresIn: "240h" });
};
