import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import ErrorHandler from "../utils/ErrorHandler";

export const auth = (req: Request, res: Response, next: NextFunction): any => {
    if(!req.headers.authorization){
        throw new ErrorHandler("Unauthorized (There is no token)", 401, false);
    }

    let secretKey = process.env.JWT_SECRET_KEY || "";
    const token:string = req.headers.authorization.split(" ")[1];

    try {
        const credentials: string | object = jwt.verify(token, secretKey);
        if(!credentials){
            throw new ErrorHandler("Invalid Token", 401, false);
        }
        req.app.locals.credentials = credentials;
        next();
    } catch (e) {
        next(e);
    }
}