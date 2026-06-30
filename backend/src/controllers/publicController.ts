import { Request, Response } from 'express';
import { Stat, PortfolioItem, Testimonial, FAQ, Inquiry } from '../models';

export const getStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = await Stat.findAll({ order: [['displayOrder', 'ASC']] });
    res.status(200).json({ success: true, data: stats });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPortfolio = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await PortfolioItem.findAll({ order: [['displayOrder', 'ASC']] });
    res.status(200).json({ success: true, data: items });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTestimonials = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await Testimonial.findAll({ order: [['displayOrder', 'ASC']] });
    res.status(200).json({ success: true, data: items });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFaqs = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await FAQ.findAll({ order: [['displayOrder', 'ASC']] });
    res.status(200).json({ success: true, data: items });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const submitInquiry = async (req: Request, res: Response): Promise<void> => {
  const { name, email, projectDescription } = req.body;

  try {
    if (!name || !email || !projectDescription) {
      res.status(400).json({ success: false, message: 'Please provide name, email, and project description' });
      return;
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      projectDescription,
      status: 'new'
    });

    res.status(201).json({ success: true, data: inquiry });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
