import React from 'react';
import { Watch, Heart, Moon, Wind, Activity, Thermometer } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

const heartData = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  bpm: 60 + Math.random() * 60 + (i > 5 && i < 15 ? 40 : 0) // Spike in middle
}));

interface DeviceMetricsProps {
    isDarkMode?: boolean;
}

export const DeviceMetrics: React.FC<DeviceMetricsProps> = ({ isDarkMode }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
            <Watch className="mr-2 text-slate-800 dark:text-slate-200" /> Device Metrics
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Real-time health telemetry synced from your wearable.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full border border-green-100 dark:border-green-800">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span>Synced Just Now</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Heart Rate Card */}
        <div className="col-span-1 md:col-span-2 bg-slate-900 dark:bg-black text-white rounded-xl p-6 shadow-lg border border-slate-800">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-sm font-medium uppercase">Heart Rate</p>
              <h3 className="text-3xl font-bold">142 <span className="text-sm font-normal text-slate-400">BPM</span></h3>
            </div>
            <Heart className="text-red-500 animate-pulse" size={24} />
          </div>
          <div className="h-40 w-full">
             <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={heartData}>
                <defs>
                   <linearGradient id="colorBpm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                   contentStyle={{
                     backgroundColor: isDarkMode ? '#1e293b' : '#1e293b', 
                     border: 'none', 
                     borderRadius: '8px', 
                     color: '#fff'
                   }}
                   itemStyle={{color: '#fff'}}
                />
                <Area type="monotone" dataKey="bpm" stroke="#ef4444" fill="url(#colorBpm)" />
              </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Small Cards */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
           <div className="flex justify-between">
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">SpO2</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">98%</h3>
              </div>
              <Wind className="text-blue-500" size={24} />
           </div>
           <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-4">
              <div className="bg-blue-500 h-2 rounded-full" style={{width: '98%'}}></div>
           </div>
           <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Normal Range</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
           <div className="flex justify-between">
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Sleep</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">7h 42m</h3>
              </div>
              <Moon className="text-purple-500" size={24} />
           </div>
           <div className="mt-2 text-sm">
             <span className="text-purple-600 dark:text-purple-400 font-medium">Deep Sleep:</span> <span className="text-slate-600 dark:text-slate-400">1h 20m</span>
           </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
           <div className="flex justify-between">
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">VO2 Max</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">54</h3>
              </div>
              <Activity className="text-orange-500" size={24} />
           </div>
           <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-2">+2.1 from last month</p>
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
           <div className="flex justify-between">
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Stress</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Low</h3>
              </div>
              <Thermometer className="text-green-500" size={24} />
           </div>
           <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Recovery is optimal</p>
        </div>
      </div>
    </div>
  );
};