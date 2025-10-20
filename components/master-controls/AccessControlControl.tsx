/**
 * Access Control & User Management Master Control
 * 
 * This component represents the "Access Control & User Management" business process area.
 * Focuses on who has access to what - something clinic managers understand!
 */

import React from 'react';
import { 
  KeyIcon, 
  UserIcon, 
  ShieldCheckIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';

interface EvidenceItem {
  id: string;
  type: 'document_upload' | 'confirmation' | 'record_date' | 'assign_person';
  actionPrompt: string;
  description: string;
  status: 'pending' | 'submitted' | 'approved' | 'needs_review' | 'rejected';
  submissionDate?: Date;
  assignedTo?: string;
  notes?: string;
}

interface AccessControlControlProps {
  status: 'all_set' | 'needs_attention' | 'action_required' | 'in_progress';
  progress: number;
  evidenceItems: EvidenceItem[];
  lastActivityDate?: Date;
  aiSummary?: string;
}

export default function AccessControlControl({
  status,
  progress,
  evidenceItems,
  lastActivityDate,
  aiSummary
}: AccessControlControlProps) {
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'all_set': return 'text-green-600 bg-green-100';
      case 'needs_attention': return 'text-yellow-600 bg-yellow-100';
      case 'action_required': return 'text-red-600 bg-red-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'all_set': return <CheckCircleIcon className="w-5 h-5" />;
      case 'needs_attention': return <ExclamationTriangleIcon className="w-5 h-5" />;
      case 'action_required': return <ExclamationTriangleIcon className="w-5 h-5" />;
      case 'in_progress': return <ClockIcon className="w-5 h-5" />;
      default: return <ClockIcon className="w-5 h-5" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'all_set': return 'All set - your access controls are working well';
      case 'needs_attention': return 'Needs attention - some access items require review';
      case 'action_required': return 'Action required - critical access items are pending';
      case 'in_progress': return 'In progress - actively working on access controls';
      default: return 'Unknown status';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <KeyIcon className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Access Control & User Management
            </h2>
            <p className="text-sm text-gray-600">
              Manages who has access to patient information systems and what they can do
            </p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 ${getStatusColor(status)}`}>
          {getStatusIcon(status)}
          <span>{getStatusText(status)}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-500">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* AI Summary */}
      {aiSummary && (
        <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <div className="p-1 bg-purple-100 rounded">
              <ShieldCheckIcon className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-purple-900 mb-1">AI Guidance</h4>
              <p className="text-sm text-purple-800">{aiSummary}</p>
            </div>
          </div>
        </div>
      )}

      {/* Evidence Items */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Action Items</h3>
        {evidenceItems.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">{item.actionPrompt}</h4>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                {item.assignedTo && (
                  <p className="text-xs text-gray-500">Assigned to: {item.assignedTo}</p>
                )}
                {item.notes && (
                  <p className="text-xs text-gray-500 mt-1">Notes: {item.notes}</p>
                )}
              </div>
              <div className="ml-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === 'approved' ? 'bg-green-100 text-green-800' :
                  item.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                  item.status === 'needs_review' ? 'bg-yellow-100 text-yellow-800' :
                  item.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {item.status.replace('_', ' ')}
                </span>
              </div>
            </div>
            {item.submissionDate && (
              <p className="text-xs text-gray-500 mt-2">
                Submitted: {item.submissionDate.toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Last Activity */}
      {lastActivityDate && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Last activity: {lastActivityDate.toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
}
