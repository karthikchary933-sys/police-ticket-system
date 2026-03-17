import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Upload, 
  Sparkles, 
  AlertCircle,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { Category, Priority } from '../types';
import { suggestTicketDetails } from '../services/aiService';
import { saveTicket } from '../services/ticketService';

const CreateTicket: React.FC = () => {
  const [formData, setFormData] = useState({
    officerName: '',
    department: '',
    contactEmail: '',
    deviceType: '',
    category: 'Hardware' as Category,
    priority: 'Medium' as Priority,
    description: '',
  });
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDescriptionBlur = async () => {
    if (formData.description.length > 20) {
      setIsAnalyzing(true);
      const suggestion = await suggestTicketDetails(formData.description);
      setFormData(prev => ({
        ...prev,
        category: suggestion.category,
        priority: suggestion.priority
      }));
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    saveTicket({
      ...formData,
      screenshot: selectedImage || undefined
    });
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        officerName: '',
        department: '',
        contactEmail: '',
        deviceType: '',
        category: 'Hardware',
        priority: 'Medium',
        description: '',
      });
      setSelectedImage(null);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Report IT Issue</h1>
        <p className="text-slate-500 mt-2">Please provide detailed information about the technical problem you are experiencing.</p>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-center gap-3"
          >
            <CheckCircle2 size={20} />
            <span className="font-medium">Ticket submitted successfully! An IT technician will be assigned shortly.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="glass-panel p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Officer Name</label>
            <input 
              required
              type="text" 
              value={formData.officerName}
              onChange={e => setFormData({...formData, officerName: e.target.value})}
              placeholder="e.g. Sgt. John Doe"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-police-accent/20 focus:border-police-accent outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Police Station / Department</label>
            <input 
              required
              type="text" 
              value={formData.department}
              onChange={e => setFormData({...formData, department: e.target.value})}
              placeholder="e.g. Precinct 5 / Dispatch"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-police-accent/20 focus:border-police-accent outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Contact Email</label>
            <input 
              required
              type="email" 
              value={formData.contactEmail}
              onChange={e => setFormData({...formData, contactEmail: e.target.value})}
              placeholder="e.g. j.doe@police.gov"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-police-accent/20 focus:border-police-accent outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Device Type / ID</label>
            <input 
              required
              type="text" 
              value={formData.deviceType}
              onChange={e => setFormData({...formData, deviceType: e.target.value})}
              placeholder="e.g. Laptop / PC-12345"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-police-accent/20 focus:border-police-accent outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700">Issue Description</label>
            {isAnalyzing && (
              <div className="flex items-center gap-2 text-police-accent text-xs font-medium animate-pulse">
                <Sparkles size={14} />
                <span>AI Analyzing...</span>
              </div>
            )}
          </div>
          <textarea 
            required
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            onBlur={handleDescriptionBlur}
            rows={5}
            placeholder="Describe the problem in detail. AI will automatically suggest category and priority based on your input."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-police-accent/20 focus:border-police-accent outline-none transition-all resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Issue Category</label>
            <select 
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value as Category})}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-police-accent/20 focus:border-police-accent outline-none transition-all"
            >
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Network">Network</option>
              <option value="Access">Access</option>
              <option value="Application">Application</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Priority Level</label>
            <select 
              value={formData.priority}
              onChange={e => setFormData({...formData, priority: e.target.value as Priority})}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-police-accent/20 focus:border-police-accent outline-none transition-all"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Screenshot / Evidence (Optional)</label>
          <div className="relative">
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className={`border-2 border-dashed ${selectedImage ? 'border-police-accent bg-blue-50/30' : 'border-slate-200 bg-slate-50/50'} rounded-xl p-8 flex flex-col items-center justify-center hover:bg-slate-50 transition-colors group`}>
              {selectedImage ? (
                <div className="relative w-full max-w-xs">
                  <img src={selectedImage} alt="Preview" className="w-full h-48 object-cover rounded-lg shadow-md" />
                  <button 
                    onClick={(e) => { e.preventDefault(); setSelectedImage(null); }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg z-20"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 group-hover:text-police-accent shadow-sm mb-3 transition-colors">
                    <Upload size={20} />
                  </div>
                  <p className="text-sm text-slate-500 font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 10MB</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
            <AlertCircle size={16} />
            <span className="text-xs font-medium">Critical issues are escalated to shift leads automatically.</span>
          </div>
          
          <button 
            disabled={isSubmitting}
            type="submit"
            className="flex items-center gap-2 px-8 py-3 bg-police-dark hover:bg-slate-800 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-200"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Submit Ticket</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicket;
