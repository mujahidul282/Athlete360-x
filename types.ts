import React from 'react';

export type View = 
  | 'login'
  | 'profile'
  | 'media'
  | 'dashboard' 
  | 'workouts' 
  | 'nutrition' 
  | 'coach' 
  | 'injuries' 
  | 'career' 
  | 'training' 
  | 'metrics' 
  | 'jobs' 
  | 'events';

export interface NavItem {
  id: View;
  label: string;
  icon: React.ReactNode;
  category?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  age: number;
  gender: string;
  sport: string;
  skillLevel: string;
  height: number; // cm
  weight: number; // kg
}

export interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface WorkoutPlanRequest {
  goal: string;
  fitnessLevel: string;
  daysPerWeek: number;
  equipment: string;
  duration: number;
}

export interface NutritionRequest {
  goal: string;
  dietaryRestrictions: string;
  mealsPerDay: number;
  calories?: number;
}

export interface Injury {
  id: string;
  type: string;
  date: string;
  doctor: string;
  status: 'Active' | 'Recovering' | 'Resolved';
  painLevel: number; // 1-10
}

export interface Tournament {
  id: string;
  name: string;
  date: string;
  prizePool: string;
  location: string;
  status: 'Open' | 'Registered' | 'Completed';
}

export interface Job {
  id: string;
  title: string;
  organization: string;
  type: 'Government' | 'Private' | 'Sponsorship';
  salary: string;
  deadline: string;
}

export interface Drill {
  id: string;
  name: string;
  category: 'Tactical' | 'Technical' | 'Physical';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  image: string;
}