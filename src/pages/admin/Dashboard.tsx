import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Users, BookOpen, Bell, MessageSquare, TrendingUp, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [summary, setSummary] = useState({
    totalMembers: 0,
    activeNotices: 0,
    pendingAdvice: 0,
    unpaidThisMonth: 0,
  });

  useEffect(() => {
    // Mock data for dashboard summary
    setSummary({
      totalMembers: 184,
      activeNotices: 3,
      pendingAdvice: 12,
      unpaidThisMonth: 45,
    });
  }, []);

  const stats = [
    { label: "Total Members", value: summary.totalMembers, icon: Users, color: "text-blue-600", bg: "bg-blue-50", link: "/admin/members" },
    { label: "Unpaid (This Month)", value: summary.unpaidThisMonth, icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50", link: "/admin/ledger" },
    { label: "Pending Advice", value: summary.pendingAdvice, icon: MessageSquare, color: "text-indigo-600", bg: "bg-indigo-50", link: "/admin/advice" },
    { label: "Active Notices", value: summary.activeNotices, icon: Bell, color: "text-emerald-600", bg: "bg-emerald-50", link: "/admin/notices" },
  ];

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Command Center</h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="bg-[#818cf8] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Super Admin</span>
            <p className="text-[#94a3b8] text-sm font-medium">Welcome back, Admin.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="glass-button-secondary text-sm">Export Report</button>
          <button className="glass-button-primary text-sm">Broadcast Message</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link to={stat.link} className="block glass-card p-6 hover:bg-white/10 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl transition-transform group-hover:scale-110 bg-white/5 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <TrendingUp className="w-4 h-4 text-white/20" />
              </div>
              <div className="space-y-1">
                <p className="text-[#94a3b8] text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 glass-card overflow-hidden">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#818cf8]" /> Recent Audit Logs
            </h2>
            <Link to="/admin/audit" className="text-[10px] font-bold text-[#818cf8] hover:underline uppercase tracking-widest">View All</Link>
          </div>
          <div className="divide-y divide-white/5">
            {[
              { user: "Super Admin", action: "Updated Member Status", target: "Rahim Uddin", time: "2 mins ago" },
              { user: "Admin", action: "Created New Notice", target: "Monthly Meeting", time: "15 mins ago" },
              { user: "Super Admin", action: "Approved Advice", target: "Community Garden", time: "1 hour ago" },
              { user: "Admin", action: "Generated Receipt", target: "Invoice #8273", time: "3 hours ago" },
            ].map((log, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#94a3b8] font-bold text-[10px]">
                    {log.user[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{log.action}</p>
                    <p className="text-[10px] text-[#94a3b8] uppercase tracking-wider">Target: {log.target}</p>
                  </div>
                </div>
                <span className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-widest opacity-50">{log.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions / Status */}
        <div className="space-y-6">
          <div className="glass-card p-6 border-[#818cf8]/20 bg-[#818cf8]/5">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#818cf8]" /> System Health
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#94a3b8]">Database (Supabase)</span>
                <span className="bg-[#10b981]/20 text-[#10b981] px-2 py-0.5 rounded text-[10px] font-bold">ONLINE</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#94a3b8]">SMS API (sms.net.bd)</span>
                <span className="bg-[#10b981]/20 text-[#10b981] px-2 py-0.5 rounded text-[10px] font-bold">CONNECTED</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#94a3b8]">Email API (Brevo)</span>
                <span className="bg-[#10b981]/20 text-[#10b981] px-2 py-0.5 rounded text-[10px] font-bold">CONNECTED</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#94a3b8]">Storage (R2)</span>
                <span className="bg-[#10b981]/20 text-[#10b981] px-2 py-0.5 rounded text-[10px] font-bold">ACTIVE</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-4 rounded-xl border border-white/5 hover:border-[#818cf8]/50 hover:bg-white/5 transition-all group">
                <p className="text-sm font-bold text-white group-hover:text-[#818cf8]">Broadcast SMS to All</p>
                <p className="text-[10px] text-[#94a3b8] uppercase tracking-wider mt-1">Send SMS to all members</p>
              </button>
              <button className="w-full text-left p-4 rounded-xl border border-white/5 hover:border-[#818cf8]/50 hover:bg-white/5 transition-all group">
                <p className="text-sm font-bold text-white group-hover:text-[#818cf8]">Post New Notice</p>
                <p className="text-[10px] text-[#94a3b8] uppercase tracking-wider mt-1">Create a public announcement</p>
              </button>
              <button className="w-full text-left p-4 rounded-xl border border-white/5 hover:border-[#818cf8]/50 hover:bg-white/5 transition-all group">
                <p className="text-sm font-bold text-white group-hover:text-[#818cf8]">Export Monthly Ledger</p>
                <p className="text-[10px] text-[#94a3b8] uppercase tracking-wider mt-1">Download financial data</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
