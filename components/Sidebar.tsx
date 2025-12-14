import React from 'react';
import { 
  LayoutDashboard, Dumbbell, Utensils, MessageSquareText, Activity, X, 
  Stethoscope, Briefcase, Trophy, Target, Watch, UserCircle, Video, Sun, Moon
} from 'lucide-react';
import { View, NavItem } from '../types';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, isOpen, setIsOpen, isDarkMode, toggleTheme }) => {
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, category: 'Overview' },
    { id: 'metrics', label: 'Device Metrics', icon: <Watch size={20} />, category: 'Overview' },
    { id: 'profile', label: 'My Profile', icon: <UserCircle size={20} />, category: 'Overview' },
    
    { id: 'workouts', label: 'Workout Planner', icon: <Dumbbell size={20} />, category: 'Training' },
    { id: 'training', label: 'Training Drills', icon: <Target size={20} />, category: 'Training' },
    { id: 'media', label: 'Media Hub', icon: <Video size={20} />, category: 'Training' },
    { id: 'coach', label: 'AI Coach', icon: <MessageSquareText size={20} />, category: 'Training' },

    { id: 'nutrition', label: 'Nutrition', icon: <Utensils size={20} />, category: 'Health' },
    { id: 'injuries', label: 'Injuries & Reports', icon: <Stethoscope size={20} />, category: 'Health' },

    { id: 'career', label: 'Career & Finance', icon: <Trophy size={20} />, category: 'Career' },
    { id: 'jobs', label: 'Jobs', icon: <Briefcase size={20} />, category: 'Career' },
    { id: 'events', label: 'Events', icon: <Activity size={20} />, category: 'Career' },
  ];

  const categories = Array.from(new Set(navItems.map(item => item.category)));

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-30 w-64 bg-slate-900 dark:bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 flex flex-col h-full overflow-y-auto border-r border-slate-800
      `}>
        <div className="p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <Activity className="text-blue-500" size={28} />
            <span className="text-2xl font-bold tracking-tight">Athlete<span className="text-blue-500">360</span></span>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 pb-4 space-y-6">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">
                {category}
              </h3>
              <div className="space-y-1">
                {navItems.filter(item => item.category === category).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onViewChange(item.id);
                      if (window.innerWidth < 768) setIsOpen(false);
                    }}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200
                      ${currentView === item.id 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                    `}
                  >
                    {item.icon}
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 shrink-0 space-y-4">
           {/* Dark Mode Toggle */}
          <button 
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-4 py-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <span className="text-sm font-medium text-slate-300 flex items-center">
              {isDarkMode ? <Moon size={16} className="mr-2" /> : <Sun size={16} className="mr-2" />}
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
            <div className={`w-8 h-4 bg-slate-900 rounded-full relative border border-slate-600`}>
              <div className={`absolute top-0.5 bottom-0.5 w-3 h-3 bg-slate-400 rounded-full transition-all duration-300 ${isDarkMode ? 'right-0.5 bg-blue-500' : 'left-0.5'}`}></div>
            </div>
          </button>

          <div className="flex items-center space-x-3 cursor-pointer hover:bg-slate-800 p-2 rounded-lg transition-colors" onClick={() => onViewChange('profile')}>
             <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">JD</div>
             <div className="text-sm">
                <p className="font-medium">John Doe</p>
                <p className="text-xs text-slate-500">Pro Member</p>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};