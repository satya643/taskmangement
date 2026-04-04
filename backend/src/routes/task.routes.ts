import { Router } from 'express';
import { getTasks, createTask, patchTask, deleteTask, toggleTask } from '../controllers/task.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getTasks);
router.post('/', createTask);
router.patch('/:id', patchTask);
router.delete('/:id', deleteTask);
router.patch('/:id/toggle', toggleTask);

export default router;
