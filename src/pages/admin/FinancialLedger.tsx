import { useState, useEffect } from "react";
import { Search, Filter, Download, FileText, CheckCircle2, XCircle, Clock, Send } from "lucide-react";
import { motion } from "motion/react";

interface LedgerEntry {
  id: string;
  memberName: string;
  month: string;
  year: number;
  amount: number;
  status: "paid" | "unpaid" | "pending";
  paidAt?: string;
}

export default function FinancialLedger() {
  const [entries, setEntries] = useState<LedgerEntry[]>([]);
  const [selectedMonth, setSelectedMonth] = useState("April");
  const [selectedYear, setSelectedYear] = useState(2026);

  useEffect(() => {
    // Mock data for ledger
    setEntries([
      { id: "1", memberName: "Rahim Uddin", month: "April", year: 2026, amount: 500, status: "paid", paidAt: "2026-04-05" },
      { id: "2", memberName: "Karim Ahmed", month: "April", year: 2026, amount: 500, status: "unpaid" },
      { id: "3", memberName: "Fatima Begum", month: "April", year: 2026, amount: 500, status: "paid", paidAt: "2026-04-10" },
      { id: "4", memberName: "Abul Kashem", month: "April", year: 2026, amount: 500, status: "pending" },
    ]);
  }, []);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Financial Ledger</h1>
          <p className="text-[#94a3b8] text-sm font-medium">Track and manage monthly contributions for {selectedMonth} {selectedYear}.</p>
        </div>
        <div className="flex gap-3">
          <button className="glass-button-secondary text-sm flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Excel
          </button>
          <button className="glass-button-primary text-sm flex items-center gap-2">
            <Send className="w-4 h-4" /> Broadcast Reminders
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 border-l-4 border-l-[#818cf8]">
          <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest mb-1">Total Expected</p>
          <h3 className="text-2xl font-bold text-white">92,000 BDT</h3>
        </div>
        <div className="glass-card p-6 border-l-4 border-l-[#10b981]">
          <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest mb-1">Total Collected</p>
          <h3 className="text-2xl font-bold text-white">68,500 BDT</h3>
        </div>
        <div className="glass-card p-6 border-l-4 border-l-red-400">
          <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest mb-1">Outstanding</p>
          <h3 className="text-2xl font-bold text-white">23,500 BDT</h3>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/10 bg-white/5 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#94a3b8]" />
            <select 
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              className="glass-input text-sm py-1"
            >
              {months.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select 
              value={selectedYear}
              onChange={e => setSelectedYear(Number(e.target.value))}
              className="glass-input text-sm py-1"
            >
              {[2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div className="h-6 w-px bg-white/10 hidden md:block" />
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
            <input 
              type="text" 
              placeholder="Filter by member..."
              className="glass-input w-full pl-9 py-1 text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[#94a3b8] text-[10px] font-bold uppercase tracking-widest">
                <th className="px-6 py-4">Member Name</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Payment Date</th>
                <th className="px-6 py-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 font-bold text-white">{entry.memberName}</td>
                  <td className="px-6 py-4 text-sm font-mono text-[#94a3b8]">{entry.amount.toLocaleString()} BDT</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      entry.status === 'paid' ? 'bg-[#10b981]/20 text-[#10b981]' :
                      entry.status === 'unpaid' ? 'bg-red-400/10 text-red-400' :
                      'bg-amber-400/10 text-amber-400'
                    }`}>
                      {entry.status === 'paid' ? <CheckCircle2 className="w-3 h-3" /> : 
                       entry.status === 'unpaid' ? <XCircle className="w-3 h-3" /> : 
                       <Clock className="w-3 h-3" />}
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#94a3b8]">
                    {entry.paidAt ? new Date(entry.paidAt).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {entry.status === 'paid' ? (
                      <button className="glass-button-secondary text-[10px] py-1 px-3 flex items-center gap-1.5 ml-auto">
                        <FileText className="w-3.5 h-3.5" /> Receipt
                      </button>
                    ) : (
                      <button className="text-[10px] font-bold text-[#94a3b8] opacity-50 cursor-not-allowed uppercase tracking-widest">N/A</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
