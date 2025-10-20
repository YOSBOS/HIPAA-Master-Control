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
import { CheckCircleIcon, ExclamationTriangleIcon, ClockIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';

const IncidentResponseControl: React.FC = () => {
  // Simulate data for Incident Response & Breach Management Master Control
  const masterControl: MasterControl = {
    id: 'mc-incident-response',
    name: 'Incident Response & Breach Management',
    businessDescription: 'Establishes procedures for responding to security incidents and potential breaches of patient information.',
    category: BUSINESS_PROCESS_CATEGORIES.SECURITY,
    status: 'needs_attention',
    progress: 45,
    lastActivityDate: new Date('2024-10-12T11:15:00Z'),
    evidenceItems: [
      {
        id: generateUniqueId(),
        masterControlId: 'mc-incident-response',
        type: EVIDENCE_TYPES.DOCUMENT_UPLOAD,
        actionPrompt: 'Upload your incident response plan and breach notification procedures.',
        description: 'Clear procedures ensure quick and appropriate response to security incidents.',
        status: 'approved',
        submissionDate: new Date('2024-08-20T09:00:00Z'),
        documentUrl: '/documents/incident-response-plan-2024.pdf',
        notes: 'Updated plan includes new reporting requirements and contact information.',
      },
      {
        id: generateUniqueId(),
        masterControlId: 'mc-incident-response',
        type: EVIDENCE_TYPES.ASSIGN_PERSON,
        actionPrompt: 'Assign a person responsible for incident response coordination.',
        description: 'A designated coordinator ensures consistent and timely incident handling.',
        status: 'approved',
        assignedTo: 'Dr. Michael Chen (Security Officer)',
        submissionDate: new Date('2024-09-01T08:00:00Z'),
        notes: 'Dr. Chen designated as primary incident response coordinator.',
      },
      {
        id: generateUniqueId(),
        masterControlId: 'mc-incident-response',
        type: EVIDENCE_TYPES.CONFIRMATION,
        actionPrompt: 'Confirm staff training on incident reporting procedures.',
        description: 'All staff should know how to report potential security incidents immediately.',
        status: 'needs_review',
        submissionDate: new Date('2024-10-10T15:30:00Z'),
        notes: 'Training scheduled for next staff meeting.',
      },
      {
        id: generateUniqueId(),
        masterControlId: 'mc-incident-response',
        type: EVIDENCE_TYPES.RECORD_DATE,
        actionPrompt: 'Record the date of your last incident response drill or tabletop exercise.',
        description: 'Regular practice ensures your team is prepared for real incidents.',
        status: 'pending',
        lastReviewDate: undefined,
        notes: 'Scheduled for November 2024 incident response drill.',
      },
    ],
    linkedSubControls: [], // Simplified for demo
    overallComplianceStatus: 'needs_improvement',
    aiSummary: 'Your incident response plan is solid, but staff training and practice drills are needed. Focus on completing the training and scheduling the drill to ensure your team is prepared.',
  };

  const aiGuidance: AIGuidance = {
    id: generateUniqueId(),
    contextId: masterControl.id,
    contextType: 'MasterControl',
    explanation: 'Incident response is critical for protecting patient information. When security incidents occur, quick and proper response can minimize damage and ensure compliance with breach notification requirements.',
    examples: [
      'Written incident response plan with clear procedures and contact information.',
      'Staff training on recognizing and reporting potential security incidents.',
      'Regular drills to practice incident response procedures.'
    ],
    actionSuggestions: [
      'Conduct staff training on incident recognition and reporting procedures.',
      'Schedule a tabletop exercise to practice your incident response plan.',
      'Review and update contact information for incident response team members.'
    ],
    summaryOfMissing: 'You need to complete staff training on incident reporting and schedule the incident response drill.',
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
                  <ShieldExclamationIcon className="h-4 w-4 mr-1" /> View Incident Response Plan
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

export default IncidentResponseControl;
