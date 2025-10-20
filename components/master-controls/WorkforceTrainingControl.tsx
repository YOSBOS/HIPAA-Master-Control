'use client';

/**
 * Workforce Training & Awareness Master Control
 * 
 * This component represents the "Workforce Training & Awareness" business process area.
 * It's what clinic managers understand and can act on - not legal jargon!
 */

import React, { useState, useEffect } from 'react';
import { 
  AcademicCapIcon, 
  DocumentTextIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  UserGroupIcon,
  PlusIcon,
  PencilIcon,
  CloudArrowUpIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';

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

interface WorkforceTrainingControlProps {
  status: 'all_set' | 'needs_attention' | 'action_required' | 'in_progress';
  progress: number;
  evidenceItems: EvidenceItem[];
  lastActivityDate?: Date;
  aiSummary?: string;
}

export default function WorkforceTrainingControl({
  status: initialStatus,
  progress: initialProgress,
  evidenceItems: initialEvidenceItems,
  lastActivityDate: initialLastActivityDate,
  aiSummary: initialAiSummary
}: WorkforceTrainingControlProps) {
  // State management
  const [status, setStatus] = useState(initialStatus);
  const [progress, setProgress] = useState(initialProgress);
  const [evidenceItems, setEvidenceItems] = useState(initialEvidenceItems);
  const [lastActivityDate, setLastActivityDate] = useState(initialLastActivityDate);
  const [aiSummary, setAiSummary] = useState(initialAiSummary);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);

  // Calculate progress based on evidence items
  useEffect(() => {
    const approvedCount = evidenceItems.filter(item => item.status === 'approved').length;
    const totalCount = evidenceItems.length;
    const newProgress = totalCount > 0 ? Math.round((approvedCount / totalCount) * 100) : 0;
    setProgress(newProgress);

    // Update status based on progress
    if (newProgress === 100) {
      setStatus('all_set');
    } else if (newProgress >= 75) {
      setStatus('needs_attention');
    } else if (newProgress >= 25) {
      setStatus('in_progress');
    } else {
      setStatus('action_required');
    }

    // Update last activity date
    setLastActivityDate(new Date());
  }, [evidenceItems]);

  // Update AI guidance based on current state
  useEffect(() => {
    const pendingItems = evidenceItems.filter(item => item.status === 'pending').length;
    const needsReviewItems = evidenceItems.filter(item => item.status === 'needs_review').length;
    
    if (pendingItems === 0 && needsReviewItems === 0) {
      setAiSummary('Excellent! All workforce training items are complete. Your team is well-prepared to protect patient information.');
    } else if (needsReviewItems > 0) {
      setAiSummary(`You have ${needsReviewItems} training item(s) that need review. Focus on reviewing submitted materials to maintain compliance.`);
    } else {
      setAiSummary(`You have ${pendingItems} training item(s) pending. Consider prioritizing workforce training to ensure all staff understand HIPAA requirements.`);
    }
  }, [evidenceItems]);

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
      case 'all_set': return 'All set - your training process is working well';
      case 'needs_attention': return 'Needs attention - some items require review';
      case 'action_required': return 'Action required - critical items are pending';
      case 'in_progress': return 'In progress - actively working on compliance';
      default: return 'Unknown status';
    }
  };

  // Interactive functions
  const updateEvidenceStatus = (itemId: string, newStatus: EvidenceItem['status']) => {
    setEvidenceItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, status: newStatus, submissionDate: new Date() }
          : item
      )
    );
  };

  const addEvidenceItem = (newItem: Omit<EvidenceItem, 'id'>) => {
    const item: EvidenceItem = {
      ...newItem,
      id: `item-${Date.now()}`,
    };
    setEvidenceItems(prev => [...prev, item]);
    setShowAddForm(false);
  };


  const getStatusIconForItem = (itemStatus: EvidenceItem['status']) => {
    switch (itemStatus) {
      case 'approved': return <CheckCircleIcon className="w-4 h-4 text-green-600" />;
      case 'submitted': return <ClockIcon className="w-4 h-4 text-blue-600" />;
      case 'needs_review': return <ExclamationTriangleIcon className="w-4 h-4 text-yellow-600" />;
      case 'rejected': return <ExclamationTriangleIcon className="w-4 h-4 text-red-600" />;
      default: return <ClockIcon className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <AcademicCapIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Workforce Training & Awareness
              </h2>
              <p className="text-sm text-gray-600">
                Ensures all staff understand how to protect patient information
              </p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 ${getStatusColor(status)}`}>
            {getStatusIcon(status)}
            <span>{getStatusText(status)}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* AI Summary */}
        {aiSummary && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <div className="p-1 bg-blue-100 rounded">
                <UserGroupIcon className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-blue-900 mb-1">AI Guidance</h4>
                <p className="text-sm text-blue-800">{aiSummary}</p>
              </div>
            </div>
          </div>
        )}

        {/* Evidence Items */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">Action Items</h3>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <PlusIcon className="w-4 h-4 mr-1" />
              Add Item
            </button>
          </div>

          {/* Add New Item Form */}
          {showAddForm && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-900 mb-3">Add New Training Item</h4>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                addEvidenceItem({
                  type: formData.get('type') as EvidenceItem['type'],
                  actionPrompt: formData.get('actionPrompt') as string,
                  description: formData.get('description') as string,
                  status: 'pending',
                  assignedTo: formData.get('assignedTo') as string || undefined,
                  notes: formData.get('notes') as string || undefined,
                });
                e.currentTarget.reset();
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select name="type" required className="w-full border border-gray-300 rounded-md px-3 py-2">
                      <option value="document_upload">Document Upload</option>
                      <option value="confirmation">Confirmation</option>
                      <option value="record_date">Record Date</option>
                      <option value="assign_person">Assign Person</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                    <input name="assignedTo" type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Action Prompt</label>
                  <input name="actionPrompt" type="text" required className="w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea name="description" required className="w-full border border-gray-300 rounded-md px-3 py-2" rows={2} />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea name="notes" className="w-full border border-gray-300 rounded-md px-3 py-2" rows={2} />
                </div>
                <div className="flex space-x-2">
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Add Item
                  </button>
                  <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {evidenceItems.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {getStatusIconForItem(item.status)}
                    <h4 className="font-medium text-gray-900">{item.actionPrompt}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  {item.assignedTo && (
                    <p className="text-xs text-gray-500">Assigned to: {item.assignedTo}</p>
                  )}
                  {item.notes && (
                    <p className="text-xs text-gray-500 mt-1">Notes: {item.notes}</p>
                  )}
                  {item.submissionDate && (
                    <p className="text-xs text-gray-500 mt-1">
                      Submitted: {item.submissionDate.toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="ml-4 flex items-center space-x-2">
                  <select
                    value={item.status}
                    onChange={(e) => updateEvidenceStatus(item.id, e.target.value as EvidenceItem['status'])}
                    className="text-xs border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="submitted">Submitted</option>
                    <option value="needs_review">Needs Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* HIPAA Standards Mapping */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">HIPAA Standards Covered</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-3">Administrative Safeguards - Workforce Training</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900">164.308(a)(5)(i) - Security Awareness and Training</p>
                  <p className="text-xs text-blue-700">Implement a security awareness and training program for all workforce members</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900">164.308(a)(5)(ii)(A) - Security Reminders</p>
                  <p className="text-xs text-blue-700">Periodic security updates and reminders to workforce members</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900">164.308(a)(5)(ii)(B) - Protection from Malicious Software</p>
                  <p className="text-xs text-blue-700">Training on protection from malicious software and reporting procedures</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">4</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900">164.308(a)(5)(ii)(C) - Log-in Monitoring</p>
                  <p className="text-xs text-blue-700">Training on monitoring log-in attempts and reporting discrepancies</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">5</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900">164.308(a)(5)(ii)(D) - Password Management</p>
                  <p className="text-xs text-blue-700">Training on creating, changing, and safeguarding passwords</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-3">Additional Workforce Requirements</h4>
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-green-600">6</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-900">164.308(a)(1)(ii)(C) - Sanction Policy</p>
                  <p className="text-xs text-green-700">Workforce training on sanctions for HIPAA violations</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-green-600">7</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-900">164.308(a)(3)(i) - Workforce Access Management</p>
                  <p className="text-xs text-green-700">Training on proper access management and authorization procedures</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-900 mb-2">Business Impact</h4>
            <p className="text-xs text-yellow-800">
              This Master Control ensures your entire team understands how to protect patient information. 
              It covers the essential training requirements that keep your clinic compliant and your patients' data secure.
            </p>
          </div>
        </div>
      </CardContent>

      {/* Footer with Actions */}
      <CardFooter>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            {lastActivityDate && (
              <p className="text-xs text-gray-500">
                Last activity: {lastActivityDate.toLocaleDateString()}
              </p>
            )}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Progress:</span>
              <span className="text-xs font-medium text-blue-600">{progress}%</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              <PencilIcon className="w-3 h-3 mr-1" />
              {isEditing ? 'Done' : 'Edit'}
            </button>
            <button
              className="flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
            >
              <CloudArrowUpIcon className="w-3 h-3 mr-1" />
              Upload
            </button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
