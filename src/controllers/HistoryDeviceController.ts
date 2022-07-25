import { NextFunction, Request, Response } from "express";
import { requestHandler } from "../utils/RequestHandler";
import { config as dotenv } from "dotenv";
import ErrorHandler from "../utils/ErrorHandler";

const HistoryDevice = require('../models').HistoryDevice;
const User = require('../models').User;
const Role = require('../models').Role;

dotenv();

class HistoryDeviceController {

    getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const historyDevice = await HistoryDevice.findAll({
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ["username", "email"],
                        include: [ { model: Role, as: 'role', attributes: [ "id", "name" ]} ]
                    },
                ]
            });
            if (!historyDevice) {
                throw new ErrorHandler(historyDevice, 400, false);
            }
            return res.send(requestHandler(historyDevice, "Success get history device list!", 200));
        } catch (e) {
            next(e);
        }
    }


}

export default new HistoryDeviceController();