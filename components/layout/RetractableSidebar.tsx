'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronLeftIcon,
  ChevronRightIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CogIcon
} from '@heroicons/react/24/outline';

interface RetractableSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export const RetractableSidebar: React.FC<RetractableSidebarProps> = ({
  isOpen,
  onToggle,
  className = ''
}) => {
  const pathname = usePathname();
  
  // Debug logging
  console.log('RetractableSidebar - isOpen:', isOpen);

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/compliance-dashboard',
      icon: HomeIcon,
      description: 'Overview and compliance status'
    },
    {
      name: 'Master Controls',
      href: '/compliance-dashboard/master-controls',
      icon: ShieldCheckIcon,
      description: 'Manage all HIPAA controls'
    },
    {
      name: 'Reports',
      href: '/compliance-dashboard/reports',
      icon: ChartBarIcon,
      description: 'Compliance reports and analytics'
    },
    {
      name: 'Settings',
      href: '/compliance-dashboard/settings',
      icon: CogIcon,
      description: 'System configuration'
    }
  ];

  const getNavItemClasses = (href: string) => {
    const isActive = pathname === href;
    return `flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-blue-600 text-white shadow-sm'
        : 'text-gray-700 hover:text-gray-900 hover:bg-white hover:shadow-sm'
    }`;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-50 border-r border-gray-200 shadow-xl transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <ShieldCheckIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">HIPAA Compliance</h2>
              <p className="text-xs text-gray-500 font-medium">Master Control Tracker</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={getNavItemClasses(item.href)}
                  onClick={() => {
                    // Close sidebar on mobile after navigation
                    if (window.innerWidth < 1024) {
                      onToggle();
                    }
                  }}
                >
                  <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">{item.name}</div>
                    <div className="text-xs text-gray-500 truncate mt-0.5">
                      {item.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="text-xs text-gray-500 text-center font-medium">
            HIPAA Master Control Tracker
          </div>
        </div>
      </div>
    </>
  );
};

export default RetractableSidebar;
