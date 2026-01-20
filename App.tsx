import React, { useState, useEffect } from 'react';
import { PersistenceManager } from './PersistenceManager';
import { DashboardView, ManagerPortalView, TeamsTodayView } from './Components/ApplicationViews';
import FaqSection from './Components/FaqSection';
import DeploymentSection from './Components/DeploymentSection';
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
            </svg>
            Teams: Who&apos;s Off?
          </button>
          <div className="pt-4 border-t border-slate-100 mt-4">
             <button 
              onClick={() => setActiveTab('info')}
              className={`w-full flex items-center px-4 py-3.5 text-sm font-bold rounded-xl nav-transition ${
                activeTab === 'info' ? 'bg-[#003366] text-white shadow-lg shadow-[#003366]/20' : 'text-slate-500 hover:text-[#003366] hover:bg-slate-50'
              }`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Project Info
            </button>
          </div>
        </nav>

        <div className="p-6 mt-auto border-t border-slate-100">
          <div className="bg-slate-50 rounded-2xl p-5 mb-6 border border-slate-200">
            <div className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Active Identity</div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#003366] flex items-center justify-center text-xs font-black text-white shadow-sm ring-2 ring-white uppercase">
                {user.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <div className="text-sm font-black text-[#003366] truncate">{user.name}</div>
                <div className="text-[10px] text-[#005DAA] font-black uppercase mt-0.5 tracking-tighter">{user.role} Authorization</div>
              </div>
            </div>
          </div>
          <button 
            onClick={switchRole}
            className="w-full text-[10px] font-black text-slate-400 hover:text-[#003366] transition-colors flex items-center justify-center gap-2 py-2 group uppercase tracking-widest"
          >
            <svg className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Switch Access Level
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col bg-slate-50 overflow-hidden relative">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 shrink-0 z-10">
           <div className="font-black text-[#003366] md:hidden flex items-center gap-2 tracking-tighter text-2xl">
             FLCC
           </div>
           <div className="hidden md:block">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
                {activeTab === 'dashboard' ? 'Personal Portfolio' : activeTab === 'manager' ? 'Organization Management' : activeTab === 'today' ? 'Global Team Attendance' : 'System Knowledge Base'}
              </h2>
           </div>
           <div className="flex items-center gap-6">
              <div className="h-10 w-[1px] bg-slate-200 hidden md:block"></div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1.5 text-nowrap">Persistence Integrity</span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#003366] font-black uppercase tracking-tight text-nowrap">Active Florida Cloud</span>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)] animate-pulse"></div>
                </div>
              </div>
           </div>
        </header>

        <div className="flex-grow overflow-y-auto p-10">
          <div className="max-w-6xl mx-auto">
            {isFirstLaunch && (
              <div className="mb-8 p-6 bg-[#005DAA] rounded-[32px] text-white flex items-center justify-between shadow-xl shadow-[#005DAA]/20 border border-white/10 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white backdrop-blur-md">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-black italic">Successfully Deployed!</h3>
                    <p className="text-xs font-bold text-white/80">To populate the system, navigate to <span className="underline cursor-pointer font-black" onClick={() => setActiveTab('info')}>Project Info</span> and click &quot;Seed Test Data&quot;.</p>
                  </div>
                </div>
                <button onClick={() => setIsFirstLaunch(false)} className="text-white/40 hover:text-white transition-colors">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12"/>
                   </svg>
                </button>
              </div>
            )}

            {activeTab === 'dashboard' && <DashboardView user={user} />}
            {activeTab === 'manager' && <ManagerPortalView />}
            {activeTab === 'today' && <TeamsTodayView />}
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
