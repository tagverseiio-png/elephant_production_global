import { Router, Request, Response } from 'express';
import Collaborator from '../models/Collaborator';
import authMiddleware from '../middleware/auth';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const collaborators = await Collaborator.find().sort({ order: 1 }).lean();
    res.json(collaborators);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Server error' });
  }
});

router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const collab = new Collaborator(req.body);
    await collab.save();
    res.status(201).json(collab);
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : 'Validation error' });
  }
});

router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const collab = await Collaborator.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!collab) {
      res.status(404).json({ error: 'Collaborator not found' });
      return;
    }
    res.json(collab);
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : 'Update error' });
  }
});

router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const collab = await Collaborator.findByIdAndDelete(req.params.id);
    if (!collab) {
      res.status(404).json({ error: 'Collaborator not found' });
      return;
    }
    res.json({ message: 'Collaborator deleted' });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Server error' });
  }
});

export default router;
