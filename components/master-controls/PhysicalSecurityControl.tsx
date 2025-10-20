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
import { CheckCircleIcon, ExclamationTriangleIcon, ClockIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

const PhysicalSecurityControl: React.FC = () => {
  // Simulate data for Physical Security & Facility Controls Master Control
  const masterControl: MasterControl = {
    id: 'mc-physical-security',
    name: 'Physical Security & Facility Controls',
    businessDescription: 'Protects physical access to patient information and systems through facility security measures.',
    category: BUSINESS_PROCESS_CATEGORIES.SECURITY,
    status: 'in_progress',
    progress: 70,
    lastActivityDate: new Date('2024-10-16T13:45:00Z'),
    evidenceItems: [
      {
        id: generateUniqueId(),
        masterControlId: 'mc-physical-security',
        type: EVIDENCE_TYPES.DOCUMENT_UPLOAD,
        actionPrompt: 'Upload your facility access control policies and procedures.',
        description: 'These policies ensure only authorized personnel can access areas with patient information.',
        status: 'approved',
        submissionDate: new Date('2024-09-10T10:00:00Z'),
        documentUrl: '/documents/facility-access-policies-2024.pdf',
        notes: 'Updated policies include visitor access procedures and after-hours security.',
      },
      {
        id: generateUniqueId(),
        masterControlId: 'mc-physical-security',
        type: EVIDENCE_TYPES.ASSIGN_PERSON,
        actionPrompt: 'Assign a person responsible for physical security oversight.',
        description: 'Regular oversight ensures physical security measures remain effective.',
        status: 'approved',
        assignedTo: 'Tom Wilson (Facilities Manager)',
        submissionDate: new Date('2024-09-15T14:00:00Z'),
        notes: 'Facilities Manager responsible for access control and security systems.',
      },
      {
        id: generateUniqueId(),
        masterControlId: 'mc-physical-security',
        type: EVIDENCE_TYPES.CONFIRMATION,
        actionPrompt: 'Confirm all workstations are secured when unattended.',
        description: 'Workstation security prevents unauthorized access to patient information.',
        status: 'approved',
        submissionDate: new Date('2024-10-01T09:00:00Z'),
        notes: 'All workstations have automatic lock screens and physical security measures.',
      },
      {
        id: generateUniqueId(),
        masterControlId: 'mc-physical-security',
        type: EVIDENCE_TYPES.RECORD_DATE,
        actionPrompt: 'Record the date of your last physical security audit.',
        description: 'Regular audits ensure physical security measures remain effective.',
        status: 'pending',
        lastReviewDate: undefined,
        notes: 'Scheduled for December 2024 comprehensive security audit.',
      },
    ],
    linkedSubControls: [], // Simplified for demo
    overallComplianceStatus: 'partially_compliant',
    aiSummary: 'Good progress on physical security! Your policies are current and workstations are secured. Complete the security audit to ensure all measures remain effective.',
  };

  const aiGuidance: AIGuidance = {
    id: generateUniqueId(),
    contextId: masterControl.id,
    contextType: 'MasterControl',
    explanation: 'Physical security is the first line of defense for patient information. Proper facility controls prevent unauthorized physical access to computers, files, and other systems containing sensitive data.',
    examples: [
      'Access control systems for restricted areas like server rooms and record storage.',
      'Workstation security policies including automatic lock screens.',
      'Visitor access procedures and after-hours security measures.'
    ],
    actionSuggestions: [
      'Conduct a comprehensive physical security audit of all areas containing patient information.',
      'Review and update visitor access procedures to ensure proper authorization.',
      'Ensure all workstations have automatic lock screens and are physically secured when unattended.'
    ],
    summaryOfMissing: 'You need to complete the physical security audit scheduled for December 2024.',
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
                  <BuildingOfficeIcon className="h-4 w-4 mr-1" /> View Facility Policies
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

export default PhysicalSecurityControl;
