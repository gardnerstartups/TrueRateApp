import { useState } from 'react';
import { Project } from '@/app/types';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { ArrowLeft, X } from 'lucide-react';

interface CreateProjectScreenProps {
  onBack: () => void;
  onCreateProject: (project: Omit<Project, 'id' | 'timeSpent' | 'status' | 'earnings' | 'isActive'>) => void;
}

export function CreateProjectScreen({ onBack, onCreateProject }: CreateProjectScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dueDate: '',
    totalBudget: '',
    estimatedTime: '',
    expenses: '',
    tags: [] as string[],
    tagInput: '',
  });

  const handleAddTag = () => {
    if (formData.tagInput.trim() && !formData.tags.includes(formData.tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.tagInput.trim()],
        tagInput: '',
      });
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateProject({
      name: formData.name,
      description: formData.description,
      dueDate: formData.dueDate,
      totalBudget: parseFloat(formData.totalBudget),
      estimatedTime: parseFloat(formData.estimatedTime),
      expenses: parseFloat(formData.expenses) || 0,
      tags: formData.tags,
    });
  };

  return (
    <div className="min-h-screen bg-[var(--off-white)] pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-[var(--light-gray)] px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[var(--navy)]" />
            </button>
            <h2 className="text-[var(--navy)]">Create Project</h2>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
            <div>
              <Label htmlFor="projectName" className="text-[var(--navy)]">Project Name</Label>
              <Input
                id="projectName"
                type="text"
                placeholder="Enter project name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="mt-1.5 border-[var(--light-gray)] focus:border-[var(--teal)] focus:ring-[var(--teal)]"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-[var(--navy)]">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Brief project description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="mt-1.5 border-[var(--light-gray)] focus:border-[var(--teal)] focus:ring-[var(--teal)] resize-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
            <div>
              <Label htmlFor="dueDate" className="text-[var(--navy)]">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                required
                className="mt-1.5 border-[var(--light-gray)] focus:border-[var(--teal)] focus:ring-[var(--teal)]"
              />
            </div>

            <div>
              <Label htmlFor="totalBudget" className="text-[var(--navy)]">Total Budget ($)</Label>
              <Input
                id="totalBudget"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.totalBudget}
                onChange={(e) => setFormData({ ...formData, totalBudget: e.target.value })}
                required
                className="mt-1.5 border-[var(--light-gray)] focus:border-[var(--teal)] focus:ring-[var(--teal)]"
              />
            </div>

            <div>
              <Label htmlFor="estimatedTime" className="text-[var(--navy)]">Estimated Time (hours)</Label>
              <Input
                id="estimatedTime"
                type="number"
                step="0.5"
                placeholder="0"
                value={formData.estimatedTime}
                onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
                required
                className="mt-1.5 border-[var(--light-gray)] focus:border-[var(--teal)] focus:ring-[var(--teal)]"
              />
            </div>

            <div>
              <Label htmlFor="expenses" className="text-[var(--navy)]">Expenses ($)</Label>
              <Input
                id="expenses"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.expenses}
                onChange={(e) => setFormData({ ...formData, expenses: e.target.value })}
                className="mt-1.5 border-[var(--light-gray)] focus:border-[var(--teal)] focus:ring-[var(--teal)]"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
            <div>
              <Label htmlFor="tags" className="text-[var(--navy)]">Tags</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  id="tags"
                  type="text"
                  placeholder="Add a tag"
                  value={formData.tagInput}
                  onChange={(e) => setFormData({ ...formData, tagInput: e.target.value })}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  className="border-[var(--light-gray)] focus:border-[var(--teal)] focus:ring-[var(--teal)]"
                />
                <Button
                  type="button"
                  onClick={handleAddTag}
                  className="bg-[var(--teal)] hover:bg-[#358f8b] text-white"
                >
                  Add
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--teal)] bg-opacity-10 text-[var(--teal)] rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:bg-[var(--teal)] hover:bg-opacity-20 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[var(--teal)] hover:bg-[#358f8b] text-white h-12 rounded-xl"
          >
            Create Project
          </Button>
        </form>
      </div>
    </div>
  );
}
