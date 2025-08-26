import express from 'express';
import { submitQuoteForm } from '../controllers/quoteController.js';

const router = express.Router();

router.post('/', submitQuoteForm);

export default router;
