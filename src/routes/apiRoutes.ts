import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Home page');
});

// You can add more routes here. For example, a new route:
router.get('/about', (req, res) => {
  res.send('About Page');
});

export default router;
