
import React, { useState, useEffect } from 'react';
import { PersistenceManager } from '../PersistenceManager';
import { IntelligenceCore } from '../IntelligenceCore';
import { User, PTORequest, PTOBalance, RequestType, ModelType } from '../types';
import Calendar from './Calendar';

// --- DASHBOARD VIEW ---
export const DashboardView: React.FC<{ user: User }> = ({ user }) => {
  const [requests, setRequests] = useState<PTORequest[]>([]);
  const [balance, setBalance] = useState<PTOBalance | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    type: 'Full Day' as RequestType,
    reason: ''
  });

  const refreshData = () => {
    const reqs = PersistenceManager.getRequests();
    setRequests(reqs.filter(r => r.userId === user.id));
    setBalance(PersistenceManager.calculateBalances(user, reqs));
  };

  useEffect(() => {
    refreshData();
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.startDate || !formData.endDate) return;

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const hours = formData.type === 'Half Day' ? (days * 4) : (days * 8);

    const newReq: PTORequest = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      userName: user.name,
      startDate: formData.startDate,
      endDate: formData.endDate,
      type: formData.type,
      hours: hours,
      status: 'Pending',
      reason: formData.reason,
      createdAt: new Date().toISOString(),
    };

    PersistenceManager.saveRequest(newReq);
    setIsModalOpen(false);
    refreshData();
    setFormData({ startDate: '', endDate: '', type: 'Full Day', reason: '' });
  };

  if (!balance) return null;

  return (
    <div className="space-y-10 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight text-nowrap">Howdy, {user.name.split(' ')[0]} 👋</h1>
          <p className="text-slate-500 mt-1 font-medium">Your personal time-off summary and recent activity.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#005DAA] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#003366] transition-all shadow-lg shadow-[#005DAA]/30 flex items-center gap-2 shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Request Time Off
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Accrued</p>
          <p className="text-4xl font-black text-slate-900 mt-2">{balance.accrued.toFixed(1)} <span className="text-lg font-bold text-slate-400">hrs</span></p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hours Used</p>
          <p className="text-4xl font-black text-[#005DAA] mt-2">{balance.used.toFixed(1)} <span className="text-lg font-bold text-slate-400">hrs</span></p>
        </div>
        <div className="bg-[#003366] p-8 rounded-3xl shadow-xl shadow-[#003366]/20 relative overflow-hidden group text-white">
          <p className="text-xs font-bold text-blue-200 uppercase tracking-widest">Available Balance</p>
          <p className="text-4xl font-black text-white mt-2">{balance.available.toFixed(1)} <span className="text-lg font-bold text-blue-300">hrs</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-slate-100 flex justify-between items-center">
               <h3 className="font-bold text-slate-800">My Recent Requests</h3>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                   <tr>
                     <th className="px-6 py-4">Dates</th>
                     <th className="px-6 py-4">Type</th>
                     <th className="px-6 py-4">Hours</th>
                     <th className="px-6 py-4">Status</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {requests.length === 0 ? (
                     <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-400 text-sm italic font-medium">No requests found.</td></tr>
                   ) : requests.map(req => (
                     <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                       <td className="px-6 py-4">
                         <div className="text-sm font-bold text-slate-900">{req.startDate} to {req.endDate}</div>
                       </td>
                       <td className="px-6 py-4 text-sm font-medium text-slate-600">{req.type}</td>
                       <td className="px-6 py-4 text-sm font-bold text-slate-900">{req.hours}h</td>
                       <td className="px-6 py-4">
                         <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${
                           req.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' :
                           req.status === 'Denied' ? 'bg-rose-50 text-rose-600' :
                           'bg-amber-50 text-amber-600'
                         }`}>
                           {req.status}
                         </span>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        </div>
        <div>
          <Calendar requests={requests.filter(r => r.status === 'Approved')} title="My Absence Schedule" />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl p-8 border border-slate-100 animate-in zoom-in-95 duration-200">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900">Request Time Off</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
             </div>
             <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Start Date</label>
                    <input type="date" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">End Date</label>
                    <input type="date" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Type</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as RequestType})}>
                    <option value="Full Day">Full Day</option>
                    <option value="Half Day">Half Day</option>
                    <option value="Medical">Medical</option>
                    <option value="Personal">Personal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Reason (Optional)</label>
                  <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" rows={3} value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})} placeholder="e.g. Family vacation in Orlando"></textarea>
                </div>
                <button type="submit" className="w-full bg-[#005DAA] text-white py-4 rounded-2xl font-bold hover:bg-[#003366] transition-all shadow-xl shadow-[#005DAA]/20 active:scale-95">Submit Request</button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

// --- MANAGER PORTAL VIEW ---
export const ManagerPortalView: React.FC = () => {
  const [requests, setRequests] = useState<PTORequest[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const refresh = () => {
    setRequests(PersistenceManager.getRequests());
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleAction = (id: string, action: 'Approved' | 'Denied') => {
    PersistenceManager.updateRequestStatus(id, action);
    refresh();
  };

  const generateReport = async () => {
    setIsGenerating(true);
    setStatus("AI is processing attendance data...");
    
    const approved = requests.filter(r => r.status === 'Approved');
    const prompt = `Act as an HR assistant for Florida Cloud Construction (FLCC). Generate a brief professional weekly outlook for: ${JSON.stringify(approved)}. Keep it concise.`;

    try {
      const result = await IntelligenceCore.getInstance().askQuestion(prompt, ModelType.FLASH);
      PersistenceManager.setLastDigestSent(new Date().toLocaleString());
      setStatus("Report Generated: " + (result.length > 200 ? result.substring(0, 200) + "..." : result));
    } catch (err) {
      setStatus("Error: Gemini service could not be reached. Check API Key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const pending = requests.filter(r => r.status === 'Pending');

  return (
    <div className="space-y-12 pb-20">
      <div className="flex justify-between items-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Organization Review</h1>
          <p className="text-slate-500 font-medium">Manage organization-wide time off requests.</p>
        </div>
        <button 
          onClick={generateReport}
          disabled={isGenerating}
          className="bg-[#003366] text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50 shadow-lg shrink-0"
        >
          {isGenerating ? "Processing..." : "Generate AI Outlook"}
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 font-bold text-slate-800 flex items-center justify-between">
          <span>Pending Approvals</span>
          <span className="bg-[#005DAA]/10 text-[#005DAA] text-xs px-2.5 py-1 rounded-full font-black">{pending.length} Waiting</span>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] uppercase font-black text-slate-400 tracking-widest border-b border-slate-100">
            <tr><th className="px-8 py-4">Employee</th><th className="px-8 py-4">Period</th><th className="px-8 py-4 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pending.length === 0 ? (
              <tr><td colSpan={3} className="px-8 py-12 text-center text-slate-400 font-medium italic">All caught up! No pending requests.</td></tr>
            ) : pending.map(req => (
              <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6 font-bold text-slate-900">{req.userName}</td>
                <td className="px-8 py-6 text-sm text-slate-500 font-medium">{req.startDate} to {req.endDate}</td>
                <td className="px-8 py-6 text-right space-x-2">
                  <button onClick={() => handleAction(req.id, 'Denied')} className="text-xs font-black text-rose-600 hover:bg-rose-50 px-4 py-2 rounded-lg transition-colors uppercase tracking-tight">Deny</button>
                  <button onClick={() => handleAction(req.id, 'Approved')} className="text-xs font-black bg-emerald-600 text-white px-5 py-2 rounded-lg shadow-lg shadow-emerald-600/20 active:scale-95 transition-all uppercase tracking-tight">Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {status && (
        <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl text-sm font-semibold text-blue-700 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex gap-3">
             <div className="w-5 h-5 bg-blue-200 rounded flex items-center justify-center shrink-0">
               <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
             </div>
             <div>{status}</div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- TEAMS TODAY VIEW ---
export const TeamsTodayView: React.FC = () => {
  const requests = PersistenceManager.getRequests();
  const today = new Date().toISOString().split('T')[0];
  
  const currentlyAway = requests.filter(r => 
    r.status === 'Approved' && 
    today >= r.startDate && 
    today <= r.endDate
  );

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden p-10 flex flex-col lg:flex-row gap-10">
        <div className="flex-grow">
           <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-[#005DAA] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#005DAA]/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Who's Away Today?</h2>
           </div>
           <div className="space-y-4">
             {currentlyAway.length === 0 ? (
               <div className="p-12 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                 <p className="text-slate-400 font-bold italic text-nowrap">Full team presence confirmed for today.</p>
               </div>
             ) : currentlyAway.map(req => (
               <div key={req.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center justify-between hover:border-slate-300 transition-all group">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#003366] font-black text-lg border border-slate-200 shadow-sm uppercase group-hover:scale-110 transition-transform">
                     {req.userName.charAt(0)}
                   </div>
                   <div>
                     <div className="font-black text-slate-900">{req.userName}</div>
                     <div className="text-xs text-slate-500 font-bold uppercase tracking-tight">Back on {req.endDate}</div>
                   </div>
                 </div>
                 <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full">{req.type}</span>
               </div>
             ))}
           </div>
        </div>
        <div className="w-full lg:w-[400px] shrink-0">
          <Calendar requests={requests.filter(r => r.status === 'Approved')} title="Team Attendance Calendar" />
        </div>
      </div>
    </div>
  );
};
