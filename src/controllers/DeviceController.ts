import { NextFunction, Request, Response } from "express";
import { requestHandler } from "../utils/RequestHandler";
import { TuyaRequest } from "../utils/TuyaHelper";
import { IDeviceController } from "./ControllerInterface";
import { config as dotenv } from "dotenv";
import ErrorHandler from "../utils/ErrorHandler";
import { INTERNAL_SERVER_ERROR } from "../constant/ErrorType";
const Device = require('../models').Device;
const HistoryDevice = require('../models').HistoryDevice;

dotenv();

class DeviceController implements IDeviceController {

    command = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        console.log(req.body)
        try {
            const data = req.body;
            const { deviceId } = req.params;
            const { credentials } = req.app.locals;

            const path = process.env.TUYA_VERSION_API + `/iot-03/devices/${deviceId}/commands`;
            // send to tuya cloud API
            const command = await TuyaRequest("POST", path, {
                "commands": JSON.parse(data.commands)
            });

            if (!command.success) {

                await HistoryDevice.create({
                    last_date: new Date(),
                    user_id: credentials.id,
                    device_id: deviceId,
                    last_status: false,
                    message: command.msg as string
                });

                throw new ErrorHandler(command.msg as string, command.code, false);
            }

            const historyDevice = await HistoryDevice.create({
                last_date: new Date(),
                user_id: credentials.id,
                device_id: deviceId,
                last_status: command.result,
                message: command.msg as string
            });
            return res.status(200).send(requestHandler({
                command,
                historyDevice
            }, "Succeed send command and record device", 200));
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

    getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { credentials } = req.app.locals;
            const {user_id} = req.params;

            const device = await Device.findAll({
                where: { user_id }
            })

            if (!device) {
                throw new ErrorHandler("Cannot get devices", INTERNAL_SERVER_ERROR, false);
            }
            return res.send(requestHandler(device, "Succeed get device data", 200))
        } catch (e) {
            next(e)
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
                throw new ErrorHandler("Error when add device", INTERNAL_SERVER_ERROR, false);
            }
            return res.status(200).send(requestHandler(device, "Succeed add device", 200));
        } catch (e) {
            next(e);
        }
    }

}

export default new DeviceController();