import UserRoleController from "../controllers/UserRoleController";
import BaseRoutes from "./BaseRoutes";

class UserRoleRoutes extends BaseRoutes{
    routes(): void {
        this.router.post('/create', UserRoleController.create);
        this.router.delete('/delete', UserRoleController.delete);
    }
}

export default new UserRoleRoutes().router