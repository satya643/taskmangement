import { Request, Response } from 'express';
import { TaskService } from '../services/task.service.js';

export const getTasks = async (req: Request, res: Response) => {
  const userId = req.user!.userId;

  try {
    const result = await TaskService.getTasks(userId, req.query as any);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const userId = req.user!.userId;

  try {
    const task = await TaskService.createTask(userId, req.body);
    res.status(201).json(task);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error creating task' });
  }
};

export const patchTask = async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { id } = req.params;

  try {
    const task = await TaskService.updateTask(userId, id as string, req.body);
    res.json(task);
  } catch (error: any) {
    res.status(404).json({ message: error.message || 'Task update failed' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { id } = req.params;

  try {
    await TaskService.deleteTask(userId, id as string);
    res.status(204).send();
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const toggleTask = async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { id } = req.params;

  try {
    const updatedTask = await TaskService.toggleTask(userId, id as string);
    res.json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
