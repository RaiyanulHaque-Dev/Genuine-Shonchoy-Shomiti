/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from "./pages/public/Home";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import MemberManagement from "./pages/admin/MemberManagement";
import FinancialLedger from "./pages/admin/FinancialLedger";
import NoticeManager from "./pages/admin/NoticeManager";
import AdviceModeration from "./pages/admin/AdviceModeration";
import Navbar from "./components/layout/Navbar";
import { AuthProvider, useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user) return <Navigate to="/admin/login" />;
  
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col md:flex-row">
          <Navbar />
          <main className="flex-1 p-6 md:p-10 overflow-y-auto">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/members" 
                element={
                  <ProtectedRoute>
                    <MemberManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/ledger" 
                element={
                  <ProtectedRoute>
                    <FinancialLedger />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/notices" 
                element={
                  <ProtectedRoute>
                    <NoticeManager />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/advice" 
                element={
                  <ProtectedRoute>
                    <AdviceModeration />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}
