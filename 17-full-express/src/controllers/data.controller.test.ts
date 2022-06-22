import { Connector } from '../models/conector';
import { DataController } from './data.controller';
import { Request, Response } from 'express';

describe('Given a instantiated controller dataController', () => {
    let dataController: DataController;
    let resp: Partial<Response>;
    let req: Partial<Request>;
    let dataModel: Connector<any>;
    beforeEach(() => {
        (req = {
            params: { id: '1' },
            body: { title: 'HacerTest', responsible: 'Jose' },
        }),
            (resp = {
                setHeader: jest.fn(),
                end: jest.fn(),
                status: jest.fn(),
            });

        dataModel = new Connector('test-db');
        dataController = new DataController(dataModel);
    });
    describe('when method getAllController is called', () => {
        test('then res.end should be called', async () => {
            dataModel.readAll = jest.fn();
            await dataController.getAllController(
                req as Request,
                resp as Response
            );

            expect(resp.end).toHaveBeenCalled();
        });
    });

    describe('when method getController is called and responses is ok ', () => {
        test('then res.status should be called with 404', async () => {
            const resultsTest = { test: 'test' };
            dataModel.read = jest.fn().mockResolvedValue(resultsTest);
            await dataController.getController(
                req as Request,
                resp as Response
            );

            expect(resp.end).toHaveBeenCalled();
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(resultsTest));
        });
    });
    describe('when method getController is called and responses is not OK  ', () => {
        test('then res.status should be called with 404', async () => {
            const resultsTest = null;
            dataModel.read = jest.fn().mockResolvedValue(resultsTest);
            await dataController.getController(
                req as Request,
                resp as Response
            );

            expect(resp.status).toHaveBeenCalledWith(404);
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify({}));
        });
    });
    describe('when method postController is called and', () => {
        test('then res.end should be called', async () => {
            const resultsTest = { title: 'Hacer Test', responsible: 'jose' };
            dataModel.create = jest.fn().mockResolvedValue(resultsTest);
            await dataController.postController(
                req as Request,
                resp as Response
            );

            expect(resp.status).toHaveBeenCalledWith(201);
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(resultsTest));
        });
    });
    describe('when method patchController is called and', () => {
        test('then res.end should be called', async () => {
            const resultsTest = { title: 'Hacer Test', responsible: 'jose' };
            dataModel.update = jest.fn().mockResolvedValue(resultsTest);
            await dataController.patchController(
                req as Request,
                resp as Response
            );

            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(resultsTest));
        });
    });
    describe('when method deleteController is called and', () => {
        test('then resp.end & resp.status should be called', async () => {
            const resultsTest = {};
            dataModel.delete = jest.fn().mockResolvedValue(resultsTest);
            await dataController.deleteController(
                req as Request,
                resp as Response
            );
            expect(resp.status).toHaveBeenCalled();
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify({}));
        });
    });
});
// describe('Given a instantiated controller dataController', () => {
//     describe('when method ... is called', () => {
//         test('then it should', () => {});
//     });
// });
