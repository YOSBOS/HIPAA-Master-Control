'use client';

import { ReactNode } from 'react';
import { Card, CardHeader, CardContent } from './Card';
import { cn } from '../../lib/utils';

interface ProgressCardProps {
  title: string;
  subtitle?: string;
  progress: number;
  total: number;
  unit?: string;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  showPercentage?: boolean;
  className?: string;
  children?: ReactNode;
}

const ProgressCard = ({
  title,
  subtitle,
  progress,
  total,
  unit = '',
  color = 'blue',
  showPercentage = true,
  className,
  children,
}: ProgressCardProps) => {
  const percentage = total > 0 ? Math.round((progress / total) * 100) : 0;

  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    yellow: 'bg-yellow-600',
    red: 'bg-red-600',
    purple: 'bg-purple-600',
  };

  const progressBarColor = colorClasses[color];

  return (
    <Card className={cn('h-full', className)}>
      <CardHeader title={title} subtitle={subtitle} />
      
      <CardContent>
        <div className="space-y-4">
          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{progress} {unit}</span>
              <span>{total} {unit}</span>
            </div>
            <div className="bg-gray-200 rounded-full h-2">
              <div
                className={cn('h-2 rounded-full transition-all duration-300', progressBarColor)}
                style={{ width: `${percentage}%` }}
              />
            </div>
            {showPercentage && (
              <div className="mt-2 text-right">
                <span className="text-sm font-medium text-gray-900">
                  {percentage}%
                </span>
              </div>
            )}
          </div>

          {/* Additional Content */}
          {children && (
            <div className="pt-4 border-t border-gray-200">
              {children}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
    period: string;
  };
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
}

const MetricCard = ({
  title,
  value,
  change,
  icon,
  className,
  onClick,
}: MetricCardProps) => {
  return (
    <Card 
      className={cn('h-full', className)}
      clickable={!!onClick}
      onClick={onClick}
    >
      <CardContent>
        <div className="flex items-center">
          {icon && (
            <div className="flex-shrink-0">
              {icon}
            </div>
          )}
          <div className="ml-4 flex-1">
            <p className="text-sm font-medium text-gray-500 truncate">
              {title}
            </p>
            <p className="text-2xl font-semibold text-gray-900">
              {value}
            </p>
            {change && (
              <div className="mt-1 flex items-center">
                <span className={cn(
                  'text-sm font-medium',
                  change.isPositive ? 'text-green-600' : 'text-red-600'
                )}>
                  {change.isPositive ? '+' : ''}{change.value}%
                </span>
                <span className="ml-1 text-sm text-gray-500">
                  vs {change.period}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { ProgressCard, MetricCard };
