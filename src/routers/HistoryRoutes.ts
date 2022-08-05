import HistoryController from "../controllers/HistoryController";
import BaseRoutes from "./BaseRoutes";

class HistoryRoutes extends BaseRoutes{
    
    routes(): void {
        this.router.get('/', HistoryController.read);
    }
    
}

export default new HistoryRoutes().router;