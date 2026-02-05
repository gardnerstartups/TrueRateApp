import { Project } from '@/app/types';
import { StatusBadge } from '@/app/components/StatusBadge';
import { Button } from '@/app/components/ui/button';
import { Plus, Clock, DollarSign, Archive } from 'lucide-react';

interface AllProjectsScreenProps {
  projects: Project[];
  onNewProject: () => void;
  onSelectProject: (project: Project) => void;
  onViewArchive: () => void;
}

export function AllProjectsScreen({ projects, onNewProject, onSelectProject, onViewArchive }: AllProjectsScreenProps) {
  const activeProjects = projects.filter((p) => p.isActive);

  return (
    <div className="min-h-screen bg-[var(--off-white)] pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-[var(--light-gray)] px-6 py-4 sticky top-0 z-10">
          <h2 className="text-[var(--navy)] mb-4">All Projects</h2>
          <Button
            onClick={onNewProject}
            className="w-full bg-[var(--teal)] hover:bg-[#358f8b] text-white h-12 rounded-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Project
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="p-6 space-y-4">
          {activeProjects.map((project) => {
            const hourlyRate = project.timeSpent > 0 ? project.earnings / project.timeSpent : 0;
            
            return (
              <button
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="w-full bg-white rounded-2xl shadow-sm p-5 text-left hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-[var(--navy)] mb-1">{project.name}</h3>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <StatusBadge status={project.status} size="sm" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-xs">Value</span>
                    </div>
                    <p className="font-semibold text-[var(--navy)]">
                      ${project.totalBudget.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">Time</span>
                    </div>
                    <p className="font-semibold text-[var(--navy)]">
                      {project.timeSpent}h
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-xs">Rate/hr</span>
                    </div>
                    <p className="font-semibold text-[var(--navy)]">
                      ${hourlyRate.toFixed(0)}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{Math.round((project.timeSpent / project.estimatedTime) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        project.status === 'behind'
                          ? 'bg-red-500'
                          : project.status === 'slow'
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{
                        width: `${Math.min((project.timeSpent / project.estimatedTime) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Archive Link */}
        <div className="px-6 pb-6">
          <button
            className="w-full flex items-center justify-center gap-2 py-4 text-gray-600 hover:text-[var(--navy)] transition-colors"
            onClick={onViewArchive}
          >
            <Archive className="w-5 h-5" />
            <span>View Project Archive</span>
          </button>
        </div>
      </div>
    </div>
  );
}