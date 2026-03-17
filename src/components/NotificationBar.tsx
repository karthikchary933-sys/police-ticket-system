import React from 'react';
import { Bell, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning';
}

interface NotificationBarProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

const NotificationBar: React.FC<NotificationBarProps> = ({ notifications, onDismiss }) => {
  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2 w-80">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className={`p-4 rounded-2xl shadow-2xl border flex items-start gap-3 backdrop-blur-md ${
              n.type === 'success' 
                ? 'bg-emerald-50/90 border-emerald-200 text-emerald-800' 
                : n.type === 'warning'
                ? 'bg-amber-50/90 border-amber-200 text-amber-800'
                : 'bg-blue-50/90 border-blue-200 text-blue-800'
            }`}
          >
            <div className={`p-1.5 rounded-lg ${
              n.type === 'success' ? 'bg-emerald-200/50' : n.type === 'warning' ? 'bg-amber-200/50' : 'bg-blue-200/50'
            }`}>
              {n.type === 'warning' ? <Bell size={16} /> : <Info size={16} />}
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold leading-tight">{n.message}</p>
            </div>
            <button 
              onClick={() => onDismiss(n.id)}
              className="text-current opacity-50 hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBar;
