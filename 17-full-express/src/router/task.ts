import { Router } from 'express';
import { dataController } from '../controllers/data.controller.js';
import { TaskModels } from '../models/task-models.js';

export const taskController = new dataController(new TaskModels());

export const taskRouter = Router();

taskRouter.get('/', taskController.getAllController);
taskRouter.get('/:id', taskController.getController);

taskRouter.post('/', taskController.postController);

taskRouter.patch('/:id', taskController.patchController);

taskRouter.delete('/:id', taskController.deleteController);
