import AuthController from "../controllers/AuthController";
import BaseRoutes from "./BaseRoutes";

class AuthRoutes extends BaseRoutes{
    routes(): void {
        this.router.post('/login', AuthController.register);
        this.router.post('/register', AuthController.register);
    }
    
}

export default new AuthRoutes().router;