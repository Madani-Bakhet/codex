import { Request, Response } from 'express';
import { Stat, PortfolioItem, Testimonial, FAQ, Inquiry } from '../models';

// ==========================================
// Inquiries (Contact submissions)
// ==========================================
export const getInquiries = async (req: Request, res: Response): Promise<void> => {
  try {
    const inquiries = await Inquiry.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json({ success: true, data: inquiries });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateInquiryStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const inquiry = await Inquiry.findByPk(id);
    if (!inquiry) {
      res.status(404).json({ success: false, message: 'Inquiry not found' });
      return;
    }

    inquiry.status = status;
    await inquiry.save();

    res.status(200).json({ success: true, data: inquiry });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteInquiry = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const inquiry = await Inquiry.findByPk(id);
    if (!inquiry) {
      res.status(404).json({ success: false, message: 'Inquiry not found' });
      return;
    }

    await inquiry.destroy();
    res.status(200).json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// Portfolio Items CRUD
// ==========================================
export const createPortfolioItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await PortfolioItem.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePortfolioItem = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const item = await PortfolioItem.findByPk(id);
    if (!item) {
      res.status(404).json({ success: false, message: 'Portfolio item not found' });
      return;
    }

    await item.update(req.body);
    res.status(200).json({ success: true, data: item });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePortfolioItem = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const item = await PortfolioItem.findByPk(id);
    if (!item) {
      res.status(404).json({ success: false, message: 'Portfolio item not found' });
      return;
    }

    await item.destroy();
    res.status(200).json({ success: true, message: 'Portfolio item deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// Stats CRUD
// ==========================================
export const createStat = async (req: Request, res: Response): Promise<void> => {
  try {
    const stat = await Stat.create(req.body);
    res.status(201).json({ success: true, data: stat });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStat = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const stat = await Stat.findByPk(id);
    if (!stat) {
      res.status(404).json({ success: false, message: 'Stat not found' });
      return;
    }

    await stat.update(req.body);
    res.status(200).json({ success: true, data: stat });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteStat = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const stat = await Stat.findByPk(id);
    if (!stat) {
      res.status(404).json({ success: false, message: 'Stat not found' });
      return;
    }

    await stat.destroy();
    res.status(200).json({ success: true, message: 'Stat deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// Testimonials CRUD
// ==========================================
export const createTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTestimonial = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const item = await Testimonial.findByPk(id);
    if (!item) {
      res.status(404).json({ success: false, message: 'Testimonial not found' });
      return;
    }

    await item.update(req.body);
    res.status(200).json({ success: true, data: item });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTestimonial = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const item = await Testimonial.findByPk(id);
    if (!item) {
      res.status(404).json({ success: false, message: 'Testimonial not found' });
      return;
    }

    await item.destroy();
    res.status(200).json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// FAQs CRUD
// ==========================================
export const createFaq = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await FAQ.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateFaq = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const item = await FAQ.findByPk(id);
    if (!item) {
      res.status(404).json({ success: false, message: 'FAQ not found' });
      return;
    }

    await item.update(req.body);
    res.status(200).json({ success: true, data: item });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteFaq = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const item = await FAQ.findByPk(id);
    if (!item) {
      res.status(404).json({ success: false, message: 'FAQ not found' });
      return;
    }

    await item.destroy();
    res.status(200).json({ success: true, message: 'FAQ deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
