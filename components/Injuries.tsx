import React, { useState } from 'react';
import { Stethoscope, FileText, Activity, AlertTriangle, Plus, Loader2 } from 'lucide-react';
import { generateRecoveryPlan } from '../services/gemini';
import ReactMarkdown from 'react-markdown';
import { Injury } from '../types';

export const Injuries: React.FC = () => {
  const [injuries, setInjuries] = useState<Injury[]>([
    { id: '1', type: 'Ankle Sprain', date: '2023-10-15', doctor: 'Dr. Smith', status: 'Recovering', painLevel: 3 },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recoveryPlan, setRecoveryPlan] = useState<string | null>(null);
  
  // Form State
  const [newInjury, setNewInjury] = useState({ type: '', date: '', doctor: '', painLevel: 5 });

  const handleAddInjury = (e: React.FormEvent) => {
    e.preventDefault();
    const injury: Injury = {
      id: Date.now().toString(),
      type: newInjury.type,
      date: newInjury.date,
      doctor: newInjury.doctor,
      status: 'Active',
      painLevel: newInjury.painLevel
    };
    setInjuries([...injuries, injury]);
    setShowForm(false);
  };

  const handleGenerateRecovery = async (injury: Injury) => {
    setLoading(true);
    setRecoveryPlan(null);
    const plan = await generateRecoveryPlan(injury.type, injury.painLevel);
    setRecoveryPlan(plan);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
            <Stethoscope className="mr-2 text-red-500" /> Injury & Reports
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Track treatments, upload reports, and get AI recovery protocols.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-colors"
        >
          <Plus size={16} className="mr-2" /> Report Injury
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddInjury} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-red-100 dark:border-red-900 animate-fade-in">
          <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Log New Injury</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              required placeholder="Injury Type (e.g., Hamstring Strain)" 
              className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 rounded-lg text-slate-900 dark:text-white"
              value={newInjury.type} onChange={e => setNewInjury({...newInjury, type: e.target.value})}
            />
            <input 
              required type="date" 
              className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 rounded-lg text-slate-900 dark:text-white"
              value={newInjury.date} onChange={e => setNewInjury({...newInjury, date: e.target.value})}
            />
            <input 
              required placeholder="Attending Doctor" 
              className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 rounded-lg text-slate-900 dark:text-white"
              value={newInjury.doctor} onChange={e => setNewInjury({...newInjury, doctor: e.target.value})}
            />
            <div className="flex items-center space-x-2">
              <label className="text-sm text-slate-600 dark:text-slate-400">Pain Level (1-10):</label>
              <input 
                type="number" min="1" max="10" 
                className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 rounded-lg w-20 text-slate-900 dark:text-white"
                value={newInjury.painLevel} onChange={e => setNewInjury({...newInjury, painLevel: parseInt(e.target.value)})}
              />
            </div>
          </div>
          <button type="submit" className="mt-4 bg-slate-900 dark:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-800 dark:hover:bg-slate-700">Save Record</button>
        </form>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-700 dark:text-slate-300">Active Records</h3>
          {injuries.map(injury => (
            <div key={injury.id} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-lg text-slate-800 dark:text-white">{injury.type}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Dr. {injury.doctor} • {injury.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  injury.status === 'Active' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200' : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {injury.status}
                </span>
              </div>
              <div className="mt-4 flex space-x-3">
                <button className="flex-1 border border-slate-200 dark:border-slate-700 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center">
                  <FileText size={16} className="mr-2" /> View Report
                </button>
                <button 
                  onClick={() => handleGenerateRecovery(injury)}
                  className="flex-1 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 py-2 rounded-lg text-sm text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 flex items-center justify-center"
                >
                  <Activity size={16} className="mr-2" /> AI Recovery Plan
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 h-full min-h-[400px]">
          {loading ? (
            <div className="h-full flex items-center justify-center flex-col text-slate-500 dark:text-slate-400">
              <Loader2 className="animate-spin mb-2" size={32} />
              <p>Generating personalized recovery protocol...</p>
            </div>
          ) : recoveryPlan ? (
            <div className="prose prose-sm prose-slate dark:prose-invert max-w-none">
              <h3 className="text-blue-700 dark:text-blue-400 font-bold mb-4 flex items-center">
                <AlertTriangle size={20} className="mr-2" /> Recommended Protocol
              </h3>
              <ReactMarkdown>{recoveryPlan}</ReactMarkdown>
            </div>
          ) : (
             <div className="h-full flex items-center justify-center flex-col text-slate-400 dark:text-slate-500 text-center">
               <Activity size={48} className="mb-4 opacity-20" />
               <p>Select an injury record to view AI-generated recovery exercises and timelines.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};