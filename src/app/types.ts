export type EfficiencyStatus = 'behind' | 'slow' | 'onTrack' | 'ahead';

export interface Project {
  id: string;
  name: string;
  description?: string;
  totalBudget: number;
  expenses: number;
  estimatedTime: number;
  timeSpent: number;
  dueDate: string;
  tags: string[];
  status: EfficiencyStatus;
  earnings: number;
  isActive: boolean;
  isArchived?: boolean;
}

export interface User {
  name: string;
  email: string;
  industry: string;
  notificationPreferences: {
    projectReminders: boolean;
    weeklyReports: boolean;
    insights: boolean;
  };
}

export interface TimeEntry {
  id: string;
  projectId: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in seconds
  notes?: string;
}

export interface Insight {
  id: string;
  type: 'warning' | 'info' | 'success';
  title: string;
  description: string;
}

export type Timeframe = 'day' | 'week' | 'month' | 'year' | 'total';