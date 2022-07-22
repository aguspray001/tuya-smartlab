import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import ErrorHandler from "../utils/ErrorHandler";
import Authentication from "../utils/Authentication";
import { requestHandler } from "../utils/RequestHandler";
const User = require('../models').User;

class AuthController {
    register = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        const { username, password, roleId, email } = req.body;
        try {
            // find existing user in db
            const user = await User.findOne({ where: { email } })
            if (user) {
                throw new ErrorHandler("User email is already existing", 400, false);
            }
            // hashing password
            const hashedPassword = await Authentication.Passwordhash(password);
            // create user to db
            const createdUser = User.create({
                email,
                password: hashedPassword,
                is_verified: false,
                username,
                role_id: roleId
            })
            // if error existing
            if (!createdUser) {
                throw new ErrorHandler(createdUser, 400, false)
            }
            // success create user
            return res.status(200).send(requestHandler(createdUser, "Success create user account", 200));
        } catch (e) {
            next(e)
        }
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {email, password} = req.body;
            // check user by username
            const user = await User.findOne({where: { email }});
            // check password
            if(!user){
                throw new ErrorHandler("User not found", 404, false);
            }
            const checkedPassword = await Authentication.PasswordCompare(password, user.password);
            if(!checkedPassword){
                throw new ErrorHandler("Password is wrong", 401, false);
            }
            // generate token
            const token = Authentication.generateToken(user.dataValues);
            return res.send(requestHandler(token, "Success login", 200))

        } catch (e) {
            next(e);
        }
    }

    verify = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { email } = req.body;

            const user = await User.findOne({ where: { email } });

            if (user.is_verified) {
                throw new ErrorHandler("User is already verified", 400, false);
            } else if (!user) {
                throw new ErrorHandler("User not found", 404, false);
            }
            return res.status(200).send(requestHandler(user, "Success verify user account", 200));
        } catch (e) {
            next(e);
        }
    }
}

export default new AuthController();