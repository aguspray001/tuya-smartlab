import BaseRoutes from "./BaseRoutes";

// controllers:
import UserController from "../controllers/UserController";

class UserRoutes extends BaseRoutes{
    public routes():void{
        this.router.get('/', UserController.index)
        this.router.get('/:id', UserController.show)
        this.router.post('/', UserController.create)
    }
}

export default new UserRoutes().router;