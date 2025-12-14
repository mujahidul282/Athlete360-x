import React, { useState } from 'react';
import { Dumbbell, Loader2, Save, RotateCcw, CheckCircle } from 'lucide-react';
import { WorkoutPlanRequest } from '../types';
import { generateWorkoutPlan } from '../services/gemini';
import ReactMarkdown from 'react-markdown';

export const WorkoutPlanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);
  const [formData, setFormData] = useState<WorkoutPlanRequest>({
    goal: 'Muscle Gain',
    fitnessLevel: 'Intermediate',
    daysPerWeek: 4,
    equipment: 'Gym Access',
    duration: 4
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPlan(null);
    try {
      const generatedPlan = await generateWorkoutPlan(formData);
      setPlan(generatedPlan);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center">
          <Dumbbell className="mr-3 text-blue-600" size={32} />
          AI Workout Planner
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Tell us your goals, and Gemini AI will construct a personalized training regimen just for you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Primary Goal</label>
              <select 
                name="goal" 
                value={formData.goal}
                onChange={handleInputChange}
                className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>Muscle Gain</option>
                <option>Weight Loss</option>
                <option>Endurance</option>
                <option>Strength & Power</option>
                <option>Flexibility & Mobility</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Fitness Level</label>
              <select 
                name="fitnessLevel" 
                value={formData.fitnessLevel}
                onChange={handleInputChange}
                className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Elite</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Training Days / Week</label>
              <input 
                type="number" 
                name="daysPerWeek" 
                min="1" max="7" 
                value={formData.daysPerWeek}
                onChange={handleInputChange}
                className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

             <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Program Duration (Weeks)</label>
              <input 
                type="number" 
                name="duration" 
                min="1" max="12" 
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Equipment Available</label>
              <input 
                type="text" 
                name="equipment" 
                value={formData.equipment}
                onChange={handleInputChange}
                placeholder="e.g. Full Gym, Dumbbells only, None"
                className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex items-center justify-center py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating...
                </>
              ) : (
                'Generate Plan'
              )}
            </button>
          </form>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-2">
          {plan ? (
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 min-h-[500px] animate-fade-in">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center">
                  <CheckCircle className="text-green-500 mr-2 h-6 w-6" /> Your Custom Plan
                </h3>
                <div className="flex space-x-2">
                    <button className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-colors" title="Regenerate">
                        <RotateCcw size={20} />
                    </button>
                    <button className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-colors" title="Save">
                        <Save size={20} />
                    </button>
                </div>
              </div>
              <div className="prose prose-slate prose-blue dark:prose-invert max-w-none">
                <ReactMarkdown>{plan}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 h-full flex flex-col items-center justify-center p-12 text-center text-slate-400 dark:text-slate-500">
              <Dumbbell className="h-16 w-16 mb-4 opacity-20" />
              <h3 className="text-lg font-medium text-slate-600 dark:text-slate-300">No Plan Generated Yet</h3>
              <p className="max-w-sm mt-2">Fill out the form on the left to get a world-class training program customized to your needs.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};