import { Request, Response } from "express";
import { TuyaRequest } from "../utils/TuyaHelper";

class DeviceController {

    command = async (req: Request, res: Response): Promise<Response> => {
        try{
            const data = req.body;
            console.log(data)
            const { deviceId } = req.params;
            const resp = await TuyaRequest("POST", `/devices/${deviceId}/commands`, data["commands"]);
            return res.send(resp);
        }catch(e){
            console.log(e)
            return res.send(e);
        }
    }

    showAllDevices(req: Request, res: Response): Response {
        throw new Error("Method not implemented.");
    }

}

export default new DeviceController();