import express, { Request, Response } from 'express';
import ToDo from '../models/todo.model';

const router = express.Router();

// Get all tasks
router.get('/', async (req: Request, res: Response) => {
    const todos = await ToDo.findAll({ where: { deleted: 0 } });
    res.json(todos);
});

// Add a new task
router.post('/', async (req: Request, res: Response) => {
    const { task } = req.body;
    const newTodo = await ToDo.create({ task });
    res.json(newTodo);
});

// Edit a task
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { task, completed } = req.body;

    const todo = await ToDo.findByPk(id);

    if (!todo || todo.deleted) {
        return res.status(404).json({ error: 'Task not found' });
    }

    todo.task = task || todo.task;
    todo.completed = completed ?? todo.completed;

    await todo.save();

    res.json(todo);
});

// Check a task as complete
router.patch('/:id/complete', async (req: Request, res: Response) => {
    const { id } = req.params;
    const todo = await ToDo.findByPk(id);

    if (!todo || todo.deleted) {
        return res.status(404).json({ error: 'Task not found' });
    }

    todo.completed = true;
    await todo.save();

    res.json(todo);
});

// Clear all tasks
router.delete('/clear', async (req: Request, res: Response) => {
    await ToDo.destroy({ where: {} });
    res.json({ message: 'All tasks cleared successfully' });
});


// Delete a task
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const todo = await ToDo.findByPk(id);

    if (!todo || todo.deleted) {
        return res.status(404).json({ error: 'Task not found' });
    }

    todo.deleted = true;
    await todo.save();

    res.json({ message: 'Task deleted successfully' });
});

export default router;