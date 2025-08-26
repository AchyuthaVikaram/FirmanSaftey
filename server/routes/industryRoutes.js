import express from 'express';
import { getAllIndustries, getIndustryById } from '../controllers/industryController.js';

const router = express.Router();

router.get('/', getAllIndustries);
router.get('/:id', getIndustryById);

export default router;
