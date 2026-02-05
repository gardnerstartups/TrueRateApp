import { useState } from 'react';
import { TimeEntry } from '@/app/types';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { Clock, ChevronRight, Edit2, Check, X } from 'lucide-react';

interface TimeEntriesWidgetProps {
  latestEntry?: TimeEntry;
  onViewAll: () => void;
  onUpdateEntry?: (entry: TimeEntry) => void;
}

export function TimeEntriesWidget({ latestEntry, onViewAll, onUpdateEntry }: TimeEntriesWidgetProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEntry, setEditedEntry] = useState<TimeEntry | null>(null);

  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const handleStartEdit = () => {
    if (latestEntry) {
      setEditedEntry({ ...latestEntry });
      setIsEditing(true);
    }
  };

  const handleSaveEdit = () => {
    if (editedEntry && onUpdateEntry) {
      const start = new Date(editedEntry.startTime);
      const end = editedEntry.endTime ? new Date(editedEntry.endTime) : new Date();
      const duration = Math.floor((end.getTime() - start.getTime()) / 1000);
      onUpdateEntry({ ...editedEntry, duration });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedEntry(null);
    setIsEditing(false);
  };

  if (!latestEntry) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
        <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 mb-4">No time entries yet</p>
        <Button
          onClick={onViewAll}
          variant="outline"
          className="border-[var(--light-gray)]"
        >
          View All Entries
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[var(--navy)]">Latest Time Entry</h3>
        {!isEditing && onUpdateEntry && (
          <button
            onClick={handleStartEdit}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4 text-gray-600" />
          </button>
        )}
      </div>

      {isEditing && editedEntry ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-gray-500">Start Time</Label>
              <Input
                type="datetime-local"
                value={new Date(editedEntry.startTime).toISOString().slice(0, 16)}
                onChange={(e) =>
                  setEditedEntry({
                    ...editedEntry,
                    startTime: new Date(e.target.value),
                  })
                }
                className="mt-1 text-sm border-[var(--light-gray)]"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-500">End Time</Label>
              <Input
                type="datetime-local"
                value={
                  editedEntry.endTime
                    ? new Date(editedEntry.endTime).toISOString().slice(0, 16)
                    : ''
                }
                onChange={(e) =>
                  setEditedEntry({
                    ...editedEntry,
                    endTime: new Date(e.target.value),
                  })
                }
                className="mt-1 text-sm border-[var(--light-gray)]"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs text-gray-500">Notes</Label>
            <Textarea
              value={editedEntry.notes || ''}
              onChange={(e) =>
                setEditedEntry({ ...editedEntry, notes: e.target.value })
              }
              rows={3}
              className="mt-1 text-sm border-[var(--light-gray)] resize-none"
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleSaveEdit}
              className="flex-1 bg-[var(--teal)] hover:bg-[#358f8b] text-white"
              size="sm"
            >
              <Check className="w-4 h-4 mr-1" />
              Save
            </Button>
            <Button
              onClick={handleCancelEdit}
              variant="outline"
              className="flex-1 border-[var(--light-gray)]"
              size="sm"
            >
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[var(--teal)] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-[var(--teal)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium text-[var(--navy)]">
                    {formatDuration(latestEntry.duration)}
                  </p>
                </div>
                <div className="text-xs text-gray-400">
                  {formatDateTime(latestEntry.startTime)}
                  {latestEntry.endTime && ` - ${formatDateTime(latestEntry.endTime)}`}
                </div>
              </div>
            </div>

            {latestEntry.notes && (
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {latestEntry.notes}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={onViewAll}
            className="w-full flex items-center justify-center gap-2 py-3 text-[var(--teal)] hover:bg-[var(--teal)] hover:bg-opacity-5 rounded-lg transition-colors"
          >
            <span className="font-medium">View All Entries</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
}
