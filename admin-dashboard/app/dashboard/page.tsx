"use client";

import { useEffect, useState } from "react";
import { fetchInquiries, updateInquiryStatus, deleteInquiry, InquiryData } from "../../context/api";
import { Mail, Calendar, MessageSquare, AlertCircle, CheckCircle2, Trash2, Eye, X, Loader2 } from "lucide-react";

export default function DashboardOverview() {
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Selected inquiry for detail modal
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryData | null>(null);
  const [statusUpdating, setStatusUpdating] = useState(false);

  const loadInquiries = () => {
    setLoading(true);
    fetchInquiries()
      .then((data) => {
        setInquiries(data);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching inquiries:", err);
        setError("Failed to load inquiries. Make sure the backend service is running.");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleUpdateStatus = async (id: number, status: 'new' | 'read' | 'resolved') => {
    setStatusUpdating(true);
    try {
      const updated = await updateInquiryStatus(id, status);
      setInquiries((prev) => prev.map((item) => (item.id === id ? updated : item)));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(updated);
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      await deleteInquiry(id);
      setInquiries((prev) => prev.filter((item) => item.id !== id));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
    }
  };

  // Metrics
  const totalCount = inquiries.length;
  const newCount = inquiries.filter((item) => item.status === "new").length;
  const readCount = inquiries.filter((item) => item.status === "read").length;
  const resolvedCount = inquiries.filter((item) => item.status === "resolved").length;

  return (
    <div className="space-y-8 flex-1 flex flex-col">
      {/* Title Header */}
      <div>
        <h1 className="text-3xl font-bold font-[family-name:var(--font-space-grotesk)] text-foreground">
          Dashboard Overview
        </h1>
        <p className="text-text-muted mt-1 text-sm">
          Review incoming client inquiries and track service engagement metrics
        </p>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Total Inquiries</p>
            <h3 className="text-3xl font-bold font-[family-name:var(--font-space-grotesk)] text-foreground mt-2">{totalCount}</h3>
          </div>
          <div className="p-3 rounded-lg bg-foreground/5 text-foreground border border-foreground/10">
            <Mail className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-6 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">New Messages</p>
            <h3 className="text-3xl font-bold font-[family-name:var(--font-space-grotesk)] text-primary mt-2">{newCount}</h3>
          </div>
          <div className="p-3 rounded-lg bg-primary/10 text-primary border border-primary/20">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-6 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">In Review</p>
            <h3 className="text-3xl font-bold font-[family-name:var(--font-space-grotesk)] text-secondary mt-2">{readCount}</h3>
          </div>
          <div className="p-3 rounded-lg bg-secondary/10 text-secondary border border-secondary/20">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-6 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Resolved</p>
            <h3 className="text-3xl font-bold font-[family-name:var(--font-space-grotesk)] text-green-400 mt-2">{resolvedCount}</h3>
          </div>
          <div className="p-3 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Inquiries Section */}
      <div className="glass-card rounded-lg flex-1 flex flex-col overflow-hidden min-h-[400px]">
        {/* Table Header toolbar */}
        <div className="px-6 py-4 border-b border-foreground/10 flex items-center justify-between">
          <h4 className="font-bold font-[family-name:var(--font-space-grotesk)] text-lg">Inquiry Inbox</h4>
          <button 
            onClick={loadInquiries} 
            className="text-xs px-3 py-1.5 border border-foreground/10 rounded hover:bg-foreground/5 text-text-muted hover:text-foreground cursor-pointer transition-colors"
          >
            Refresh List
          </button>
        </div>

        {/* Content list or table */}
        {loading ? (
          <div className="flex-grow flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mr-3" />
            <span className="text-text-muted text-sm">Querying database...</span>
          </div>
        ) : error ? (
          <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
            <p className="text-red-400 text-sm mb-4">{error}</p>
            <button onClick={loadInquiries} className="px-4 py-2 bg-foreground text-background font-bold text-sm rounded">Retry connection</button>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center p-6 text-center text-text-muted">
            <Mail className="w-12 h-12 mb-3 opacity-20" />
            <p className="text-sm">No client submissions found in database.</p>
          </div>
        ) : (
          <div className="overflow-x-auto flex-grow">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-foreground/5 bg-foreground/[0.02] text-xs font-semibold uppercase tracking-wider text-text-muted">
                  <th className="px-6 py-3.5">Client Details</th>
                  <th className="px-6 py-3.5">Project Brief</th>
                  <th className="px-6 py-3.5">Submitted</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5 text-sm">
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-foreground/[0.01] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-foreground">{inquiry.name}</div>
                      <div className="text-xs text-text-muted">{inquiry.email}</div>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">
                      {inquiry.projectDescription}
                    </td>
                    <td className="px-6 py-4 text-xs text-text-muted">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                        inquiry.status === "new" 
                          ? "bg-primary/10 border-primary/20 text-primary" 
                          : inquiry.status === "read"
                          ? "bg-secondary/10 border-secondary/20 text-secondary"
                          : "bg-green-500/10 border-green-500/20 text-green-400"
                      }`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => setSelectedInquiry(inquiry)}
                        className="p-1.5 border border-foreground/10 hover:border-primary/30 hover:text-primary rounded text-text-muted cursor-pointer transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(inquiry.id)}
                        className="p-1.5 border border-foreground/10 hover:border-red-500/30 hover:text-red-400 rounded text-text-muted cursor-pointer transition-colors"
                        title="Delete inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="w-full max-w-2xl glass-card rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-foreground/10 flex items-center justify-between bg-surface/50">
              <h3 className="font-bold font-[family-name:var(--font-space-grotesk)] text-lg">
                Client Inquiry Details
              </h3>
              <button 
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 hover:bg-foreground/5 border border-transparent hover:border-foreground/10 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto flex-grow text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-text-muted uppercase">Client Name</p>
                  <p className="text-base font-bold text-foreground mt-1">{selectedInquiry.name}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-text-muted uppercase">Email Address</p>
                  <p className="text-base font-medium text-primary mt-1">{selectedInquiry.email}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-text-muted uppercase mb-1">Status Control</p>
                <div className="flex gap-2.5">
                  {(["new", "read", "resolved"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => handleUpdateStatus(selectedInquiry.id, s)}
                      disabled={statusUpdating || selectedInquiry.status === s}
                      className={`
                        px-3.5 py-1.5 text-xs font-semibold rounded border transition-all cursor-pointer capitalize
                        ${selectedInquiry.status === s 
                          ? "bg-foreground text-background border-foreground" 
                          : "bg-surface/50 border-foreground/10 text-text-muted hover:border-foreground/30 hover:text-foreground"}
                      `}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-text-muted uppercase mb-2">Project Brief</p>
                <div className="p-4 bg-background border border-foreground/5 rounded-md text-foreground whitespace-pre-wrap leading-relaxed">
                  {selectedInquiry.projectDescription}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-foreground/10 bg-surface/50 flex items-center justify-between">
              <button
                onClick={() => handleDelete(selectedInquiry.id)}
                className="flex items-center gap-1.5 px-3.5 py-2 border border-red-500/20 text-red-400 hover:bg-red-500/10 text-xs font-semibold rounded transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                Delete Submission
              </button>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 bg-foreground text-background text-xs font-semibold rounded hover:bg-foreground/90 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
