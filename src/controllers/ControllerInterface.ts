import { NextFunction, Request, Response } from "express";
import { request } from "http";

export interface IMainController{
    index(req: Request, res: Response):Response | Promise<Response>;
    create(req: Request, res: Response):Response | Promise<Response>;
    show(req: Request, res: Response):Response | Promise<Response>;
    update(req: Request, res: Response):Response | Promise<Response>;
    delete(req: Request, res: Response):Response | Promise<Response>;

}

export interface IDeviceController{
    command(req: Request, res: Response, next: NextFunction):Response | Promise<Response> | NextFunction;
    showAllDevices(req: Request, res: Response, next: NextFunction):Response | Promise<Response>;
}