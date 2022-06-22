/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { Connector } from '../models/conector.js';

export class dataController {
    constructor(public dataModel: Connector<any>) {}
    getAllController = async (req: Request, resp: Response) => {
        req;
        resp.setHeader('Content-type', 'application/json');
        resp.end(JSON.stringify(await this.dataModel.readAll()));
    };
    getController = async (req: Request, resp: Response) => {
        resp.setHeader('Content-type', 'application/json');
        const result = await this.dataModel.read(+req.params.id);
        if (result) {
            resp.end(JSON.stringify(result));
        } else {
            resp.status(404);
            resp.end(JSON.stringify({}));
        }
    };
    postController = async (req: Request, resp: Response) => {
        const newTask = await this.dataModel.create(req.body);
        resp.setHeader('Content-type', 'application/json');
        resp.status(201);
        resp.end(JSON.stringify(newTask));
    };
    patchController = async (req: Request, resp: Response) => {
        const newTask = await this.dataModel.update(+req.params.id, req.body);
        resp.setHeader('Content-type', 'application/json');
        resp.end(JSON.stringify(newTask));
    };
    deleteController = async (req: Request, resp: Response) => {
        const { status } = await this.dataModel.delete(+req.params.id);

        resp.status(status);

        resp.end(JSON.stringify({}));
    };
}
