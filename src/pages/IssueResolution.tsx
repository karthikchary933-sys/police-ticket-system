import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  User, 
  Clock, 
  Shield, 
  MessageSquare, 
  CheckCircle2, 
  UserPlus, 
  AlertTriangle,
  History,
  Save,
  Activity,
  Lock,
  Pause,
  RotateCcw,
  Send,
  Paperclip,
  Mail,
  Monitor
} from 'lucide-react';
import { Ticket, Status, Comment } from '../types';
import { getTicketById, updateTicket, addComment as addCommentService } from '../services/ticketService';
import { getStatusColor } from '../utils/statusUtils';

interface IssueResolutionProps {
  ticketId: string;
  onBack: () => void;
  onUpdate?: (message: string) => void;
}

const IssueResolution: React.FC<IssueResolutionProps> = ({ ticketId, onBack, onUpdate }) => {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [notes, setNotes] = useState('');
  const [workNotes, setWorkNotes] = useState('');
  const [rootCause, setRootCause] = useState('');
  const [stepsTaken, setStepsTaken] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState<Status>('Open');
  const [isSaving, setIsSaving] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isInternal, setIsInternal] = useState(false);

  useEffect(() => {
    const t = getTicketById(ticketId);
    if (t) {
      setTicket(t);
      setNotes(t.resolutionNotes || '');
      setWorkNotes(t.workNotes || '');
      setRootCause(t.rootCause || '');
      setStepsTaken(t.stepsTaken || '');
      setAssignedTo(t.assignedTo || '');
      setStatus(t.status);
    }
  }, [ticketId]);

  const handleUpdateStatus = async (newStatus: Status) => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const updates: Partial<Ticket> = { 
      status: newStatus,
      resolutionNotes: notes,
      workNotes,
      rootCause,
      stepsTaken,
      assignedTo
    };

    if (newStatus === 'Resolved') {
      updates.resolvedAt = new Date().toISOString();
      updates.resolvedBy = 'IT Officer (Current User)';
    }

    updateTicket(ticketId, updates);
    const updated = getTicketById(ticketId);
    if (updated) setTicket(updated);
    setStatus(newStatus);
    setIsSaving(false);
    if (onUpdate) onUpdate(`Ticket status changed to ${newStatus}`);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    addCommentService(ticketId, {
      userId: 'IT-001',
      userName: 'IT Officer',
      text: newComment,
      isInternal
    });
    const updated = getTicketById(ticketId);
    if (updated) setTicket(updated);
    setNewComment('');
    if (onUpdate) onUpdate('Comment added successfully');
  };

  if (!ticket) {
    return (
      <div className="p-12 text-center glass-panel max-w-2xl mx-auto mt-12">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Ticket Not Found</h2>
        <p className="text-slate-500 mb-6">The ticket you are looking for does not exist or has been removed.</p>
        <button 
          onClick={onBack}
          className="px-6 py-2 bg-police-dark text-white rounded-lg font-bold hover:bg-black transition-all"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const getTimeTaken = () => {
    if (!ticket.resolvedAt) return null;
    const start = new Date(ticket.createdAt).getTime();
    const end = new Date(ticket.resolvedAt).getTime();
    const diffHours = Math.round((end - start) / (1000 * 60 * 60));
    return `${diffHours} hours`;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-police-accent transition-colors font-medium"
        >
          <ArrowLeft size={18} />
          <span>Back to Dashboard</span>
        </button>
        
        <div className="flex items-center gap-3">
          <span className={`px-4 py-1.5 rounded-lg text-sm font-bold uppercase tracking-wider border ${getStatusColor(ticket.status)}`}>
            Status: {ticket.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          {/* Ticket Header Details */}
          <div className="glass-panel p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-mono font-bold text-police-accent">{ticket.id}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  ticket.priority === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {ticket.priority} Priority
                </span>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Created On</p>
                <p className="text-sm font-semibold">{new Date(ticket.createdAt).toLocaleString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg text-slate-500"><User size={18} /></div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Reporting Officer</p>
                    <p className="font-bold text-slate-900">{ticket.officerName}</p>
                    <p className="text-xs text-slate-500">{ticket.department}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg text-slate-500"><Mail size={18} /></div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Contact Email</p>
                    <p className="text-sm font-medium text-slate-700">{ticket.contactEmail}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg text-slate-500"><Monitor size={18} /></div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Device Type</p>
                    <p className="font-bold text-slate-900">{ticket.deviceType}</p>
                    <p className="text-xs text-slate-500">{ticket.category} Category</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg text-slate-500"><Shield size={18} /></div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Assigned IT Officer</p>
                    <p className="font-bold text-slate-900">{ticket.assignedTo || 'Unassigned'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Issue Description</h2>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <p className="text-slate-700 leading-relaxed">{ticket.description}</p>
              </div>
            </div>
          </div>

          {/* Work Notes & Resolution */}
          <div className="glass-panel p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Activity size={16} />
                  Work Notes (Internal)
                </h3>
                <textarea 
                  value={workNotes}
                  onChange={e => setWorkNotes(e.target.value)}
                  rows={4}
                  placeholder="Internal technical notes..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-police-accent/20 outline-none transition-all resize-none text-sm"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  Resolution Notes
                </h3>
                <textarea 
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Summary for the reporting officer..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-police-accent/20 outline-none transition-all resize-none text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Root Cause</h3>
                <input 
                  type="text"
                  value={rootCause}
                  onChange={e => setRootCause(e.target.value)}
                  placeholder="Identify the underlying issue..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-police-accent/20 outline-none transition-all text-sm"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Steps Taken</h3>
                <input 
                  type="text"
                  value={stepsTaken}
                  onChange={e => setStepsTaken(e.target.value)}
                  placeholder="Actions performed to fix..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-police-accent/20 outline-none transition-all text-sm"
                />
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="glass-panel p-8">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
              <MessageSquare size={20} className="text-police-accent" />
              Communication & Comments
            </h3>
            
            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2">
              {(!ticket.comments || ticket.comments.length === 0) ? (
                <p className="text-center text-slate-400 py-8 text-sm italic">No comments yet. Start the conversation.</p>
              ) : (
                ticket.comments.map((comment) => (
                  <div key={comment.id} className={`flex flex-col ${comment.userId === 'IT-001' ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[80%] p-4 rounded-2xl ${
                      comment.isInternal 
                        ? 'bg-amber-50 border border-amber-100 text-amber-900' 
                        : comment.userId === 'IT-001'
                        ? 'bg-police-dark text-white'
                        : 'bg-slate-100 text-slate-800'
                    }`}>
                      <div className="flex items-center justify-between gap-4 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">{comment.userName}</span>
                        {comment.isInternal && <span className="text-[8px] bg-amber-200 text-amber-800 px-1.5 rounded font-bold uppercase">Internal</span>}
                      </div>
                      <p className="text-sm leading-relaxed">{comment.text}</p>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 px-2">{new Date(comment.createdAt).toLocaleString()}</span>
                  </div>
                ))
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={isInternal} 
                    onChange={e => setIsInternal(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-police-accent focus:ring-police-accent"
                  />
                  <span className="text-xs font-bold text-slate-500 group-hover:text-slate-700 transition-colors">Internal Note</span>
                </label>
                <button className="flex items-center gap-1.5 text-xs font-bold text-police-accent hover:text-police-dark transition-colors ml-auto">
                  <Paperclip size={14} />
                  Attach File
                </button>
              </div>
              <div className="relative">
                <textarea 
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  rows={3}
                  placeholder="Type your update or comment here..."
                  className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-police-accent/20 outline-none transition-all resize-none text-sm pr-16"
                />
                <button 
                  onClick={handleAddComment}
                  className="absolute right-3 bottom-3 p-3 bg-police-accent text-white rounded-xl shadow-lg shadow-police-accent/20 hover:scale-105 transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-6">
          <div className="glass-panel p-8 space-y-6 sticky top-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Activity size={18} className="text-police-accent" />
              Workflow Actions
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Assign To Officer</label>
                <div className="relative">
                  <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    value={assignedTo}
                    onChange={e => setAssignedTo(e.target.value)}
                    placeholder="Search IT personnel..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-police-accent/20 outline-none text-sm"
                  />
                </div>
                <button 
                  onClick={() => handleUpdateStatus('Assigned')}
                  className="w-full py-2 text-xs font-bold text-police-accent hover:bg-blue-50 rounded-lg border border-blue-100 transition-colors"
                >
                  Confirm Assignment
                </button>
              </div>

              <div className="pt-4 space-y-3">
                <button 
                  onClick={() => handleUpdateStatus('In Progress')}
                  className="w-full py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl transition-all flex items-center justify-center gap-2 border border-blue-200 text-sm"
                >
                  <Clock size={16} />
                  <span>Start Work</span>
                </button>

                <button 
                  onClick={() => handleUpdateStatus('Waiting for User')}
                  className="w-full py-3 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold rounded-xl transition-all flex items-center justify-center gap-2 border border-purple-200 text-sm"
                >
                  <Pause size={16} />
                  <span>Put on Hold</span>
                </button>

                <button 
                  onClick={() => handleUpdateStatus('Escalated')}
                  className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-xl transition-all flex items-center justify-center gap-2 border border-red-200 text-sm"
                >
                  <AlertTriangle size={16} />
                  <span>Escalate Issue</span>
                </button>

                <button 
                  onClick={() => handleUpdateStatus('Resolved')}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 text-sm"
                >
                  <CheckCircle2 size={18} />
                  <span>Mark as Resolved</span>
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => handleUpdateStatus('Closed')}
                    className="py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-xs"
                  >
                    <Lock size={14} />
                    <span>Close</span>
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus('Reopened')}
                    className="py-3 bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold rounded-xl transition-all flex items-center justify-center gap-2 border border-pink-200 text-xs"
                  >
                    <RotateCcw size={14} />
                    <span>Reopen</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
              <History size={18} className="text-police-accent" />
              Activity Log
            </h3>
            <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              {ticket.history?.map((h, i) => (
                <div key={i} className="relative pl-8">
                  <div className="absolute left-0 top-1.5 w-6 h-6 bg-white border-2 border-police-accent rounded-full flex items-center justify-center z-10">
                    <div className="w-1.5 h-1.5 bg-police-accent rounded-full" />
                  </div>
                  <p className="text-sm font-bold text-slate-900">{h.action}</p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase font-bold tracking-tighter mt-1">
                    <span>{h.user}</span>
                    <span>•</span>
                    <span>{new Date(h.date).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueResolution;
