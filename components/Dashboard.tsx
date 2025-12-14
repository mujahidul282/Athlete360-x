import React from 'react';
import { View } from '../types';
import { Activity, Flame, Timer, ArrowRight, Dumbbell, Utensils, MessageSquareText } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

interface DashboardProps {
  onViewChange: (view: View) => void;
  isDarkMode?: boolean;
}

const data = [
  { name: 'Mon', load: 400, recovery: 240 },
  { name: 'Tue', load: 300, recovery: 139 },
  { name: 'Wed', load: 550, recovery: 980 },
  { name: 'Thu', load: 450, recovery: 390 },
  { name: 'Fri', load: 600, recovery: 480 },
  { name: 'Sat', load: 700, recovery: 380 },
  { name: 'Sun', load: 200, recovery: 430 },
];

export const Dashboard: React.FC<DashboardProps> = ({ onViewChange, isDarkMode }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome back, Athlete. Here's your daily breakdown.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Training Load', value: '2,450', unit: 'kg', icon: <Dumbbell className="text-white" size={24} />, color: 'bg-blue-500', trend: '+12%' },
          { title: 'Calories Burned', value: '12,300', unit: 'kcal', icon: <Flame className="text-white" size={24} />, color: 'bg-orange-500', trend: '+5%' },
          { title: 'Active Time', value: '14.5', unit: 'hrs', icon: <Timer className="text-white" size={24} />, color: 'bg-emerald-500', trend: '-2%' },
          { title: 'Recovery Score', value: '92', unit: '/100', icon: <Activity className="text-white" size={24} />, color: 'bg-purple-500', trend: '+8%' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
                <div className="flex items-baseline mt-2 space-x-1">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
                  <span className="text-sm text-slate-500 dark:text-slate-500">{stat.unit}</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} shadow-lg shadow-slate-200 dark:shadow-none`}>
                {stat.icon}
              </div>
            </div>
            <div className={`mt-4 text-sm font-medium ${stat.trend.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
              {stat.trend} <span className="text-slate-400 dark:text-slate-600 font-normal">from last week</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Performance Trend</h3>
            <select className="text-sm border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-md text-slate-600 dark:text-slate-300 focus:ring-blue-500 focus:border-blue-500">
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1e293b' : '#e2e8f0'} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#94a3b8' : '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#94a3b8' : '#64748b'}} />
                <Tooltip 
                  contentStyle={{
                    borderRadius: '8px', 
                    border: isDarkMode ? '1px solid #1e293b' : 'none', 
                    backgroundColor: isDarkMode ? '#0f172a' : '#fff',
                    color: isDarkMode ? '#fff' : '#000',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Area type="monotone" dataKey="load" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorLoad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 rounded-xl shadow-lg p-6 text-white flex flex-col justify-between border border-slate-800">
          <div>
            <h3 className="text-lg font-bold mb-2">AI Assistant</h3>
            <p className="text-slate-300 text-sm mb-6">
              Need a new plan? Your AI coach is ready to help you optimize your training and nutrition.
            </p>
            
            <div className="space-y-3">
              <button 
                onClick={() => onViewChange('workouts')}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors group"
              >
                <span className="flex items-center"><Dumbbell className="mr-3 h-5 w-5" /> Generate Workout</span>
                <ArrowRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </button>
              <button 
                onClick={() => onViewChange('nutrition')}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors group"
              >
                <span className="flex items-center"><Utensils className="mr-3 h-5 w-5" /> Get Nutrition Plan</span>
                <ArrowRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </button>
               <button 
                onClick={() => onViewChange('coach')}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors group"
              >
                <span className="flex items-center"><MessageSquareText className="mr-3 h-5 w-5" /> Ask Coach</span>
                <ArrowRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Next Session</span>
                <span className="font-semibold text-blue-400">Today, 5:00 PM</span>
            </div>
             <p className="font-medium mt-1">HIIT Cardio & Core</p>
          </div>
        </div>
      </div>
    </div>
  );
};