import React from 'react';
import {
  EVIDENCE_TYPES,
  MASTER_CONTROL_CATEGORIES,
  getMasterControlStatusDisplay,
  calculateMasterControlProgress,
  formatBusinessDate,
  generateUniqueId
} from '../../lib/hipaa';
import { CheckCircleIcon, ExclamationTriangleIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';

// Local interfaces for this component
interface EvidenceItem {
  id: string;
  masterControlId: string;
  type: string;
  actionPrompt: string;
  description: string;
  status: 'approved' | 'needs_review' | 'pending';
  submissionDate?: Date;
  documentUrl?: string;
  notes?: string;
  assignedTo?: string;
  lastReviewDate?: Date;
}

interface MasterControl {
  id: string;
  name: string;
  businessDescription: string;
  category: string;
  status: 'all_set' | 'needs_attention' | 'action_required' | 'in_progress';
  progress: number;
  lastActivityDate: Date;
  evidenceItems: EvidenceItem[];
  linkedSubControls: string[];
  overallComplianceStatus: string;
  aiSummary: string;
}

interface AIGuidance {
  id: string;
  contextId: string;
  contextType: string;
  explanation: string;
  examples: string[];
  actionSuggestions: string[];
  summaryOfMissing: string;
  generatedAt: Date;
}

const SecurityRiskManagementControl: React.FC = () => {
  // Simulate data for Security Risk Management & Contingency Planning Master Control
  const masterControl: MasterControl = {
    id: 'mc-security-risk-management',
    name: 'Security Risk Management & Contingency Planning',
    businessDescription: 'Ensures the organization proactively identifies, evaluates, and manages security risks to patient information, while maintaining operational continuity in emergencies or system failures.',
    category: MASTER_CONTROL_CATEGORIES.SECURITY,
    status: 'needs_attention',
    progress: 40,
    lastActivityDate: new Date('2024-10-08T14:20:00Z'),
    evidenceItems: [
      {
        id: generateUniqueId(),
        masterControlId: 'mc-security-risk-management',
        type: EVIDENCE_TYPES.DOCUMENT,
        actionPrompt: 'Upload your current risk analysis report and risk management plan.',
        description: 'These documents show how you identify and address security risks to patient information.',
        status: 'approved',
        submissionDate: new Date('2024-08-15T10:00:00Z'),
        documentUrl: '/documents/risk-analysis-2024.pdf',
        notes: 'Annual risk assessment completed with identified vulnerabilities and mitigation plans.',
      },
      {
        id: generateUniqueId(),
        masterControlId: 'mc-security-risk-management',
        type: EVIDENCE_TYPES.DOCUMENT,
        actionPrompt: 'Upload the designation letter for your Security Officer.',
        description: 'HIPAA requires a designated Security Officer responsible for implementing and maintaining security policies.',
        status: 'approved',
        submissionDate: new Date('2024-09-01T09:00:00Z'),
        documentUrl: '/documents/security-officer-designation.pdf',
        notes: 'Dr. Sarah Martinez designated as Security Officer with written authorization.',
      },
      {
        id: generateUniqueId(),
        masterControlId: 'mc-security-risk-management',
        type: EVIDENCE_TYPES.ASSIGNMENT,
        actionPrompt: 'Assign a person responsible for ongoing risk management and contingency planning.',
        description: 'Regular oversight ensures risks are continuously monitored and contingency plans remain current.',
        status: 'approved',
        assignedTo: 'Dr. Sarah Martinez (Security Officer)',
        submissionDate: new Date('2024-09-01T09:00:00Z'),
        notes: 'Security Officer responsible for risk management and contingency planning oversight.',
      },
      {
        id: generateUniqueId(),
        masterControlId: 'mc-security-risk-management',
        type: EVIDENCE_TYPES.CONFIRMATION,
        actionPrompt: 'Confirm your data backup and disaster recovery procedures are tested and documented.',
        description: 'Regular testing ensures your backup and recovery systems work when needed.',
        status: 'needs_review',
        submissionDate: new Date('2024-10-05T16:00:00Z'),
        notes: 'Backup testing scheduled for next week, disaster recovery plan needs updating.',
      },
      {
        id: generateUniqueId(),
        masterControlId: 'mc-security-risk-management',
        type: EVIDENCE_TYPES.RECORD,
        actionPrompt: 'Record the date of your last comprehensive risk assessment.',
        description: 'Regular risk assessments help identify new threats and vulnerabilities.',
        status: 'pending',
        lastReviewDate: undefined,
        notes: 'Next comprehensive risk assessment scheduled for Q1 2025.',
      },
    ],
    linkedSubControls: [], // Simplified for demo
    overallComplianceStatus: 'needs_improvement',
    aiSummary: 'Your risk management foundation is in place, but contingency planning needs attention. Focus on completing backup testing and updating your disaster recovery procedures.',
  };

  const aiGuidance: AIGuidance = {
    id: generateUniqueId(),
    contextId: masterControl.id,
    contextType: 'MasterControl',
    explanation: 'Risk management is the foundation of HIPAA compliance. By identifying and addressing security risks proactively, you prevent breaches before they happen. Contingency planning ensures you can continue operations even during emergencies or system failures.',
    examples: [
      'Comprehensive risk analysis identifying all potential threats to patient information.',
      'Data backup procedures with regular testing and off-site storage.',
      'Disaster recovery plans for various emergency scenarios.',
      'Emergency mode operation procedures for critical systems.'
    ],
    actionSuggestions: [
      'Complete your data backup testing to ensure recovery procedures work properly.',
      'Update your disaster recovery plan to reflect current systems and procedures.',
      'Schedule regular risk assessments to identify new threats and vulnerabilities.',
      'Train staff on emergency procedures and contingency operations.'
    ],
    summaryOfMissing: 'You need to complete backup testing, update disaster recovery procedures, and schedule the next comprehensive risk assessment.',
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
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
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
      </CardHeader>

      <CardContent>
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
                  <ShieldCheckIcon className="h-4 w-4 mr-1" /> View Risk Analysis
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
      </CardContent>
    </Card>
  );
};

export default SecurityRiskManagementControl;
