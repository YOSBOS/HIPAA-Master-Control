/**
 * HIPAA Master Control Tracker - Core Data Models
 * 
 * This file defines the core data structures that implement the business language
 * philosophy: users see business processes, not legal jargon.
 */

// ============================================================================
// BUSINESS LANGUAGE INTERFACES (What Users See)
// ============================================================================

/**
 * Master Control - The main business process areas that users understand
 * 
 * Business Purpose: Represents a key business process that healthcare organizations
 * need to manage (like Training, Access Control, Vendor Management, etc.)
 * 
 * User Experience: Clear, actionable business language that managers can understand
 * and act upon without needing legal expertise.
 */
export interface MasterControl {
  id: string;
  name: string; // Business-friendly name like "Workforce Training & Awareness"
  description: string; // Business context: "Ensures all staff understand how to protect patient information"
  businessPurpose: string; // Why this matters to the business
  status: ComplianceStatus;
  priority: Priority;
  responsiblePerson: string;
  lastReviewDate: Date;
  nextReviewDate: Date;
  evidence: EvidenceItem[];
  guidance: AIGuidance[];
  subControls: string[]; // Hidden HIPAA sub-control IDs
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Evidence Item - Things users can upload, confirm, or record
 * 
 * Business Purpose: Represents evidence that a business process is working
 * (documents, confirmations, records, assignments)
 * 
 * User Experience: Clear actions users can take to demonstrate compliance
 */
export interface EvidenceItem {
  id: string;
  type: EvidenceType;
  title: string; // Business-friendly title
  description: string; // What this evidence shows
  status: EvidenceStatus;
  value: string | File | boolean | Date; // The actual evidence
  uploadedBy: string;
  uploadedAt: Date;
  reviewedBy: string;
  reviewedAt: Date;
  masterControlId: string;
  subControlIds: string[]; // Hidden HIPAA mappings
  metadata: EvidenceMetadata;
}

/**
 * AI Guidance - Business language explanations and suggestions
 * 
 * Business Purpose: Helps users understand why things matter and what to do next
 * 
 * User Experience: Clear, helpful guidance that feels like a mentor, not an auditor
 */
export interface AIGuidance {
  id: string;
  type: GuidanceType;
  title: string; // Business-friendly title
  message: string; // Business language explanation
  suggestions: string[]; // Actionable next steps
  examples: string[]; // Real-world examples
  masterControlId: string;
  isActive: boolean;
  createdAt: Date;
}

// ============================================================================
// HIDDEN REGULATORY INTERFACES (What Happens Behind the Scenes)
// ============================================================================

/**
 * Sub Control - Hidden HIPAA regulatory requirements
 * 
 * Business Purpose: Maps business evidence to specific HIPAA requirements
 * 
 * User Experience: Completely hidden from users - system handles this automatically
 */
export interface SubControl {
  id: string;
  hipaaReference: string; // e.g., "164.308(a)(5)(i)"
  title: string; // Technical title
  description: string; // Technical description
  masterControlId: string; // Links to business process
  isRequired: boolean;
  evidenceTypes: EvidenceType[];
  complianceCriteria: string[];
  auditRequirements: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Compliance Mapping - Links business evidence to regulatory requirements
 * 
 * Business Purpose: Ensures all HIPAA requirements are covered by business processes
 * 
 * User Experience: Completely automated - users never see this
 */
export interface ComplianceMapping {
  id: string;
  masterControlId: string;
  subControlId: string;
  evidenceItemId: string;
  mappingType: MappingType;
  complianceWeight: number; // How much this evidence contributes to compliance
  isActive: boolean;
  createdAt: Date;
}

// ============================================================================
// STATUS AND PROGRESS TRACKING
// ============================================================================

/**
 * Compliance Status - Business-friendly status indicators
 * 
 * Business Purpose: Shows users where they stand in business terms
 * 
 * User Experience: Clear, actionable status that helps users know what to do next
 */
export type ComplianceStatus = 
  | 'complete' // "All set - your process is working well"
  | 'in-progress' // "You're on the right track - just a few more steps"
  | 'needs-attention' // "This needs some work - here's what to do"
  | 'not-started'; // "Let's get started - here's how"

/**
 * Evidence Status - Track evidence collection progress
 * 
 * Business Purpose: Shows users what evidence they have and what they need
 * 
 * User Experience: Clear checklist of what's complete and what's missing
 */
export type EvidenceStatus = 
  | 'uploaded' // "Document uploaded and ready"
  | 'confirmed' // "Procedure confirmed and documented"
  | 'recorded' // "Review date recorded and tracked"
  | 'assigned' // "Responsible person assigned and notified"
  | 'pending' // "Waiting for action"
  | 'expired'; // "Needs to be updated"

/**
 * Priority - Business priority levels
 * 
 * Business Purpose: Helps users focus on what matters most
 * 
 * User Experience: Clear priority indicators that guide user attention
 */
export type Priority = 
  | 'high' // "Critical for your business operations"
  | 'medium' // "Important for your business operations"
  | 'low'; // "Good to have for your business operations"

// ============================================================================
// EVIDENCE TYPES AND METADATA
// ============================================================================

/**
 * Evidence Types - Different ways users can provide evidence
 * 
 * Business Purpose: Gives users multiple ways to demonstrate compliance
 * 
 * User Experience: Clear options for how to show their process is working
 */
export type EvidenceType = 
  | 'document' // Upload a file (policy, report, certificate)
  | 'confirmation' // Confirm a procedure exists
  | 'record' // Record a date or event
  | 'assignment' // Assign responsibility to someone
  | 'checklist' // Complete a checklist of items
  | 'testimony'; // Provide a written statement

/**
 * Guidance Types - Different types of AI assistance
 * 
 * Business Purpose: Provides context-appropriate help to users
 * 
 * User Experience: Helpful guidance that feels natural and useful
 */
export type GuidanceType = 
  | 'explanation' // "Here's why this matters to your business"
  | 'suggestion' // "Here's what you should do next"
  | 'example' // "Here's an example of what this looks like"
  | 'warning' // "Here's what to watch out for"
  | 'celebration'; // "Great job - you're doing this right"

/**
 * Mapping Types - How evidence maps to compliance
 * 
 * Business Purpose: Ensures accurate compliance tracking
 * 
 * User Experience: Completely hidden - system handles this automatically
 */
export type MappingType = 
  | 'direct' // Evidence directly satisfies requirement
  | 'supporting' // Evidence supports compliance
  | 'indirect' // Evidence indirectly contributes to compliance
  | 'documentation'; // Evidence documents compliance

/**
 * Evidence Metadata - Additional information about evidence
 * 
 * Business Purpose: Tracks important details about evidence
 * 
 * User Experience: Helps users understand what they've provided
 */
export interface EvidenceMetadata {
  fileSize?: number;
  fileType?: string;
  fileHash?: string;
  reviewNotes?: string;
  approvalStatus?: string;
  tags?: string[];
  customFields?: Record<string, any>;
}

// ============================================================================
// UTILITY TYPES AND HELPERS
// ============================================================================

/**
 * Master Control Summary - Overview of all business processes
 * 
 * Business Purpose: Gives users a high-level view of their compliance status
 * 
 * User Experience: Clear dashboard showing overall progress
 */
export interface MasterControlSummary {
  totalControls: number;
  completeControls: number;
  inProgressControls: number;
  needsAttentionControls: number;
  notStartedControls: number;
  overallProgress: number; // Percentage complete
  nextActions: string[]; // What to do next
  lastUpdated: Date;
}

/**
 * Compliance Progress - Track progress across all controls
 * 
 * Business Purpose: Shows users their overall compliance journey
 * 
 * User Experience: Motivational progress tracking that encourages completion
 */
export interface ComplianceProgress {
  overallPercentage: number;
  controlsComplete: number;
  controlsTotal: number;
  evidenceItemsComplete: number;
  evidenceItemsTotal: number;
  lastActivity: Date;
  estimatedCompletion: Date;
  riskAreas: string[]; // Areas that need attention
  successAreas: string[]; // Areas that are working well
}

// ============================================================================
// EXPORT ALL TYPES
// ============================================================================

export type {
  MasterControl,
  EvidenceItem,
  AIGuidance,
  SubControl,
  ComplianceMapping,
  ComplianceStatus,
  EvidenceStatus,
  Priority,
  EvidenceType,
  GuidanceType,
  MappingType,
  EvidenceMetadata,
  MasterControlSummary,
  ComplianceProgress
};
