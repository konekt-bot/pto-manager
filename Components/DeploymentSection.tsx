import React, { useState } from 'react';
import { PersistenceManager } from '../PersistenceManager';
import { PTORequest } from '../types';

const DeploymentSection: React.FC = () => {
  const [isSeeded, setIsSeeded] = useState(false);

  const seedTestData = () => {
    const sampleRequests: PTORequest[] = [
      {
        id: 'test-1',
        userId: 'u1',
        userName: 'Alex Rivera',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        type: 'Full Day',
        hours: 16,
        status: 'Pending',
        reason: 'Testing the new FLCC PTO System integration.',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'test-2',
        userId: 'u1',
        userName: 'Alex Rivera',
        startDate: new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0],
        endDate: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0],
        type: 'Medical',
        hours: 16,
        status: 'Approved',
        reason: 'Routine checkup and recovery.',
        createdAt: new Date().toISOString(),
      }
    ];

    // Get current requests to avoid duplicates if possible, or just push these
    const current = PersistenceManager.getRequests();
    const filtered = current.filter(r => !r.id.startsWith('test-'));
    localStorage.setItem('pto_requests', JSON.stringify([...sampleRequests, ...filtered]));
    
    setIsSeeded(true);
    setTimeout(() => {
      window.location.reload(); // Refresh to show new data
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Success Banner */}
      <div className="bg-emerald-600 rounded-[40px] text-white p-8 shadow-xl shadow-emerald-600/20 flex items-center justify-between border-4 border-white/20">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center text-white backdrop-blur-md">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-black">App Deployed!</h2>
            <p className="text-emerald-100 font-bold">You are now live on the Florida Cloud.</p>
          </div>
        </div>
        <button 
          onClick={seedTestData}
          disabled={isSeeded}
          className={`px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center gap-2 ${
            isSeeded ? 'bg-white/10 text-white/50 cursor-not-allowed' : 'bg-white text-emerald-600 hover:scale-105 active:scale-95 shadow-lg'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {isSeeded ? 'Data Ready' : 'Seed Test Data'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Testing Protocol Card */}
        <div className="bg-white rounded-[40px] border-2 border-slate-100 p-10 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-[#003366] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#003366]/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">How to Test Your App</h2>
              <p className="text-[#005DAA] font-bold text-xs uppercase tracking-widest mt-1">Verification Steps</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[#003366] font-black text-xs shrink-0 mt-1">1</div>
              <div>
                <p className="font-bold text-slate-800">Submit or Seed Data</p>
                <p className="text-sm text-slate-500">Either use the green button above to auto-fill, or manually go to "My Dashboard" and request time off.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[#003366] font-black text-xs shrink-0 mt-1">2</div>
              <div>
                <p className="font-bold text-slate-800">Switch Roles</p>
                <p className="text-sm text-slate-500">Click the "Swap to Manager" button at the bottom of the sidebar to become Eleanor Vance.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[#003366] font-black text-xs shrink-0 mt-1">3</div>
              <div>
                <p className="font-bold text-slate-800">Approve & Generate AI</p>
                <p className="text-sm text-slate-500">Go to "Manager Portal". Approve any pending requests, then click "Generate AI Outlook" to test your Gemini connection.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Teams Integration Card */}
        <div className="bg-[#6264A7] rounded-[40px] p-10 shadow-xl shadow-[#6264A7]/20 text-white">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white border border-white/20">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm1 14v-2h-2v2h2zm0-4V7h-2v5h2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-black">Install in Teams</h2>
              <p className="text-indigo-100 font-bold text-xs uppercase tracking-widest mt-1">The Final Step</p>
            </div>
          </div>
          <p className="text-indigo-50 text-sm font-medium leading-relaxed mb-6">
            Everything looks good! Copy your current browser URL, go to your FLCC Teams Channel, click the <strong>(+) icon</strong>, select <strong>"Website"</strong>, and paste your link.
          </p>
          <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-xs font-bold italic">
            "Precision in construction, clarity in communication." - FLCC Standard
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentSection;