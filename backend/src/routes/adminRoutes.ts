import { Router } from 'express';
import { protect } from '../middleware/auth';
import {
  getInquiries, updateInquiryStatus, deleteInquiry,
  createPortfolioItem, updatePortfolioItem, deletePortfolioItem,
  createStat, updateStat, deleteStat,
  createTestimonial, updateTestimonial, deleteTestimonial,
  createFaq, updateFaq, deleteFaq
} from '../controllers/adminController';

const router = Router();

// Apply protection to all admin routes
router.use(protect);

// Inquiries
router.get('/inquiries', getInquiries);
router.patch('/inquiries/:id', updateInquiryStatus);
router.delete('/inquiries/:id', deleteInquiry);

// Portfolio
router.post('/portfolio', createPortfolioItem);
router.put('/portfolio/:id', updatePortfolioItem);
router.delete('/portfolio/:id', deletePortfolioItem);

// Stats
router.post('/stats', createStat);
router.put('/stats/:id', updateStat);
router.delete('/stats/:id', deleteStat);

// Testimonials
router.post('/testimonials', createTestimonial);
router.put('/testimonials/:id', updateTestimonial);
router.delete('/testimonials/:id', deleteTestimonial);

// FAQs
router.post('/faqs', createFaq);
router.put('/faqs/:id', updateFaq);
router.delete('/faqs/:id', deleteFaq);

export default router;
