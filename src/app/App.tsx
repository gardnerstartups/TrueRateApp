import { useState } from 'react';
import { User, Project, EfficiencyStatus, TimeEntry } from '@/app/types';
import { mockUser, mockProjects, mockInsights } from '@/app/data/mockData';
import { OnboardingScreen } from '@/app/screens/OnboardingScreen';
import { CreateProjectScreen } from '@/app/screens/CreateProjectScreen';
import { AllProjectsScreen } from '@/app/screens/AllProjectsScreen';
import { ArchivedProjectsScreen } from '@/app/screens/ArchivedProjectsScreen';
import { HomeScreen } from '@/app/screens/HomeScreen';
import { InsightsScreen } from '@/app/screens/InsightsScreen';
import { ProfileScreen } from '@/app/screens/ProfileScreen';
import { ProjectDetailsScreen } from '@/app/screens/ProjectDetailsScreen';
import { AllTimeEntriesScreen } from '@/app/screens/AllTimeEntriesScreen';
import { ManualTimeEntryDialog } from '@/app/components/ManualTimeEntryDialog';
import { BottomNav } from '@/app/components/BottomNav';

type Screen = 'onboarding' | 'home' | 'projects' | 'insights' | 'profile' | 'createProject' | 'projectDetails' | 'allTimeEntries' | 'archivedProjects';
type Tab = 'home' | 'projects' | 'insights' | 'profile';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [user, setUser] = useState<User>(mockUser);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [currentProject, setCurrentProject] = useState<Project | null>(mockProjects[0]);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [showManualEntryDialog, setShowManualEntryDialog] = useState(false);

  const handleOnboardingComplete = (userData: User) => {
    setUser(userData);
    setCurrentScreen('home');
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setCurrentScreen(tab);
  };

  const handleNewProject = () => {
    setCurrentScreen('createProject');
  };

  const handleCreateProject = (projectData: Omit<Project, 'id' | 'timeSpent' | 'status' | 'earnings' | 'isActive'>) => {
    const newProject: Project = {
      ...projectData,
      id: String(projects.length + 1),
      timeSpent: 0,
      status: 'onTrack' as EfficiencyStatus,
      earnings: projectData.totalBudget - projectData.expenses,
      isActive: true,
      isArchived: false,
    };
    setProjects([...projects, newProject]);
    setCurrentProject(newProject);
    setCurrentScreen('home');
    setActiveTab('home');
  };

  const handleSelectProject = (project: Project) => {
    setCurrentProject(project);
    setCurrentScreen('home');
    setActiveTab('home');
  };

  const handleViewProjectDetails = () => {
    if (currentProject) {
      setCurrentScreen('projectDetails');
    }
  };

  const handleUpdateProjectTags = (tags: string[]) => {
    if (currentProject) {
      const updatedProjects = projects.map((project) =>
        project.id === currentProject.id ? { ...project, tags } : project
      );
      setProjects(updatedProjects);
      setCurrentProject({ ...currentProject, tags });
    }
  };

  const handleArchiveProject = () => {
    if (currentProject) {
      const updatedProjects = projects.map((project) =>
        project.id === currentProject.id ? { ...project, isArchived: true, isActive: false } : project
      );
      setProjects(updatedProjects);
      setCurrentProject({ ...currentProject, isArchived: true, isActive: false });
      setCurrentScreen('home');
      setActiveTab('home');
      // Set current project to first non-archived project
      const nextActiveProject = updatedProjects.find(p => !p.isArchived && p.isActive);
      setCurrentProject(nextActiveProject || null);
    }
  };

  const handleUnarchiveProject = () => {
    if (currentProject) {
      const updatedProjects = projects.map((project) =>
        project.id === currentProject.id ? { ...project, isArchived: false, isActive: true } : project
      );
      setProjects(updatedProjects);
      setCurrentProject({ ...currentProject, isArchived: false, isActive: true });
      setCurrentScreen('home');
      setActiveTab('home');
    }
  };

  const handleCreateTimeEntry = (duration: number, notes: string) => {
    if (!currentProject) return;

    const now = new Date();
    const startTime = new Date(now.getTime() - duration * 1000);
    
    const newEntry: TimeEntry = {
      id: String(Date.now()),
      projectId: currentProject.id,
      startTime,
      endTime: now,
      duration,
      notes,
    };

    setTimeEntries([newEntry, ...timeEntries]);

    // Update project time spent (convert seconds to hours)
    const hoursToAdd = duration / 3600;
    const updatedProjects = projects.map((project) =>
      project.id === currentProject.id
        ? { ...project, timeSpent: Number((project.timeSpent + hoursToAdd).toFixed(2)) }
        : project
    );
    setProjects(updatedProjects);
    setCurrentProject({
      ...currentProject,
      timeSpent: Number((currentProject.timeSpent + hoursToAdd).toFixed(2)),
    });
  };

  const handleAddManualTimeEntry = (startTime: Date, endTime: Date, notes: string) => {
    if (!currentProject) return;

    const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
    
    const newEntry: TimeEntry = {
      id: String(Date.now()),
      projectId: currentProject.id,
      startTime,
      endTime,
      duration,
      notes,
    };

    setTimeEntries([newEntry, ...timeEntries]);

    // Update project time spent
    const hoursToAdd = duration / 3600;
    const updatedProjects = projects.map((project) =>
      project.id === currentProject.id
        ? { ...project, timeSpent: Number((project.timeSpent + hoursToAdd).toFixed(2)) }
        : project
    );
    setProjects(updatedProjects);
    setCurrentProject({
      ...currentProject,
      timeSpent: Number((currentProject.timeSpent + hoursToAdd).toFixed(2)),
    });

    setShowManualEntryDialog(false);
  };

  const handleUpdateTimeEntry = (updatedEntry: TimeEntry) => {
    const oldEntry = timeEntries.find((e) => e.id === updatedEntry.id);
    if (!oldEntry || !currentProject) return;

    // Calculate the difference in hours
    const oldHours = oldEntry.duration / 3600;
    const newHours = updatedEntry.duration / 3600;
    const hoursDiff = newHours - oldHours;

    setTimeEntries(timeEntries.map((e) => (e.id === updatedEntry.id ? updatedEntry : e)));

    // Update project time spent
    const updatedProjects = projects.map((project) =>
      project.id === currentProject.id
        ? { ...project, timeSpent: Number((project.timeSpent + hoursDiff).toFixed(2)) }
        : project
    );
    setProjects(updatedProjects);
    setCurrentProject({
      ...currentProject,
      timeSpent: Number((currentProject.timeSpent + hoursDiff).toFixed(2)),
    });
  };

  const showBottomNav = currentScreen !== 'onboarding' && currentScreen !== 'createProject' && currentScreen !== 'projectDetails' && currentScreen !== 'allTimeEntries' && currentScreen !== 'archivedProjects';

  const currentProjectTimeEntries = currentProject
    ? timeEntries.filter((entry) => entry.projectId === currentProject.id)
    : [];

  const archivedProjects = projects.filter((p) => p.isArchived);
  const activeProjects = projects.filter((p) => !p.isArchived);

  return (
    <div className="relative min-h-screen bg-[var(--off-white)]">
      {currentScreen === 'onboarding' && (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      )}

      {currentScreen === 'createProject' && (
        <CreateProjectScreen
          onBack={() => {
            setCurrentScreen('projects');
            setActiveTab('projects');
          }}
          onCreateProject={handleCreateProject}
        />
      )}

      {currentScreen === 'home' && (
        <HomeScreen
          currentProject={currentProject}
          onProjectClick={() => {
            setCurrentScreen('projects');
            setActiveTab('projects');
          }}
          onViewProjectDetails={handleViewProjectDetails}
          onCreateTimeEntry={handleCreateTimeEntry}
        />
      )}

      {currentScreen === 'projects' && (
        <AllProjectsScreen
          projects={activeProjects}
          onNewProject={handleNewProject}
          onSelectProject={handleSelectProject}
          onViewArchive={() => setCurrentScreen('archivedProjects')}
        />
      )}

      {currentScreen === 'archivedProjects' && (
        <ArchivedProjectsScreen
          archivedProjects={archivedProjects}
          onBack={() => {
            setCurrentScreen('projects');
            setActiveTab('projects');
          }}
          onSelectProject={(project) => {
            setCurrentProject(project);
            setCurrentScreen('projectDetails');
          }}
        />
      )}

      {currentScreen === 'insights' && (
        <InsightsScreen insights={mockInsights} />
      )}

      {currentScreen === 'profile' && (
        <ProfileScreen user={user} />
      )}

      {currentScreen === 'projectDetails' && currentProject && (
        <ProjectDetailsScreen
          project={currentProject}
          timeEntries={currentProjectTimeEntries}
          onBack={() => {
            if (currentProject.isArchived) {
              setCurrentScreen('archivedProjects');
            } else {
              setCurrentScreen('home');
              setActiveTab('home');
            }
          }}
          onUpdateTags={handleUpdateProjectTags}
          onViewAllTimeEntries={() => setCurrentScreen('allTimeEntries')}
          onAddManualTimeEntry={() => setShowManualEntryDialog(true)}
          onUpdateTimeEntry={handleUpdateTimeEntry}
          onArchive={!currentProject.isArchived ? handleArchiveProject : undefined}
          onUnarchive={currentProject.isArchived ? handleUnarchiveProject : undefined}
        />
      )}

      {currentScreen === 'allTimeEntries' && currentProject && (
        <AllTimeEntriesScreen
          entries={currentProjectTimeEntries}
          projectName={currentProject.name}
          onBack={() => setCurrentScreen('projectDetails')}
          onAddManual={() => setShowManualEntryDialog(true)}
        />
      )}

      {showBottomNav && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}

      {showManualEntryDialog && (
        <ManualTimeEntryDialog
          onSave={handleAddManualTimeEntry}
          onClose={() => setShowManualEntryDialog(false)}
        />
      )}
    </div>
  );
}

export default App;
