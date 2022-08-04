import { NextFunction, Request, Response } from "express";

export interface IMainController {
    index(req: Request, res: Response, next: NextFunction): Response | Promise<Response | void>;
    create(req: Request, res: Response, next: NextFunction): Response | Promise<Response | void>;
    show(req: Request, res: Response, next: NextFunction): Response | Promise<Response | void>;
    update(req: Request, res: Response, next: NextFunction): Response | Promise<Response | void>;
    delete(req: Request, res: Response, next: NextFunction): Response | Promise<Response | void>;

}

export interface IDeviceController {
    command(req: Request, res: Response, next: NextFunction): Response | Promise<Response | void>;
    showAllDevices(req: Request, res: Response, next: NextFunction): Response | Promise<Response | void>;
    add(req: Request, res: Response, next: NextFunction): Response | Promise<Response | void>;
}