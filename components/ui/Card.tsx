'use client';

import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'outlined' | 'elevated' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

const Card = ({
  children,
  className,
  variant = 'default',
  padding = 'md',
  rounded = 'lg',
  shadow = 'sm',
  hover = false,
  clickable = false,
  onClick,
}: CardProps) => {
  const baseClasses = 'transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-white border border-gray-200',
    outlined: 'bg-white border-2 border-gray-300',
    elevated: 'bg-white border border-gray-200',
    flat: 'bg-gray-50 border border-gray-100',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const hoverClasses = hover || clickable ? 'hover:shadow-md hover:-translate-y-0.5' : '';
  const clickableClasses = clickable ? 'cursor-pointer' : '';

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding],
        roundedClasses[rounded],
        shadowClasses[shadow],
        hoverClasses,
        clickableClasses,
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children?: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  icon?: ReactNode;
}

const CardHeader = ({ children, className, title, subtitle, action, icon }: CardHeaderProps) => {
  return (
    <div className={cn('flex items-start justify-between', className)}>
      <div className="flex-1">
        {icon && (
          <div className="flex items-center mb-2">
            {icon}
            {title && (
              <h3 className="text-lg font-semibold text-gray-900 leading-6 ml-2">
                {title}
              </h3>
            )}
          </div>
        )}
        {!icon && title && (
          <h3 className="text-lg font-semibold text-gray-900 leading-6">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="mt-1 text-sm text-gray-600">
            {subtitle}
          </p>
        )}
        {children}
      </div>
      {action && (
        <div className="ml-4 flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  );
};

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

const CardContent = ({ children, className }: CardContentProps) => {
  return (
    <div className={cn('mt-4', className)}>
      {children}
    </div>
  );
};

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

const CardFooter = ({ children, className }: CardFooterProps) => {
  return (
    <div className={cn('mt-6 pt-4 border-t border-gray-200', className)}>
      {children}
    </div>
  );
};

interface CardGridProps {
  children: ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg';
}

const CardGrid = ({ children, className, cols = 1, gap = 'md' }: CardGridProps) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  };

  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8',
  };

  return (
    <div className={cn('grid', gridCols[cols], gapClasses[gap], className)}>
      {children}
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  onClick?: () => void;
}

const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  className,
  onClick 
}: StatCardProps) => {
  return (
    <Card 
      className={cn('relative', className)}
      clickable={!!onClick}
      onClick={onClick}
    >
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
          {subtitle && (
            <p className="text-sm text-gray-600">
              {subtitle}
            </p>
          )}
          {trend && (
            <div className="mt-1 flex items-center">
              <span className={cn(
                'text-sm font-medium',
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              )}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="ml-1 text-sm text-gray-500">vs last month</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

interface InfoCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  icon?: ReactNode;
  status?: 'success' | 'warning' | 'error' | 'info';
  className?: string;
  onClick?: () => void;
}

const InfoCard = ({ 
  title, 
  description, 
  children, 
  icon, 
  status,
  className,
  onClick 
}: InfoCardProps) => {
  const statusClasses = {
    success: 'border-l-4 border-l-green-500',
    warning: 'border-l-4 border-l-yellow-500',
    error: 'border-l-4 border-l-red-500',
    info: 'border-l-4 border-l-blue-500',
  };

  return (
    <Card 
      className={cn(
        status && statusClasses[status],
        className
      )}
      clickable={!!onClick}
      onClick={onClick}
    >
      <CardHeader title={title} subtitle={description}>
        {icon && (
          <div className="flex-shrink-0 mb-2">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardGrid,
  StatCard,
  InfoCard,
};
