import DeviceController from "../controllers/DeviceController";
import { auth } from "../middlewares/AuthMiddleware";
import BaseRoutes from "./BaseRoutes";

class DeviceRouter extends BaseRoutes{
    routes(): void {
        this.router.post('/command/:deviceId', auth, DeviceController.command);
        this.router.get('/:projectId', DeviceController.showAllDevices);
    }
    
}

export default new DeviceRouter().router;