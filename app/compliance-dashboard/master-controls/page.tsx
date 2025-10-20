'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  Bars3Icon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import RetractableSidebar from '@/components/layout/RetractableSidebar';
import { getMockDashboardData } from '@/lib/hipaa/mockData';

export default function MasterControlsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Get mock compliance data using the new scoring system
  const { masterControlScores } = getMockDashboardData();

  // Map master control scores to display format
  const masterControls = masterControlScores.map((score: any) => {
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
      maturityLevel: score.maturityLevel,
      icon: icons[score.controlId as keyof typeof icons] || '📋',
      strengths: score.strengths,
      weaknesses: score.weaknesses,
      recommendations: score.recommendations
    };
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'all_set': return 'text-green-600 bg-green-100 border-green-200';
      case 'needs_attention': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'in_progress': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'pending': return 'text-gray-600 bg-gray-100 border-gray-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
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

  const getMaturityColor = (maturity: string) => {
    switch (maturity) {
      case 'Excellent': return 'text-emerald-600';
      case 'Great': return 'text-green-600';
      case 'Good': return 'text-yellow-600';
      case 'Moderate': return 'text-orange-600';
      case 'Poor': return 'text-red-600';
      default: return 'text-gray-600';
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
                  className={`p-2 hover:bg-gray-100 rounded-md transition-colors ${
                    sidebarOpen ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Bars3Icon className="w-6 h-6" />
                </button>
                <div className="ml-4 lg:ml-0">
                  <h1 className="text-2xl font-bold text-gray-900">Master Controls</h1>
                  <p className="text-sm text-gray-600">Manage your HIPAA compliance controls</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/compliance-dashboard"
                  className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{masterControls.length}</div>
                  <div className="text-sm text-gray-600">Total Controls</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {masterControls.filter((c: any) => c.status === 'all_set').length}
                  </div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {masterControls.filter((c: any) => c.status === 'in_progress').length}
                  </div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {masterControls.filter((c: any) => c.status === 'needs_attention').length}
                  </div>
                  <div className="text-sm text-gray-600">Need Attention</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Master Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {masterControls.map((control: any) => (
              <Link
                key={control.id}
                href={`/compliance-dashboard/${control.id}`}
                className="block"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-blue-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <span className="text-3xl">{control.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg mb-2">{control.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{control.description}</p>
                      </div>
                    </div>

                    {/* Status and Progress */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(control.status)}`}>
                        {getStatusIcon(control.status)}
                        <span>{control.status.replace('_', ' ')}</span>
                      </div>
                      <div className={`text-sm font-semibold ${getMaturityColor(control.maturityLevel)}`}>
                        {control.maturityLevel}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{control.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${control.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Quick Insights */}
                    {control.strengths.length > 0 && (
                      <div className="mb-2">
                        <div className="text-xs font-medium text-green-700 mb-1">Strengths:</div>
                        <div className="text-xs text-green-600 line-clamp-2">
                          {control.strengths[0]}
                        </div>
                      </div>
                    )}

                    {control.weaknesses.length > 0 && (
                      <div className="mb-4">
                        <div className="text-xs font-medium text-red-700 mb-1">Areas for Improvement:</div>
                        <div className="text-xs text-red-600 line-clamp-2">
                          {control.weaknesses[0]}
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="flex items-center justify-end">
                      <ArrowRightIcon className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
