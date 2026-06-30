"use client";

import { useEffect, useState } from "react";
import { fetchPortfolio, createPortfolioItem, updatePortfolioItem, deletePortfolioItem, PortfolioItemData } from "../../../context/api";
import { FolderGit2, Plus, Edit3, Trash2, X, Loader2, Save, ExternalLink } from "lucide-react";

export default function PortfolioManager() {
  const [items, setItems] = useState<PortfolioItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItemData | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Input States
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [categoryEn, setCategoryEn] = useState("");
  const [categoryAr, setCategoryAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);

  const loadItems = () => {
    setLoading(true);
    fetchPortfolio()
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load portfolio:", err);
        setError("Could not load portfolio items from database.");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadItems();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setTitleEn("");
    setTitleAr("");
    setCategoryEn("");
    setCategoryAr("");
    setDescriptionEn("");
    setDescriptionAr("");
    setImageUrl("/portfolio/default.jpg");
    setProjectUrl("#");
    setDisplayOrder(items.length + 1);
    setIsFormOpen(true);
  };

  const openEditModal = (item: PortfolioItemData) => {
    setEditingItem(item);
    setTitleEn(item.titleEn);
    setTitleAr(item.titleAr);
    setCategoryEn(item.categoryEn);
    setCategoryAr(item.categoryAr);
    setDescriptionEn(item.descriptionEn || "");
    setDescriptionAr(item.descriptionAr || "");
    setImageUrl(item.imageUrl);
    setProjectUrl(item.projectUrl || "");
    setDisplayOrder(item.displayOrder);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleEn || !titleAr || !categoryEn || !categoryAr) {
      alert("Please fill in all translated title and category fields.");
      return;
    }

    setIsSaving(true);
    const payload = {
      titleEn,
      titleAr,
      categoryEn,
      categoryAr,
      descriptionEn,
      descriptionAr,
      imageUrl,
      projectUrl,
      displayOrder: Number(displayOrder),
    };

    try {
      if (editingItem) {
        // Update
        const updated = await updatePortfolioItem(editingItem.id, payload);
        setItems((prev) => prev.map((item) => (item.id === editingItem.id ? updated : item)));
      } else {
        // Create
        const created = await createPortfolioItem(payload);
        setItems((prev) => [...prev, created]);
      }
      setIsFormOpen(false);
    } catch (err: any) {
      alert("Error saving item: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this portfolio item?")) return;
    try {
      await deletePortfolioItem(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      alert("Error deleting item: " + err.message);
    }
  };

  return (
    <div className="space-y-8 flex-grow flex flex-col">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-space-grotesk)] text-foreground">
            Portfolio Grid Manager
          </h1>
          <p className="text-text-muted mt-1 text-sm">
            Add, update, or delete showcased agency works
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-1.5 px-4 h-11 bg-primary text-background font-bold text-sm rounded hover:opacity-95 transition-all cursor-pointer shadow-lg shadow-primary/10"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {/* Grid listing */}
      {loading ? (
        <div className="flex-grow flex items-center justify-center min-h-[300px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary mr-3" />
          <span className="text-text-muted text-sm">Querying database...</span>
        </div>
      ) : error ? (
        <div className="glass-card p-8 rounded-lg text-center text-red-400 text-sm max-w-md mx-auto">
          {error}
        </div>
      ) : items.length === 0 ? (
        <div className="glass-card p-12 text-center text-text-muted rounded-lg">
          <FolderGit2 className="w-12 h-12 mb-3 mx-auto opacity-20" />
          <p className="text-sm">No portfolio items found. Seed the database or add one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((item) => (
              <div 
                key={item.id} 
                className="glass-card rounded-lg overflow-hidden flex flex-col justify-between border border-foreground/5 hover:border-primary/20 transition-all duration-300 relative group"
              >
                {/* Preview block representing image */}
                <div className="h-44 bg-surface/50 border-b border-foreground/5 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5" />
                  <FolderGit2 className="w-12 h-12 text-primary/30 mb-2" />
                  <span className="text-xs text-text-muted truncate max-w-full font-mono">{item.imageUrl}</span>
                  <div className="absolute top-3 right-3 text-xs bg-background/80 px-2 py-0.5 rounded border border-foreground/10 text-text-muted">
                    Order: {item.displayOrder}
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 flex-grow space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-primary">{item.categoryEn}</span>
                    <h4 className="font-bold text-lg font-[family-name:var(--font-space-grotesk)] text-foreground mt-1 truncate">{item.titleEn}</h4>
                    <p className="text-xs text-text-muted mt-1 truncate">{item.descriptionEn}</p>
                  </div>
                  
                  <div className="pt-3 border-t border-foreground/5 space-y-1 bg-foreground/[0.01] p-2.5 rounded text-xs">
                    <div className="text-[10px] text-text-muted uppercase font-bold">Arabic content</div>
                    <div className="font-semibold text-foreground truncate">{item.titleAr}</div>
                    <div className="text-text-muted truncate">{item.descriptionAr}</div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="px-5 py-4 bg-surface/40 border-t border-foreground/5 flex items-center justify-between">
                  {item.projectUrl && item.projectUrl !== "#" ? (
                    <a href={item.projectUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                      Live link <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : <span className="text-xs text-text-muted font-mono">Static link</span>}

                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-2 border border-foreground/10 hover:border-primary/35 hover:text-primary rounded text-text-muted cursor-pointer transition-colors"
                      title="Edit project"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 border border-foreground/10 hover:border-red-500/35 hover:text-red-400 rounded text-text-muted cursor-pointer transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Creation / Editing Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <form 
            onSubmit={handleSubmit}
            className="w-full max-w-3xl glass-card rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-foreground/10 flex items-center justify-between bg-surface/50">
              <h3 className="font-bold font-[family-name:var(--font-space-grotesk)] text-lg">
                {editingItem ? "Edit Portfolio Project" : "Add Portfolio Project"}
              </h3>
              <button 
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 hover:bg-foreground/5 border border-transparent hover:border-foreground/10 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Inputs */}
            <div className="p-6 space-y-6 overflow-y-auto flex-grow text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* ENGLISH BLOCK */}
                <div className="space-y-4 border-r border-foreground/5 pr-0 md:pr-6">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">English Content</h4>
                  
                  <div className="space-y-1">
                    <label className="text-xs text-text-muted">Project Title</label>
                    <input
                      type="text"
                      value={titleEn}
                      onChange={(e) => setTitleEn(e.target.value)}
                      className="w-full h-11 px-3 bg-background border border-foreground/10 rounded text-foreground focus:border-primary focus:outline-none"
                      placeholder="e.g. FinTech Dashboard"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-text-muted">Category</label>
                    <input
                      type="text"
                      value={categoryEn}
                      onChange={(e) => setCategoryEn(e.target.value)}
                      className="w-full h-11 px-3 bg-background border border-foreground/10 rounded text-foreground focus:border-primary focus:outline-none"
                      placeholder="e.g. Web Application"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-text-muted">Description Brief</label>
                    <textarea
                      value={descriptionEn}
                      onChange={(e) => setDescriptionEn(e.target.value)}
                      className="w-full h-24 p-3 bg-background border border-foreground/10 rounded text-foreground resize-none focus:border-primary focus:outline-none"
                      placeholder="A comprehensive analytics dashboard for..."
                    />
                  </div>
                </div>

                {/* ARABIC BLOCK */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Arabic Content</h4>
                  
                  <div className="space-y-1">
                    <label className="text-xs text-text-muted">Project Title (Arabic)</label>
                    <input
                      type="text"
                      value={titleAr}
                      onChange={(e) => setTitleAr(e.target.value)}
                      className="w-full h-11 px-3 bg-background border border-foreground/10 rounded text-foreground text-right focus:border-primary focus:outline-none"
                      placeholder="مثال: لوحة تحكم مالية"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-text-muted">Category (Arabic)</label>
                    <input
                      type="text"
                      value={categoryAr}
                      onChange={(e) => setCategoryAr(e.target.value)}
                      className="w-full h-11 px-3 bg-background border border-foreground/10 rounded text-foreground text-right focus:border-primary focus:outline-none"
                      placeholder="مثال: تطبيق ويب"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-text-muted">Description Brief (Arabic)</label>
                    <textarea
                      value={descriptionAr}
                      onChange={(e) => setDescriptionAr(e.target.value)}
                      className="w-full h-24 p-3 bg-background border border-foreground/10 rounded text-foreground text-right resize-none focus:border-primary focus:outline-none"
                      placeholder="لوحة تحكم تحليلية شاملة لمؤسسة مالية..."
                    />
                  </div>
                </div>

              </div>

              {/* SHARED FIELDS */}
              <div className="pt-6 border-t border-foreground/5 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <label className="text-xs text-text-muted">Image Mockup Path</label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full h-11 px-3 bg-background border border-foreground/10 rounded text-foreground focus:border-primary focus:outline-none"
                    placeholder="/portfolio/fintech.jpg"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-text-muted">Project Link URL</label>
                  <input
                    type="text"
                    value={projectUrl}
                    onChange={(e) => setProjectUrl(e.target.value)}
                    className="w-full h-11 px-3 bg-background border border-foreground/10 rounded text-foreground focus:border-primary focus:outline-none"
                    placeholder="https://example.com"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-text-muted">Sort Order Rank</label>
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

            {/* Modal Footer Controls */}
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
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
