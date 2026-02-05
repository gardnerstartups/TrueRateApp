import { User } from '@/app/types';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch';
import { Button } from '@/app/components/ui/button';
import { ChevronRight, User as UserIcon, Briefcase, Bell, Crown, LogOut } from 'lucide-react';

interface ProfileScreenProps {
  user: User;
}

export function ProfileScreen({ user }: ProfileScreenProps) {
  return (
    <div className="min-h-screen bg-[var(--off-white)] pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-[var(--light-gray)] px-6 py-4">
          <h2 className="text-[var(--navy)]">Profile</h2>
        </div>

        {/* Profile Header */}
        <div className="p-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <div className="w-20 h-20 bg-[var(--teal)] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserIcon className="w-10 h-10 text-[var(--teal)]" />
            </div>
            <h3 className="text-[var(--navy)] mb-1">{user.name || 'Your Name'}</h3>
            <p className="text-sm text-gray-500">{user.email || 'your@email.com'}</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="px-6 pb-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-[var(--teal)] bg-opacity-10 rounded-lg flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-[var(--teal)]" />
              </div>
              <h3 className="text-[var(--navy)]">Personal Information</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="profileName" className="text-[var(--navy)]">Name</Label>
                <Input
                  id="profileName"
                  type="text"
                  defaultValue={user.name}
                  className="mt-1.5 border-[var(--light-gray)]"
                />
              </div>
              <div>
                <Label htmlFor="profileEmail" className="text-[var(--navy)]">Email</Label>
                <Input
                  id="profileEmail"
                  type="email"
                  defaultValue={user.email}
                  className="mt-1.5 border-[var(--light-gray)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Business Details */}
        <div className="px-6 pb-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-[var(--teal)] bg-opacity-10 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-[var(--teal)]" />
              </div>
              <h3 className="text-[var(--navy)]">Business Details</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="industry" className="text-[var(--navy)]">Industry</Label>
                <Input
                  id="industry"
                  type="text"
                  defaultValue={user.industry}
                  className="mt-1.5 border-[var(--light-gray)]"
                />
              </div>
              <div>
                <Label htmlFor="businessName" className="text-[var(--navy)]">Business Name (Optional)</Label>
                <Input
                  id="businessName"
                  type="text"
                  placeholder="Your business name"
                  className="mt-1.5 border-[var(--light-gray)]"
                />
              </div>
              <div>
                <Label htmlFor="defaultRate" className="text-[var(--navy)]">Default Hourly Rate</Label>
                <Input
                  id="defaultRate"
                  type="number"
                  placeholder="75"
                  className="mt-1.5 border-[var(--light-gray)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="px-6 pb-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-[var(--teal)] bg-opacity-10 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-[var(--teal)]" />
              </div>
              <h3 className="text-[var(--navy)]">Notifications</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="projectRemindersProfile" className="text-[var(--navy)]">
                    Project Reminders
                  </Label>
                  <p className="text-xs text-gray-500 mt-0.5">Get notified about upcoming deadlines</p>
                </div>
                <Switch
                  id="projectRemindersProfile"
                  defaultChecked={user.notificationPreferences.projectReminders}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weeklyReportsProfile" className="text-[var(--navy)]">
                    Weekly Reports
                  </Label>
                  <p className="text-xs text-gray-500 mt-0.5">Receive weekly performance summaries</p>
                </div>
                <Switch
                  id="weeklyReportsProfile"
                  defaultChecked={user.notificationPreferences.weeklyReports}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="insightsProfile" className="text-[var(--navy)]">
                    AI Insights
                  </Label>
                  <p className="text-xs text-gray-500 mt-0.5">Get personalized business recommendations</p>
                </div>
                <Switch
                  id="insightsProfile"
                  defaultChecked={user.notificationPreferences.insights}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Subscription */}
        <div className="px-6 pb-6">
          <div className="bg-gradient-to-br from-[var(--gold)] to-[#e5a905] rounded-2xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-5 h-5 text-white" />
                  <h3 className="text-white" style={{ fontFamily: 'var(--font-accent)' }}>
                    Free Plan
                  </h3>
                </div>
                <p className="text-white text-sm opacity-90">
                  Upgrade to Pro for advanced analytics and unlimited projects
                </p>
              </div>
            </div>
            <Button className="w-full bg-white text-[var(--gold)] hover:bg-gray-50 h-11 rounded-xl">
              Upgrade to Pro
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors border-b border-[var(--light-gray)]">
              <span className="text-[var(--navy)]">Privacy Policy</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors border-b border-[var(--light-gray)]">
              <span className="text-[var(--navy)]">Terms of Service</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
              <span className="text-[var(--navy)]">Help & Support</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Sign Out */}
        <div className="px-6 pb-6">
          <Button
            variant="outline"
            className="w-full border-red-200 text-red-600 hover:bg-red-50 h-12 rounded-xl"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
