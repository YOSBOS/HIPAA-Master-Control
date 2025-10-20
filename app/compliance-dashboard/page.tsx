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
import CompliancePieChart from '../../components/dashboard/CompliancePieChart';
import RetractableSidebar from '../../components/layout/RetractableSidebar';
import { getMockDashboardData } from '../../lib/hipaa/mockData';

export default function ComplianceDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Simple test function
  const testClick = () => {
    console.log('TEST CLICK WORKING!');
    alert('Button clicked!');
  };

  // Get mock compliance data using the new scoring system
  const { overallScore, masterControlScores, overallCompliance } = getMockDashboardData();

  // Generate next actions based on scoring system
  const nextActions = overallScore.priorityActions.slice(0, 3).map((action, index) => ({
    id: index + 1,
    title: action,
    description: `This action will help improve your overall compliance score and maturity level.`,
    priority: index === 0 ? 'high' : index === 1 ? 'medium' : 'low',
    control: 'Compliance Improvement'
  }));

  // Map master control scores to display format
  const masterControls = masterControlScores.map(score => {
    const icons = {
      'workforce-training': '🎓',
      'access-control': '🔐',
      'security-risk-management': '🛡️',
      'vendor-management': '🤝',
      'incident-response': '🚨',
      'physical-security': '🏢',
      'technical-safeguards': '💻',
      'audit-monitoring': '🔍'
    };

    const descriptions = {
      'workforce-training': 'Ensures all staff understand how to protect patient information',
      'access-control': 'Manages who has access to patient information systems',
      'security-risk-management': 'Identifies and manages security risks to patient information',
      'vendor-management': 'Oversees third-party vendors who handle patient information',
      'incident-response': 'Establishes procedures for responding to security incidents',
      'physical-security': 'Protects physical access to patient information and systems',
      'technical-safeguards': 'Implements technology-based protections for electronic data',
      'audit-monitoring': 'Regularly reviews system activity and compliance records'
    };

    // Map maturity level to status
    const getStatusFromMaturity = (maturity: string) => {
      switch (maturity) {
        case 'Excellent':
        case 'Great':
          return 'all_set';
        case 'Good':
          return 'in_progress';
        case 'Moderate':
        case 'Poor':
          return 'needs_attention';
        default:
          return 'pending';
      }
    };

    return {
      id: score.controlId,
      name: score.controlName,
      description: descriptions[score.controlId as keyof typeof descriptions] || 'HIPAA compliance control',
      status: getStatusFromMaturity(score.maturityLevel),
      progress: score.percentageScore,
      icon: icons[score.controlId as keyof typeof icons] || '📋'
    };
  });

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
      <RetractableSidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={`p-2 rounded-md transition-colors ${
                    sidebarOpen ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white hover:bg-gray-600'
                  }`}
                >
                  <Bars3Icon className="w-6 h-6" />
                </button>
                <h1 className="ml-4 text-2xl font-bold text-gray-900">
                  Compliance Dashboard
                </h1>
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
          {/* Compliance Maturity Pie Chart */}
          <div className="mb-8">
            <CompliancePieChart 
              overallScore={overallScore}
              masterControlScores={masterControlScores}
            />
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

          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/compliance-dashboard/master-controls"
                className="block"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-blue-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <ShieldCheckIcon className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg">Master Controls</h3>
                        <p className="text-sm text-gray-600 mt-1">Manage all HIPAA compliance controls</p>
                      </div>
                      <ArrowRightIcon className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              <Link
                href="/compliance-dashboard/reports"
                className="block"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-blue-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <ChartBarIcon className="w-8 h-8 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg">Reports</h3>
                        <p className="text-sm text-gray-600 mt-1">View compliance reports and analytics</p>
                      </div>
                      <ArrowRightIcon className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
