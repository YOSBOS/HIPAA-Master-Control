/**
 * Return to Dashboard Component
 * 
 * A reusable component that provides a consistent "Return to Dashboard" button
 * across all pages in the HIPAA Master Control Tracker.
 */

import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface ReturnToDashboardProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const ReturnToDashboard: React.FC<ReturnToDashboardProps> = ({
  className = '',
  variant = 'default',
  size = 'md'
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
  
  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
    ghost: 'text-blue-600 hover:bg-blue-50'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <Link href="/dashboard" className={classes}>
      <ArrowLeftIcon className={`${iconSizes[size]} mr-2`} />
      Return to Dashboard
    </Link>
  );
};

export default ReturnToDashboard;
