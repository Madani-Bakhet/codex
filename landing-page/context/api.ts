export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface StatData {
  id: number;
  key: string;
  value: number;
  suffix: string;
  labelEn: string;
  labelAr: string;
  displayOrder: number;
}

export interface PortfolioItemData {
  id: number;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  descriptionEn: string;
  descriptionAr: string;
  imageUrl: string;
  projectUrl: string;
  displayOrder: number;
}

export interface TestimonialData {
  id: number;
  quoteEn: string;
  quoteAr: string;
  authorEn: string;
  authorAr: string;
  roleEn: string;
  roleAr: string;
  companyEn: string;
  companyAr: string;
  rating: number;
}

export interface FaqData {
  id: number;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
}

export async function fetchStats(): Promise<StatData[]> {
  const res = await fetch(`${API_URL}/stats`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  const json = await res.json();
  return json.data;
}

export async function fetchPortfolio(): Promise<PortfolioItemData[]> {
  const res = await fetch(`${API_URL}/portfolio`);
  if (!res.ok) throw new Error('Failed to fetch portfolio');
  const json = await res.json();
  return json.data;
}

export async function fetchTestimonials(): Promise<TestimonialData[]> {
  const res = await fetch(`${API_URL}/testimonials`);
  if (!res.ok) throw new Error('Failed to fetch testimonials');
  const json = await res.json();
  return json.data;
}

export async function fetchFaqs(): Promise<FaqData[]> {
  const res = await fetch(`${API_URL}/faqs`);
  if (!res.ok) throw new Error('Failed to fetch faqs');
  const json = await res.json();
  return json.data;
}

export async function submitContact(data: { name: string; email: string; projectDescription: string }): Promise<any> {
  const res = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errJson = await res.json();
    throw new Error(errJson.message || 'Failed to submit contact request');
  }
  return res.json();
}
