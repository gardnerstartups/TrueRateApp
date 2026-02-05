import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { Input } from '@/app/components/ui/input';
import { Clock, Edit2, Check } from 'lucide-react';

interface TimeEntryNotesDialogProps {
  duration: number;
  onSave: (notes: string, startTime?: Date, endTime?: Date) => void;
}

export function TimeEntryNotesDialog({ duration, onSave }: TimeEntryNotesDialogProps) {
  const now = new Date();
  const calculatedStartTime = new Date(now.getTime() - duration * 1000);
  
  const [notes, setNotes] = useState('');
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [startTime, setStartTime] = useState(calculatedStartTime);
  const [endTime, setEndTime] = useState(now);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentDuration = () => {
    return Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
  };

  const handleSave = () => {
    if (isEditingTime) {
      onSave(notes, startTime, endTime);
    } else {
      onSave(notes);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[var(--teal)] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-[var(--teal)]" />
          </div>
          <h2 className="text-[var(--navy)] mb-2">Time Entry Complete</h2>
          <p className="text-4xl font-light text-[var(--teal)] mb-1" style={{ fontFamily: 'var(--font-accent)' }}>
            {formatDuration(isEditingTime ? getCurrentDuration() : duration)}
          </p>
          <div className="flex items-center justify-center gap-2">
            <p className="text-sm text-gray-500">Session duration</p>
            <button
              onClick={() => setIsEditingTime(!isEditingTime)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              title={isEditingTime ? "Done editing" : "Edit time"}
            >
              {isEditingTime ? (
                <Check className="w-4 h-4 text-[var(--teal)]" />
              ) : (
                <Edit2 className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {isEditingTime && (
          <div className="space-y-4 mb-6">
            <div>
              <Label htmlFor="startTime" className="text-[var(--navy)] mb-1.5 block text-sm">
                Start Time
              </Label>
              <Input
                id="startTime"
                type="datetime-local"
                value={startTime.toISOString().slice(0, 16)}
                onChange={(e) => setStartTime(new Date(e.target.value))}
                className="border-[var(--light-gray)] focus:border-[var(--teal)] focus:ring-[var(--teal)]"
              />
            </div>

            <div>
              <Label htmlFor="endTime" className="text-[var(--navy)] mb-1.5 block text-sm">
                End Time
              </Label>
              <Input
                id="endTime"
                type="datetime-local"
                value={endTime.toISOString().slice(0, 16)}
                onChange={(e) => setEndTime(new Date(e.target.value))}
                className="border-[var(--light-gray)] focus:border-[var(--teal)] focus:ring-[var(--teal)]"
              />
            </div>
          </div>
        )}

        <div className="mb-6">
          <Label htmlFor="notes" className="text-[var(--navy)] mb-2 block">
            What did you work on?
          </Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about this session (optional)"
            rows={4}
            className="border-[var(--light-gray)] focus:border-[var(--teal)] focus:ring-[var(--teal)] resize-none"
          />
        </div>

        <Button
          onClick={handleSave}
          className="w-full bg-[var(--teal)] hover:bg-[#358f8b] text-white h-12 rounded-xl"
        >
          Done
        </Button>
      </div>
    </div>
  );
}