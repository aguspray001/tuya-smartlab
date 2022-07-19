import { Request, Response } from "express";
import { request } from "http";

export interface IMainController{
    index(req: Request, res: Response):Response;
    create(req: Request, res: Response):Response;
    show(req: Request, res: Response):Response;
    update(req: Request, res: Response):Response;
    delete(req: Request, res: Response):Response;

}

export interface IDeviceController{
    command(req: Request, res: Response):Response;
    showAllDevices(req: Request, res: Response):Response;
}