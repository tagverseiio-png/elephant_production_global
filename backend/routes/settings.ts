import { Router, Request, Response } from 'express';
import SiteSettings from '../models/SiteSettings';
import authMiddleware from '../middleware/auth';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const settings = await SiteSettings.findOneAndUpdate(
      {},
      { $setOnInsert: {} },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Server error' });
  }
});

router.put('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();
    res.json(settings);
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : 'Update error' });
  }
});

export default router;
