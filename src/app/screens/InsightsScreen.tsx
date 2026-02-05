import { useState } from 'react';
import { Timeframe, Insight } from '@/app/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';

interface InsightsScreenProps {
  insights: Insight[];
}

export function InsightsScreen({ insights }: InsightsScreenProps) {
  const [timeframe, setTimeframe] = useState<Timeframe>('month');

  const timeframes: { value: Timeframe; label: string }[] = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' },
  ];

  const metrics = [
    { label: 'Hours Worked', value: '124', unit: 'hrs', change: '+12%' },
    { label: 'Gross Earned', value: '$8,450', change: '+18%' },
    { label: 'Net Earned', value: '$7,830', change: '+16%' },
    { label: 'Avg Hourly Rate', value: '$68', unit: '/hr', change: '+8%' },
  ];

  const projectTrendData = [
    { tag: 'Wedding', avgRate: 120, projects: 3 },
    { tag: 'Portrait', avgRate: 95, projects: 5 },
    { tag: 'Branding', avgRate: 85, projects: 2 },
    { tag: 'Web Design', avgRate: 100, projects: 1 },
  ];

  const bestProject = 'Miller Wedding Photography';
  const worstProject = 'Bloom Coffee Branding';

  const getInsightIcon = (type: Insight['type']) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-[var(--gold)]" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'info':
        return <Lightbulb className="w-5 h-5 text-[var(--teal)]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--off-white)] pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-[var(--light-gray)] px-6 py-4">
          <h2 className="text-[var(--navy)] mb-1">Insights</h2>
          <p className="text-sm text-gray-500">Your business intelligence</p>
        </div>

        {/* Timeframe Selector */}
        <div className="px-6 py-4">
          <div className="flex gap-2 overflow-x-auto">
            {timeframes.map((tf) => (
              <button
                key={tf.value}
                onClick={() => setTimeframe(tf.value)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  timeframe === tf.value
                    ? 'bg-[var(--teal)] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>

        {/* High-Level Metrics */}
        <div className="px-6 pb-6">
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm p-5">
                <p className="text-xs text-gray-500 mb-2">{metric.label}</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <p className="text-2xl font-light text-[var(--navy)]" style={{ fontFamily: 'var(--font-accent)' }}>
                    {metric.value}
                  </p>
                  {metric.unit && <span className="text-sm text-gray-400">{metric.unit}</span>}
                </div>
                <div className="flex items-center gap-1 text-green-600 text-xs">
                  <TrendingUp className="w-3 h-3" />
                  <span>{metric.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best/Worst Projects */}
        <div className="px-6 pb-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Best Performing</p>
              <div className="flex items-center justify-between">
                <p className="font-medium text-[var(--navy)]">{bestProject}</p>
                <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  $147/hr
                </span>
              </div>
            </div>
            <div className="border-t border-[var(--light-gray)] pt-4">
              <p className="text-sm text-gray-500 mb-1">Needs Attention</p>
              <div className="flex items-center justify-between">
                <p className="font-medium text-[var(--navy)]">{worstProject}</p>
                <span className="text-sm text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                  $100/hr
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Trends Chart */}
        <div className="px-6 pb-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-[var(--navy)] mb-4">Project Trends by Tag</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={projectTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="tag" tick={{ fill: '#6B7280', fontSize: 12 }} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="avgRate" fill="var(--teal)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-500 mt-2 text-center">Average hourly rate by project type</p>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="px-6 pb-6">
          <div className="bg-gradient-to-br from-[var(--gold)] to-[#e5a905] rounded-2xl shadow-sm p-6 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-white" />
              <h3 className="text-white" style={{ fontFamily: 'var(--font-accent)' }}>
                AI Recommendations
              </h3>
            </div>
            <p className="text-white text-sm opacity-90">
              Personalized insights to optimize your business
            </p>
          </div>

          <div className="space-y-3">
            {insights.map((insight) => (
              <div key={insight.id} className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">{getInsightIcon(insight.type)}</div>
                  <div className="flex-1">
                    <h4 className="text-[var(--navy)] mb-1">{insight.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
