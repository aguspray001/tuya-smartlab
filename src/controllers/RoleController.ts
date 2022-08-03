import { NextFunction, Request, Response } from "express";
import { INTERNAL_SERVER_ERROR } from "../constant/ErrorType";
import ErrorHandler from "../utils/ErrorHandler";
import { requestHandler } from "../utils/RequestHandler";
const Role = require('../models').Role;
const User = require('../models').User;


class RoleController {
    create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { name } = req.body;
            const role = await Role.create({ name });
            if (!role) {
                throw new ErrorHandler("Cannot create role", INTERNAL_SERVER_ERROR, false);
            }
            return res.send(requestHandler(role, "Success creating a role", 200));
        } catch (e) {
            next(e);
        }
    }

    getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const role = await Role.findAll({
                // include: [{
                //     model: User,
                //     as: 'role'
                // }]
            });
            if (!role) {
                throw new ErrorHandler("There is no rules in database", INTERNAL_SERVER_ERROR, false);
            }
            return res.send(requestHandler(role, "Success get a role", 200));
        } catch (e) {
            next(e);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { name, changedName } = req.body;
            const role = await Role.findOne({ name });
            if (!role) {
                throw new ErrorHandler("Cannot create role", INTERNAL_SERVER_ERROR, false);
            }
            role.name = changedName;
            return res.send(requestHandler(role, "Success creating a role", 200));
        } catch (e) {
            next(e);
        }
    }
}

export default new RoleController();