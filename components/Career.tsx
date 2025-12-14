import React, { useState } from 'react';
import { Trophy, DollarSign, MapPin, Users, Calendar } from 'lucide-react';
import { Tournament } from '../types';

export const Career: React.FC = () => {
  const [tab, setTab] = useState<'tournaments' | 'coaching'>('tournaments');

  const tournaments: Tournament[] = [
    { id: '1', name: 'State Athletics Championship', date: '2024-06-15', prizePool: '$5,000', location: 'City Stadium', status: 'Open' },
    { id: '2', name: 'Regional Marathon', date: '2024-07-20', prizePool: '$2,500', location: 'Downtown', status: 'Registered' },
    { id: '3', name: 'Elite Sprint Series', date: '2024-08-10', prizePool: '$10,000', location: 'National Sports Complex', status: 'Open' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
          <Trophy className="mr-2 text-yellow-500" /> Career & Finance
        </h2>
        <p className="text-slate-500 dark:text-slate-400">Manage earnings, tournaments, and coaching opportunities.</p>
      </div>

      <div className="flex space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg w-fit">
        <button 
          onClick={() => setTab('tournaments')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${tab === 'tournaments' ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
        >
          Tournaments
        </button>
        <button 
          onClick={() => setTab('coaching')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${tab === 'coaching' ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
        >
          Paid Coaching
        </button>
      </div>

      {tab === 'tournaments' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map(t => (
            <div key={t.id} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-blue-300 dark:hover:border-blue-700 transition-all">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Trophy size={80} className="text-yellow-500" />
               </div>
               <div className="relative z-10">
                 <span className={`text-xs font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 mb-2 inline-block`}>{t.status}</span>
                 <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{t.name}</h3>
                 <div className="space-y-2 mt-4 text-sm text-slate-600 dark:text-slate-400">
                    <p className="flex items-center"><Calendar size={14} className="mr-2 text-slate-400"/> {t.date}</p>
                    <p className="flex items-center"><MapPin size={14} className="mr-2 text-slate-400"/> {t.location}</p>
                    <p className="flex items-center font-semibold text-green-600 dark:text-green-400"><DollarSign size={14} className="mr-2"/> Prize Pool: {t.prizePool}</p>
                 </div>
                 <button className="w-full mt-4 bg-slate-900 dark:bg-slate-800 text-white py-2 rounded-lg text-sm hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors">
                   {t.status === 'Open' ? 'Register Now' : 'View Details'}
                 </button>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 text-center">
           <div className="max-w-md mx-auto">
             <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-green-600 dark:text-green-400" size={32} />
             </div>
             <h3 className="text-xl font-bold text-slate-900 dark:text-white">Become a Mentor</h3>
             <p className="text-slate-500 dark:text-slate-400 mt-2 mb-6">Earn money by coaching junior athletes. Set your hourly rate and availability.</p>
             
             <div className="grid grid-cols-2 gap-4 text-left mb-6">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                   <p className="text-xs text-slate-500 dark:text-slate-400">Current Rate</p>
                   <p className="font-bold text-lg text-slate-900 dark:text-white">$40/hr</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                   <p className="text-xs text-slate-500 dark:text-slate-400">Active Students</p>
                   <p className="font-bold text-lg text-slate-900 dark:text-white">3</p>
                </div>
             </div>
             
             <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
               Manage Coaching Profile
             </button>
           </div>
        </div>
      )}
    </div>
  );
};