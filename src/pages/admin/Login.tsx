import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ShieldCheck, Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 1. Get URL from Env and remove any accidental trailing slashes
    const rawUrl = import.meta.env.VITE_API_URL || "";
    const cleanUrl = rawUrl.replace(/\/$/, ""); 

    try {
      // 2. Perform the fetch request
      const res = await fetch(`${cleanUrl}/api/admin/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, password }),
      });

      // 3. Safety Check: Is the response actually JSON?
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server communication error (Non-JSON response).");
      }

      const data = await res.json();

      if (res.ok) {
        // 4. Success: Store token and user, then redirect
        login(data.token, data.user);
        navigate("/admin");
      } else {
        // 5. Auth Error (Wrong password/email)
        setError(data.error || "Invalid credentials");
      }
    } catch (err: any) {
      console.error("Login Error Details:", err);
      // Handle "Failed to fetch" (CORS/Network) vs other errors
      setError(err.message === "Failed to fetch" 
        ? "Network error: Connection to backend blocked or timed out." 
        : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md p-8 md:p-10 space-y-8 border-white/20 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#818cf8]/10 blur-[100px] rounded-full" />
        
        <div className="text-center relative">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#818cf8]/10 border border-[#818cf8]/20 mb-4 shadow-inner">
            <ShieldCheck className="w-8 h-8 text-[#818cf8]" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Admin Portal</h2>
          <p className="text-[#94a3b8] text-sm mt-2 font-medium uppercase tracking-[0.2em]">Secure Access Only</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <p className="text-sm text-red-200 font-medium leading-tight">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 relative">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-widest ml-1">
                Admin Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b] group-focus-within:text-[#818cf8] transition-colors" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="glass-input w-full pl-12 py-4"
                  placeholder="admin@shomiti.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-widest ml-1">
                Secret Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b] group-focus-within:text-[#818cf8] transition-colors" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="glass-input w-full pl-12 py-4"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="glass-button-primary w-full py-4 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span className="font-bold tracking-wide">Enter Dashboard</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
        
        <div className="text-center pt-2">
          <p className="text-[#64748b] text-[10px] uppercase tracking-tighter">
            System Identity: {window.location.hostname}
          </p>
        </div>
      </div>
    </div>
  );
}
