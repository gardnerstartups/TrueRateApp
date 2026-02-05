import { useState, useEffect } from 'react';
import { Project, Timeframe } from '@/app/types';
import { StatusBadge } from '@/app/components/StatusBadge';
import { Button } from '@/app/components/ui/button';
import { TimeEntryNotesDialog } from '@/app/components/TimeEntryNotesDialog';
import { Play, Square, ChevronRight } from 'lucide-react';

interface HomeScreenProps {
  currentProject: Project | null;
  onProjectClick: () => void;
  onViewProjectDetails: () => void;
  onCreateTimeEntry?: (duration: number, notes: string) => void;
}

export function HomeScreen({ currentProject, onProjectClick, onViewProjectDetails, onCreateTimeEntry }: HomeScreenProps) {
  const [isTracking, setIsTracking] = useState(false);
  const [timeframe, setTimeframe] = useState<Timeframe>('total');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showNotesDialog, setShowNotesDialog] = useState(false);
  const [completedDuration, setCompletedDuration] = useState(0);

  const timeframes: { value: Timeframe; label: string }[] = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'total', label: 'Total' },
  ];

  const handleToggleTimer = () => {
    if (isTracking) {
      // Stopping timer
      setIsTracking(false);
      setCompletedDuration(elapsedTime);
      setShowNotesDialog(true);
    } else {
      // Starting timer
      setIsTracking(true);
      setElapsedTime(0);
    }
  };

  const handleSaveTimeEntry = (notes: string, startTime?: Date, endTime?: Date) => {
    if (onCreateTimeEntry) {
      let finalDuration = completedDuration;
      
      // If user edited the times, recalculate duration
      if (startTime && endTime) {
        finalDuration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
      }
      
      onCreateTimeEntry(finalDuration, notes);
    }
    setShowNotesDialog(false);
    setElapsedTime(0);
    setCompletedDuration(0);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTracking) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTracking]);

  if (!currentProject) {
    return (
      <div className="min-h-screen bg-[var(--off-white)] pb-24 flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-[var(--navy)] mb-2">No Active Project</h2>
          <p className="text-gray-600 mb-6">Select a project to start tracking time</p>
          <Button
            onClick={onProjectClick}
            className="bg-[var(--teal)] hover:bg-[#358f8b] text-white"
          >
            View Projects
          </Button>
        </div>
      </div>
    );
  }

  const estimatedEarnings = currentProject.totalBudget - currentProject.expenses;
  const hourlyRate = currentProject.timeSpent > 0 ? estimatedEarnings / currentProject.timeSpent : 0;

  return (
    <div className="min-h-screen bg-[var(--off-white)] pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-[var(--light-gray)] px-6 py-4">
          <h2 className="text-[var(--navy)] mb-1">Time Tracking</h2>
          <p className="text-sm text-gray-500">Track your work and earnings</p>
        </div>

        {/* Current Project Card */}
        <div className="p-6">
          <button
            onClick={onViewProjectDetails}
            className="w-full bg-white rounded-2xl shadow-sm p-6 text-left hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-[var(--navy)]">{currentProject.name}</h3>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <StatusBadge status={currentProject.status} />
          </button>
        </div>

        {/* Timer Section */}
        <div className="px-6 pb-6">
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="mb-6">
              <div className="text-6xl font-light text-[var(--navy)] mb-2" style={{ fontFamily: 'var(--font-accent)' }}>
                {Math.floor(elapsedTime / 3600).toString().padStart(2, '0')}:
                {Math.floor((elapsedTime % 3600) / 60).toString().padStart(2, '0')}:
                {(elapsedTime % 60).toString().padStart(2, '0')}
              </div>
              <p className="text-gray-500">Current Session</p>
            </div>

            <Button
              onClick={handleToggleTimer}
              className={`w-full h-16 rounded-xl ${
                isTracking
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-[var(--teal)] hover:bg-[#358f8b]'
              } text-white`}
            >
              {isTracking ? (
                <>
                  <Square className="w-6 h-6 mr-2" />
                  Stop Tracking
                </>
              ) : (
                <>
                  <Play className="w-6 h-6 mr-2" />
                  Start Tracking
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="px-6 pb-4">
          <div className="flex gap-2 overflow-x-auto">
            {timeframes.map((tf) => (
              <button
                key={tf.value}
                onClick={() => setTimeframe(tf.value)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  timeframe === tf.value
                    ? 'bg-[var(--teal)] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-6 pb-6 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Time Spent</p>
                <p className="text-3xl font-light text-[var(--navy)]" style={{ fontFamily: 'var(--font-accent)' }}>
                  {currentProject.timeSpent}
                  <span className="text-lg text-gray-400 ml-1">hrs</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Estimated</p>
                <p className="text-3xl font-light text-[var(--navy)]" style={{ fontFamily: 'var(--font-accent)' }}>
                  {currentProject.estimatedTime}
                  <span className="text-lg text-gray-400 ml-1">hrs</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Earnings</p>
                <p className="text-3xl font-light text-[var(--teal)]" style={{ fontFamily: 'var(--font-accent)' }}>
                  ${estimatedEarnings.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Hourly Rate</p>
                <p className="text-3xl font-light text-[var(--teal)]" style={{ fontFamily: 'var(--font-accent)' }}>
                  ${hourlyRate.toFixed(0)}
                  <span className="text-lg text-gray-400 ml-1">/hr</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showNotesDialog && (
        <TimeEntryNotesDialog
          duration={completedDuration}
          onSave={handleSaveTimeEntry}
        />
      )}
    </div>
  );
}