import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import ErrorHandler from '../utils/ErrorHandler';

const AuthValidator = [
    body('email').isEmail().withMessage('must be an email'),
    body('password').isLength({ min: 6 }).withMessage('must be at least 6 chars long'),
    (req: Request, res: Response, next: NextFunction) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            throw new ErrorHandler(error, 422, false);
        }
        next();
    }
]

export default AuthValidator;