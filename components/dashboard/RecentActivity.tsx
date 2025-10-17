'use client';

import { CheckCircleIcon, ExclamationTriangleIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { ActivityCard } from '@/components';

const activities = [
  {
    id: '1',
    type: 'success' as const,
    title: 'Access Control Assessment Completed',
    description: 'Assessment completed by John Smith',
    timestamp: '2 hours ago',
    user: 'John Smith',
  },
  {
    id: '2',
    type: 'warning' as const,
    title: 'Audit Controls Assessment Started',
    description: 'Assessment initiated by Jane Doe',
    timestamp: '4 hours ago',
    user: 'Jane Doe',
  },
  {
    id: '3',
    type: 'error' as const,
    title: 'Non-compliance Identified',
    description: 'Transmission Security control requires attention',
    timestamp: '1 day ago',
    user: 'Mike Johnson',
  },
  {
    id: '4',
    type: 'info' as const,
    title: 'Monthly Compliance Report Generated',
    description: 'Report generated for January 2024',
    timestamp: '2 days ago',
    user: 'System',
  },
];

export default function RecentActivity() {
  return (
    <ActivityCard
      title="Recent Activity"
      activities={activities}
      maxItems={4}
      showUser={true}
    />
  );
}
