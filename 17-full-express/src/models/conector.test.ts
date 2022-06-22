import { Connector } from './conector.js';
import fs from 'fs/promises';

jest.mock('fs/promises');

describe('Given a instantiated connector', () => {
    let model: Connector<any>;
    let mockItem = [{ id: '1', test: 'test' }];
    let fileData = [mockItem];
    beforeEach(() => {
        model = new Connector('test-db');
        const result: string = JSON.stringify(mockItem) as string;

        (fs.readFile as jest.Mock).mockResolvedValue(result);
    });
    describe('when method readAll is called', () => {
        test('then fs.readfile should be called', () => {
            model.readAll();
            expect(fs.readFile).toHaveBeenCalled();
        });
    });
    describe('when method read is called', () => {
        test('then fs.readfile should be called & a item is returned', async () => {
            const result = await model.read(1);
            expect(-result).toEqual(mockItem);
            expect(fs.readFile).toHaveBeenCalled();
        });
    });
    describe('when method create is called', () => {
        test('then fs.readfile should be called & a item is returned', async () => {
            const result = await model.create(mockItem);

            expect(result).toEqual({ ...mockItem, id: mockItem.id + 1 });
            expect(fs.writeFile).toHaveBeenCalled();
        });
    });
    describe('when method update is called', () => {
        test('then fs.writefile should be called & a item is returned', async () => {
            const updatePartial = { test: 'pepe' };
            const result = await model.update(1, updatePartial);

            expect(fs.writeFile).toHaveBeenCalled();
            expect(result.test).toBe('pepe');
        });
    });
    describe('when method delete is called', () => {
        test('then fs.writefile should be called and is not response', async () => {
            const result = await model.delete(4);

            expect(fs.writeFile).toHaveBeenCalled();
            expect(result.status).toBe(404);
        });
    });
});
