import HistoryDeviceController from "../controllers/HistoryDeviceController";
import { auth } from "../middlewares/AuthMiddleware";
import BaseRoutes from "./BaseRoutes";

class HistoryDeviceRoutes extends BaseRoutes{
    
    routes(): void {
        this.router.get('/', HistoryDeviceController.getAll);
    }
    
}

export default new HistoryDeviceRoutes().router;