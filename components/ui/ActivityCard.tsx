'use client';

import { ReactNode } from 'react';
import { 
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { Card, CardContent } from './Card';
import { cn } from '../../lib/utils';

interface ActivityItem {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  description: string;
  timestamp: string;
  user?: string;
}

interface ActivityCardProps {
  title: string;
  activities: ActivityItem[];
  className?: string;
  maxItems?: number;
  showUser?: boolean;
}

const ActivityCard = ({ 
  title, 
  activities, 
  className, 
  maxItems = 5,
  showUser = true 
}: ActivityCardProps) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success':
        return CheckCircleIcon;
      case 'warning':
        return ClockIcon;
      case 'error':
        return ExclamationTriangleIcon;
      case 'info':
        return InformationCircleIcon;
      default:
        return InformationCircleIcon;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const displayActivities = activities.slice(0, maxItems);

  return (
    <Card className={cn('h-full', className)}>
      <CardContent>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {title}
        </h3>
        
        <div className="flow-root">
          <ul className="-mb-8">
            {displayActivities.map((activity, index) => {
              const ActivityIcon = getActivityIcon(activity.type);
              const isLast = index === displayActivities.length - 1;
              
              return (
                <li key={activity.id}>
                  <div className={cn('relative', !isLast && 'pb-8')}>
                    <div className="relative flex space-x-3">
                      <div>
                        <span className={cn(
                          'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                          getActivityColor(activity.type)
                        )}>
                          <ActivityIcon className="h-5 w-5 text-white" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">
                              {activity.title}
                            </span>
                            {' '}
                            {activity.description}
                          </p>
                          {showUser && activity.user && (
                            <div className="mt-1 flex items-center text-xs text-gray-400">
                              <UserIcon className="h-3 w-3 mr-1" />
                              <span>{activity.user}</span>
                            </div>
                          )}
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          <time dateTime={activity.timestamp}>
                            {activity.timestamp}
                          </time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {activities.length > maxItems && (
          <div className="mt-4 text-center">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View all {activities.length} activities
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
