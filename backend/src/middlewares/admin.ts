import { NextFunction, Response } from "express";
import { ExtendRequest } from "./validateJWT";

export const authAdmin = () => {
    return (req: ExtendRequest, res: Response, next: NextFunction) => {
        const {role} = req.user
        
        if(!role){
            res.status(403).send("this action only for Admins");
            return;
        }

        if("1" !== role){
            res.status(403).send("this action only for Admins");
            return;
        }

        next();
    };
}