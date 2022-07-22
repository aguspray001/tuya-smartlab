import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { requestHandler } from "../utils/RequestHandler";
const User = require('../models').User;

class AuthController {
    register = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        const { username, password, roleId, email } = req.body;
        try {
            const user = await User.findOne({ where: { email } })
            if (user) {
                throw new ErrorHandler("User is already existing", 400, false);
            }
            const createdUser = User.create({
                email,
                isActive: false,
                username,
                password,
                role_id: roleId
            })
            if (!createdUser) {
                throw new ErrorHandler(createdUser, 400, false)
            }
            return res.status(200).send(requestHandler(createdUser, "Success create user account", 200));
        } catch (e) {
            next(e)
        }
    }

    login = (req: Request, res: Response): Response => {
        // check user by username

        // check password

        // generate token
        return res.send('this api for login')
    }

    verify = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { email } = req.body;

            const user = await User.findOne({where:{email}});

            if(user.is_verified){
                throw new ErrorHandler("User is already verified", 400, false);
            } else if (!user) {
                throw new ErrorHandler("User not found", 404, false);
            }
            // user.is_verified = true;
            // await user.save();
            return res.status(200).send(requestHandler(user, "Success verify user account", 200));
        } catch (e) {
            next(e);
        }
    }
}

export default new AuthController();