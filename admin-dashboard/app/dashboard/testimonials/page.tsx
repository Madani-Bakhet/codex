"use client";

import { useEffect, useState } from "react";
import { fetchTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, TestimonialData } from "../../../context/api";
import { MessageSquareQuote, Plus, Edit3, Trash2, X, Loader2, Save, Star } from "lucide-react";

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialData | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Inputs
  const [quoteEn, setQuoteEn] = useState("");
  const [quoteAr, setQuoteAr] = useState("");
  const [authorEn, setAuthorEn] = useState("");
  const [authorAr, setAuthorAr] = useState("");
  const [roleEn, setRoleEn] = useState("");
  const [roleAr, setRoleAr] = useState("");
  const [companyEn, setCompanyEn] = useState("");
  const [companyAr, setCompanyAr] = useState("");
  const [rating, setRating] = useState(5);
  const [displayOrder, setDisplayOrder] = useState(0);

  const loadTestimonials = () => {
    setLoading(true);
    fetchTestimonials()
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading testimonials:", err);
        setError("Failed to load testimonials.");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setQuoteEn("");
    setQuoteAr("");
    setAuthorEn("");
    setAuthorAr("");
    setRoleEn("");
    setRoleAr("");
    setCompanyEn("");
    setCompanyAr("");
    setRating(5);
    setDisplayOrder(testimonials.length + 1);
    setIsFormOpen(true);
  };

  const openEditModal = (item: TestimonialData) => {
    setEditingItem(item);
    setQuoteEn(item.quoteEn);
    setQuoteAr(item.quoteAr);
    setAuthorEn(item.authorEn);
    setAuthorAr(item.authorAr);
    setRoleEn(item.roleEn);
    setRoleAr(item.roleAr);
    setCompanyEn(item.companyEn || "");
    setCompanyAr(item.companyAr || "");
    setRating(item.rating);
    setDisplayOrder(item.displayOrder || 0);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteEn || !quoteAr || !authorEn || !authorAr || !roleEn || !roleAr) {
      alert("Please fill in all quotes, authors, and roles.");
      return;
    }

    setIsSaving(true);
    const payload = {
      quoteEn,
      quoteAr,
      authorEn,
      authorAr,
      roleEn,
      roleAr,
      companyEn,
      companyAr,
      rating: Number(rating),
      displayOrder: Number(displayOrder)
    };

    try {
      if (editingItem) {
        const updated = await updateTestimonial(editingItem.id, payload);
        setTestimonials((prev) => prev.map((item) => (item.id === editingItem.id ? updated : item)));
      } else {
        const created = await createTestimonial(payload);
        setTestimonials((prev) => [...prev, created]);
      }
      setIsFormOpen(false);
    } catch (err: any) {
      alert("Error saving testimonial: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await deleteTestimonial(id);
      setTestimonials((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      alert("Error deleting testimonial: " + err.message);
    }
  };

  return (
    <div className="space-y-8 flex-grow flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-space-grotesk)] text-foreground">
            Testimonials Manager
          </h1>
          <p className="text-text-muted mt-1 text-sm">
            Manage dynamic client reviews and rating quotes
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-1.5 px-4 h-11 bg-primary text-background font-bold text-sm rounded hover:opacity-95 transition-all cursor-pointer shadow-lg shadow-primary/10"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </button>
      </div>

      {/* Grid List */}
      {loading ? (
        <div className="flex-grow flex items-center justify-center min-h-[300px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary mr-3" />
          <span className="text-text-muted text-sm">Querying database...</span>
        </div>
      ) : error ? (
        <div className="glass-card p-8 rounded-lg text-center text-red-400 text-sm max-w-md mx-auto">
          {error}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="glass-card p-12 text-center text-text-muted rounded-lg">
          <MessageSquareQuote className="w-12 h-12 mb-3 mx-auto opacity-20" />
          <p className="text-sm">No testimonials found. Add one to see it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((item) => (
              <div 
                key={item.id} 
                className="glass-card p-6 rounded-lg border border-foreground/5 hover:border-primary/20 transition-all duration-300 flex flex-col justify-between relative"
              >
                {/* Order badge */}
                <div className="absolute top-4 right-4 text-[10px] bg-background/80 px-2 py-0.5 rounded border border-foreground/10 text-text-muted">
                  Order: {item.displayOrder}
                </div>

                {/* Content Box */}
                <div className="space-y-4">
                  {/* Rating stars */}
                  <div className="flex text-yellow-500 gap-0.5">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* Eng Text */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-primary uppercase font-bold tracking-wider">English</span>
                    <blockquote className="text-sm text-foreground font-medium italic">"{item.quoteEn}"</blockquote>
                    <p className="text-xs font-bold text-foreground mt-2">{item.authorEn} — <span className="text-text-muted font-normal">{item.roleEn}, {item.companyEn}</span></p>
                  </div>

                  {/* Arabic Text */}
                  <div className="pt-3 border-t border-foreground/5 space-y-1">
                    <span className="text-[10px] text-secondary uppercase font-bold tracking-wider">Arabic</span>
                    <blockquote className="text-sm text-foreground font-medium italic text-right" dir="rtl">"{item.quoteAr}"</blockquote>
                    <p className="text-xs font-bold text-foreground mt-2 text-right" dir="rtl">{item.authorAr} — <span className="text-text-muted font-normal">{item.roleAr}، {item.companyAr}</span></p>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 mt-6 border-t border-foreground/5 flex items-center justify-end gap-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 border border-foreground/10 hover:border-primary/35 hover:text-primary rounded text-text-muted cursor-pointer transition-colors"
                    title="Edit Testimonial"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 border border-foreground/10 hover:border-red-500/35 hover:text-red-400 rounded text-text-muted cursor-pointer transition-colors"
                    title="Delete Testimonial"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Testimonials Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <form 
            onSubmit={handleSubmit}
            className="w-full max-w-3xl glass-card rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="px-6 py-4 border-b border-foreground/10 flex items-center justify-between bg-surface/50">
              <h3 className="font-bold font-[family-name:var(--font-space-grotesk)] text-lg">
                {editingItem ? "Edit Testimonial" : "Add Testimonial"}
              </h3>
              <button 
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 hover:bg-foreground/5 border border-transparent hover:border-foreground/10 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto flex-grow text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* ENGLISH */}
                <div className="space-y-4 border-r border-foreground/5 pr-0 md:pr-6">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">English Content</h4>
                  
                  <div className="space-y-1">
                    <label className="text-xs text-text-muted">Author Name</label>
                    <input
                      type="text"
                      value={authorEn}
                      onChange={(e) => setAuthorEn(e.target.value)}
                      className="w-full h-11 px-3 bg-background border border-foreground/10 rounded text-foreground focus:border-primary focus:outline-none"
                      placeholder="Jane Doe"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-text-muted">Author Role</label>
                    <input
                      type="text"
                      value={roleEn}
                      onChange={(e) => setRoleEn(e.target.value)}
                      className="w-full h-11 px-3 bg-background border border-foreground/10 rounded text-foreground focus:border-primary focus:outline-none"
                      placeholder="CEO"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-text-muted">Company</label>
                    <input
                      type="text"
                      value={companyEn}
                      onChange={(e) => setCompanyEn(e.target.value)}
                      className="w-full h-11 px-3 bg-background border border-foreground/10 rounded text-foreground focus:border-primary focus:outline-none"
                      placeholder="TechStart"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-text-muted">Quote Review</label>
                    <textarea
                      value={quoteEn}
                      onChange={(e) => setQuoteEn(e.target.value)}
                      className="w-full h-24 p-3 bg-background border border-foreground/10 rounded text-foreground resize-none focus:border-primary focus:outline-none"
                      placeholder="The new web app is incredibly fast..."
                      required
                    />
                  </div>
                </div>

                {/* ARABIC */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Arabic Content</h4>
                  
                  <div className="space-y-1">
                    <label className="text-xs text-text-muted">Author Name (Arabic)</label>
                    <input
                      type="text"
                      value={authorAr}
                      onChange={(e) => setAuthorAr(e.target.value)}
                      className="w-full h-11 px-3 bg-background border border-foreground/10 rounded text-foreground text-right focus:border-primary focus:outline-none"
                      placeholder="جين دو"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-text-muted">Author Role (Arabic)</label>
                    <input
                      type="text"
                      value={roleAr}
                      onChange={(e) => setRoleAr(e.target.value)}
                      className="w-full h-11 px-3 bg-background border border-foreground/10 rounded text-foreground text-right focus:border-primary focus:outline-none"
                      placeholder="الرئيس التنفيذي"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-text-muted">Company (Arabic)</label>
                    <input
                      type="text"
                      value={companyAr}
                      onChange={(e) => setCompanyAr(e.target.value)}
                      className="w-full h-11 px-3 bg-background border border-foreground/10 rounded text-foreground text-right focus:border-primary focus:outline-none"
                      placeholder="تيك ستارت"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-text-muted">Quote Review (Arabic)</label>
                    <textarea
                      value={quoteAr}
                      onChange={(e) => setQuoteAr(e.target.value)}
                      className="w-full h-24 p-3 bg-background border border-foreground/10 rounded text-foreground text-right resize-none focus:border-primary focus:outline-none"
                      placeholder="تطبيق الويب الجديد سريع للغاية..."
                      required
                    />
                  </div>
                </div>

              </div>

              {/* SHARED FIELDS */}
              <div className="pt-6 border-t border-foreground/5 grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs text-text-muted">Star Rating (1 - 5)</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full h-11 px-3 bg-background border border-foreground/10 rounded text-foreground focus:border-primary focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>{num} Stars</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-text-muted">Display Order Rank</label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(Number(e.target.value))}
                    className="w-full h-11 px-3 bg-background border border-foreground/10 rounded text-foreground focus:border-primary focus:outline-none"
                    placeholder="1"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-foreground/10 bg-surface/50 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 border border-foreground/10 hover:bg-foreground/5 text-xs font-semibold rounded text-foreground cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-1.5 px-4 py-2 bg-foreground text-background text-xs font-bold rounded hover:bg-foreground/90 transition-colors cursor-pointer"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Testimonial
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
