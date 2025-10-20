/**
 * Master Controls Page
 * 
 * This page showcases all the Master Controls - the 8-9 business process areas
 * that clinic managers understand and can act on.
 */

import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import WorkforceTrainingControl from '../../components/master-controls/WorkforceTrainingControl';
import AccessControlControl from '../../components/master-controls/AccessControlControl';
import VendorManagementControl from '../../components/master-controls/VendorManagementControl';
import IncidentResponseControl from '../../components/master-controls/IncidentResponseControl';
import PhysicalSecurityControl from '../../components/master-controls/PhysicalSecurityControl';
import TechnicalSafeguardsControl from '../../components/master-controls/TechnicalSafeguardsControl';
import AuditMonitoringControl from '../../components/master-controls/AuditMonitoringControl';

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
        {/* Return to Dashboard Button */}
        <div className="mb-6">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Return to Dashboard
          </Link>
        </div>
        
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
          
          {/* Vendor Management Control */}
          <VendorManagementControl />
          
          {/* Incident Response Control */}
          <IncidentResponseControl />
          
          {/* Physical Security Control */}
          <PhysicalSecurityControl />
          
          {/* Technical Safeguards Control */}
          <TechnicalSafeguardsControl />
          
          {/* Audit & Monitoring Control */}
          <AuditMonitoringControl />
          
          {/* Phase 2 Complete! */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-green-800 mb-2">🎉 Phase 2 Complete!</h3>
            <p className="text-green-700 mb-4">
              All 7 Master Controls are now implemented and ready for use.
            </p>
            <p className="text-sm text-green-600">
              Next: Phase 3 - Evidence Management System
            </p>
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
