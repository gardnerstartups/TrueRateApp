import { useState } from 'react';
import { User } from '@/app/types';
import { industries } from '@/app/data/mockData';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import { Switch } from '@/app/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import logoImage from 'figma:asset/c0f67608b5f68cc6fcd7c98b8f75bc360be1cf8d.png';

interface OnboardingScreenProps {
  onComplete: (user: User) => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [formData, setFormData] = useState<User>({
    name: '',
    email: '',
    industry: '',
    notificationPreferences: {
      projectReminders: true,
      weeklyReports: true,
      insights: true,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <div className="min-h-screen bg-[rgb(31,42,68)] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <img src={logoImage} alt="True Rate Logo" className="w-24 h-24" />
          </div>
          <h1 className="text-[rgb(248,249,251)] mb-2">Welcome to True Rate</h1>
          <p className="text-[rgb(249,248,251)] opacity-70">
            Know your true hourly rate. Price smarter.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-[var(--navy)]">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="mt-1.5 border-[var(--light-gray)] focus:border-[var(--teal)] focus:ring-[var(--teal)]"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-[var(--navy)]">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="mt-1.5 border-[var(--light-gray)] focus:border-[var(--teal)] focus:ring-[var(--teal)]"
              />
            </div>

            <div>
              <Label htmlFor="industry" className="text-[var(--navy)]">Industry</Label>
              <Select
                value={formData.industry}
                onValueChange={(value) => setFormData({ ...formData, industry: value })}
              >
                <SelectTrigger className="mt-1.5 border-[var(--light-gray)] focus:border-[var(--teal)] focus:ring-[var(--teal)]">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-2 border-t border-[var(--light-gray)]">
            <h3 className="text-[var(--navy)] mb-4">Notification Preferences</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="projectReminders" className="font-normal text-[var(--dark-neutral)]">
                  Project reminders
                </Label>
                <Switch
                  id="projectReminders"
                  checked={formData.notificationPreferences.projectReminders}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      notificationPreferences: {
                        ...formData.notificationPreferences,
                        projectReminders: checked,
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="weeklyReports" className="font-normal text-[var(--dark-neutral)]">
                  Weekly reports
                </Label>
                <Switch
                  id="weeklyReports"
                  checked={formData.notificationPreferences.weeklyReports}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      notificationPreferences: {
                        ...formData.notificationPreferences,
                        weeklyReports: checked,
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="insights" className="font-normal text-[var(--dark-neutral)]">
                  AI insights
                </Label>
                <Switch
                  id="insights"
                  checked={formData.notificationPreferences.insights}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      notificationPreferences: {
                        ...formData.notificationPreferences,
                        insights: checked,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[var(--teal)] hover:bg-[#358f8b] text-white h-12 rounded-xl"
          >
            Get Started
          </Button>
        </form>
      </div>
    </div>
  );
}