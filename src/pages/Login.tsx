import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Lock, User, ArrowRight, Loader2, Mail, Building2 } from 'lucide-react';

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    badgeId: '', 
    password: '',
    fullName: '',
    department: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate authentication/registration
    await new Promise(resolve => setTimeout(resolve, 1500));
    onLogin();
  };

  return (
    <div className="min-h-screen bg-police-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-police-accent blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-police-accent blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 bg-slate-50 border-b border-slate-200 text-center">
            <div className="w-16 h-16 bg-police-dark rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-police-dark/20">
              <Shield size={32} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              {isLogin ? 'Secure Access' : 'Officer Registration'}
            </h1>
            <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest font-semibold">
              Police IT Terminal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        required={!isLogin}
                        type="text" 
                        value={formData.fullName}
                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                        placeholder="e.g. Sgt. James Wilson"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-police-accent/20 focus:border-police-accent outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Department / Station</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        required={!isLogin}
                        type="text" 
                        value={formData.department}
                        onChange={e => setFormData({...formData, department: e.target.value})}
                        placeholder="e.g. Central Precinct"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-police-accent/20 focus:border-police-accent outline-none transition-all"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Badge ID / Username</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  required
                  type="text" 
                  value={formData.badgeId}
                  onChange={e => setFormData({...formData, badgeId: e.target.value})}
                  placeholder="Enter your Badge ID"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-police-accent/20 focus:border-police-accent outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Security Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  required
                  type="password" 
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-police-accent/20 focus:border-police-accent outline-none transition-all"
                />
              </div>
            </div>

            {isLogin ? (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input type="checkbox" className="rounded border-slate-300 text-police-accent focus:ring-police-accent" />
                  <span>Remember Terminal</span>
                </label>
                <button type="button" className="text-police-accent font-semibold hover:underline">Forgot Access?</button>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    required={!isLogin}
                    type="password" 
                    value={formData.confirmPassword}
                    onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-police-accent/20 focus:border-police-accent outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <button 
              disabled={isLoading}
              type="submit"
              className="w-full py-4 bg-police-dark hover:bg-slate-800 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200 disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <span>{isLogin ? 'Authorize Access' : 'Create Account'}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            <div className="text-center">
              <button 
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-slate-500 hover:text-police-accent font-medium transition-colors"
              >
                {isLogin ? "Don't have an account? Register here" : "Already have an account? Sign In"}
              </button>
            </div>
          </form>

          <div className="p-6 bg-slate-50 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-400 leading-relaxed">
              Unauthorized access to this system is strictly prohibited and monitored under Federal Law.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
