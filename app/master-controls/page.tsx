/**
 * Master Controls Page
 * 
 * This page showcases all the Master Controls - the 8-9 business process areas
 * that clinic managers understand and can act on.
 */

import React from 'react';
import WorkforceTrainingControl from '../../components/master-controls/WorkforceTrainingControl';
import AccessControlControl from '../../components/master-controls/AccessControlControl';
import SecurityRiskManagementControl from '../../components/master-controls/SecurityRiskManagementControl';

export default function MasterControlsPage() {
  // Sample data for demonstration
  const workforceTrainingData = {
    status: 'needs_attention' as const,
    progress: 75,
    evidenceItems: [
      {
        id: '1',
        type: 'document_upload' as const,
        actionPrompt: 'Upload your annual employee HIPAA training materials',
        description: 'This document confirms that your staff receive regular training on protecting patient information.',
        status: 'submitted' as const,
        submissionDate: new Date('2024-10-15'),
        assignedTo: 'HR Manager',
        notes: 'Q3 2024 training completed'
      },
      {
        id: '2',
        type: 'confirmation' as const,
        actionPrompt: 'Confirm all new employees complete HIPAA training before accessing patient data',
        description: 'This ensures new staff understand their responsibilities before handling sensitive information.',
        status: 'pending' as const,
        assignedTo: 'HR Manager'
      },
      {
        id: '3',
        type: 'record_date' as const,
        actionPrompt: 'Record the date of your last workforce training review',
        description: 'Track when you last reviewed and updated your training program.',
        status: 'needs_review' as const,
        submissionDate: new Date('2024-09-01'),
        notes: 'Annual review scheduled'
      }
    ],
    lastActivityDate: new Date('2024-10-15'),
    aiSummary: 'Your workforce training is mostly in order, but some recent submissions need review. Focus on getting all staff acknowledgments and scheduling the annual review.'
  };

  const accessControlData = {
    status: 'in_progress' as const,
    progress: 60,
    evidenceItems: [
      {
        id: '1',
        type: 'document_upload' as const,
        actionPrompt: 'Upload your current user access list for patient information systems',
        description: 'Document who has access to what systems and what level of access they have.',
        status: 'submitted' as const,
        submissionDate: new Date('2024-10-10'),
        assignedTo: 'IT Manager',
        notes: 'Updated quarterly access review'
      },
      {
        id: '2',
        type: 'confirmation' as const,
        actionPrompt: 'Confirm that access is removed immediately when employees leave',
        description: 'Ensure terminated employees cannot access patient information.',
        status: 'pending' as const,
        assignedTo: 'IT Manager'
      },
      {
        id: '3',
        type: 'assign_person' as const,
        actionPrompt: 'Assign someone responsible for reviewing access permissions quarterly',
        description: 'Designate who will regularly review and update user access levels.',
        status: 'approved' as const,
        submissionDate: new Date('2024-10-01'),
        assignedTo: 'IT Manager'
      }
    ],
    lastActivityDate: new Date('2024-10-10'),
    aiSummary: 'Good progress on access controls! You have a designated person and quarterly reviews. Next step: ensure immediate access removal for departing employees.'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Master Controls
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Manage your HIPAA compliance through business process areas you understand and can act on.
          </p>
          
          {/* Philosophy Reminder */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">🎯 Business Language Over Legal Jargon</h2>
            <p className="text-blue-800">
              Instead of managing 40+ technical controls, focus on these 8-9 key business processes. 
              Each one represents real activities your clinic does every day.
            </p>
          </div>
        </div>

        {/* Master Controls Grid */}
        <div className="space-y-8">
          {/* Workforce Training Control */}
          <WorkforceTrainingControl {...workforceTrainingData} />
          
          {/* Access Control */}
          <AccessControlControl {...accessControlData} />
          
          {/* Security Risk Management Control */}
          <SecurityRiskManagementControl />
          
          {/* Coming Soon Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Vendor Management & Business Associates',
                description: 'Oversees third-party vendors who handle patient information',
                icon: '🤝',
                status: 'Coming Soon'
              },
              {
                title: 'Risk Assessment & Management',
                description: 'Identifies and mitigates potential threats to patient information',
                icon: '⚠️',
                status: 'Coming Soon'
              },
              {
                title: 'Incident Response & Breach Management',
                description: 'Establishes procedures for responding to security incidents',
                icon: '🚨',
                status: 'Coming Soon'
              },
              {
                title: 'Physical Security & Facility Controls',
                description: 'Protects physical access to patient information and systems',
                icon: '🏢',
                status: 'Coming Soon'
              },
              {
                title: 'Technical Safeguards & System Security',
                description: 'Implements technology-based protections for electronic data',
                icon: '💻',
                status: 'Coming Soon'
              },
              {
                title: 'Policies & Procedures Management',
                description: 'Develops and maintains formal HIPAA compliance guidelines',
                icon: '📋',
                status: 'Coming Soon'
              },
              {
                title: 'Audit & Monitoring',
                description: 'Regularly reviews system activity and compliance records',
                icon: '🔍',
                status: 'Coming Soon'
              }
            ].map((control, index) => (
              <div key={index} className="bg-white rounded-lg shadow border border-gray-200 p-6 opacity-75">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-2xl">{control.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{control.title}</h3>
                    <p className="text-sm text-gray-600">{control.description}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{control.status}</span>
                  <div className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    Phase 2
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Building the revolutionary HIPAA Master Control Tracker - 
            <span className="font-semibold"> Business Language Over Legal Jargon</span>
          </p>
        </div>
      </div>
    </div>
  );
}
