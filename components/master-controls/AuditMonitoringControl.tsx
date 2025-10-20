import React from 'react';
import {
  MasterControl,
  EvidenceItem,
  AIGuidance,
  EVIDENCE_TYPES,
  MASTER_CONTROL_STATUSES,
  BUSINESS_PROCESS_CATEGORIES,
  getMasterControlStatusDisplay,
  calculateMasterControlProgress,
  formatBusinessDate,
  generateUniqueId
} from '../../types/hipaa';
import { CheckCircleIcon, ExclamationTriangleIcon, ClockIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const AuditMonitoringControl: React.FC = () => {
  // Simulate data for Audit & Monitoring Master Control
  const masterControl: MasterControl = {
    id: 'mc-audit-monitoring',
    name: 'Audit & Monitoring',
    businessDescription: 'Regularly reviews system activity and compliance records to ensure ongoing HIPAA adherence.',
    category: BUSINESS_PROCESS_CATEGORIES.COMPLIANCE,
    status: 'in_progress',
    progress: 55,
    lastActivityDate: new Date('2024-10-14T12:20:00Z'),
    evidenceItems: [
      {
        id: generateUniqueId(),
        masterControlId: 'mc-audit-monitoring',
        type: EVIDENCE_TYPES.DOCUMENT_UPLOAD,
        actionPrompt: 'Upload your audit log review procedures and monitoring policies.',
        description: 'These procedures ensure regular review of system activity and access logs.',
        status: 'approved',
        submissionDate: new Date('2024-08-25T15:00:00Z'),
        documentUrl: '/documents/audit-monitoring-procedures-2024.pdf',
        notes: 'Updated procedures include automated monitoring alerts and quarterly reviews.',
      },
      {
        id: generateUniqueId(),
        masterControlId: 'mc-audit-monitoring',
        type: EVIDENCE_TYPES.ASSIGN_PERSON,
        actionPrompt: 'Assign a person responsible for audit log review and monitoring.',
        description: 'Regular monitoring ensures compliance issues are identified and addressed quickly.',
        status: 'approved',
        assignedTo: 'Jennifer Lee (Compliance Analyst)',
        submissionDate: new Date('2024-09-01T10:00:00Z'),
        notes: 'Compliance Analyst responsible for weekly audit log reviews.',
      },
      {
        id: generateUniqueId(),
        masterControlId: 'mc-audit-monitoring',
        type: EVIDENCE_TYPES.CONFIRMATION,
        actionPrompt: 'Confirm audit logging is enabled on all systems containing patient information.',
        description: 'Comprehensive logging ensures all access to patient data is tracked.',
        status: 'needs_review',
        submissionDate: new Date('2024-10-12T11:00:00Z'),
        notes: 'Most systems enabled, but need to verify new EHR system logging.',
      },
      {
        id: generateUniqueId(),
        masterControlId: 'mc-audit-monitoring',
        type: EVIDENCE_TYPES.RECORD_DATE,
        actionPrompt: 'Record the date of your last comprehensive compliance audit.',
        description: 'Regular audits ensure all HIPAA requirements are being met.',
        status: 'pending',
        lastReviewDate: undefined,
        notes: 'Scheduled for Q1 2025 comprehensive HIPAA compliance audit.',
      },
    ],
    linkedSubControls: [], // Simplified for demo
    overallComplianceStatus: 'partially_compliant',
    aiSummary: 'Good start on audit and monitoring! Your procedures are in place and you have a designated reviewer. Focus on completing the EHR logging verification and scheduling the comprehensive audit.',
  };

  const aiGuidance: AIGuidance = {
    id: generateUniqueId(),
    contextId: masterControl.id,
    contextType: 'MasterControl',
    explanation: 'Audit and monitoring are essential for maintaining HIPAA compliance. Regular review of system activity helps identify potential security issues, unauthorized access, and compliance gaps before they become serious problems.',
    examples: [
      'Audit logs showing who accessed patient information and when.',
      'Regular review procedures for system activity and access patterns.',
      'Comprehensive compliance audits to assess overall HIPAA adherence.'
    ],
    actionSuggestions: [
      'Verify that all systems containing patient information have comprehensive audit logging enabled.',
      'Schedule regular audit log reviews to identify any unusual or unauthorized access patterns.',
      'Plan a comprehensive compliance audit to assess your overall HIPAA compliance status.'
    ],
    summaryOfMissing: 'You need to verify EHR system logging and schedule the comprehensive compliance audit.',
    generatedAt: new Date(),
  };

  const getStatusIcon = (status: MasterControl['status']) => {
    switch (status) {
      case 'all_set':
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      case 'needs_attention':
        return <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />;
      case 'action_required':
        return <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />;
      case 'in_progress':
        return <ClockIcon className="h-6 w-6 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">{masterControl.name}</h2>
        <div className="flex items-center space-x-2">
          {getStatusIcon(masterControl.status)}
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            masterControl.status === 'all_set' ? 'bg-green-100 text-green-800' :
            masterControl.status === 'needs_attention' ? 'bg-yellow-100 text-yellow-800' :
            masterControl.status === 'action_required' ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {getMasterControlStatusDisplay(masterControl.status)}
          </span>
        </div>
      </div>

      <p className="text-gray-700 mb-4">{masterControl.businessDescription}</p>

      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${masterControl.progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mb-6">Progress: {masterControl.progress}% Complete</p>

      <h3 className="text-xl font-semibold text-gray-800 mb-3">Your Actions Needed:</h3>
      <div className="space-y-4 mb-6">
        {masterControl.evidenceItems.map((item) => (
          <div key={item.id} className="flex items-start space-x-3 bg-gray-50 p-3 rounded-md border border-gray-200">
            <div className="flex-shrink-0 mt-1">
              {item.status === 'approved' && <CheckCircleIcon className="h-5 w-5 text-green-500" />}
              {item.status === 'needs_review' && <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />}
              {item.status === 'pending' && <ClockIcon className="h-5 w-5 text-blue-500" />}
            </div>
            <div>
              <p className="font-medium text-gray-900">{item.actionPrompt}</p>
              <p className="text-sm text-gray-600">{item.description}</p>
              {item.documentUrl && (
                <a href={item.documentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm flex items-center mt-1">
                  <MagnifyingGlassIcon className="h-4 w-4 mr-1" /> View Audit Procedures
                </a>
              )}
              {item.assignedTo && <p className="text-xs text-gray-500 mt-1">Assigned To: {item.assignedTo}</p>}
              {item.notes && <p className="text-xs text-gray-500 mt-1">Notes: {item.notes}</p>}
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-semibold text-purple-700 mb-3">AI Guidance:</h3>
      <div className="bg-purple-50 border-l-4 border-purple-400 p-4 text-purple-800 rounded-md">
        <p className="mb-2">{aiGuidance.explanation}</p>
        {aiGuidance.summaryOfMissing && (
          <p className="font-medium mt-3">Summary of Missing: {aiGuidance.summaryOfMissing}</p>
        )}
        <p className="font-medium mt-3">Suggested Actions:</p>
        <ul className="list-disc list-inside text-sm">
          {aiGuidance.actionSuggestions.map((action, index) => (
            <li key={index}>{action}</li>
          ))}
        </ul>
      </div>

      <p className="text-sm text-gray-500 mt-6">Last Activity: {formatBusinessDate(masterControl.lastActivityDate!)}</p>
    </div>
  );
};

export default AuditMonitoringControl;
