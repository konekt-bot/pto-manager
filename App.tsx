import React, { useState } from 'react';
import { PersistenceManager } from './PersistenceManager';
import Dashboard from './components/Dashboard';
import ManagerPortal from './components/ManagerPortal';
import TeamsToday from './components/TeamsToday';
import FaqSection from './components/FaqSection';
import DeploymentSection from './components/DeploymentSection';
import { User } from './types';

const App: React.FC = () => {
  // Use root PersistenceManager
  const [user, setUser] = useState<User>(PersistenceManager.getUser());
  const [activeTab, setActiveTab] = useState<'dashboard' | 'manager' | 'today' | 'info'>('dashboard');

  const switchRole = () => {
    const newRole = user.role === 'Employee' ? 'Manager' : 'Employee';
    const newUser = { ...user, role: newRole as any };
    setUser(newUser);
    PersistenceManager.setUser(newUser);
  };

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-hidden h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 flex flex-col hidden md:flex shrink-0">
        <div className="p-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">
              P
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white block leading-none">PTO Pro</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1 block">V1.2 Stable</span>
            </div>
          </div>
        </div>
        
        <nav className="flex-grow py-8 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center px-4 py-3.5 text-sm font-semibold rounded-xl transition-all ${
              activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            My Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('manager')}
            className={`w-full flex items-center px-4 py-3.5 text-sm font-semibold rounded-xl transition-all ${
              activeTab === 'manager' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Manager Portal
          </button>
          <button 
            onClick={() => setActiveTab('today')}
            className={`w-full flex items-center px-4 py-3.5 text-sm font-semibold rounded-xl transition-all ${
              activeTab === 'today' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Teams: Who's Off?
          </button>
          <div className="pt-4 border-t border-slate-800 mt-4">
             <button 
              onClick={() => setActiveTab('info')}
              className={`w-full flex items-center px-4 py-3.5 text-sm font-semibold rounded-xl transition-all ${
                activeTab === 'info' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Project Info
            </button>
          </div>
        </nav>

        <div className="p-6 mt-auto border-t border-slate-800">
          <div className="bg-slate-800/40 rounded-2xl p-5 mb-6 border border-slate-700/50">
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-wider">Active Workspace</div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                {user.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <div className="text-sm font-bold text-white truncate">{user.name}</div>
                <div className="text-[10px] text-indigo-400 font-bold uppercase mt-0.5">{user.role} Context</div>
              </div>
            </div>
          </div>
          <button 
            onClick={switchRole}
            className="w-full text-xs font-bold text-slate-500 hover:text-indigo-400 transition-colors flex items-center justify-center gap-2 py-2 group"
          >
            <svg className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Switch to {user.role === 'Employee' ? 'Manager' : 'Employee'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col bg-slate-50 overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 shrink-0">
           <div className="font-bold text-indigo-600 md:hidden flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">P</div>
             PTO PRO
           </div>
           <div className="hidden md:block">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                {activeTab === 'dashboard' ? 'Personal Portfolio' : activeTab === 'manager' ? 'Organization Management' : activeTab === 'today' ? 'Global Attendance' : 'System Knowledge Base'}
              </h2>
           </div>
           <div className="flex items-center gap-6">
              <div className="h-10 w-[1px] bg-slate-200 hidden md:block"></div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1.5">Root Storage</span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-600 font-bold">Persistence Manager Active</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                </div>
              </div>
           </div>
        </header>

        <div className="flex-grow overflow-y-auto p-10">
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-700">
            {activeTab === 'dashboard' && <Dashboard user={user} />}
            {activeTab === 'manager' && <ManagerPortal />}
            {activeTab === 'today' && <TeamsToday />}
            {activeTab === 'info' && (
              <div className="space-y-10">
                <FaqSection />
                <DeploymentSection />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;