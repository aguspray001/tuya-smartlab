import { Request, Response } from "express";
import { IMainController } from "./ControllerInterface";

class UserController implements IMainController {
    index(req: Request, res: Response): Response {
        return res.send('index API');
    }
    create(req: Request, res: Response): Response {
        return res.send('index API');

    }
    show(req: Request, res: Response): Response {
        return res.send('index API');

    }
    update(req: Request, res: Response): Response {
        return res.send('index API');

    }
    delete(req: Request, res: Response): Response {
        return res.send('index API');

    }
}

export default new UserController();
