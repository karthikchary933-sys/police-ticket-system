import { Status, Priority } from '../types';

export const getStatusColor = (status: Status) => {
  switch (status) {
    case 'Open': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Assigned': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
    case 'In Progress': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'Waiting for User': return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'Escalated': return 'bg-red-100 text-red-700 border-red-200';
    case 'Resolved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'Closed': return 'bg-slate-100 text-slate-700 border-slate-200';
    case 'Reopened': return 'bg-pink-100 text-pink-700 border-pink-200';
    default: return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

export const getStatusHexColor = (status: Status) => {
  switch (status) {
    case 'Open': return '#3b82f6';
    case 'Assigned': return '#6366f1';
    case 'In Progress': return '#f59e0b';
    case 'Waiting for User': return '#a855f7';
    case 'Escalated': return '#ef4444';
    case 'Resolved': return '#10b981';
    case 'Closed': return '#64748b';
    case 'Reopened': return '#ec4899';
    default: return '#cbd5e1';
  }
};

export const getPriorityColor = (priority: Priority) => {
  switch (priority) {
    case 'Critical': return 'bg-red-100 text-red-700 border-red-200';
    case 'High': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'Medium': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Low': return 'bg-slate-100 text-slate-700 border-slate-200';
    default: return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};
