import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

class ErrorHandler extends Error {
    constructor(
        message: object | string | any,
        public code: number,
        public status: boolean
    ) {
        super(message)
        this.name = "Error Handler Response"
    }
}

export const errorHandlerMiddleware = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(err.code >= 500? 500 : err.code).json({
        name: err.name,
        status: err.status,
        code: err.code,
        message: err.message,
        stack: err.stack
    });
}
export default ErrorHandler;