import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Settings, 
  Activity, 
  Database,
  Plus,
  MoreVertical,
  Search
} from 'lucide-react';
import { motion } from 'motion/react';

const AdminPanel: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('officers');

  const officers = [
    { id: '1', name: 'IT Tech Miller', role: 'Level 1 Support', status: 'Online', tickets: 12 },
    { id: '2', name: 'IT Tech Smith', role: 'Level 2 Support', status: 'Offline', tickets: 5 },
    { id: '3', name: 'IT Tech Jones', role: 'Network Admin', status: 'Online', tickets: 8 },
    { id: '4', name: 'IT Tech Wilson', role: 'Security Specialist', status: 'Away', tickets: 3 },
  ];

  const logs = [
    { id: '1', time: '10:02 AM', action: 'System Backup Completed', user: 'System' },
    { id: '2', time: '09:45 AM', action: 'New IT Officer Added: Tech Wilson', user: 'Admin' },
    { id: '3', time: '09:15 AM', action: 'Category "Cyber" Added', user: 'Admin' },
    { id: '4', time: '08:30 AM', action: 'Database Maintenance Started', user: 'System' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Management</h1>
          <p className="text-slate-500 mt-1">Configure system settings and manage personnel.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-police-accent text-white font-bold rounded-xl shadow-lg shadow-police-accent/20 hover:scale-105 transition-all">
          <Plus size={20} />
          Add IT Officer
        </button>
      </div>

      <div className="flex gap-4 border-b border-slate-200 pb-px">
        {[
          { id: 'officers', label: 'IT Officers', icon: Users },
          { id: 'logs', label: 'System Logs', icon: Activity },
          { id: 'categories', label: 'Categories & Depts', icon: Database },
          { id: 'settings', label: 'Global Settings', icon: Settings },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative ${
              activeSubTab === tab.id ? 'text-police-accent' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
            {activeSubTab === tab.id && (
              <motion.div 
                layoutId="adminTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-police-accent rounded-t-full" 
              />
            )}
          </button>
        ))}
      </div>

      <div className="glass-panel p-8">
        {activeSubTab === 'officers' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search personnel..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-police-accent/20 outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Officer Name</th>
                    <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Role</th>
                    <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Active Tickets</th>
                    <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {officers.map((officer) => (
                    <tr key={officer.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600">
                            {officer.name.charAt(0)}
                          </div>
                          <span className="font-bold text-slate-900">{officer.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-slate-600">{officer.role}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${
                          officer.status === 'Online' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          officer.status === 'Away' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                          'bg-slate-50 text-slate-400 border-slate-100'
                        }`}>
                          {officer.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-police-accent" 
                              style={{ width: `${(officer.tickets / 15) * 100}%` }} 
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-600">{officer.tickets}</span>
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <button className="p-2 text-slate-400 hover:text-police-accent hover:bg-white rounded-lg transition-all">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSubTab === 'logs' && (
          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log.id} className="flex items-center gap-6 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <span className="text-xs font-mono font-bold text-slate-400 w-20">{log.time}</span>
                <div className="w-2 h-2 rounded-full bg-police-accent/30" />
                <span className="flex-1 text-sm font-medium text-slate-700">{log.action}</span>
                <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-500 rounded-lg">{log.user}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
