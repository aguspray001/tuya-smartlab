import { NextFunction, Request, Response } from "express";
import { INTERNAL_SERVER_ERROR } from "../constant/ErrorType";
import ErrorHandler from "../utils/ErrorHandler";
import { requestHandler } from "../utils/RequestHandler";
const UserRole = require('../models').UserRole;

class UserController {
    create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { user_id, role_id } = req.body;
            const findUserWithRole = await UserRole.findOne({ where: { user_id, role_id } })
            if(findUserWithRole){
                throw new ErrorHandler("The role has been added to this user", INTERNAL_SERVER_ERROR, false);
            }
            const userRole = await UserRole.create({ user_id, role_id });
            if(!userRole){
                throw new ErrorHandler("Cannot add user role", INTERNAL_SERVER_ERROR, false);
            }
            res.status(200).send(requestHandler(userRole, "Success added the role to this user", 200));
        } catch (e) {
            next(e);
        }
    }
    delete = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { user_id, role_id } = req.body;
            const user = await UserRole.destroy({ where: { user_id, role_id } })
            if(!user){
                throw new ErrorHandler("User with that role is not found", INTERNAL_SERVER_ERROR, false);
            }
            res.status(200).send(requestHandler(user, "Success delete the role from this user", 200));
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();
