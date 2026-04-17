import { useState, useEffect } from "react";
import { Bell, Plus, Calendar, Trash2, Edit, CheckCircle2, Clock } from "lucide-react";
import { motion } from "motion/react";

interface Notice {
  id: string;
  title: string;
  content: string;
  expiry_date: string;
  created_at: string;
}

export default function NoticeManager() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // Mock data for notices
    setNotices([
      { id: "1", title: "Monthly Meeting", content: "Our monthly meeting will be held on April 25th at 5 PM.", expiry_date: "2026-04-26", created_at: "2026-04-10" },
      { id: "2", title: "New Membership Fee", content: "Starting next month, the membership fee will be BDT 600.", expiry_date: "2026-05-01", created_at: "2026-04-12" },
    ]);
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Notice Manager</h1>
          <p className="text-[#94a3b8] text-sm font-medium">Create and manage announcements for the public portal.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="glass-button-primary flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Create Notice
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {notices.map((notice) => (
          <motion.div 
            key={notice.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 space-y-4 relative group"
          >
            <div className="flex justify-between items-start">
              <div className="bg-white/5 text-[#818cf8] p-2 rounded-lg">
                <Bell className="w-5 h-5" />
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-[#94a3b8] hover:text-[#818cf8] hover:bg-white/5 rounded-lg transition-all"><Edit className="w-4 h-4" /></button>
                <button className="p-2 text-[#94a3b8] hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{notice.title}</h3>
              <p className="text-[#94a3b8] mt-2 text-sm line-clamp-3 leading-relaxed">{notice.content}</p>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
              <div className="flex items-center gap-1.5 text-[#94a3b8] opacity-50">
                <Clock className="w-3.5 h-3.5" /> Posted {new Date(notice.created_at).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1.5 text-[#818cf8]">
                <Calendar className="w-3.5 h-3.5" /> Expires {new Date(notice.expiry_date).toLocaleDateString()}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsAdding(false)} />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative glass-card w-full max-w-lg overflow-hidden border-white/20"
          >
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Create New Notice</h2>
              <p className="text-sm text-[#94a3b8]">This will be visible on the public portal.</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Title</label>
                <input type="text" className="glass-input w-full" placeholder="Notice Title" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Content</label>
                <textarea className="glass-input w-full h-32 resize-none" placeholder="Announcement details..." />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Expiry Date</label>
                <input type="date" className="glass-input w-full" />
              </div>
            </div>
            <div className="p-6 bg-white/5 flex justify-end gap-3">
              <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-sm font-bold text-[#94a3b8] hover:text-white transition-colors">Cancel</button>
              <button className="glass-button-primary">Publish Notice</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
