import RoleController from "../controllers/RoleController";
import AuthValidator from "../middlewares/AuthValidator";
import BaseRoutes from "./BaseRoutes";

class RoleRoutes extends BaseRoutes {
    routes(): void {
        this.router.post('/create', RoleController.create);
        this.router.put('/update', RoleController.update);
        this.router.get('/', RoleController.getAll);
    }

}

export default new RoleRoutes().router;