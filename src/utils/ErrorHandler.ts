import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

class ErrorHandler extends Error{
    constructor(message: string){
        super(message)
        this.name = "Custom Error"
    }
}

export const errorHandlerMiddleware = (err: ErrorRequestHandler, req:Request, res: Response, next: NextFunction)=>{
    res.status(500).send(`mengalami error =>  ${err}`);
    next()
}
export default ErrorHandler;