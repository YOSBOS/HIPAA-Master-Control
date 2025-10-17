'use client';

import { 
  ShieldCheckIcon, 
  ExclamationTriangleIcon, 
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { CardGrid, StatCard, ProgressCard, ActivityCard } from '@/components';

const stats = [
  {
    name: 'Total Controls',
    value: '45',
    icon: <ShieldCheckIcon className="h-6 w-6 text-blue-600" />,
  },
  {
    name: 'Compliant',
    value: '32',
    icon: <CheckCircleIcon className="h-6 w-6 text-green-600" />,
  },
  {
    name: 'Non-Compliant',
    value: '8',
    icon: <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />,
  },
  {
    name: 'In Progress',
    value: '5',
    icon: <ClockIcon className="h-6 w-6 text-yellow-600" />,
  },
];

const activities = [
  {
    id: '1',
    type: 'success' as const,
    title: 'Access Control',
    description: 'assessment completed',
    timestamp: '2 hours ago',
    user: 'John Smith',
  },
  {
    id: '2',
    type: 'warning' as const,
    title: 'Audit Controls',
    description: 'assessment in progress',
    timestamp: '4 hours ago',
    user: 'Jane Doe',
  },
  {
    id: '3',
    type: 'error' as const,
    title: 'Transmission Security',
    description: 'non-compliance identified',
    timestamp: '1 day ago',
    user: 'Mike Johnson',
  },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <CardGrid cols={4} gap="md">
        {stats.map((stat) => (
          <StatCard
            key={stat.name}
            title={stat.name}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </CardGrid>

      {/* Compliance Overview */}
      <ProgressCard
        title="Compliance Overview"
        subtitle="Overall HIPAA compliance status"
        progress={32}
        total={45}
        unit="controls"
        color="green"
        showPercentage={true}
      />

      {/* Recent Activity */}
      <ActivityCard
        title="Recent Activity"
        activities={activities}
        maxItems={5}
        showUser={true}
      />
    </div>
  );
}
