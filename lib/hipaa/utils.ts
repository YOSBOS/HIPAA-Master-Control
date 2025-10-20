/**
 * HIPAA Master Control Tracker - Core Utility Functions
 * 
 * This file provides utility functions that implement the business language
 * philosophy: users see business processes, not legal jargon.
 */

import { 
  MasterControl, 
  EvidenceItem, 
  ComplianceStatus, 
  EvidenceStatus, 
  Priority,
  EvidenceType,
  GuidanceType,
  ActionType,
  SuggestionPriority,
  ComplianceProgress,
  MasterControlSummary,
  ProcessAnalysis,
  ImprovementSuggestion,
  ValidationResult,
  ValidationError,
  ValidationWarning
} from '../../types/hipaa';

// ============================================================================
// BUSINESS LANGUAGE UTILITIES
// ============================================================================

/**
 * Get business-friendly status message
 * 
 * Business Purpose: Converts technical status to business language
 * 
 * User Experience: Clear, encouraging status messages
 */
export function getBusinessStatusMessage(status: ComplianceStatus): string {
  switch (status) {
    case 'complete':
      return 'All set - your process is working well';
    case 'in-progress':
      return 'You\'re on the right track - just a few more steps';
    case 'needs-attention':
      return 'This needs some work - here\'s what to do';
    case 'not-started':
      return 'Let\'s get started - here\'s how';
    default:
      return 'Status unknown - let\'s check what\'s needed';
  }
}

/**
 * Get business-friendly priority message
 * 
 * Business Purpose: Converts technical priority to business language
 * 
 * User Experience: Clear priority messages that guide user attention
 */
export function getBusinessPriorityMessage(priority: Priority): string {
  switch (priority) {
    case 'high':
      return 'Critical for your business operations';
    case 'medium':
      return 'Important for your business operations';
    case 'low':
      return 'Good to have for your business operations';
    default:
      return 'Priority level unknown';
  }
}

/**
 * Get business-friendly evidence status message
 * 
 * Business Purpose: Converts technical evidence status to business language
 * 
 * User Experience: Clear evidence status messages
 */
export function getBusinessEvidenceStatusMessage(status: EvidenceStatus): string {
  switch (status) {
    case 'uploaded':
      return 'Document uploaded and ready';
    case 'confirmed':
      return 'Procedure confirmed and documented';
    case 'recorded':
      return 'Review date recorded and tracked';
    case 'assigned':
      return 'Responsible person assigned and notified';
    case 'pending':
      return 'Waiting for action';
    case 'expired':
      return 'Needs to be updated';
    default:
      return 'Status unknown';
  }
}

// ============================================================================
// PROGRESS CALCULATION UTILITIES
// ============================================================================

/**
 * Calculate overall compliance progress
 * 
 * Business Purpose: Shows users their overall progress in business terms
 * 
 * User Experience: Clear progress indicators that motivate completion
 */
export function calculateComplianceProgress(controls: MasterControl[]): ComplianceProgress {
  const totalControls = controls.length;
  const completeControls = controls.filter(c => c.status === 'complete').length;
  const inProgressControls = controls.filter(c => c.status === 'in-progress').length;
  const needsAttentionControls = controls.filter(c => c.status === 'needs-attention').length;
  const notStartedControls = controls.filter(c => c.status === 'not-started').length;
  
  const overallPercentage = totalControls > 0 ? Math.round((completeControls / totalControls) * 100) : 0;
  
  const totalEvidence = controls.reduce((sum, control) => sum + control.evidence.length, 0);
  const completeEvidence = controls.reduce((sum, control) => 
    sum + control.evidence.filter(e => e.status === 'uploaded' || e.status === 'confirmed' || e.status === 'recorded' || e.status === 'assigned').length, 0
  );
  
  const lastActivity = new Date(Math.max(...controls.map(c => c.updatedAt.getTime())));
  
  const riskAreas = controls
    .filter(c => c.status === 'needs-attention' || c.status === 'not-started')
    .map(c => c.name);
  
  const successAreas = controls
    .filter(c => c.status === 'complete')
    .map(c => c.name);
  
  return {
    overallPercentage,
    controlsComplete: completeControls,
    controlsTotal: totalControls,
    evidenceItemsComplete: completeEvidence,
    evidenceItemsTotal: totalEvidence,
    lastActivity,
    estimatedCompletion: calculateEstimatedCompletion(controls),
    riskAreas,
    successAreas
  };
}

/**
 * Calculate estimated completion date
 * 
 * Business Purpose: Helps users plan their compliance journey
 * 
 * User Experience: Clear timeline expectations
 */
export function calculateEstimatedCompletion(controls: MasterControl[]): Date {
  const now = new Date();
  const incompleteControls = controls.filter(c => c.status !== 'complete');
  
  if (incompleteControls.length === 0) {
    return now;
  }
  
  // Estimate based on control difficulty and current progress
  const estimatedDays = incompleteControls.reduce((sum, control) => {
    switch (control.priority) {
      case 'high':
        return sum + 7; // 1 week for high priority
      case 'medium':
        return sum + 14; // 2 weeks for medium priority
      case 'low':
        return sum + 30; // 1 month for low priority
      default:
        return sum + 14; // Default 2 weeks
    }
  }, 0);
  
  const estimatedDate = new Date(now);
  estimatedDate.setDate(estimatedDate.getDate() + estimatedDays);
  
  return estimatedDate;
}

/**
 * Calculate master control summary
 * 
 * Business Purpose: Provides overview of all business processes
 * 
 * User Experience: Clear dashboard showing overall progress
 */
export function calculateMasterControlSummary(controls: MasterControl[]): MasterControlSummary {
  const totalControls = controls.length;
  const completeControls = controls.filter(c => c.status === 'complete').length;
  const inProgressControls = controls.filter(c => c.status === 'in-progress').length;
  const needsAttentionControls = controls.filter(c => c.status === 'needs-attention').length;
  const notStartedControls = controls.filter(c => c.status === 'not-started').length;
  
  const overallProgress = totalControls > 0 ? Math.round((completeControls / totalControls) * 100) : 0;
  
  const nextActions = controls
    .filter(c => c.status !== 'complete')
    .map(c => `Complete ${c.name}`)
    .slice(0, 5); // Limit to 5 next actions
  
  const lastUpdated = new Date(Math.max(...controls.map(c => c.updatedAt.getTime())));
  
  return {
    totalControls,
    completeControls,
    inProgressControls,
    needsAttentionControls,
    notStartedControls,
    overallProgress,
    nextActions,
    lastUpdated
  };
}

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

/**
 * Validate master control
 * 
 * Business Purpose: Ensures business processes are properly configured
 * 
 * User Experience: Clear validation messages that help users fix problems
 */
export function validateMasterControl(control: MasterControl): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  
  // Required fields
  if (!control.name || control.name.trim().length === 0) {
    errors.push({
      field: 'name',
      message: 'Business process name is required',
      code: 'REQUIRED_FIELD',
      suggestion: 'Enter a clear, business-friendly name for this process',
      helpUrl: '/help/naming-processes'
    });
  }
  
  if (!control.description || control.description.trim().length === 0) {
    errors.push({
      field: 'description',
      message: 'Business process description is required',
      code: 'REQUIRED_FIELD',
      suggestion: 'Describe what this process does for your business',
      helpUrl: '/help/describing-processes'
    });
  }
  
  if (!control.responsiblePerson || control.responsiblePerson.trim().length === 0) {
    errors.push({
      field: 'responsiblePerson',
      message: 'Responsible person is required',
      code: 'REQUIRED_FIELD',
      suggestion: 'Assign someone to be responsible for this process',
      helpUrl: '/help/assigning-responsibility'
    });
  }
  
  // Date validation
  if (control.nextReviewDate && control.nextReviewDate <= new Date()) {
    warnings.push({
      field: 'nextReviewDate',
      message: 'Next review date is in the past',
      code: 'PAST_DATE',
      suggestion: 'Set a future date for the next review',
      helpUrl: '/help/setting-review-dates'
    });
  }
  
  if (control.lastReviewDate && control.lastReviewDate > new Date()) {
    warnings.push({
      field: 'lastReviewDate',
      message: 'Last review date is in the future',
      code: 'FUTURE_DATE',
      suggestion: 'Set a past date for the last review',
      helpUrl: '/help/setting-review-dates'
    });
  }
  
  // Evidence validation
  if (control.evidence.length === 0) {
    warnings.push({
      field: 'evidence',
      message: 'No evidence provided for this process',
      code: 'NO_EVIDENCE',
      suggestion: 'Add evidence to show this process is working',
      helpUrl: '/help/adding-evidence'
    });
  }
  
  const isValid = errors.length === 0;
  const score = Math.max(0, 100 - (errors.length * 20) - (warnings.length * 5));
  
  return {
    isValid,
    errors,
    warnings,
    suggestions: generateValidationSuggestions(errors, warnings),
    score
  };
}

/**
 * Validate evidence item
 * 
 * Business Purpose: Ensures evidence is properly configured
 * 
 * User Experience: Clear validation messages that help users fix problems
 */
export function validateEvidenceItem(evidence: EvidenceItem): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  
  // Required fields
  if (!evidence.title || evidence.title.trim().length === 0) {
    errors.push({
      field: 'title',
      message: 'Evidence title is required',
      code: 'REQUIRED_FIELD',
      suggestion: 'Enter a clear title for this evidence',
      helpUrl: '/help/naming-evidence'
    });
  }
  
  if (!evidence.description || evidence.description.trim().length === 0) {
    errors.push({
      field: 'description',
      message: 'Evidence description is required',
      code: 'REQUIRED_FIELD',
      suggestion: 'Describe what this evidence shows',
      helpUrl: '/help/describing-evidence'
    });
  }
  
  // Value validation based on type
  if (evidence.type === 'document' && !evidence.value) {
    errors.push({
      field: 'value',
      message: 'Document file is required',
      code: 'REQUIRED_FILE',
      suggestion: 'Upload a document file',
      helpUrl: '/help/uploading-documents'
    });
  }
  
  if (evidence.type === 'record' && !evidence.value) {
    errors.push({
      field: 'value',
      message: 'Record date is required',
      code: 'REQUIRED_DATE',
      suggestion: 'Enter a date for this record',
      helpUrl: '/help/entering-dates'
    });
  }
  
  // Date validation
  if (evidence.uploadedAt && evidence.uploadedAt > new Date()) {
    warnings.push({
      field: 'uploadedAt',
      message: 'Upload date is in the future',
      code: 'FUTURE_DATE',
      suggestion: 'Set a past date for the upload',
      helpUrl: '/help/setting-dates'
    });
  }
  
  const isValid = errors.length === 0;
  const score = Math.max(0, 100 - (errors.length * 25) - (warnings.length * 10));
  
  return {
    isValid,
    errors,
    warnings,
    suggestions: generateValidationSuggestions(errors, warnings),
    score
  };
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Generate validation suggestions
 * 
 * Business Purpose: Provides helpful suggestions for fixing validation issues
 * 
 * User Experience: Clear suggestions that help users improve their data
 */
function generateValidationSuggestions(errors: ValidationError[], warnings: ValidationWarning[]): string[] {
  const suggestions: string[] = [];
  
  if (errors.length > 0) {
    suggestions.push('Fix the required fields to continue');
  }
  
  if (warnings.length > 0) {
    suggestions.push('Review the warnings to improve your data quality');
  }
  
  if (errors.length === 0 && warnings.length === 0) {
    suggestions.push('Your data looks good!');
  }
  
  return suggestions;
}

/**
 * Format date for business display
 * 
 * Business Purpose: Shows dates in a business-friendly format
 * 
 * User Experience: Clear, readable date format
 */
export function formatBusinessDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Format percentage for business display
 * 
 * Business Purpose: Shows percentages in a business-friendly format
 * 
 * User Experience: Clear, readable percentage format
 */
export function formatBusinessPercentage(percentage: number): string {
  return `${Math.round(percentage)}%`;
}

/**
 * Get business-friendly time estimate
 * 
 * Business Purpose: Shows time estimates in business-friendly format
 * 
 * User Experience: Clear, readable time estimates
 */
export function formatBusinessTimeEstimate(hours: number): string {
  if (hours < 1) {
    const minutes = Math.round(hours * 60);
    return `About ${minutes} minute${minutes !== 1 ? 's' : ''}`;
  } else if (hours < 24) {
    return `About ${Math.round(hours)} hour${Math.round(hours) !== 1 ? 's' : ''}`;
  } else {
    const days = Math.round(hours / 24);
    return `About ${days} day${days !== 1 ? 's' : ''}`;
  }
}

/**
 * Generate a unique identifier
 * 
 * Business Purpose: Creates unique IDs for evidence items, guidance, and other entities
 * 
 * User Experience: Ensures all items have unique identifiers for tracking
 */
export function generateUniqueId(): string {
  return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// ============================================================================
// ALL UTILITIES ARE ALREADY EXPORTED WITH 'export function' ABOVE
// ============================================================================
