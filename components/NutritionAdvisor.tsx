import React, { useState } from 'react';
import { Utensils, Loader2, Leaf, AlertCircle } from 'lucide-react';
import { NutritionRequest } from '../types';
import { generateNutritionAdvice } from '../services/gemini';
import ReactMarkdown from 'react-markdown';

export const NutritionAdvisor: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);
  const [formData, setFormData] = useState<NutritionRequest>({
    goal: 'Weight Maintenance',
    dietaryRestrictions: '',
    mealsPerDay: 3,
    calories: 2500
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAdvice(null);
    try {
      const result = await generateNutritionAdvice(formData);
      setAdvice(result);
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
          <Utensils className="mr-3 text-orange-500" size={32} />
          Smart Nutrition Advisor
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Fueling is half the battle. Get personalized dietary strategies powered by AI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="order-2 md:order-1">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 space-y-6">
             <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg flex items-start space-x-3 mb-4">
                <AlertCircle className="text-orange-500 shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-orange-800 dark:text-orange-300">Note: This is AI-generated advice. Always consult a medical professional for specific dietary needs.</p>
             </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nutritional Goal</label>
              <input 
                type="text" 
                name="goal" 
                value={formData.goal}
                onChange={handleInputChange}
                className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-orange-500 focus:border-orange-500"
                placeholder="e.g. Carb Loading, Lean Bulk, Fat Loss"
              />
            </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Daily Calories (Target)</label>
                  <input 
                    type="number" 
                    name="calories" 
                    value={formData.calories}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Meals Per Day</label>
                  <select 
                    name="mealsPerDay" 
                    value={formData.mealsPerDay}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value={3}>3 Meals</option>
                    <option value={4}>4 Meals</option>
                    <option value={5}>5 Meals</option>
                    <option value={6}>6 Meals</option>
                  </select>
                </div>
             </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Dietary Restrictions / Allergies</label>
              <input 
                type="text" 
                name="dietaryRestrictions" 
                value={formData.dietaryRestrictions}
                onChange={handleInputChange}
                className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-orange-500 focus:border-orange-500"
                placeholder="e.g. Vegan, Gluten-Free, Nut Allergy"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex items-center justify-center py-3 px-4 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing Requirements...
                </>
              ) : (
                'Create Nutrition Plan'
              )}
            </button>
          </form>
        </div>

        {/* Output */}
        <div className="order-1 md:order-2">
            {advice ? (
                 <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-orange-100 dark:border-slate-800 p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Leaf size={120} className="text-orange-500" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 relative z-10">Your Nutrition Strategy</h3>
                    <div className="prose prose-slate prose-orange dark:prose-invert max-w-none relative z-10 text-sm">
                        <ReactMarkdown>{advice}</ReactMarkdown>
                    </div>
                </div>
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-orange-50/50 dark:bg-slate-900 rounded-xl border border-orange-100 dark:border-slate-800">
                    <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm mb-4">
                        <Utensils className="text-orange-400 h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Ready to Optimize?</h3>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">Enter your stats to receive a breakdown of macros, meal timing, and hydration tips.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};