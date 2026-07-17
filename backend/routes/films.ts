import { Router, Request, Response } from 'express';
import Film from '../models/Film';
import authMiddleware from '../middleware/auth';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const filter: Record<string, unknown> = { published: true };
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const films = await Film.find(filter).sort({ order: 1 }).lean();
    res.json(films);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Server error' });
  }
});

router.get('/admin/all', authMiddleware, async (req: Request, res: Response) => {
  try {
    const filter: Record<string, unknown> = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const films = await Film.find(filter).sort({ order: 1 }).lean();
    res.json(films);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Server error' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const film = await Film.findOne({ id: req.params.id, published: true }).lean();
    if (!film) {
      res.status(404).json({ error: 'Film not found' });
      return;
    }
    res.json(film);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Server error' });
  }
});

router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const film = new Film(req.body);
    await film.save();
    res.status(201).json(film);
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'code' in err && (err as { code: number }).code === 11000) {
      res.status(400).json({ error: `Film with id "${req.body.id}" already exists` });
      return;
    }
    res.status(400).json({ error: err instanceof Error ? err.message : 'Validation error' });
  }
});

router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const film = await Film.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!film) {
      res.status(404).json({ error: 'Film not found' });
      return;
    }
    res.json(film);
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : 'Update error' });
  }
});

router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const film = await Film.findOneAndDelete({ id: req.params.id });
    if (!film) {
      res.status(404).json({ error: 'Film not found' });
      return;
    }
    res.json({ message: `Film "${film.title}" deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Server error' });
  }
});

router.patch('/:id/toggle', authMiddleware, async (req: Request, res: Response) => {
  try {
    const film = await Film.findOne({ id: req.params.id });
    if (!film) {
      res.status(404).json({ error: 'Film not found' });
      return;
    }
    film.published = !film.published;
    await film.save();
    res.json({ id: film.id, published: film.published });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Server error' });
  }
});

export default router;
