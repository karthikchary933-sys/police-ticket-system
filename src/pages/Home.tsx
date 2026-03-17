import React from 'react';
import { motion } from 'motion/react';
import { Shield, Activity, Clock, CheckCircle2, AlertTriangle, Server, BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface HomeProps {
  onGetStarted: () => void;
}

const Home: React.FC<HomeProps> = ({ onGetStarted }) => {
  const priorityData = [
    { name: 'High', value: 35 },
    { name: 'Low', value: 65 }
  ];

  const PRIORITY_COLORS = ['#FF6B6B', '#93C5FD']; // Deep Coral, Light Blue

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-police-dark p-12 text-white shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-police-accent/20 rounded-full border border-police-accent/30 text-police-accent"
          >
            <Shield size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Internal IT Support</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-bold tracking-tight leading-tight"
          >
            Police IT Ticketing <br />
            <span className="text-police-accent">Management System</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg leading-relaxed"
          >
            A secure, professional platform designed for law enforcement officers to report technical issues and for the IT department to streamline resolution workflows.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-4 pt-4"
          >
            <button 
              onClick={onGetStarted}
              className="px-8 py-3 bg-police-accent hover:bg-blue-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-police-accent/20"
            >
              Get Started
            </button>
            <button className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/10">
              View Documentation
            </button>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <Shield className="w-full h-full transform translate-x-1/4 -translate-y-1/4" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Activity, title: 'Real-time Tracking', desc: 'Monitor ticket status from submission to resolution in real-time.' },
          { icon: Shield, title: 'Secure Access', desc: 'Enterprise-grade security ensuring sensitive data remains protected.' },
          { icon: Clock, title: 'Priority Response', desc: 'Automated priority detection for critical infrastructure issues.' },
          { 
            icon: BarChart3, 
            title: 'Ticket Analytics', 
            desc: 'Priority Distribution',
            isChart: true
          }
        ].map((feature, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="glass-panel p-8 hover:border-police-accent/30 transition-all group flex flex-col h-full"
          >
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-police-dark mb-6 group-hover:bg-police-accent group-hover:text-white transition-colors">
              <feature.icon size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            
            {feature.isChart ? (
              <div className="flex-1 flex flex-col">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{feature.desc}</p>
                <div className="h-32 w-full mt-auto">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={priorityData}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={45}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {priorityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PRIORITY_COLORS[index % PRIORITY_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '10px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FF6B6B' }} />
                    <span className="text-[10px] font-bold text-slate-500 uppercase">High</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#93C5FD' }} />
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Low</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
            )}
          </motion.div>
        ))}
      </div>

      <div className="glass-panel p-8 border-l-4 border-l-police-accent">
        <div className="flex items-start gap-6">
          <div className="bg-blue-50 p-4 rounded-2xl text-police-accent">
            <Server size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">IoT Integration Concept</h3>
            <p className="text-slate-600 leading-relaxed">
              Our system is designed to integrate with smart police infrastructure. CCTV cameras, precinct routers, and mobile data terminals can automatically generate "System Fault" tickets when hardware failure is detected, reducing downtime for critical field equipment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
