import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LayoutDashboard, Users, BookOpen, Bell, MessageSquare, LogOut, ShieldCheck, Home as HomeIcon } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  const navItems = [
    { path: "/", label: "Public Portal", icon: HomeIcon, public: true },
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard, admin: true },
    { path: "/admin/members", label: "Members", icon: Users, admin: true },
    { path: "/admin/ledger", label: "Ledger", icon: BookOpen, admin: true },
    { path: "/admin/notices", label: "Notices", icon: Bell, admin: true },
    { path: "/admin/advice", label: "Advice", icon: MessageSquare, admin: true },
  ];

  const filteredItems = navItems.filter(item => {
    if (isAdminPath) return item.admin;
    return item.public;
  });

  return (
    <aside className="w-full md:w-64 glass-sidebar h-auto md:h-screen flex flex-col p-6 sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 font-extrabold text-2xl text-[#818cf8] mb-10">
        <ShieldCheck className="w-8 h-8" />
        <span>SHOMITI.</span>
      </Link>

      <nav className="flex-1">
        <ul className="space-y-2">
          {filteredItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`glass-nav-item ${location.pathname === item.path ? "glass-nav-item-active" : "glass-nav-item-inactive"}`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
          {!user && isAdminPath && (
            <li>
              <Link 
                to="/admin/login" 
                className={`glass-nav-item ${location.pathname === "/admin/login" ? "glass-nav-item-active" : "glass-nav-item-inactive"}`}
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Admin Login</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {user && (
        <div className="mt-auto pt-6 border-t border-white/10 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-[#818cf8]/20 flex items-center justify-center text-[#818cf8] font-bold">
              {user.email[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{user.email.split('@')[0]}</p>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#818cf8] text-white px-1.5 py-0.5 rounded">
                {user.role}
              </span>
            </div>
            <button 
              onClick={logout}
              className="p-2 text-[#94a3b8] hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
          <div className="text-[10px] text-[#94a3b8] opacity-50 px-2">
            System v4.2.1-stable<br />
            Secure Node: S-DHAKA-01
          </div>
        </div>
      )}
    </aside>
  );
}
