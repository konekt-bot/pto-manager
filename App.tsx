
import React, { useState, useEffect } from 'react';
import { PersistenceManager } from './PersistenceManager';
// Fix: Use correct PascalCase for Views import to match file naming convention
import { DashboardView, ManagerPortalView, TeamsTodayView } from './components/Views';
import FaqSection from './components/FaqSection';
import DeploymentSection from './components/DeploymentSection';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User>(PersistenceManager.getUser());
  const [activeTab, setActiveTab] = useState<'dashboard' | 'manager' | 'today' | 'info'>('dashboard');
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  useEffect(() => {
    const reqs = PersistenceManager.getRequests();
    if (reqs.length <= 1) {
      setIsFirstLaunch(true);
    }
  }, []);

  const switchRole = () => {
    const newRole = user.role === 'Employee' ? 'Manager' : 'Employee';
    const newUser = { ...user, role: newRole as any };
    setUser(newUser);
    PersistenceManager.setUser(newUser);
  };

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-hidden h-screen font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-72 bg-white flex flex-col hidden md:flex shrink-0 border-r border-slate-200 shadow-sm z-20">
        <div className="p-8 border-b border-slate-100">
          <div className="flex flex-col gap-0">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black tracking-tighter text-[#003366] leading-none">FLCC</span>
              <div className="h-1.5 w-1.5 rounded-full bg-[#005DAA]"></div>
            </div>
            <div className="mt-1">
              <span className="text-[9px] text-[#005DAA] font-bold uppercase tracking-[0.2em] block leading-none text-nowrap">Construction Connection</span>
            </div>
          </div>
        </div>
        
        <nav className="flex-grow py-8 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center px-4 py-3.5 text-sm font-bold rounded-xl nav-transition ${
              activeTab === 'dashboard' ? 'bg-[#003366] text-white shadow-lg shadow-[#003366]/20' : 'text-slate-500 hover:text-[#003366] hover:bg-slate-50'
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            My Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('manager')}
            className={`w-full flex items-center px-4 py-3.5 text-sm font-bold rounded-xl nav-transition ${
              activeTab === 'manager' ? 'bg-[#003366] text-white shadow-lg shadow-[#003366]/20' : 'text-slate-500 hover:text-[#003366] hover:bg-slate-50'
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Manager Portal
          </button>
          <button 
            onClick={() => setActiveTab('today')}
            className={`w-full flex items-center px-4 py-3.5 text-sm font-bold rounded-xl nav-transition ${
              activeTab === 'today' ? 'bg-[#003366] text-white shadow-lg shadow-[#003366]/20' : 'text-slate-500 hover:text-[#003366] hover:bg-slate-50'
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />