import UserDeviceController from "../controllers/UserDeviceController";
import BaseRoutes from "./BaseRoutes";

class UserDeviceRoutes extends BaseRoutes{
    routes(): void {
        this.router.post('/create', UserDeviceController.add);
        this.router.delete('/delete', UserDeviceController.delete);
        this.router.get('/list/:userId', UserDeviceController.userDevicesListByUserId);
    }
}

export default new UserDeviceRoutes().router