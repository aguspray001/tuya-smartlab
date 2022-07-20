import { Request, Response } from "express";

class AuthController{
    register = (req: Request, res: Response): Response => {
        // check existing user

        // validate their input (username and password)
        return res.send('this api for registration')
    }

    login = (req: Request, res: Response):Response => {
        // check user by username

        // check password
        
        // generate token
        return res.send('this api for login')
    }
}

export default new AuthController();