import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { Input } from '@/app/components/ui/input';
import { X } from 'lucide-react';

interface ManualTimeEntryDialogProps {
  onSave: (startTime: Date, endTime: Date, notes: string) => void;
  onClose: () => void;
}

export function ManualTimeEntryDialog({ onSave, onClose }: ManualTimeEntryDialogProps) {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

  const [startDate, setStartDate] = useState(oneHourAgo.toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState(
    oneHourAgo.toTimeString().substring(0, 5)
  );
  const [endDate, setEndDate] = useState(now.toISOString().split('T')[0]);
  const [endTime, setEndTime] = useState(now.toTimeString().substring(0, 5));
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);

    if (end <= start) {
      alert('End time must be after start time');
      return;
    }

    onSave(start, end, notes);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[var(--navy)]">Add Manual Time Entry</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate" className="text-[var(--navy)]">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1.5 border-[var(--light-gray)]"
              />
            </div>
            <div>
              <Label htmlFor="startTime" className="text-[var(--navy)]">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="mt-1.5 border-[var(--light-gray)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="endDate" className="text-[var(--navy)]">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1.5 border-[var(--light-gray)]"
              />
            </div>
            <div>
              <Label htmlFor="endTime" className="text-[var(--navy)]">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="mt-1.5 border-[var(--light-gray)]"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="manualNotes" className="text-[var(--navy)]">Notes</Label>
            <Textarea
              id="manualNotes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What did you work on?"
              rows={4}
              className="mt-1.5 border-[var(--light-gray)] focus:border-[var(--teal)] focus:ring-[var(--teal)] resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-[var(--light-gray)]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-[var(--teal)] hover:bg-[#358f8b] text-white"
          >
            Save Entry
          </Button>
        </div>
      </div>
    </div>
  );
}
