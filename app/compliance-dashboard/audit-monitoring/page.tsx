'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { Card, CardHeader, CardContent, CardFooter } from '../../../components/ui/Card';

export default function AuditMonitoringPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const masterControls = [
    { id: 'workforce-training', name: 'Workforce Training & Awareness', icon: '🎓' },
    { id: 'access-control', name: 'Access Control & User Management', icon: '🔐' },
    { id: 'security-risk-management', name: 'Security Risk Management', icon: '🛡️' },
    { id: 'vendor-management', name: 'Vendor Management & Business Associates', icon: '🤝' },
    { id: 'incident-response', name: 'Incident Response & Breach Management', icon: '🚨' },
    { id: 'physical-security', name: 'Physical Security & Facility Controls', icon: '🏢' },
    { id: 'technical-safeguards', name: 'Technical Safeguards & System Security', icon: '💻' },
    { id: 'audit-monitoring', name: 'Audit & Monitoring', icon: '🔍', current: true }
  ];

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
                className={`flex items-center px-4 py-3 text-sm hover:bg-gray-100 ${
                  control.current 
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="mr-3 text-lg">{control.icon}</span>
                <div className="flex-1">
                  <div className="font-medium">{control.name}</div>
                </div>
                {control.current && <CheckCircleIcon className="w-4 h-4 text-blue-600" />}
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
                <Link
                  href="/compliance-dashboard"
                  className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
                >
                  <ArrowLeftIcon className="w-5 h-5 mr-2" />
                  Back to Dashboard
                </Link>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MagnifyingGlassIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Audit & Monitoring</h1>
                    <p className="text-sm text-gray-600">Regularly reviews system activity and compliance records</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900">Coming Soon</h2>
              <p className="text-gray-600">This Master Control page is under development. Content will be added here.</p>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <MagnifyingGlassIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Audit & Monitoring</h3>
                <p className="text-gray-600 mb-4">
                  This page will contain the full interactive functionality for managing audit and monitoring compliance.
                </p>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 max-w-md mx-auto">
                  <h4 className="font-medium text-purple-900 mb-2">Planned Features:</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• Audit log management</li>
                    <li>• Compliance monitoring</li>
                    <li>• Reporting and analytics</li>
                    <li>• Alert management</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between w-full">
                <div className="text-sm text-gray-500">
                  Status: In Development
                </div>
                <Link
                  href="/compliance-dashboard"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Return to Dashboard
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
