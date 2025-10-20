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
import { CheckCircleIcon, ExclamationTriangleIcon, ClockIcon, HandshakeIcon } from '@heroicons/react/24/outline';

const VendorManagementControl: React.FC = () => {
  // Simulate data for Vendor Management & Business Associates Master Control
  const masterControl: MasterControl = {
    id: 'mc-vendor-management',
    name: 'Vendor Management & Business Associates',
    businessDescription: 'Oversees third-party vendors who handle patient information and ensures they meet HIPAA requirements.',
    category: BUSINESS_PROCESS_CATEGORIES.VENDORS,
    status: 'in_progress',
    progress: 60,
    lastActivityDate: new Date('2024-10-18T09:30:00Z'),
    evidenceItems: [
      {
        id: generateUniqueId(),
        masterControlId: 'mc-vendor-management',
        type: EVIDENCE_TYPES.DOCUMENT_UPLOAD,
        actionPrompt: 'Upload your current Business Associate Agreements (BAAs) for all vendors handling patient data.',
        description: 'These agreements ensure vendors protect patient information according to HIPAA standards.',
        status: 'approved',
        submissionDate: new Date('2024-09-15T14:00:00Z'),
        documentUrl: '/documents/baa-collection-2024.pdf',
        notes: 'Updated BAAs for EHR vendor, billing service, and cloud storage provider.',
      },
      {
        id: generateUniqueId(),
        masterControlId: 'mc-vendor-management',
        type: EVIDENCE_TYPES.ASSIGN_PERSON,
        actionPrompt: 'Assign a person responsible for vendor compliance monitoring.',
        description: 'Regular monitoring ensures vendors maintain HIPAA compliance over time.',
        status: 'approved',
        assignedTo: 'Sarah Johnson (Compliance Manager)',
        submissionDate: new Date('2024-10-01T10:00:00Z'),
        notes: 'Assigned to Compliance Manager with quarterly review schedule.',
      },
      {
        id: generateUniqueId(),
        masterControlId: 'mc-vendor-management',
        type: EVIDENCE_TYPES.CONFIRMATION,
        actionPrompt: 'Confirm all new vendors sign BAAs before accessing patient data.',
        description: 'This ensures no vendor can access patient information without proper agreements.',
        status: 'needs_review',
        submissionDate: new Date('2024-10-15T16:00:00Z'),
        notes: 'New IT support vendor needs BAA before system access.',
      },
      {
        id: generateUniqueId(),
        masterControlId: 'mc-vendor-management',
        type: EVIDENCE_TYPES.RECORD_DATE,
        actionPrompt: 'Record the date of your last vendor risk assessment.',
        description: 'Regular assessments help identify and address vendor security risks.',
        status: 'pending',
        lastReviewDate: undefined,
        notes: 'Scheduled for Q4 2024 vendor security review.',
      },
    ],
    linkedSubControls: [], // Simplified for demo
    overallComplianceStatus: 'partially_compliant',
    aiSummary: 'Good progress on vendor management! Your BAAs are current and you have a designated monitor. Focus on completing the new vendor BAA and scheduling the risk assessment.',
  };

  const aiGuidance: AIGuidance = {
    id: generateUniqueId(),
    contextId: masterControl.id,
    contextType: 'MasterControl',
    explanation: 'Vendor management is crucial because third parties often have access to your patient data. Proper agreements and monitoring ensure they protect this information as well as you do, reducing the risk of breaches through vendor systems.',
    examples: [
      'Business Associate Agreements (BAAs) for EHR vendors, billing services, and cloud providers.',
      'Vendor security questionnaires and compliance certifications.',
      'Regular vendor access reviews and termination procedures.'
    ],
    actionSuggestions: [
      'Review all current vendors to ensure they have signed BAAs before accessing patient data.',
      'Implement a vendor onboarding process that requires BAA completion before system access.',
      'Schedule quarterly vendor compliance reviews to ensure ongoing HIPAA adherence.'
    ],
    summaryOfMissing: 'You need to complete the BAA for the new IT support vendor and schedule the Q4 vendor risk assessment.',
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
                  <HandshakeIcon className="h-4 w-4 mr-1" /> View BAA Collection
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

export default VendorManagementControl;
