import { TimeEntry } from '@/app/types';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft, Clock, Calendar, Plus } from 'lucide-react';

interface AllTimeEntriesScreenProps {
  entries: TimeEntry[];
  projectName: string;
  onBack: () => void;
  onAddManual: () => void;
}

export function AllTimeEntriesScreen({ entries, projectName, onBack, onAddManual }: AllTimeEntriesScreenProps) {
  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }
    return `${secs}s`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const totalDuration = entries.reduce((sum, entry) => sum + entry.duration, 0);
  const totalHours = (totalDuration / 3600).toFixed(1);

  // Group entries by date
  const groupedEntries = entries.reduce((groups: Record<string, TimeEntry[]>, entry) => {
    const dateKey = new Date(entry.startTime).toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(entry);
    return groups;
  }, {});

  return (
    <div className="min-h-screen bg-[var(--off-white)] pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-[var(--light-gray)] px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[var(--navy)]" />
            </button>
            <div className="flex-1">
              <h2 className="text-[var(--navy)]">Time Entries</h2>
              <p className="text-sm text-gray-500">{projectName}</p>
            </div>
          </div>
          <Button
            onClick={onAddManual}
            className="w-full bg-[var(--teal)] hover:bg-[#358f8b] text-white h-11 rounded-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Manual Entry
          </Button>
        </div>

        {/* Summary */}
        <div className="p-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Time Tracked</p>
                <p className="text-3xl font-light text-[var(--teal)]" style={{ fontFamily: 'var(--font-accent)' }}>
                  {totalHours}
                  <span className="text-lg text-gray-400 ml-1">hrs</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">Total Entries</p>
                <p className="text-3xl font-light text-[var(--navy)]" style={{ fontFamily: 'var(--font-accent)' }}>
                  {entries.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Entries List */}
        <div className="px-6 pb-6">
          {entries.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">No time entries yet</p>
              <p className="text-sm text-gray-400">
                Start tracking time or add a manual entry
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedEntries).map(([dateKey, dayEntries]) => (
                <div key={dateKey}>
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <h3 className="text-sm font-medium text-gray-600">
                      {formatDate(new Date(dateKey))}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {dayEntries.map((entry) => (
                      <div key={entry.id} className="bg-white rounded-xl shadow-sm p-5">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 bg-[var(--teal)] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Clock className="w-5 h-5 text-[var(--teal)]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-[var(--navy)]">
                                {formatDuration(entry.duration)}
                              </p>
                              <p className="text-xs text-gray-400">
                                {new Date(entry.startTime).toLocaleTimeString('en-US', {
                                  hour: 'numeric',
                                  minute: '2-digit',
                                })}
                              </p>
                            </div>
                            {entry.endTime && (
                              <p className="text-xs text-gray-500">
                                {formatDateTime(entry.startTime)} - {formatDateTime(entry.endTime)}
                              </p>
                            )}
                          </div>
                        </div>
                        {entry.notes && (
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {entry.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
