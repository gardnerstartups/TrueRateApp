import { Project } from '@/app/types';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft, Clock, DollarSign, Calendar, TrendingUp, Package } from 'lucide-react';

interface ArchivedProjectsScreenProps {
  archivedProjects: Project[];
  onBack: () => void;
  onSelectProject: (project: Project) => void;
}

export function ArchivedProjectsScreen({ archivedProjects, onBack, onSelectProject }: ArchivedProjectsScreenProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const totalEarnings = archivedProjects.reduce((sum, project) => sum + project.earnings, 0);
  const totalHours = archivedProjects.reduce((sum, project) => sum + project.timeSpent, 0);
  const averageHourlyRate = totalHours > 0 ? totalEarnings / totalHours : 0;

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
            <div>
              <h2 className="text-[var(--navy)]">Project Archive</h2>
              <p className="text-sm text-gray-500">Completed projects</p>
            </div>
          </div>
        </div>

        {archivedProjects.length === 0 ? (
          <div className="p-6">
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-[var(--navy)] mb-2">No Archived Projects</h3>
              <p className="text-sm text-gray-500">
                Completed projects will appear here
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Summary Stats */}
            <div className="p-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-[var(--navy)] mb-4">Archive Summary</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Projects</p>
                    <p className="text-2xl font-light text-[var(--navy)]" style={{ fontFamily: 'var(--font-accent)' }}>
                      {archivedProjects.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total Earned</p>
                    <p className="text-2xl font-light text-[var(--teal)]" style={{ fontFamily: 'var(--font-accent)' }}>
                      ${totalEarnings.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Avg Rate</p>
                    <p className="text-2xl font-light text-[var(--teal)]" style={{ fontFamily: 'var(--font-accent)' }}>
                      ${averageHourlyRate.toFixed(0)}
                      <span className="text-sm text-gray-400">/hr</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Archived Projects List */}
            <div className="px-6 pb-6 space-y-4">
              {archivedProjects.map((project) => {
                const hourlyRate = project.timeSpent > 0 ? project.earnings / project.timeSpent : 0;
                const progressPercentage = (project.timeSpent / project.estimatedTime) * 100;

                return (
                  <button
                    key={project.id}
                    onClick={() => onSelectProject(project)}
                    className="w-full bg-white rounded-2xl shadow-sm p-6 text-left hover:shadow-md transition-shadow"
                  >
                    {/* Project Header */}
                    <div className="mb-4">
                      <h3 className="text-[var(--navy)] mb-2">{project.name}</h3>
                      {project.description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {project.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-1.5">
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

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[var(--teal)] bg-opacity-10 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-4 h-4 text-[var(--teal)]" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Earned</p>
                          <p className="font-medium text-[var(--navy)]">
                            ${project.earnings.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[var(--teal)] bg-opacity-10 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-[var(--teal)]" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Rate</p>
                          <p className="font-medium text-[var(--navy)]">
                            ${hourlyRate.toFixed(0)}/hr
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Clock className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Time Spent</p>
                          <p className="font-medium text-[var(--navy)]">
                            {project.timeSpent}h
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Completed</p>
                          <p className="font-medium text-[var(--navy)]">
                            {formatDate(project.dueDate)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-500">Time Efficiency</span>
                        <span className="text-[var(--navy)] font-medium">
                          {Math.round(progressPercentage)}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gray-400 transition-all duration-300"
                          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
