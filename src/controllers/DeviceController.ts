import { Request, Response } from "express";
import { requestHandler } from "../utils/RequestHandler";
import { TuyaRequest } from "../utils/TuyaHelper";
import { IDeviceController } from "./ControllerInterface";

class DeviceController implements IDeviceController {

    command = async (req: Request, res: Response): Promise<Response> => {
        try{
            const data = req.body;
            console.log(data)
            const { deviceId } = req.params;
            const resp = await TuyaRequest("POST", `/devices/${deviceId}/commands`, data["commands"]);
            return res.status(200).send(requestHandler(resp, "Succeed send command to device!", 200));
        }catch(e){
            return res.status(400).send(requestHandler(e, "Failed send command to device!", 400));
        }
    }

    showAllDevices = async (req: Request, res: Response): Promise<Response> => {
        return res.send();
    }

}

export default new DeviceController();