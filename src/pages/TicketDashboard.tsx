import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Filter, 
  MoreHorizontal, 
  ArrowUpDown, 
  Eye, 
  Edit3, 
  Trash2,
  Search
} from 'lucide-react';
import { Ticket, Status, Priority, Category } from '../types';
import { getTickets, updateTicketStatus } from '../services/ticketService';
import { getStatusColor, getPriorityColor } from '../utils/statusUtils';

interface TicketDashboardProps {
  onViewTicket: (id: string) => void;
}

const TicketDashboard: React.FC<TicketDashboardProps> = ({ onViewTicket }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filterStatus, setFilterStatus] = useState<Status | 'All' | 'Assigned'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setTickets(getTickets());
  }, []);

  const handleStatusChange = (id: string, newStatus: Status) => {
    updateTicketStatus(id, newStatus);
    setTickets(getTickets());
  };

  const filteredTickets = tickets.filter(t => {
    const matchesStatus = filterStatus === 'All' 
      ? true 
      : filterStatus === 'Assigned' 
      ? t.assignedTo === 'IT Officer' // Simulating current user
      : t.status === filterStatus;
    
    const matchesSearch = t.officerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Ticket Management</h1>
          <p className="text-slate-500 mt-1">Track and resolve active IT support requests.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search tickets..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-police-accent/20 outline-none w-64"
            />
          </div>
          <div className="flex bg-white border border-slate-200 rounded-lg p-1 overflow-x-auto max-w-full">
            {['All', 'Assigned', 'Open', 'In Progress', 'Waiting for User', 'Escalated', 'Resolved', 'Closed', 'Reopened'].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s as any)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                  filterStatus === s 
                    ? 'bg-police-dark text-white' 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {s === 'Assigned' ? 'Assigned to Me' : s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-police-accent">
                    Ticket ID <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Officer / Station</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Created Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTickets.map((ticket) => (
                <tr 
                  key={ticket.id} 
                  onClick={() => onViewTicket(ticket.id)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-bold text-police-accent group-hover:underline">
                      {ticket.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{ticket.officerName}</p>
                      <p className="text-xs text-slate-500">{ticket.department}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{ticket.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`priority-badge border ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewTicket(ticket.id);
                        }}
                        className="p-2 bg-police-accent text-white rounded-lg flex items-center gap-2 hover:bg-police-dark transition-all shadow-sm"
                        title="View & Resolve"
                      >
                        <Eye size={16} />
                        <span className="text-[10px] font-bold uppercase">View Details</span>
                      </button>
                      <button 
                        className="p-2 text-slate-400 hover:text-police-accent hover:bg-slate-100 rounded-lg transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Edit3 size={16} />
                      </button>
                      <button 
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredTickets.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-4">
              <Filter size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No tickets found</h3>
            <p className="text-slate-500">Try adjusting your search or filters.</p>
          </div>
        )}

        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">Showing {filteredTickets.length} of {tickets.length} total tickets</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs font-bold text-slate-500 hover:text-police-dark disabled:opacity-30" disabled>Previous</button>
            <button className="px-3 py-1 text-xs font-bold text-police-accent">1</button>
            <button className="px-3 py-1 text-xs font-bold text-slate-500 hover:text-police-dark">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDashboard;
