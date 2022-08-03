import AuthController from "../controllers/AuthController";
import AuthValidator from "../middlewares/AuthValidator";
import BaseRoutes from "./BaseRoutes";

class AuthRoutes extends BaseRoutes {
    routes(): void {
        this.router.post('/login', AuthController.login);
        this.router.post('/register', AuthController.register);
        this.router.post('/verify', AuthController.verify);
    }

}

export default new AuthRoutes().router;