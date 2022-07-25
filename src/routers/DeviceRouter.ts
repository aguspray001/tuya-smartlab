import DeviceController from "../controllers/DeviceController";
import { auth } from "../middlewares/AuthMiddleware";
import BaseRoutes from "./BaseRoutes";

class DeviceRouter extends BaseRoutes{
    routes(): void {
        this.router.post('/command/:deviceId', auth, DeviceController.command);
        this.router.post('/add', auth, DeviceController.add);
        this.router.get('/:projectId', auth, DeviceController.showAllDevices);
    }
    
}

export default new DeviceRouter().router;