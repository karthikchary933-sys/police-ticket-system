import React from 'react';
import { 
  Home, 
  PlusCircle, 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  Shield,
  LogOut,
  Users
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'create', label: 'New Ticket', icon: PlusCircle },
    { id: 'tickets', label: 'All Tickets', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'admin', label: 'Admin Panel', icon: Shield },
  ];

  return (
    <div className="w-64 bg-police-dark text-white h-screen fixed left-0 top-0 flex flex-col z-50">
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="w-10 h-10 bg-police-accent rounded-lg flex items-center justify-center shadow-lg shadow-police-accent/20">
          <Shield className="text-white" size={24} />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight">Police IT</h1>
          <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Service Desk</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTab === item.id
                ? 'bg-police-accent text-white shadow-lg shadow-police-accent/20'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'text-white/40 group-hover:text-white'} />
            <span className="font-medium">{item.label}</span>
            {activeTab === item.id && (
              <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="bg-white/5 rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-police-accent/20 rounded-full flex items-center justify-center">
              <Users size={14} className="text-police-accent" />
            </div>
            <div>
              <p className="text-xs font-bold">IT Officer</p>
              <p className="text-[10px] text-white/40">Active Session</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-white/60 hover:text-white transition-colors">
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
