/* eslint-disable no-unused-vars */
import { Connector } from './conector.js';

export interface iTask {
    id: number;
    title: string;
    responsible: string;
    isComplete: boolean;
}

export class TaskModels extends Connector<iTask> implements iTask {
    id: number;
    constructor(
        public title: string,
        public responsible: string,
        public isComplete: boolean
    ) {
        super('task-db');
        this.id = 0;
    }
}
