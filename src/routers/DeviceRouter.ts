import DeviceController from "../controllers/DeviceController";
import BaseRoutes from "./BaseRoutes";

class DeviceRouter extends BaseRoutes{
    routes(): void {
        this.router.post('/command/:deviceId', DeviceController.command);
    }
    
}

export default new DeviceRouter().router;