import express from 'express';
import { submitInquiry, requestQuote } from '../controllers/inquiryController.js';

const router = express.Router();

router.post('/contact', submitInquiry);
router.post('/quote', requestQuote);

export default router;
