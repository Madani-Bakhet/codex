"use client";

import { useEffect, useState } from "react";
import { fetchStats, updateStat, createStat, deleteStat, StatData } from "../../../context/api";
import { BarChart3, Plus, Edit3, Trash2, X, Loader2, Save } from "lucide-react";

export default function StatsManager() {
  const [stats, setStats] = useState<StatData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStat, setEditingStat] = useState<StatData | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Inputs
  const [key, setKey] = useState("");
  const [value, setValue] = useState(0);
  const [suffix, setSuffix] = useState("");
  const [labelEn, setLabelEn] = useState("");
  const [labelAr, setLabelAr] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);

  const loadStats = () => {
    setLoading(true);
    fetchStats()
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load stats:", err);
        setError("Could not load stats data.");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadStats();
  }, []);

  const openCreateModal = () => {
    setEditingStat(null);
    setKey("");
    setValue(0);
    setSuffix("");
    setLabelEn("");
    setLabelAr("");
    setDisplayOrder(stats.length + 1);
    setIsFormOpen(true);
  };

  const openEditModal = (stat: StatData) => {
    setEditingStat(stat);
    setKey(stat.key);
    setValue(stat.value);
    setSuffix(stat.suffix || "");
    setLabelEn(stat.labelEn);
    setLabelAr(stat.labelAr);
    setDisplayOrder(stat.displayOrder || 0);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key || !labelEn || !labelAr) {
      alert("Key and labels are required.");
      return;
    }

    setIsSaving(true);
    const payload = {
      key,
      value: Number(value),
      suffix,
      labelEn,
      labelAr,
      displayOrder: Number(displayOrder)
    };

    try {
      if (editingStat) {
        const updated = await updateStat(editingStat.id, payload);
        setStats((prev) => prev.map((item) => (item.id === editingStat.id ? updated : item)));
      } else {
        const created = await createStat(payload);
        setStats((prev) => [...prev, created]);
      }
      setIsFormOpen(false);
    } catch (err: any) {
      alert("Error saving stat: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this statistic item?")) return;
    try {
      await deleteStat(id);
      setStats((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      alert("Error deleting stat: " + err.message);
    }
  };

  return (
    <div className="space-y-8 flex-grow flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-space-grotesk)] text-foreground">
            Stats Metrics Editor
          </h1>
          <p className="text-text-muted mt-1 text-sm">
            Modify values, suffixes, and labels for stats counter section
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-1.5 px-4 h-11 bg-primary text-background font-bold text-sm rounded hover:opacity-95 transition-all cursor-pointer shadow-lg shadow-primary/10"
        >
          <Plus className="w-4 h-4" />
          Add Metric
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
      ) : stats.length === 0 ? (
        <div className="glass-card p-12 text-center text-text-muted rounded-lg">
          <BarChart3 className="w-12 h-12 mb-3 mx-auto opacity-20" />
          <p className="text-sm">No stats entries found. Add one to see it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((stat) => (
              <div 
                key={stat.id} 
                className="glass-card p-6 rounded-lg border border-foreground/5 hover:border-primary/20 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Metric visual preview */}
                <div className="text-center py-6 bg-foreground/[0.01] border border-foreground/5 rounded-md relative">
                  <div className="text-4xl font-bold font-[family-name:var(--font-space-grotesk)] text-foreground">
                    {stat.value}
                    <span className="text-primary">{stat.suffix}</span>
                  </div>
                  <div className="absolute top-2 right-2 text-[10px] bg-background/80 px-2 py-0.5 rounded border border-foreground/10 text-text-muted">
                    Order: {stat.displayOrder}
                  </div>
                  <div className="text-xs text-text-muted font-mono mt-2">Key: {stat.key}</div>
                </div>

                {/* Details */}
                <div className="my-5 space-y-3 text-sm">
                  <div>
                    <span className="text-[10px] text-text-muted uppercase font-bold">English Label</span>
                    <p className="font-semibold text-foreground mt-0.5">{stat.labelEn}</p>
                  </div>
                  <div className="pt-2 border-t border-foreground/5">
                    <span className="text-[10px] text-text-muted uppercase font-bold">Arabic Label</span>
                    <p className="font-semibold text-foreground mt-0.5 text-right" dir="rtl">{stat.labelAr}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-foreground/5 flex items-center justify-end gap-2">
                  <button
                    onClick={() => openEditModal(stat)}
                    className="p-2 border border-foreground/10 hover:border-primary/35 hover:text-primary rounded text-text-muted cursor-pointer transition-colors"
                    title="Edit Metric"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(stat.id)}
                    className="p-2 border border-foreground/10 hover:border-red-500/35 hover:text-red-400 rounded text-text-muted cursor-pointer transition-colors"
                    title="Delete Metric"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Stats Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <form 
            onSubmit={handleSubmit}
            className="w-full max-w-xl glass-card rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="px-6 py-4 border-b border-foreground/10 flex items-center justify-between bg-surface/50">
              <h3 className="font-bold font-[family-name:var(--font-space-grotesk)] text-lg">
                {editingStat ? "Edit Stat Metric" : "Add Stat Metric"}
              </h3>
              <button 
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 hover:bg-foreground/5 border border-transparent hover:border-foreground/10 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-grow text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-text-muted">Unique Key (API Identifer)</label>
                  <input
                    type="text"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="w-full h-11 px-3 bg-background border border-foreground/10 rounded text-foreground focus:border-primary focus:outline-none"
                    placeholder="e.g. projects"
                    required
                    disabled={!!editingStat} // Key shouldn't change after creation to avoid breaking code logic
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-text-muted">Display Rank Order</label>
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-text-muted">Numeric Counter Value</label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className="w-full h-11 px-3 bg-background border border-foreground/10 rounded text-foreground focus:border-primary focus:outline-none"
                    placeholder="100"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-text-muted">Suffix (Optional)</label>
                  <input
                    type="text"
                    value={suffix}
                    onChange={(e) => setSuffix(e.target.value)}
                    className="w-full h-11 px-3 bg-background border border-foreground/10 rounded text-foreground focus:border-primary focus:outline-none"
                    placeholder="e.g. +, %, /7"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-text-muted">English Label Text</label>
                <input
                  type="text"
                  value={labelEn}
                  onChange={(e) => setLabelEn(e.target.value)}
                  className="w-full h-11 px-3 bg-background border border-foreground/10 rounded text-foreground focus:border-primary focus:outline-none"
                  placeholder="e.g. Projects Delivered"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-text-muted font-bold text-secondary">Arabic Label Text</label>
                <input
                  type="text"
                  value={labelAr}
                  onChange={(e) => setLabelAr(e.target.value)}
                  className="w-full h-11 px-3 bg-background border border-foreground/10 rounded text-foreground text-right focus:border-primary focus:outline-none"
                  placeholder="مثال: مشاريع منجزة"
                  required
                />
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
                Save Metrics
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
