import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import CreateTicket from './pages/CreateTicket';
import TicketDashboard from './pages/TicketDashboard';
import Analytics from './pages/Analytics';
import IssueResolution from './pages/IssueResolution';
import AdminPanel from './pages/AdminPanel';
import Auth from './pages/Login';
import NotificationBar from './components/NotificationBar';
import { motion, AnimatePresence } from 'motion/react';

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning';
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string, type: Notification['type'] = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [{ id, message, type }, ...prev]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const handleTicketUpdate = (message: string) => {
    addNotification(message, 'success');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedTicketId(null);
  };

  if (!isLoggedIn) {
    return <Auth onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderContent = () => {
    if (selectedTicketId) {
      return (
        <IssueResolution 
          ticketId={selectedTicketId} 
          onBack={() => setSelectedTicketId(null)} 
          onUpdate={handleTicketUpdate}
        />
      );
    }

    switch (activeTab) {
      case 'home': return <Home onGetStarted={() => handleTabChange('create')} />;
      case 'create': return <CreateTicket onCreated={() => addNotification('Ticket created successfully!', 'success')} />;
      case 'tickets': return <TicketDashboard onViewTicket={(id) => setSelectedTicketId(id)} />;
      case 'analytics': return <Analytics />;
      case 'admin': return <AdminPanel />;
      default: return <Home onGetStarted={() => handleTabChange('create')} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
      <NotificationBar notifications={notifications} onDismiss={(id) => setNotifications(prev => prev.filter(n => n.id !== id))} />
      
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header />
        
        <div className="p-8 flex-1">
          {renderContent()}
        </div>

        <footer className="p-8 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
            © 2026 Police Department IT Division • Internal Use Only • Secure Terminal
          </p>
        </footer>
      </main>
    </div>
  );
}
