import express from 'express';

import { authenticateJwt } from '../middleware/jwt';

const router = express.Router();

router.use(authenticateJwt);

router.get('/', (req, res) => res.json({ message: 'Hello, World!' }));

export default router;
