/**
 * HIPAA Master Control Tracker - Core Library Index
 * 
 * This file exports all the core library functions and utilities for the HIPAA Master Control Tracker.
 * It implements the business language philosophy: users see business processes, not legal jargon.
 */

// ============================================================================
// CORE TYPES
// ============================================================================
export * from '../../types/hipaa';

// ============================================================================
// CONSTANTS
// ============================================================================
export * from './constants';

// ============================================================================
// UTILITIES
// ============================================================================
export * from './utils';
// ============================================================================
// RE-EXPORT COMMON UTILITIES FOR CONVENIENCE
// ============================================================================

// Business language utilities
export {
  getBusinessStatusMessage,
  getBusinessPriorityMessage,
  getBusinessEvidenceStatusMessage,
  formatBusinessDate,
  formatBusinessPercentage,
  formatBusinessTimeEstimate
} from './utils';

// Progress calculation utilities
export {
  calculateComplianceProgress,
  calculateEstimatedCompletion,
  calculateMasterControlSummary
} from './utils';

// Validation utilities
export {
  validateMasterControl,
  validateEvidenceItem
} from './utils';

// Constants
export {
  MASTER_CONTROL_CATEGORIES,
  PROCESS_DIFFICULTY,
  PRIORITY_LEVELS,
  EVIDENCE_TYPES,
  EVIDENCE_STATUS,
  COMPLIANCE_STATUS,
  GUIDANCE_TYPES,
  GUIDANCE_CONTEXT,
  ACTION_TYPES,
  SUGGESTION_PRIORITY,
  NOTIFICATION_TYPES,
  NOTIFICATION_PRIORITY,
  REPORT_TYPES,
  REPORT_FORMATS,
  CHART_TYPES,
  MASTER_CONTROL_DESCRIPTIONS
} from './constants';

