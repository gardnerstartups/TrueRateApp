import { EfficiencyStatus } from '@/app/types';

interface StatusBadgeProps {
  status: EfficiencyStatus;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const statusConfig = {
    behind: {
      label: 'Behind',
      bgColor: 'bg-red-100',
      textColor: 'text-red-700',
      borderColor: 'border-red-300',
    },
    slow: {
      label: 'Slow',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-700',
      borderColor: 'border-yellow-300',
    },
    onTrack: {
      label: 'On Track',
      bgColor: 'bg-green-100',
      textColor: 'text-green-700',
      borderColor: 'border-green-300',
    },
    ahead: {
      label: 'Ahead',
      bgColor: 'bg-green-100',
      textColor: 'text-green-700',
      borderColor: 'border-[var(--gold)]',
    },
  };

  const config = statusConfig[status];
  const paddingClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span
      className={`inline-flex items-center rounded-full border ${config.bgColor} ${config.textColor} ${config.borderColor} ${paddingClass} font-medium`}
    >
      {config.label}
    </span>
  );
}
