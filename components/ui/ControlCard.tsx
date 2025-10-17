'use client';

import { ReactNode } from 'react';
import { 
  ShieldCheckIcon, 
  ExclamationTriangleIcon, 
  ClockIcon, 
  CheckCircleIcon,
  UserIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { Card, CardHeader, CardContent, CardFooter } from './Card';
import { cn } from '../../lib/utils';

interface ControlCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'Compliant' | 'Non-Compliant' | 'In Progress' | 'Not Assessed';
  priority: 'High' | 'Medium' | 'Low';
  lastAssessed?: string;
  nextAssessment?: string;
  responsibleParty?: string;
  className?: string;
  onClick?: () => void;
  actions?: ReactNode;
}

const ControlCard = ({
  id,
  title,
  description,
  category,
  status,
  priority,
  lastAssessed,
  nextAssessment,
  responsibleParty,
  className,
  onClick,
  actions,
}: ControlCardProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Compliant':
        return CheckCircleIcon;
      case 'Non-Compliant':
        return ExclamationTriangleIcon;
      case 'In Progress':
        return ClockIcon;
      default:
        return ShieldCheckIcon;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Compliant':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'Non-Compliant':
        return 'text-red-600 bg-red-100 border-red-200';
      case 'In Progress':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-600 bg-red-100 border-red-200';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'Low':
        return 'text-green-600 bg-green-100 border-green-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const StatusIcon = getStatusIcon(status);

  return (
    <Card 
      className={cn('h-full', className)}
      clickable={!!onClick}
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <StatusIcon className="h-8 w-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {title}
              </h3>
              <p className="text-sm text-gray-500">ID: {id}</p>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <span className={cn(
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
              getStatusColor(status)
            )}>
              {status}
            </span>
            <span className={cn(
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
              getPriorityColor(priority)
            )}>
              {priority} Priority
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          {description}
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {category}
            </span>
          </div>

          {responsibleParty && (
            <div className="flex items-center text-sm text-gray-500">
              <UserIcon className="h-4 w-4 mr-2" />
              <span>Responsible: {responsibleParty}</span>
            </div>
          )}

          {lastAssessed && (
            <div className="flex items-center text-sm text-gray-500">
              <CalendarIcon className="h-4 w-4 mr-2" />
              <span>Last assessed: {lastAssessed}</span>
            </div>
          )}

          {nextAssessment && (
            <div className="flex items-center text-sm text-gray-500">
              <CalendarIcon className="h-4 w-4 mr-2" />
              <span>Next assessment: {nextAssessment}</span>
            </div>
          )}
        </div>
      </CardContent>

      {actions && (
        <CardFooter>
          {actions}
        </CardFooter>
      )}
    </Card>
  );
};

export default ControlCard;
