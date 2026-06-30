export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Reusable fetch wrapper to include credentials (JWT HttpOnly cookies)
async function request(url: string, options: RequestInit = {}): Promise<any> {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
    credentials: 'include', // Crucial: forces sending JWT cookies
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

// ==========================================
// Authentication
// ==========================================
export async function adminLogin(email: string, password: string): Promise<any> {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function adminLogout(): Promise<any> {
  return request('/auth/logout', {
    method: 'POST',
  });
}

export async function checkAuth(): Promise<any> {
  return request('/auth/me');
}

// ==========================================
// Inquiries (Messages)
// ==========================================
export interface InquiryData {
  id: number;
  name: string;
  email: string;
  projectDescription: string;
  status: 'new' | 'read' | 'resolved';
  createdAt: string;
  updatedAt: string;
}

export async function fetchInquiries(): Promise<InquiryData[]> {
  const json = await request('/admin/inquiries');
  return json.data;
}

export async function updateInquiryStatus(id: number, status: 'new' | 'read' | 'resolved'): Promise<InquiryData> {
  const json = await request(`/admin/inquiries/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
  return json.data;
}

export async function deleteInquiry(id: number): Promise<any> {
  return request(`/admin/inquiries/${id}`, {
    method: 'DELETE',
  });
}

// ==========================================
// Stats Manager
// ==========================================
export interface StatData {
  id: number;
  key: string;
  value: number;
  suffix: string;
  labelEn: string;
  labelAr: string;
  displayOrder: number;
}

export async function fetchStats(): Promise<StatData[]> {
  const json = await request('/stats'); // Public route
  return json.data;
}

export async function updateStat(id: number, data: Partial<StatData>): Promise<StatData> {
  const json = await request(`/admin/stats/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return json.data;
}

export async function createStat(data: Omit<StatData, 'id'>): Promise<StatData> {
  const json = await request('/admin/stats', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return json.data;
}

export async function deleteStat(id: number): Promise<any> {
  return request(`/admin/stats/${id}`, {
    method: 'DELETE',
  });
}

// ==========================================
// Portfolio Manager
// ==========================================
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

export async function fetchPortfolio(): Promise<PortfolioItemData[]> {
  const json = await request('/portfolio'); // Public route
  return json.data;
}

export async function createPortfolioItem(data: Omit<PortfolioItemData, 'id'>): Promise<PortfolioItemData> {
  const json = await request('/admin/portfolio', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return json.data;
}

export async function updatePortfolioItem(id: number, data: Partial<PortfolioItemData>): Promise<PortfolioItemData> {
  const json = await request(`/admin/portfolio/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return json.data;
}

export async function deletePortfolioItem(id: number): Promise<any> {
  return request(`/admin/portfolio/${id}`, {
    method: 'DELETE',
  });
}

// ==========================================
// Testimonials Manager
// ==========================================
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
  displayOrder: number;
}

export async function fetchTestimonials(): Promise<TestimonialData[]> {
  const json = await request('/testimonials'); // Public route
  return json.data;
}

export async function createTestimonial(data: Omit<TestimonialData, 'id'>): Promise<TestimonialData> {
  const json = await request('/admin/testimonials', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return json.data;
}

export async function updateTestimonial(id: number, data: Partial<TestimonialData>): Promise<TestimonialData> {
  const json = await request(`/admin/testimonials/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return json.data;
}

export async function deleteTestimonial(id: number): Promise<any> {
  return request(`/admin/testimonials/${id}`, {
    method: 'DELETE',
  });
}

// ==========================================
// FAQs Manager
// ==========================================
export interface FaqData {
  id: number;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
  displayOrder: number;
}

export async function fetchFaqs(): Promise<FaqData[]> {
  const json = await request('/faqs'); // Public route
  return json.data;
}

export async function createFaq(data: Omit<FaqData, 'id'>): Promise<FaqData> {
  const json = await request('/admin/faqs', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return json.data;
}

export async function updateFaq(id: number, data: Partial<FaqData>): Promise<FaqData> {
  const json = await request(`/admin/faqs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return json.data;
}

export async function deleteFaq(id: number): Promise<any> {
  return request(`/admin/faqs/${id}`, {
    method: 'DELETE',
  });
}
