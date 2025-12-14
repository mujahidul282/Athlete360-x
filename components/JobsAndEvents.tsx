import React from 'react';
import { Briefcase, Activity, MapPin, Calendar, Building, DollarSign } from 'lucide-react';
import { Job, View } from '../types';

interface JobsAndEventsProps {
    type: View; // 'jobs' or 'events'
}

export const JobsAndEvents: React.FC<JobsAndEventsProps> = ({ type }) => {
  const jobs: Job[] = [
    { id: '1', title: 'Police Constable (Sports Quota)', organization: 'State Police', type: 'Government', salary: '$35,000/yr', deadline: '2024-12-01' },
    { id: '2', title: 'Athletics Coach', organization: 'City Sports Authority', type: 'Government', salary: '$42,000/yr', deadline: '2024-11-15' },
    { id: '3', title: 'Brand Ambassador', organization: 'Nike Regional', type: 'Sponsorship', salary: '$10,000/contract', deadline: 'Open' },
  ];

  const events = [
    { id: '1', name: 'City 5k Run', location: 'Central Park', date: 'Oct 25, 2024', type: 'Community' },
    { id: '2', name: 'Open Badminton Meetup', location: 'Sports Hub', date: 'Oct 28, 2024', type: 'Meetup' },
    { id: '3', name: 'Yoga for Athletes', location: 'Wellness Center', date: 'Nov 01, 2024', type: 'Workshop' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
          {type === 'jobs' ? <Briefcase className="mr-2 text-slate-700 dark:text-slate-300" /> : <Activity className="mr-2 text-slate-700 dark:text-slate-300" />}
          {type === 'jobs' ? 'Sports Jobs & Opportunities' : 'Events & Meetups'}
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
            {type === 'jobs' 
                ? 'Secure your future with sports quota jobs and sponsorship deals.' 
                : 'Discover what is happening near you.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {type === 'jobs' ? (
            jobs.map(job => (
                <div key={job.id} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500 transition-colors">
                    <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded mb-3 inline-block ${
                        job.type === 'Government' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200' : 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200'
                    }`}>
                        {job.type}
                    </span>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{job.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 flex items-center"><Building size={14} className="mr-1"/> {job.organization}</p>
                    
                    <div className="space-y-2 text-sm border-t border-slate-100 dark:border-slate-800 pt-3">
                        <div className="flex justify-between">
                            <span className="text-slate-500 dark:text-slate-400">Salary</span>
                            <span className="font-semibold text-slate-800 dark:text-slate-200">{job.salary}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="text-slate-500 dark:text-slate-400">Deadline</span>
                            <span className="font-semibold text-red-600 dark:text-red-400">{job.deadline}</span>
                        </div>
                    </div>
                    <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700">Apply Now</button>
                </div>
            ))
        ) : (
             events.map(event => (
                <div key={event.id} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-green-500 transition-colors">
                     <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">{event.name}</h3>
                        <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded text-center min-w-[50px]">
                            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">{event.date.split(' ')[0]}</p>
                            <p className="font-bold text-slate-900 dark:text-white">{event.date.split(' ')[1].replace(',','')}</p>
                        </div>
                     </div>
                     <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 flex items-center"><MapPin size={14} className="mr-1"/> {event.location}</p>
                     <button className="w-full mt-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 py-2 rounded-lg text-sm hover:bg-slate-50 dark:hover:bg-slate-800">View Details</button>
                </div>
            ))
        )}
      </div>
    </div>
  );
};