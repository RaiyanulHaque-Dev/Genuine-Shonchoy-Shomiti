import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Bell, MessageSquare, Send, CheckCircle2, TrendingUp, Users } from "lucide-react";

export default function Home() {
  const [stats, setStats] = useState({ monthlyFundsCollectedPercent: 0, membersPaidPercent: 0 });
  const [notices, setNotices] = useState<any[]>([]);
  const [advice, setAdvice] = useState({ memberName: "", content: "" });
  const [report, setReport] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState({ advice: false, report: false });

  useEffect(() => {
    fetch("/api/public/stats").then(res => res.json()).then(setStats);
    fetch("/api/public/notices").then(res => res.json()).then(setNotices);
  }, []);

  const handleAdviceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/public/advice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(advice),
    });
    setSubmitted({ ...submitted, advice: true });
    setAdvice({ memberName: "", content: "" });
  };

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/public/report-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(report),
    });
    setSubmitted({ ...submitted, report: true });
    setReport({ name: "", phone: "", message: "" });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Hero / Stats Section */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Public Portal
          </h1>
          <p className="text-lg text-[#94a3b8]">Real-time collection status for the current month.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider">Monthly Funds Collection</span>
              <TrendingUp className="w-5 h-5 text-[#818cf8]" />
            </div>
            <div className="text-3xl font-bold text-white">{stats.monthlyFundsCollectedPercent}%</div>
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-white/10">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.monthlyFundsCollectedPercent}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#818cf8] rounded-full"
                ></motion.div>
              </div>
            </div>
            <div className="text-[10px] text-[#94a3b8] uppercase tracking-wider">+12% from last month</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider">Active Participation</span>
              <Users className="w-5 h-5 text-[#10b981]" />
            </div>
            <div className="text-3xl font-bold text-white">{Math.round(stats.membersPaidPercent * 2)} / 200</div>
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-white/10">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.membersPaidPercent}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#10b981] rounded-full"
                ></motion.div>
              </div>
            </div>
            <div className="text-[10px] text-[#94a3b8] uppercase tracking-wider">Members who paid this month</div>
          </motion.div>
        </div>
      </section>

      {/* Notice Board */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          <Bell className="w-5 h-5 text-[#818cf8]" />
          <h2 className="text-xl font-bold text-white">Notice Board</h2>
        </div>
        <div className="grid gap-4">
          {notices.length > 0 ? notices.map((notice) => (
            <div key={notice.id} className="glass-card p-6">
              <h3 className="font-bold text-white">{notice.title}</h3>
              <p className="text-[#94a3b8] mt-2 text-sm">{notice.content}</p>
              <div className="mt-4 text-[10px] text-[#94a3b8] uppercase tracking-widest font-bold opacity-50">
                Posted on {new Date(notice.created_at).toLocaleDateString()}
              </div>
            </div>
          )) : (
            <div className="text-center py-8 text-[#94a3b8] italic">No active notices at the moment.</div>
          )}
        </div>
      </section>

      {/* Forms Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Advice Wall */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2">
            <MessageSquare className="w-5 h-5 text-[#818cf8]" />
            <h2 className="text-xl font-bold text-white">Community Advice</h2>
          </div>
          {submitted.advice ? (
            <div className="glass-card p-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#10b981] mx-auto" />
              <p className="font-bold text-white">Thank you!</p>
              <p className="text-[#94a3b8] text-sm">Your advice has been submitted for moderation.</p>
              <button onClick={() => setSubmitted({ ...submitted, advice: false })} className="text-[#818cf8] text-sm font-bold underline">Submit another</button>
            </div>
          ) : (
            <form onSubmit={handleAdviceSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#94a3b8] uppercase mb-1">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={advice.memberName}
                  onChange={e => setAdvice({ ...advice, memberName: e.target.value })}
                  className="glass-input w-full"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#94a3b8] uppercase mb-1">Your Advice</label>
                <textarea 
                  required
                  value={advice.content}
                  onChange={e => setAdvice({ ...advice, content: e.target.value })}
                  className="glass-input w-full h-32 resize-none"
                  placeholder="Share your thoughts with the community..."
                />
              </div>
              <button type="submit" className="glass-button-primary w-full flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Submit Advice
              </button>
            </form>
          )}
        </section>

        {/* Payment Report */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2">
            <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
            <h2 className="text-xl font-bold text-white">Report Payment</h2>
          </div>
          {submitted.report ? (
            <div className="glass-card p-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#10b981] mx-auto" />
              <p className="font-bold text-white">Report Received</p>
              <p className="text-[#94a3b8] text-sm">Admins will verify your payment shortly.</p>
              <button onClick={() => setSubmitted({ ...submitted, report: false })} className="text-[#10b981] text-sm font-bold underline">Submit another</button>
            </div>
          ) : (
            <form onSubmit={handleReportSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#94a3b8] uppercase mb-1">Name</label>
                  <input 
                    type="text" 
                    required
                    value={report.name}
                    onChange={e => setReport({ ...report, name: e.target.value })}
                    className="glass-input w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#94a3b8] uppercase mb-1">Phone</label>
                  <input 
                    type="tel" 
                    required
                    value={report.phone}
                    onChange={e => setReport({ ...report, phone: e.target.value })}
                    className="glass-input w-full"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#94a3b8] uppercase mb-1">Payment Details</label>
                <textarea 
                  required
                  value={report.message}
                  onChange={e => setReport({ ...report, message: e.target.value })}
                  className="glass-input w-full h-32 resize-none"
                  placeholder="Amount, Date, Transaction ID..."
                />
              </div>
              <button type="submit" className="glass-button-primary w-full flex items-center justify-center gap-2 !bg-[#10b981] !shadow-[#10b981]/20">
                <CheckCircle2 className="w-4 h-4" /> Notify Admin
              </button>
            </form>
          )}
        </section>
      </div>

      <footer className="pt-12 border-t border-white/10 text-center text-[#94a3b8] text-xs font-bold uppercase tracking-widest opacity-50">
        &copy; 2026 Shomiti Management System. Privacy-First Portal.
      </footer>
    </div>
  );
}
