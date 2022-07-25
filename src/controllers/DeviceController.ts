import { NextFunction, Request, Response } from "express";
import { requestHandler } from "../utils/RequestHandler";
import { TuyaRequest } from "../utils/TuyaHelper";
import { IDeviceController } from "./ControllerInterface";
import { config as dotenv } from "dotenv";
import ErrorHandler from "../utils/ErrorHandler";
const Device = require('../models').Device;

dotenv();

class DeviceController implements IDeviceController {

    command = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        console.log(req.body)
        try {
            const data = req.body;
            const { deviceId } = req.params;

            const path = process.env.TUYA_VERSION_API + `/iot-03/devices/${deviceId}/commands`;
            // send to tuya cloud API
            const command = await TuyaRequest("POST", path, {
                "commands": JSON.parse(data.commands)
            });

            if (!command.success) {
                throw new ErrorHandler(command.msg as string, command.code, false);
            }
            return res.status(200).send(requestHandler(command, "Succeed send command to device", 200));
        } catch (e) {
            return next(e);
        }
    }

    // should subscribe extension API
    showAllDevices = async (req: Request, res: Response): Promise<Response> => {
        const { projectId } = req.params;
        const { page, perPage } = req.query;

        try {
            const resp = await TuyaRequest("GET", process.env.TUYA_VERSION_API + `/expand/devices?projectId=${projectId}&pageNo=${page}&pageSize=${perPage}`);
            return res.send(requestHandler(resp, "Success get device list!", 200));
        } catch (e) {
            return res.send(requestHandler(e, "Failed get device list!", 200));
        }
    }

    add = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { deviceId, categoryId, userId } = req.body;
            const { credentials } = req.app.locals;

            const device = await Device.create({ 
                device_id: deviceId, 
                category_id: categoryId, 
                user_id: credentials.id, 
                status: false 
            });
            
            if (!device) {
                throw new ErrorHandler("Error when add device", 400, false);
            }
            return res.status(200).send(requestHandler(device, "Succeed add device", 200));
        } catch (e) {
            next(e);
        }
    }

}

export default new DeviceController();