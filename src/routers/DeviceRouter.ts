import DeviceController from "../controllers/DeviceController";
import { auth } from "../middlewares/AuthMiddleware";
import BaseRoutes from "./BaseRoutes";

class DeviceRouter extends BaseRoutes {
    routes(): void {
        // internal API extended with TUYA API
        this.router.post('/command/:deviceCode', auth, DeviceController.command);
        this.router.get('/status/:deviceCode', auth, DeviceController.status);
        this.router.get('get-all-device-tuya/:projectId', auth, DeviceController.getRegisteredDeivceOnTuya);
        // internal API
        this.router.post('/create', auth, DeviceController.create);
        this.router.get('/', auth, DeviceController.read);
        this.router.get('/:deviceCode', auth, DeviceController.readById);
        this.router.put('/:deviceCode', auth, DeviceController.update);
        this.router.delete('/:deviceCode', auth, DeviceController.delete);
    }

}

export default new DeviceRouter().router;