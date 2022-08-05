import { NextFunction, Request, Response } from "express";
import { requestHandler } from "../utils/RequestHandler";
import { TuyaRequest } from "../utils/TuyaHelper";
import { IDeviceController } from "./ControllerInterface";
import { config as dotenv } from "dotenv";
import ErrorHandler from "../utils/ErrorHandler";
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../constant/ErrorType";
import { Op } from "sequelize";
const Device = require('../models').Device;
const History = require('../models').History;
const User = require('../models').User;
const UserDevice = require('../models').UserDevice;


dotenv();

class DeviceController implements IDeviceController {

    command = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const data = req.body;
            const { deviceCode } = req.params;
            const { credentials } = req.app.locals;

            const findDeviceById = await Device.findOne({ where: { device_code: deviceCode, user_id: credentials.id } });

            if (findDeviceById) {
                const path = process.env.TUYA_VERSION_API + `/iot-03/devices/${deviceCode}/commands`;
                // send to tuya cloud API
                const command = await TuyaRequest("POST", path, {
                    commands: JSON.parse(data.commands)
                });

                if (!command.success) {
                    await History.create({
                        last_date: new Date(),
                        user_id: credentials.id,
                        device_id: findDeviceById.dataValues.id,
                        status: false,
                        message: command.msg as string
                    });

                    throw new ErrorHandler(command.msg as string, command.code, false);
                }

                const historyDevice = await History.create({
                    last_date: new Date(),
                    user_id: credentials.id,
                    device_id: findDeviceById.dataValues.id,
                    status: command.result,
                    message: command.msg as string
                });
                return res.status(200).send(requestHandler({
                    command,
                    historyDevice
                }, "Succeed send command and record device", 200));
            }else{
                throw new ErrorHandler(`Device with this code (${deviceCode}) is not found`, NOT_FOUND, false);
            }
        } catch (e) {
            return next(e);
        }
    }
    status = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { deviceCode } = req.params;

            const path = process.env.TUYA_VERSION_API + `/iot-03/devices/${deviceCode}/status`;
            // send to tuya cloud API
            const command = await TuyaRequest("GET", path);
            if (!command.success) {
                throw new ErrorHandler(command.msg as string, command.code, false);
            }
            res.status(200).send(requestHandler(command, `Success get this device (${deviceCode}) status`, 200));
        } catch (e) {
            next(e)
        }
    }
    create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { device_code } = req.body;
            const { credentials } = req.app.locals;

            const findDevice = await Device.findOne({ where: { device_code , user_id: credentials.id } });

            if (!findDevice) {
                const device = await Device.create({
                    device_code,
                    user_id: credentials.id,
                    status: false
                });

                if (!device) {
                    throw new ErrorHandler("Error when add device", INTERNAL_SERVER_ERROR, false);
                } else {
                    const findUserWithDeviceId = await UserDevice.findOne({ where: { user_id: credentials.id, device_id: device.dataValues.id } });
                    if (findUserWithDeviceId) {
                        throw new ErrorHandler("Cannot add device to this user, device has already added to this user", INTERNAL_SERVER_ERROR, false);
                    } else {
                        const userDevice = await UserDevice.create({ user_id: credentials.id, device_id: device.dataValues.id });
                        if (!userDevice) {
                            throw new ErrorHandler("Cannot add device to this user", INTERNAL_SERVER_ERROR, false);
                        }
                        res.status(200).send(requestHandler(userDevice, "Success to add the device to this user", 200));
                    }
                }
            } else {
                throw new ErrorHandler("Device is already registered in database", INTERNAL_SERVER_ERROR, false);
            }
        } catch (e) {
            next(e);
        }
    }
    read = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { credentials } = req.app.locals;

            const device = await Device.findAll({
                where: { user_id: credentials.id },
            })

            if (!device) {
                throw new ErrorHandler("Cannot get devices", INTERNAL_SERVER_ERROR, false);
            }
            return res.send(requestHandler(device, "Succeed get device data", 200))
        } catch (e) {
            next(e)
        }
    }
    readById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { credentials } = req.app.locals;
            const { deviceCode } = req.params;

            const device = await Device.findOne({
                where: { user_id: credentials.id, device_code: deviceCode },
                include: [
                    {
                        model: User,
                        as: 'users'
                    }
                ]
            })

            if (!device) {
                throw new ErrorHandler("Cannot get device data", INTERNAL_SERVER_ERROR, false);
            }
            return res.send(requestHandler(device, "Succeed get device data", 200))
        } catch (e) {
            next(e)
        }
    }
    delete = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { deviceCode } = req.params;
            const { credentials } = req.app.locals;
            const findDevice = await Device.findOne({
                where: {
                    device_code: deviceCode,
                    user_id: credentials.id,
                }
            })

            if (findDevice) {
                const device = await Device.destroy({
                    where: {
                        device_code: deviceCode,
                        user_id: credentials.id,
                    }
                });

                if (!device) {
                    throw new ErrorHandler("Error when delete device", INTERNAL_SERVER_ERROR, false);
                } else {
                    const userDevice = await UserDevice.destroy({ where: { user_id: credentials.id, device_id: findDevice.dataValues.id } });
                    if (!userDevice) {
                        throw new ErrorHandler("Something error when delete this device from this user", NOT_FOUND, false);
                    }
                    res.status(200).send(requestHandler(userDevice, "Success to delete the device from this user", 200));
                }
            } else {
                throw new ErrorHandler("Device is not found from this user", NOT_FOUND, false);
            }
        } catch (e) {
            next(e);
        }
    }
    update = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { deviceCode } = req.params;
            const { device_id, status } = req.body;

            const device = await Device.findOne({
                device_code: deviceCode,
            });

            if (!device) {
                throw new ErrorHandler("Error when update device", INTERNAL_SERVER_ERROR, false);
            } else {
                device.status = status;
                device.device_id = device_id;
                await device.save();
                return res.status(200).send(requestHandler(device, "Succeed update device data", 200));
            }
        } catch (e) {
            next(e);
        }
    }
    // should subscribe extension API
    getRegisteredDeivceOnTuya = async (req: Request, res: Response): Promise<Response> => {
        const { projectId } = req.params;
        const { page, perPage } = req.query;

        try {
            const resp = await TuyaRequest("GET", process.env.TUYA_VERSION_API + `/expand/devices?projectId=${projectId}&pageNo=${page}&pageSize=${perPage}`);
            return res.send(requestHandler(resp, "Success get device list!", 200));
        } catch (e) {
            return res.send(requestHandler(e, "Failed get device list!", 200));
        }
    }
}

export default new DeviceController();