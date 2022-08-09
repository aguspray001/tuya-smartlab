import { NextFunction, Request, Response } from "express";
import { requestHandler } from "../utils/RequestHandler";
import { config as dotenv } from "dotenv";
import ErrorHandler from "../utils/ErrorHandler";

const History = require('../models').History;
const User = require('../models').User;
const Device = require('../models').Device;

dotenv();

class HistoryController {

    read = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const history = await History.findAll({
                include: [
                    {
                        model: User,
                        as: 'user'
                    },
                    {
                        model: Device,
                        as: 'device'
                    }
                ]
            });
            if (!history) {
                throw new ErrorHandler(history, 400, false);
            }
            return res.send(requestHandler(history, "Success get history device list!", 200));
        } catch (e) {
            next(e);
        }
    }


}

export default new HistoryController();