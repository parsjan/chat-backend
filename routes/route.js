import express from 'express';
import connect from '../controllers/connectController.js';
import disconnect from '../controllers/disconnectController.js';

const router = express.Router();

router.post("/connect",connect);
router.post("/disconnect",disconnect);

export default router;