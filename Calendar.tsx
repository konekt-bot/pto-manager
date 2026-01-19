import React, { useState } from 'react';
import { PTORequest } from '../types';

interface CalendarProps {
  requests: PTORequest[];
  title?: string;
}

const Calendar: React.FC<CalendarProps> = ({ requests, title }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = daysInMonth(year, month);
  const startingDay = firstDayOfMonth(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getDayRequests = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return requests.filter(req => {
      const start = req.startDate;
      const end = req.endDate;
      return dateStr >= start && dateStr <= end;
    });
  };

  const getStatusColor = (req: PTORequest) => {
    if (req.status === 'Pending') return 'bg-amber-400 text-amber-950';
    if (req.status === 'Denied') return 'bg-rose-500 text-white';
    if (req.isFavor) return 'bg-purple-600 text-white';
    return 'bg-emerald-500 text-white';
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          {title || 'Availability Calendar'}
        </h3>
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-slate-600">{monthNames[month]} {year}</span>
          <div className="flex gap-1">
            <button onClick={prevMonth} className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button onClick={nextMonth} className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b border-slate-100">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="py-3 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 h-[400px]">
        {Array.from({ length: startingDay }).map((_, i) => (
          <div key={`empty-${i}`} className="border-r border-b border-slate-50 bg-slate-50/30"></div>
        ))}
        {Array.from({ length: days }).map((_, i) => {
          const day = i + 1;
          const dayReqs = getDayRequests(day);
          return (
            <div key={day} className="border-r border-b border-slate-100 p-2 overflow-hidden hover:bg-slate-50/50 transition-colors group">
              <span className="text-xs font-bold text-slate-400 group-hover:text-slate-900">{day}</span>
              <div className="mt-1 space-y-1">
                {dayReqs.slice(0, 3).map(req => (
                  <div 
                    key={req.id} 
                    title={`${req.userName}: ${req.type}${req.isFavor ? ' (Favor)' : ''}`}
                    className={`text-[8px] px-1.5 py-0.5 rounded-md font-bold truncate leading-tight shadow-sm ${getStatusColor(req)}`}
                  >
                    {req.userName.split(' ')[0]}
                  </div>
                ))}
                {dayReqs.length > 3 && (
                  <div className="text-[8px] text-slate-400 font-bold text-center">+{dayReqs.length - 3} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap gap-4 justify-center">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-emerald-500"></div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Approved</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-purple-600"></div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Favor (Negative Balance)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-amber-400"></div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Pending</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-rose-500"></div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Denied</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar;