import React, { useState } from 'react';
import { Target, PlayCircle, Filter } from 'lucide-react';
import { Drill } from '../types';

export const TrainingDrills: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const drills: Drill[] = [
    { id: '1', name: 'Ladder Drills', category: 'Physical', difficulty: 'Easy', image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&q=80&w=300' },
    { id: '2', name: 'Cone Weaving', category: 'Technical', difficulty: 'Medium', image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=300' },
    { id: '3', name: 'Defensive Positioning', category: 'Tactical', difficulty: 'Hard', image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=300' },
    { id: '4', name: 'Box Jumps', category: 'Physical', difficulty: 'Medium', image: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80&w=300' },
  ];

  const filteredDrills = filter === 'All' ? drills : drills.filter(d => d.category === filter);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
          <Target className="mr-2 text-indigo-500" /> Training Library
        </h2>
        <p className="text-slate-500 dark:text-slate-400">Master your craft with visual guides and expert techniques.</p>
      </div>

      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {['All', 'Physical', 'Technical', 'Tactical'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border ${
              filter === cat 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredDrills.map(drill => (
          <div key={drill.id} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="relative h-48 bg-slate-200 dark:bg-slate-800">
               <img src={drill.image} alt={drill.name} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                  <PlayCircle className="text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300" size={48} />
               </div>
               <span className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                 {drill.category}
               </span>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                 <h3 className="font-bold text-slate-900 dark:text-white">{drill.name}</h3>
                 <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                   drill.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' :
                   drill.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
                 }`}>{drill.difficulty}</span>
              </div>
              <button className="w-full mt-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300">
                View Drill Details &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};