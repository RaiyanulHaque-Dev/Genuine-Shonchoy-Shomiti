import { useState, useEffect } from "react";
import { MessageSquare, CheckCircle2, XCircle, Clock, User, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Advice {
  id: string;
  member_name: string;
  content: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export default function AdviceModeration() {
  const [adviceList, setAdviceList] = useState<Advice[]>([]);
  const [filter, setFilter] = useState<"pending" | "approved" | "rejected">("pending");

  useEffect(() => {
    // Mock data for advice
    setAdviceList([
      { id: "1", member_name: "John Doe", content: "We should consider planting more trees in the community area.", status: "pending", created_at: "2026-04-15T10:00:00Z" },
      { id: "2", member_name: "Jane Smith", content: "The monthly meeting time should be moved to 6 PM for better attendance.", status: "pending", created_at: "2026-04-14T14:30:00Z" },
      { id: "3", member_name: "Rahim Ahmed", status: "approved", content: "Great work on the new portal!", created_at: "2026-04-10T09:00:00Z" },
    ]);
  }, []);

  const filteredAdvice = adviceList.filter(a => a.status === filter);

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Advice Moderation</h1>
          <p className="text-[#94a3b8] text-sm font-medium">Approve or reject community submissions before they go public.</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          {(["pending", "approved", "rejected"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                filter === s 
                  ? 'bg-[#818cf8] text-white shadow-lg shadow-[#818cf8]/20' 
                  : 'text-[#94a3b8] hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </header>

      <div className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {filteredAdvice.length > 0 ? filteredAdvice.map((advice) => (
            <motion.div
              key={advice.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#818cf8]/20 flex items-center justify-center text-[#818cf8] font-bold">
                    {advice.member_name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-white">{advice.member_name}</p>
                    <p className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-widest opacity-50 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {new Date(advice.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                {advice.status === 'pending' && (
                  <div className="flex gap-2">
                    <button className="glass-button-primary !bg-[#10b981] !shadow-[#10b981]/20 flex items-center gap-2 text-[10px]">
                      <CheckCircle2 className="w-4 h-4" /> Approve
                    </button>
                    <button className="glass-button-secondary !text-red-400 hover:!bg-red-400/10 flex items-center gap-2 text-[10px]">
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                  </div>
                )}
                {advice.status === 'approved' && (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10b981]/20 text-[#10b981] text-[10px] font-bold uppercase tracking-widest">
                    <ShieldCheck className="w-3.5 h-3.5" /> PUBLISHED
                  </span>
                )}
              </div>
              <div className="bg-white/5 p-4 rounded-xl italic text-[#94a3b8] text-sm border-l-4 border-[#818cf8]">
                "{advice.content}"
              </div>
            </motion.div>
          )) : (
            <div className="glass-card p-12 text-center space-y-3">
              <MessageSquare className="w-12 h-12 text-[#94a3b8] mx-auto opacity-20" />
              <p className="text-[#94a3b8] font-medium italic">No {filter} advice found.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
