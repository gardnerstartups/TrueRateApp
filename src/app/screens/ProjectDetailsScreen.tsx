import { Project, TimeEntry } from '@/app/types';
import { StatusBadge } from '@/app/components/StatusBadge';
import { TimeEntriesWidget } from '@/app/components/TimeEntriesWidget';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { ArrowLeft, Calendar, DollarSign, Clock, TrendingUp, Edit2, Trash2, X, Plus, Check, Archive, ArchiveRestore } from 'lucide-react';
import { useState } from 'react';

interface ProjectDetailsScreenProps {
  project: Project;
  timeEntries?: TimeEntry[];
  onBack: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
  onUnarchive?: () => void;
  onUpdateTags?: (tags: string[]) => void;
  onViewAllTimeEntries?: () => void;
  onAddManualTimeEntry?: () => void;
  onUpdateTimeEntry?: (entry: TimeEntry) => void;
}

export function ProjectDetailsScreen({ project, timeEntries, onBack, onEdit, onDelete, onArchive, onUnarchive, onUpdateTags, onViewAllTimeEntries, onAddManualTimeEntry, onUpdateTimeEntry }: ProjectDetailsScreenProps) {
  const netEarnings = project.earnings;
  const hourlyRate = project.timeSpent > 0 ? netEarnings / project.timeSpent : 0;
  const progressPercentage = (project.timeSpent / project.estimatedTime) * 100;
  const remainingHours = Math.max(0, project.estimatedTime - project.timeSpent);
  const dueDate = new Date(project.dueDate);
  const daysUntilDue = Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  const [isEditingTags, setIsEditingTags] = useState(false);
  const [editedTags, setEditedTags] = useState<string[]>(project.tags);
  const [newTagInput, setNewTagInput] = useState('');

  const handleRemoveTag = (tagToRemove: string) => {
    setEditedTags(editedTags.filter(tag => tag !== tagToRemove));
  };

  const handleAddTag = () => {
    if (newTagInput.trim() && !editedTags.includes(newTagInput.trim())) {
      setEditedTags([...editedTags, newTagInput.trim()]);
      setNewTagInput('');
    }
  };

  const handleSaveTags = () => {
    if (onUpdateTags) {
      onUpdateTags(editedTags);
    }
    setIsEditingTags(false);
  };

  const handleCancelEdit = () => {
    setEditedTags(project.tags);
    setNewTagInput('');
    setIsEditingTags(false);
  };

  return (
    <div className="min-h-screen bg-[var(--off-white)] pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-[var(--light-gray)] px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-[var(--navy)]" />
              </button>
              <h2 className="text-[var(--navy)]">Project Details</h2>
            </div>
            <div className="flex items-center gap-2">
              {onEdit && (
                <button
                  onClick={onEdit}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit2 className="w-5 h-5 text-[var(--navy)]" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Project Header */}
        <div className="p-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h1 className="text-[var(--navy)] mb-3" style={{ fontFamily: 'var(--font-accent)' }}>
              {project.name}
            </h1>
            {project.description && (
              <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
            )}
            <div className="flex flex-wrap gap-2 mb-4">
              {isEditingTags ? (
                <div className="w-full space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {editedTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleRemoveTag(tag)}
                        className="inline-flex items-center gap-1 text-xs px-3 py-1 bg-[var(--teal)] bg-opacity-10 text-[var(--teal)] rounded-full font-medium hover:bg-opacity-20 transition-colors"
                      >
                        {tag}
                        <X className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      placeholder="Add new tag"
                      className="flex-1 border-[var(--light-gray)] focus:border-[var(--teal)] focus:ring-[var(--teal)]"
                    />
                    <Button
                      onClick={handleAddTag}
                      className="bg-[var(--teal)] hover:bg-[#358f8b] text-white px-3"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSaveTags}
                      className="flex-1 bg-[var(--teal)] hover:bg-[#358f8b] text-white"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      variant="outline"
                      className="flex-1 border-[var(--light-gray)]"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 bg-[var(--teal)] bg-opacity-10 text-[var(--teal)] rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  <button
                    onClick={() => setIsEditingTags(true)}
                    className="inline-flex items-center gap-1 text-xs px-3 py-1 border border-[var(--light-gray)] text-gray-600 rounded-full font-medium hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    Edit
                  </button>
                </>
              )}
            </div>
            <StatusBadge status={project.status} />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="px-6 pb-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-[var(--navy)] mb-4">Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm">Total Budget</span>
                </div>
                <p className="text-2xl font-light text-[var(--navy)]" style={{ fontFamily: 'var(--font-accent)' }}>
                  ${project.totalBudget.toLocaleString()}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm">Net Earnings</span>
                </div>
                <p className="text-2xl font-light text-[var(--teal)]" style={{ fontFamily: 'var(--font-accent)' }}>
                  ${netEarnings.toLocaleString()}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Time Spent</span>
                </div>
                <p className="text-2xl font-light text-[var(--navy)]" style={{ fontFamily: 'var(--font-accent)' }}>
                  {project.timeSpent}h
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">Hourly Rate</span>
                </div>
                <p className="text-2xl font-light text-[var(--teal)]" style={{ fontFamily: 'var(--font-accent)' }}>
                  ${hourlyRate.toFixed(0)}/hr
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="px-6 pb-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-[var(--navy)] mb-4">Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Time Progress</span>
                  <span className="text-[var(--navy)] font-medium">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      project.status === 'behind'
                        ? 'bg-red-500'
                        : project.status === 'slow'
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Estimated</p>
                  <p className="font-medium text-[var(--navy)]">{project.estimatedTime}h</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Spent</p>
                  <p className="font-medium text-[var(--navy)]">{project.timeSpent}h</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Remaining</p>
                  <p className="font-medium text-[var(--navy)]">{remainingHours}h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="px-6 pb-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-[var(--navy)] mb-4">Timeline</h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[var(--teal)] bg-opacity-10 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[var(--teal)]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Due Date</p>
                <p className="font-medium text-[var(--navy)]">
                  {dueDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {daysUntilDue > 0 ? `${daysUntilDue} days remaining` : daysUntilDue === 0 ? 'Due today' : 'Overdue'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Breakdown */}
        <div className="px-6 pb-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-[var(--navy)] mb-4">Financial Breakdown</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-[var(--light-gray)]">
                <span className="text-gray-600">Total Budget</span>
                <span className="font-medium text-[var(--navy)]">${project.totalBudget.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[var(--light-gray)]">
                <span className="text-gray-600">Expenses</span>
                <span className="font-medium text-red-600">-${project.expenses.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="font-medium text-[var(--navy)]">Net Earnings</span>
                <span className="font-semibold text-[var(--teal)] text-lg">
                  ${netEarnings.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Time Entries Widget */}
        <div className="px-6 pb-6">
          <TimeEntriesWidget
            latestEntry={timeEntries && timeEntries.length > 0 ? timeEntries[0] : undefined}
            onViewAll={onViewAllTimeEntries || (() => {})}
            onUpdateEntry={onUpdateTimeEntry}
          />
          {onAddManualTimeEntry && (
            <div className="mt-3">
              <Button
                onClick={onAddManualTimeEntry}
                variant="outline"
                className="w-full border-[var(--light-gray)] h-11 rounded-xl"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Manual Entry
              </Button>
            </div>
          )}
        </div>

        {/* Actions */}
        {onDelete && (
          <div className="px-6 pb-6">
            <Button
              onClick={onDelete}
              variant="outline"
              className="w-full border-red-200 text-red-600 hover:bg-red-50 h-12 rounded-xl"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Delete Project
            </Button>
          </div>
        )}
        {onArchive && (
          <div className="px-6 pb-6">
            <Button
              onClick={onArchive}
              variant="outline"
              className="w-full border-[var(--light-gray)] text-[var(--navy)] hover:bg-gray-50 h-12 rounded-xl"
            >
              <Archive className="w-5 h-5 mr-2" />
              Archive Project
            </Button>
          </div>
        )}
        {onUnarchive && (
          <div className="px-6 pb-6">
            <Button
              onClick={onUnarchive}
              variant="outline"
              className="w-full border-[var(--light-gray)] text-[var(--navy)] hover:bg-gray-50 h-12 rounded-xl"
            >
              <ArchiveRestore className="w-5 h-5 mr-2" />
              Unarchive Project
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}