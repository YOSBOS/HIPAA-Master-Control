/**
 * HIPAA Master Control Tracker - Main Dashboard
 * 
 * This is the central hub for the entire project, providing easy navigation
 * to all features and pages we're building.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  status: 'completed' | 'in-progress' | 'planned';
  phase: string;
}

function DashboardCard({ title, description, icon, href, status, phase }: DashboardCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planned': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '✅ Complete';
      case 'in-progress': return '🚧 In Progress';
      case 'planned': return '📋 Planned';
      default: return '📋 Planned';
    }
  };

  return (
    <Link href={href} className="block">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="p-3 bg-blue-100 rounded-lg">
              {icon}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-600 mb-3">{description}</p>
            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
                {getStatusText(status)}
              </span>
              <span className="text-xs text-gray-500">{phase}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Dashboard() {
  const dashboardCards: DashboardCardProps[] = [
    // Phase 1: Foundation & Core Architecture
    {
      title: 'Foundation Demo',
      description: 'Core philosophy, data models, and architecture demonstration',
      icon: <DocumentTextIcon className="w-6 h-6 text-blue-600" />,
      href: '/foundation-demo',
      status: 'completed',
      phase: 'Phase 1'
    },
    
    // Phase 2: Master Controls Implementation
    {
      title: 'User Compliance Dashboard',
      description: 'Main user interface for HIPAA compliance management - how end users will interact with the system',
      icon: <ShieldCheckIcon className="w-6 h-6 text-green-600" />,
      href: '/compliance-dashboard',
      status: 'completed',
      phase: 'Phase 2'
    },
    {
      title: 'Master Controls (Developer)',
      description: 'Developer view of all Master Controls on one page for development tracking',
      icon: <ChartBarIcon className="w-6 h-6 text-blue-600" />,
      href: '/master-controls',
      status: 'in-progress',
      phase: 'Phase 2'
    },
    {
      title: 'Workforce Training & Awareness',
      description: 'Ensures all staff understand how to protect patient information',
      icon: <CheckCircleIcon className="w-6 h-6 text-blue-600" />,
      href: '/master-controls#workforce-training',
      status: 'completed',
      phase: 'Phase 2'
    },
    {
      title: 'Access Control & User Management',
      description: 'Manages who has access to patient information systems and what they can do',
      icon: <ShieldCheckIcon className="w-6 h-6 text-blue-600" />,
      href: '/master-controls#access-control',
      status: 'completed',
      phase: 'Phase 2'
    },
    {
      title: 'Vendor Management & Business Associates',
      description: 'Oversees third-party vendors who handle patient information',
      icon: <CheckCircleIcon className="w-6 h-6 text-blue-600" />,
      href: '/master-controls#vendor-management',
      status: 'planned',
      phase: 'Phase 2'
    },
    {
      title: 'Risk Assessment & Management',
      description: 'Identifies and mitigates potential threats to patient information',
      icon: <ExclamationTriangleIcon className="w-6 h-6 text-blue-600" />,
      href: '/master-controls#risk-assessment',
      status: 'planned',
      phase: 'Phase 2'
    },
    {
      title: 'Incident Response & Breach Management',
      description: 'Establishes procedures for responding to security incidents',
      icon: <ExclamationTriangleIcon className="w-6 h-6 text-blue-600" />,
      href: '/master-controls#incident-response',
      status: 'planned',
      phase: 'Phase 2'
    },
    {
      title: 'Physical Security & Facility Controls',
      description: 'Protects physical access to patient information and systems',
      icon: <CheckCircleIcon className="w-6 h-6 text-blue-600" />,
      href: '/master-controls#physical-security',
      status: 'planned',
      phase: 'Phase 2'
    },
    {
      title: 'Technical Safeguards & System Security',
      description: 'Implements technology-based protections for electronic data',
      icon: <ShieldCheckIcon className="w-6 h-6 text-blue-600" />,
      href: '/master-controls#technical-safeguards',
      status: 'planned',
      phase: 'Phase 2'
    },
    {
      title: 'Policies & Procedures Management',
      description: 'Develops and maintains formal HIPAA compliance guidelines',
      icon: <DocumentTextIcon className="w-6 h-6 text-blue-600" />,
      href: '/master-controls#policies-procedures',
      status: 'planned',
      phase: 'Phase 2'
    },
    {
      title: 'Audit & Monitoring',
      description: 'Regularly reviews system activity and compliance records',
      icon: <DocumentTextIcon className="w-6 h-6 text-blue-600" />,
      href: '/master-controls#audit-monitoring',
      status: 'planned',
      phase: 'Phase 2'
    },
    {
      title: 'Compliance Maturity Scoring',
      description: '5-level scoring system (Poor, Moderate, Good, Great, Excellent) with business-friendly insights',
      icon: <ChartBarIcon className="w-6 h-6 text-green-600" />,
      href: '/compliance-scoring',
      status: 'completed',
      phase: 'Phase 2'
    },
    
    // Future Phases
    {
      title: 'Evidence Management System',
      description: 'Upload, confirm, record, and assign evidence functionality',
      icon: <DocumentTextIcon className="w-6 h-6 text-purple-600" />,
      href: '/evidence-management',
      status: 'planned',
      phase: 'Phase 3'
    },
    {
      title: 'AI Guidance & Mentor System',
      description: 'Business language explanations and actionable suggestions',
      icon: <ClockIcon className="w-6 h-6 text-purple-600" />,
      href: '/ai-guidance',
      status: 'planned',
      phase: 'Phase 4'
    },
    {
      title: 'Compliance Engine',
      description: 'Hidden HIPAA mapping and regulatory tracking system',
      icon: <ChartBarIcon className="w-6 h-6 text-purple-600" />,
      href: '/compliance-engine',
      status: 'planned',
      phase: 'Phase 5'
    },
    {
      title: 'Reports & Analytics',
      description: 'Progress tracking and business compliance reports',
      icon: <ChartBarIcon className="w-6 h-6 text-purple-600" />,
      href: '/reports',
      status: 'planned',
      phase: 'Phase 6'
    }
  ];

  // Simple navigation component
  const SimpleNav = () => {
    const pathname = usePathname();
    
    const navItems = [
      { href: '/dashboard', label: 'Dashboard' },
      { href: '/foundation-demo', label: 'Foundation Demo' },
      { href: '/master-controls', label: 'Master Controls' },
      { href: '/compliance-scoring', label: 'Compliance Scoring' },
      { href: '/hipaa-standards', label: 'HIPAA Standards' },
    ];

    return (
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleNav />
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">HIPAA Master Control Tracker</h1>
              <p className="text-lg text-gray-600 mt-1">Business Language Over Legal Jargon</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Current Phase</p>
                <p className="text-lg font-semibold text-blue-600">Phase 2: Master Controls</p>
              </div>
              <Link
                href="/compliance-dashboard"
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <ShieldCheckIcon className="w-5 h-5 mr-2" />
                View Client Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Philosophy Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">🎯 Core Philosophy</h2>
          <p className="text-blue-800 mb-4">
            Instead of managing 40+ technical HIPAA controls, focus on 8-9 key business processes 
            that clinic managers understand and can act on.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">✅ Same compliance goal</span>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">❌ No legal jargon</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">💡 Action the clinic can actually perform</span>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card, index) => (
            <DashboardCard key={index} {...card} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Building the revolutionary HIPAA Master Control Tracker
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Phase 1 Complete • Phase 2 In Progress • Phases 3-8 Planned
          </p>
        </div>
      </div>
    </div>
  );
}