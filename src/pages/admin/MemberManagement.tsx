import { useState, useEffect } from "react";
import { Search, UserPlus, MoreVertical, Phone, Mail, MessageSquare, Edit, Trash2, Shield, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Member {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: "active" | "inactive";
  created_at: string;
}

export default function MemberManagement() {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  useEffect(() => {
    // Mock data for members
    setMembers([
      { id: "1", name: "Rahim Uddin", phone: "01712345678", email: "rahim@example.com", status: "active", created_at: "2024-01-15" },
      { id: "2", name: "Karim Ahmed", phone: "01812345678", email: "karim@example.com", status: "active", created_at: "2024-02-10" },
      { id: "3", name: "Fatima Begum", phone: "01912345678", email: "fatima@example.com", status: "inactive", created_at: "2023-11-20" },
      { id: "4", name: "Abul Kashem", phone: "01512345678", email: "kashem@example.com", status: "active", created_at: "2024-03-05" },
    ]);
  }, []);

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Member Management</h1>
          <p className="text-[#94a3b8] text-sm font-medium">Manage your 200-member community database.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="glass-button-primary flex items-center justify-center gap-2"
        >
          <UserPlus className="w-5 h-5" /> Add New Member
        </button>
      </header>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/10 bg-white/5">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
            <input 
              type="text" 
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="glass-input w-full pl-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[#94a3b8] text-[10px] font-bold uppercase tracking-widest">
                <th className="px-6 py-4">Member</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#818cf8]/20 text-[#818cf8] flex items-center justify-center font-bold">
                        {member.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-white">{member.name}</p>
                        <p className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-wider">ID: #{member.id.padStart(4, '0')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                        <Phone className="w-3 h-3" /> {member.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                        <Mail className="w-3 h-3" /> {member.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      member.status === 'active' 
                        ? 'bg-[#10b981]/20 text-[#10b981]' 
                        : 'bg-white/10 text-[#94a3b8]'
                    }`}>
                      {member.status === 'active' ? <Shield className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#94a3b8]">
                    {new Date(member.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-[#94a3b8] hover:text-[#818cf8] hover:bg-white/5 rounded-lg transition-all" title="Message">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-[#94a3b8] hover:text-[#818cf8] hover:bg-white/5 rounded-lg transition-all" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-[#94a3b8] hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Member Modal Placeholder */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative glass-card w-full max-w-lg overflow-hidden border-white/20"
            >
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">Add New Member</h2>
                <p className="text-sm text-[#94a3b8]">Fill in the details to register a new member.</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Full Name</label>
                    <input type="text" className="glass-input w-full" placeholder="Rahim Uddin" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Phone Number</label>
                    <input type="tel" className="glass-input w-full" placeholder="017XXXXXXXX" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Email Address</label>
                  <input type="email" className="glass-input w-full" placeholder="rahim@example.com" />
                </div>
              </div>
              <div className="p-6 bg-white/5 flex justify-end gap-3">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-bold text-[#94a3b8] hover:text-white transition-colors">Cancel</button>
                <button className="glass-button-primary">Save Member</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
