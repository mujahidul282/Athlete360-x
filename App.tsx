import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { WorkoutPlanner } from './components/WorkoutPlanner';
import { NutritionAdvisor } from './components/NutritionAdvisor';
import { AICoach } from './components/AICoach';
import { Injuries } from './components/Injuries';
import { Career } from './components/Career';
import { TrainingDrills } from './components/TrainingDrills';
import { DeviceMetrics } from './components/DeviceMetrics';
import { JobsAndEvents } from './components/JobsAndEvents';
import { Login } from './components/Login';
import { Profile } from './components/Profile';
import { MediaHub } from './components/MediaHub';
import { View, UserProfile } from './types';

const App: React.FC = () => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  // View State
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handlers
  const handleLogin = (userProfile: UserProfile) => {
    setUser(userProfile);
    setIsAuthenticated(true);
  };

  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    setUser(updatedProfile);
  };

  // Render Logic
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onViewChange={setCurrentView} isDarkMode={isDarkMode} />;
      case 'profile':
        return user ? <Profile user={user} onUpdate={handleUpdateProfile} /> : null;
      case 'media':
        return <MediaHub />;
      case 'workouts':
        return <WorkoutPlanner />;
      case 'nutrition':
        return <NutritionAdvisor />;
      case 'coach':
        return <AICoach />;
      case 'injuries':
        return <Injuries />;
      case 'career':
        return <Career />;
      case 'training':
        return <TrainingDrills />;
      case 'metrics':
        return <DeviceMetrics isDarkMode={isDarkMode} />;
      case 'jobs':
        return <JobsAndEvents type="jobs" />;
      case 'events':
        return <JobsAndEvents type="events" />;
      default:
        return <Dashboard onViewChange={setCurrentView} isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300`}>
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
      />
      
      <main className="flex-1 relative overflow-y-auto focus:outline-none transition-all duration-300 ease-in-out">
        <header className="bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-10 px-6 py-4 flex items-center justify-between md:hidden border-b border-slate-200 dark:border-slate-800">
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">Athlete360</h1>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
        </header>

        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
           {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;