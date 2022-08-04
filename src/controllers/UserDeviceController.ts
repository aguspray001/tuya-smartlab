import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import Authentication from "../utils/Authentication";
import { requestHandler } from "../utils/RequestHandler";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } from "../constant/ErrorType";
const User = require('../models').User;
const UserDevice = require('../models').UserDevice;
const Device = require('../models').Device;

class UserDeviceController {
    add = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { user_id, device_id } = req.body;
            const findUserWithDeviceId = await UserDevice.findOne({ where: { user_id, device_id } });
            if (findUserWithDeviceId) {
                throw new ErrorHandler("Cannot add device to this user, device has already added to this user", INTERNAL_SERVER_ERROR, false);
            } else {
                const userDevice = await UserDevice.create({ user_id, device_id });
                if (!userDevice) {
                    throw new ErrorHandler("Cannot add device to this user", INTERNAL_SERVER_ERROR, false);
                }
                res.status(200).send(requestHandler(userDevice, "Success to add the device to this user", 200));
            }
        } catch (e) {
            next(e);
        }
    }
    delete = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { user_id, device_id } = req.body;
            const userDevice = await UserDevice.destroy({ where: { user_id, device_id } });
            if (!userDevice) {
                throw new ErrorHandler("Device is not found from this user", NOT_FOUND, false);
            }
            res.status(200).send(requestHandler(userDevice, "Success to delete the device from this user", 200));
        } catch (e) {
            next(e);
        }
    }
    userDevicesListByUserId = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { userId } = req.params;
            const userDevice = await User.findOne({ 
                where: { id: userId },
                include: [
                    {
                        model: Device,
                        as: 'devices'
                    }
                ]
            });
            if (!userDevice) {
                throw new ErrorHandler("User not found", NOT_FOUND, false);
            }
            res.status(200).send(requestHandler(userDevice, "Success to get user data with device list", 200));
        } catch (e) {
            next(e);
        }
    }
}

export default new UserDeviceController();