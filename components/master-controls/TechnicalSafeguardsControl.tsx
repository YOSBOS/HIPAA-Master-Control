import React from 'react';
import {
  MasterControl,
  EvidenceItem,
  AIGuidance,
  EVIDENCE_TYPES,
  MASTER_CONTROL_STATUSES,
  getMasterControlStatusDisplay,
  calculateMasterControlProgress,
  formatBusinessDate,
  generateUniqueId
} from '../../types/hipaa';
import { MASTER_CONTROL_CATEGORIES } from '../../lib/hipaa/constants';
import { CheckCircleIcon, ExclamationTriangleIcon, ClockIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

const TechnicalSafeguardsControl: React.FC = () => {
  // Simulate data for Technical Safeguards & System Security Master Control
  const masterControl: MasterControl = {
    id: 'mc-technical-safeguards',
    name: 'Technical Safeguards & System Security',
    businessDescription: 'Implements technology-based protections for electronic patient information and system security.',
    category: BUSINESS_PROCESS_CATEGORIES.TECHNOLOGY,
    status: 'all_set',
    progress: 85,
    lastActivityDate: new Date('2024-10-20T16:30:00Z'),
    evidenceItems: [
      {
        id: generateUniqueId(),
        masterControlId: 'mc-technical-safeguards',
        type: EVIDENCE_TYPES.DOCUMENT_UPLOAD,
        actionPrompt: 'Upload your system security policies and technical safeguards documentation.',
        description: 'These documents outline how technology protects patient information.',
        status: 'approved',
        submissionDate: new Date('2024-09-05T11:00:00Z'),
        documentUrl: '/documents/technical-safeguards-2024.pdf',
        notes: 'Comprehensive documentation of encryption, access controls, and audit logging.',
      },
      {
        id: generateUniqueId(),
        masterControlId: 'mc-technical-safeguards',
        type: EVIDENCE_TYPES.ASSIGN_PERSON,
        actionPrompt: 'Assign a person responsible for technical security oversight.',
        description: 'Regular oversight ensures technical safeguards remain effective and up-to-date.',
        status: 'approved',
        assignedTo: 'Lisa Rodriguez (IT Security Manager)',
        submissionDate: new Date('2024-08-20T09:00:00Z'),
        notes: 'IT Security Manager responsible for all technical safeguards.',
      },
      {
        id: generateUniqueId(),
        masterControlId: 'mc-technical-safeguards',
        type: EVIDENCE_TYPES.CONFIRMATION,
        actionPrompt: 'Confirm all systems have encryption for data at rest and in transit.',
        description: 'Encryption protects patient information from unauthorized access.',
        status: 'approved',
        submissionDate: new Date('2024-10-15T14:00:00Z'),
        notes: 'All systems verified with AES-256 encryption for data at rest and TLS 1.3 for data in transit.',
      },
      {
        id: generateUniqueId(),
        masterControlId: 'mc-technical-safeguards',
        type: EVIDENCE_TYPES.RECORD_DATE,
        actionPrompt: 'Record the date of your last security software update.',
        description: 'Regular updates ensure systems are protected against the latest threats.',
        status: 'approved',
        lastReviewDate: new Date('2024-10-18T10:00:00Z'),
        notes: 'All security software updated to latest versions with automated update schedule.',
      },
    ],
    linkedSubControls: [], // Simplified for demo
    overallComplianceStatus: 'compliant',
    aiSummary: 'Excellent progress on technical safeguards! Your systems are well-protected with encryption, regular updates, and proper oversight. This is a strong foundation for HIPAA compliance.',
  };

  const aiGuidance: AIGuidance = {
    id: generateUniqueId(),
    contextId: masterControl.id,
    contextType: 'MasterControl',
    explanation: 'Technical safeguards are the digital security measures that protect patient information. These include encryption, access controls, audit logging, and regular security updates to prevent unauthorized access to electronic systems.',
    examples: [
      'Encryption for data at rest (stored data) and data in transit (transmitted data).',
      'Access controls including strong passwords, multi-factor authentication, and role-based permissions.',
      'Audit logging to track who accesses patient information and when.'
    ],
    actionSuggestions: [
      'Continue regular security updates and monitoring to maintain strong technical safeguards.',
      'Review access controls quarterly to ensure they remain appropriate for current staff roles.',
      'Consider implementing additional security measures like intrusion detection systems.'
    ],
    summaryOfMissing: 'Your technical safeguards are in excellent condition with no missing elements.',
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
                  <ComputerDesktopIcon className="h-4 w-4 mr-1" /> View Technical Documentation
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

export default TechnicalSafeguardsControl;
