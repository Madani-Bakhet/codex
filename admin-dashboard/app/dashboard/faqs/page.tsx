"use client";

import { useEffect, useState } from "react";
import { fetchFaqs, createFaq, updateFaq, deleteFaq, FaqData } from "../../../context/api";
import { HelpCircle, Plus, Edit3, Trash2, X, Loader2, Save } from "lucide-react";

export default function FaqsManager() {
  const [faqs, setFaqs] = useState<FaqData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FaqData | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Inputs
  const [questionEn, setQuestionEn] = useState("");
  const [questionAr, setQuestionAr] = useState("");
  const [answerEn, setAnswerEn] = useState("");
  const [answerAr, setAnswerAr] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);

  const loadFaqs = () => {
    setLoading(true);
    fetchFaqs()
      .then((data) => {
        setFaqs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading FAQs:", err);
        setError("Failed to load FAQs.");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setQuestionEn("");
    setQuestionAr("");
    setAnswerEn("");
    setAnswerAr("");
    setDisplayOrder(faqs.length + 1);
    setIsFormOpen(true);
  };

  const openEditModal = (item: FaqData) => {
    setEditingItem(item);
    setQuestionEn(item.questionEn);
    setQuestionAr(item.questionAr);
    setAnswerEn(item.answerEn);
    setAnswerAr(item.answerAr);
    setDisplayOrder(item.displayOrder || 0);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionEn || !questionAr || !answerEn || !answerAr) {
      alert("All questions and answers are required.");
      return;
    }

    setIsSaving(true);
    const payload = {
      questionEn,
      questionAr,
      answerEn,
      answerAr,
      displayOrder: Number(displayOrder)
    };

    try {
      if (editingItem) {
        const updated = await updateFaq(editingItem.id, payload);
        setFaqs((prev) => prev.map((item) => (item.id === editingItem.id ? updated : item)));
      } else {
        const created = await createFaq(payload);
        setFaqs((prev) => [...prev, created]);
      }
      setIsFormOpen(false);
    } catch (err: any) {
      alert("Error saving FAQ: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      await deleteFaq(id);
      setFaqs((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      alert("Error deleting FAQ: " + err.message);
    }
  };

  return (
    <div className="space-y-8 flex-grow flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-space-grotesk)] text-foreground">
            FAQs Accordion Editor
          </h1>
          <p className="text-text-muted mt-1 text-sm">
            Modify question and answer pairs for the landing page accordion list
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-1.5 px-4 h-11 bg-primary text-background font-bold text-sm rounded hover:opacity-95 transition-all cursor-pointer shadow-lg shadow-primary/10"
        >
          <Plus className="w-4 h-4" />
          Add FAQ
        </button>
      </div>

      {/* Accordion list cards */}
      {loading ? (
        <div className="flex-grow flex items-center justify-center min-h-[300px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary mr-3" />
          <span className="text-text-muted text-sm">Querying database...</span>
        </div>
      ) : error ? (
        <div className="glass-card p-8 rounded-lg text-center text-red-400 text-sm max-w-md mx-auto">
          {error}
        </div>
      ) : faqs.length === 0 ? (
        <div className="glass-card p-12 text-center text-text-muted rounded-lg">
          <HelpCircle className="w-12 h-12 mb-3 mx-auto opacity-20" />
          <p className="text-sm">No FAQs found. Add one to see it here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {faqs
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((item) => (
              <div 
                key={item.id} 
                className="glass-card p-6 rounded-lg border border-foreground/5 hover:border-primary/20 transition-all duration-300 relative"
              >
                {/* Order badge */}
                <div className="absolute top-4 right-4 text-[10px] bg-background/80 px-2 py-0.5 rounded border border-foreground/10 text-text-muted">
                  Order: {item.displayOrder}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-12">
                  {/* English */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-primary uppercase font-bold tracking-wider">English FAQ</span>
                    <h4 className="font-bold text-base text-foreground leading-snug">{item.questionEn}</h4>
                    <p className="text-sm text-text-muted mt-1 leading-relaxed">{item.answerEn}</p>
                  </div>

                  {/* Arabic */}
                  <div className="space-y-2 border-t md:border-t-0 pt-4 md:pt-0 border-foreground/5">
                    <span className="text-[10px] text-secondary uppercase font-bold tracking-wider block text-right">Arabic FAQ</span>
                    <h4 className="font-bold text-base text-foreground leading-snug text-right" dir="rtl">{item.questionAr}</h4>
                    <p className="text-sm text-text-muted mt-1 leading-relaxed text-right" dir="rtl">{item.answerAr}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 border border-foreground/10 hover:border-primary/35 hover:text-primary rounded text-text-muted cursor-pointer transition-colors"
                    title="Edit FAQ"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 border border-foreground/10 hover:border-red-500/35 hover:text-red-400 rounded text-text-muted cursor-pointer transition-colors"
                    title="Delete FAQ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* FAQs Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <form 
            onSubmit={handleSubmit}
            className="w-full max-w-3xl glass-card rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="px-6 py-4 border-b border-foreground/10 flex items-center justify-between bg-surface/50">
              <h3 className="font-bold font-[family-name:var(--font-space-grotesk)] text-lg">
                {editingItem ? "Edit FAQ" : "Add FAQ"}
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
                    <label className="text-xs text-text-muted">Question</label>
                    <input
                      type="text"
                      value={questionEn}
                      onChange={(e) => setQuestionEn(e.target.value)}
                      className="w-full h-11 px-3 bg-background border border-foreground/10 rounded text-foreground focus:border-primary focus:outline-none"
                      placeholder="e.g. What is your typical project timeline?"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-text-muted">Answer Description</label>
                    <textarea
                      value={answerEn}
                      onChange={(e) => setAnswerEn(e.target.value)}
                      className="w-full h-32 p-3 bg-background border border-foreground/10 rounded text-foreground resize-none focus:border-primary focus:outline-none"
                      placeholder="A typical MVP takes 8-12 weeks..."
                      required
                    />
                  </div>
                </div>

                {/* ARABIC */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Arabic Content</h4>
                  
                  <div className="space-y-1">
                    <label className="text-xs text-text-muted">Question (Arabic)</label>
                    <input
                      type="text"
                      value={questionAr}
                      onChange={(e) => setQuestionAr(e.target.value)}
                      className="w-full h-11 px-3 bg-background border border-foreground/10 rounded text-foreground text-right focus:border-primary focus:outline-none"
                      placeholder="مثال: ما هو الجدول الزمني المعتاد للمشروع؟"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-text-muted">Answer Description (Arabic)</label>
                    <textarea
                      value={answerAr}
                      onChange={(e) => setAnswerAr(e.target.value)}
                      className="w-full h-32 p-3 bg-background border border-foreground/10 rounded text-foreground text-right resize-none focus:border-primary focus:outline-none"
                      placeholder="يستغرق المنتج الأولي المعتاد..."
                      required
                    />
                  </div>
                </div>

              </div>

              {/* DISPLAY ORDER */}
              <div className="pt-6 border-t border-foreground/5">
                <div className="space-y-1 max-w-xs">
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
                Save FAQ
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
