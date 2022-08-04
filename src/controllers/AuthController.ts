import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import Authentication from "../utils/Authentication";
import { requestHandler } from "../utils/RequestHandler";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } from "../constant/ErrorType";
const User = require('../models').User;
const Role = require('../models').Role;
const Device = require('../models').Device;

class AuthController {
    register = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        const { name, password, email } = req.body;
        console.log(email)
        try {
            // find existing user in db
            const user = await User.findOne({ where: { email } })
            if (user) {
                throw new ErrorHandler("User email is already existing", INTERNAL_SERVER_ERROR, false);
            }
            // hashing password
            const hashedPassword = await Authentication.Passwordhash(password);
            // create user to db
            const createdUser = await User.create({
                email,
                password: hashedPassword,
                name,
            })
            // if error existing
            if (!createdUser) {
                throw new ErrorHandler(createdUser, INTERNAL_SERVER_ERROR, false)
            }
            // success create user
            return res.status(200).send(requestHandler(createdUser, "Success create user account", 200));
        } catch (e) {
            next(e)
        }
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            // check user by username
            const user = await User.findOne({
                where: { email },
                include: [
                    {
                        model: Role,
                        as: 'roles'
                    },
                ]
            });

            // check password
            if (!user) {
                throw new ErrorHandler("User not found", NOT_FOUND, false);
            }
            const checkedPassword = await Authentication.PasswordCompare(password, user.password);
            if (!checkedPassword) {
                throw new ErrorHandler("Password is wrong", UNAUTHORIZED, false);
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
                throw new ErrorHandler("User is already verified", INTERNAL_SERVER_ERROR, false);
            } else if (!user) {
                throw new ErrorHandler("User not found", NOT_FOUND, false);
            }

            const updateUser = await User.update({ status: true }, { where: { status: false, email } })
            return res.status(200).send(requestHandler(updateUser, "Success verify user account", 200));
        } catch (e) {
            next(e);
        }
    }
}

export default new AuthController();