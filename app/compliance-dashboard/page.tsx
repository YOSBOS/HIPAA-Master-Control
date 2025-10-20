'use client';

/**
 * User Compliance Dashboard
 * 
 * This is the main user interface for clinic managers to manage their HIPAA compliance.
 * Shows overall status, progress, and provides navigation to individual Master Controls.
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  ChartBarIcon,
  LightBulbIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { Card, CardHeader, CardContent, CardFooter } from '../../components/ui/Card';
import HIPAAStandardsMapping from '../../components/compliance/HIPAAStandardsMapping';

export default function ComplianceDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample compliance data
  const overallCompliance = {
    score: 78,
    status: 'needs_attention',
    totalControls: 8,
    completedControls: 3,
    inProgressControls: 2,
    pendingControls: 3
  };

  const nextActions = [
    {
      id: 1,
      title: 'Complete Workforce Training Documentation',
      description: 'Upload your annual employee training materials and confirm all staff have completed HIPAA training.',
      priority: 'high',
      control: 'Workforce Training & Awareness'
    },
    {
      id: 2,
      title: 'Review Access Control Permissions',
      description: 'Audit current user access levels and remove access for departed employees.',
      priority: 'medium',
      control: 'Access Control & User Management'
    },
    {
      id: 3,
      title: 'Update Risk Assessment',
      description: 'Conduct annual risk assessment and update your risk management plan.',
      priority: 'high',
      control: 'Security Risk Management'
    }
  ];

  const masterControls = [
    {
      id: 'workforce-training',
      name: 'Workforce Training & Awareness',
      description: 'Ensures all staff understand how to protect patient information',
      status: 'needs_attention',
      progress: 75,
      icon: '🎓'
    },
    {
      id: 'access-control',
      name: 'Access Control & User Management',
      description: 'Manages who has access to patient information systems',
      status: 'in_progress',
      progress: 60,
      icon: '🔐'
    },
    {
      id: 'security-risk-management',
      name: 'Security Risk Management',
      description: 'Identifies and manages security risks to patient information',
      status: 'all_set',
      progress: 90,
      icon: '🛡️'
    },
    {
      id: 'vendor-management',
      name: 'Vendor Management & Business Associates',
      description: 'Oversees third-party vendors who handle patient information',
      status: 'pending',
      progress: 0,
      icon: '🤝'
    },
    {
      id: 'incident-response',
      name: 'Incident Response & Breach Management',
      description: 'Establishes procedures for responding to security incidents',
      status: 'pending',
      progress: 0,
      icon: '🚨'
    },
    {
      id: 'physical-security',
      name: 'Physical Security & Facility Controls',
      description: 'Protects physical access to patient information and systems',
      status: 'pending',
      progress: 0,
      icon: '🏢'
    },
    {
      id: 'technical-safeguards',
      name: 'Technical Safeguards & System Security',
      description: 'Implements technology-based protections for electronic data',
      status: 'pending',
      progress: 0,
      icon: '💻'
    },
    {
      id: 'audit-monitoring',
      name: 'Audit & Monitoring',
      description: 'Regularly reviews system activity and compliance records',
      status: 'pending',
      progress: 0,
      icon: '🔍'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'all_set': return 'text-green-600 bg-green-100';
      case 'needs_attention': return 'text-yellow-600 bg-yellow-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'all_set': return <CheckCircleIcon className="w-5 h-5" />;
      case 'needs_attention': return <ExclamationTriangleIcon className="w-5 h-5" />;
      case 'in_progress': return <ClockIcon className="w-5 h-5" />;
      case 'pending': return <ClockIcon className="w-5 h-5" />;
      default: return <ClockIcon className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">HIPAA Compliance</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="mt-4">
          <div className="px-4 py-2">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Master Controls</h3>
          </div>
          <div className="space-y-1">
            {masterControls.map((control) => (
              <Link
                key={control.id}
                href={`/compliance-dashboard/${control.id}`}
                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="mr-3 text-lg">{control.icon}</span>
                <div className="flex-1">
                  <div className="font-medium">{control.name}</div>
                  <div className="text-xs text-gray-500">{control.progress}% Complete</div>
                </div>
                <div className="ml-2">
                  {getStatusIcon(control.status)}
                </div>
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 text-gray-400 hover:text-gray-600 lg:hidden"
                >
                  <Bars3Icon className="w-6 h-6" />
                </button>
                <h1 className="ml-4 text-2xl font-bold text-gray-900">Compliance Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
                <Link
                  href="/dashboard"
                  className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Developer Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Quick Status Overview */}
          <div className="mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">HIPAA Compliance Overview</h2>
                  <div className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 ${getStatusColor(overallCompliance.status)}`}>
                    {getStatusIcon(overallCompliance.status)}
                    <span>Needs Attention</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{overallCompliance.score}%</div>
                    <div className="text-sm text-gray-600">Overall Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">{overallCompliance.completedControls}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-600 mb-2">{overallCompliance.inProgressControls}</div>
                    <div className="text-sm text-gray-600">In Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-600 mb-2">{overallCompliance.pendingControls}</div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                      style={{ width: `${overallCompliance.score}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Actions */}
          <div className="mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <LightBulbIcon className="w-6 h-6 text-yellow-600" />
                  <h2 className="text-xl font-bold text-gray-900">What Needs Your Attention</h2>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {nextActions.slice(0, 2).map((action) => (
                    <div key={action.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{action.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                      </div>
                      <div className="ml-4 flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(action.priority)}`}>
                          {action.priority}
                        </span>
                        <ArrowRightIcon className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Master Controls Grid */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Master Controls</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {masterControls.map((control) => (
                <Link
                  key={control.id}
                  href={`/compliance-dashboard/${control.id}`}
                  className="block"
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-blue-300">
                    <CardContent>
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="text-3xl">{control.icon}</span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-lg">{control.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{control.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(control.status)}
                          <span className="text-sm font-medium text-gray-700">{control.progress}% Complete</span>
                        </div>
                        <ArrowRightIcon className="w-5 h-5 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* HIPAA Standards Mapping */}
          <div className="mt-12">
            <HIPAAStandardsMapping />
          </div>
        </div>
      </div>
    </div>
  );
}
