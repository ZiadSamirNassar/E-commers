import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

export interface ExtendRequest extends Request {
    user?: any;
}

export const auth = () => {
    return (req: ExtendRequest, res: Response, next: NextFunction) => {
        const authorizationHeder = req.get("authorization");

        if (!authorizationHeder) {
            res.status(403).send("Authorization Header is required");
            return;
        }

        //split header bearer from the token
        const token = authorizationHeder.split(" ")[1];

        if (!token) {
            res.status(403).send("Bearer Token noy Found");
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET || " ", async (err, paylod) => {
            if (err) {
                res.status(403).send("Invalid Token");
                return;
            }

            if (!paylod) {
                res.status(403).send("Invalid Token Paylod");
                return;
            }

            const userPaylod = paylod as {
                email: string;
                firstName: string;
                lastName: string;
            };

            //fetch user from database based on paylode
            const user = await userModel.findOne({ email: userPaylod.email });
            req.user = user;

            next();
        });
    }
};



/*export const validateMyJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
    const authorizationHeder = req.get("authorization");

    if (!authorizationHeder) {
        res.status(403).send("Authorization Header is required");
        return;
    }

    //split header bearer from the token
    const token = authorizationHeder.split(" ")[1];

    if (!token) {
        res.status(403).send("Bearer Token noy Found");
        return;
    }

    jwt.verify(token, '|_mZ2`eUM[TZwk)OlD1muk?qgAj3r"', async (err, paylod) => {
        if (err) {
            res.status(403).send("Invalid Token");
            return;
        }

        if (!paylod) {
            res.status(403).send("Invalid Token Paylod");
            return;
        }

        const userPaylod = paylod as {
            emaile: string;
            firstName: string;
            lastName: string;
        };

        //fetch user from database based on paylode
        const user = await userModel.findOne({ emaile: userPaylod.emaile });
        req.user = user;

        next();
    });
};*/

// export type { ExtendRequest };
// export default validateMyJWT;