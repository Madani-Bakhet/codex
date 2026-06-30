import { Router } from 'express';
import { getStats, getPortfolio, getTestimonials, getFaqs, submitInquiry } from '../controllers/publicController';

const router = Router();

router.get('/stats', getStats);
router.get('/portfolio', getPortfolio);
router.get('/testimonials', getTestimonials);
router.get('/faqs', getFaqs);
router.post('/contact', submitInquiry);

export default router;
