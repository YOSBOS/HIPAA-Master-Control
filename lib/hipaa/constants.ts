/**
 * HIPAA Master Control Tracker - Core Constants
 * 
 * This file defines the core constants and configuration that implement the business
 * language philosophy: users see business processes, not legal jargon.
 */

// ============================================================================
// BUSINESS PROCESS CONSTANTS
// ============================================================================

/**
 * Master Control Categories - Business process categories
 * 
 * Business Purpose: Groups related business processes for easier management
 * 
 * User Experience: Logical grouping that makes sense to healthcare managers
 */
export const MASTER_CONTROL_CATEGORIES = {
  PEOPLE: 'people' as const,
  TECHNOLOGY: 'technology' as const,
  VENDORS: 'vendors' as const,
  OPERATIONS: 'operations' as const,
  COMPLIANCE: 'compliance' as const,
  SECURITY: 'security' as const,
} as const;

/**
 * Process Difficulty Levels - How complex processes are to implement
 * 
 * Business Purpose: Helps users plan their compliance journey
 * 
 * User Experience: Clear expectations about what's involved
 */
export const PROCESS_DIFFICULTY = {
  SIMPLE: 'simple' as const,
  MODERATE: 'moderate' as const,
  COMPLEX: 'complex' as const,
  EXPERT: 'expert' as const,
} as const;

/**
 * Priority Levels - Business priority levels
 * 
 * Business Purpose: Helps users focus on what matters most
 * 
 * User Experience: Clear priority indicators that guide user attention
 */
export const PRIORITY_LEVELS = {
  HIGH: 'high' as const,
  MEDIUM: 'medium' as const,
  LOW: 'low' as const,
} as const;

// ============================================================================
// EVIDENCE TYPE CONSTANTS
// ============================================================================

/**
 * Evidence Types - Different ways users can provide evidence
 * 
 * Business Purpose: Gives users multiple ways to demonstrate compliance
 * 
 * User Experience: Clear options for how to show their process is working
 */
export const EVIDENCE_TYPES = {
  DOCUMENT: 'document' as const,
  CONFIRMATION: 'confirmation' as const,
  RECORD: 'record' as const,
  ASSIGNMENT: 'assignment' as const,
  CHECKLIST: 'checklist' as const,
  TESTIMONY: 'testimony' as const,
} as const;

/**
 * Evidence Status - Track evidence collection progress
 * 
 * Business Purpose: Shows users what evidence they have and what they need
 * 
 * User Experience: Clear checklist of what's complete and what's missing
 */
export const EVIDENCE_STATUS = {
  UPLOADED: 'uploaded' as const,
  CONFIRMED: 'confirmed' as const,
  RECORDED: 'recorded' as const,
  ASSIGNED: 'assigned' as const,
  PENDING: 'pending' as const,
  EXPIRED: 'expired' as const,
} as const;

// ============================================================================
// COMPLIANCE STATUS CONSTANTS
// ============================================================================

/**
 * Compliance Status - Business-friendly status indicators
 * 
 * Business Purpose: Shows users where they stand in business terms
 * 
 * User Experience: Clear, actionable status that helps users know what to do next
 */
export const COMPLIANCE_STATUS = {
  COMPLETE: 'complete' as const,
  IN_PROGRESS: 'in-progress' as const,
  NEEDS_ATTENTION: 'needs-attention' as const,
  NOT_STARTED: 'not-started' as const,
} as const;

// ============================================================================
// GUIDANCE TYPE CONSTANTS
// ============================================================================

/**
 * Guidance Types - Different types of AI assistance
 * 
 * Business Purpose: Provides context-appropriate help to users
 * 
 * User Experience: Helpful guidance that feels natural and useful
 */
export const GUIDANCE_TYPES = {
  EXPLANATION: 'explanation' as const,
  SUGGESTION: 'suggestion' as const,
  EXAMPLE: 'example' as const,
  WARNING: 'warning' as const,
  CELEBRATION: 'celebration' as const,
} as const;

/**
 * Guidance Context - When to show guidance to users
 * 
 * Business Purpose: Provides context-appropriate help
 * 
 * User Experience: Guidance that appears when users need it most
 */
export const GUIDANCE_CONTEXT = {
  ONBOARDING: 'onboarding' as const,
  STUCK: 'stuck' as const,
  PROGRESS: 'progress' as const,
  COMPLETION: 'completion' as const,
  MAINTENANCE: 'maintenance' as const,
  CRISIS: 'crisis' as const,
  CELEBRATION: 'celebration' as const,
} as const;

// ============================================================================
// ACTION TYPE CONSTANTS
// ============================================================================

/**
 * Action Types - Different types of actions users can take
 * 
 * Business Purpose: Provides multiple ways for users to demonstrate compliance
 * 
 * User Experience: Clear options for how to show their process is working
 */
export const ACTION_TYPES = {
  UPLOAD: 'upload' as const,
  CONFIRM: 'confirm' as const,
  RECORD: 'record' as const,
  ASSIGN: 'assign' as const,
  SCHEDULE: 'schedule' as const,
  REVIEW: 'review' as const,
  TEST: 'test' as const,
  TRAIN: 'train' as const,
  AUDIT: 'audit' as const,
  UPDATE: 'update' as const,
} as const;

/**
 * Suggestion Priority - How important a suggestion is
 * 
 * Business Purpose: Helps users focus on what matters most
 * 
 * User Experience: Clear priority indicators that guide user attention
 */
export const SUGGESTION_PRIORITY = {
  CRITICAL: 'critical' as const,
  HIGH: 'high' as const,
  MEDIUM: 'medium' as const,
  LOW: 'low' as const,
} as const;

// ============================================================================
// NOTIFICATION CONSTANTS
// ============================================================================

/**
 * Notification Types - Different types of notifications
 * 
 * Business Purpose: Provides appropriate notifications for different situations
 * 
 * User Experience: Clear, relevant notifications that help users stay on track
 */
export const NOTIFICATION_TYPES = {
  REMINDER: 'reminder' as const,
  DEADLINE: 'deadline' as const,
  CELEBRATION: 'celebration' as const,
  WARNING: 'warning' as const,
  UPDATE: 'update' as const,
  SYSTEM: 'system' as const,
} as const;

/**
 * Notification Priority - How urgent a notification is
 * 
 * Business Purpose: Helps users prioritize their attention
 * 
 * User Experience: Clear priority indicators that guide user attention
 */
export const NOTIFICATION_PRIORITY = {
  URGENT: 'urgent' as const,
  HIGH: 'high' as const,
  MEDIUM: 'medium' as const,
  LOW: 'low' as const,
} as const;

// ============================================================================
// REPORT CONSTANTS
// ============================================================================

/**
 * Report Types - Different types of business reports
 * 
 * Business Purpose: Provides various types of business reports
 * 
 * User Experience: Different formats of business information users can access
 */
export const REPORT_TYPES = {
  OVERVIEW: 'overview' as const,
  DETAILED: 'detailed' as const,
  PROGRESS: 'progress' as const,
  COMPLIANCE: 'compliance' as const,
  EVIDENCE: 'evidence' as const,
  GUIDANCE: 'guidance' as const,
  AUDIT: 'audit' as const,
  EXECUTIVE: 'executive' as const,
} as const;

/**
 * Report Formats - Different formats for business reports
 * 
 * Business Purpose: Provides various formats for business reports
 * 
 * User Experience: Different formats users can choose from
 */
export const REPORT_FORMATS = {
  PDF: 'pdf' as const,
  EXCEL: 'excel' as const,
  CSV: 'csv' as const,
  JSON: 'json' as const,
  HTML: 'html' as const,
  EMAIL: 'email' as const,
} as const;

// ============================================================================
// CHART CONSTANTS
// ============================================================================

/**
 * Chart Types - Different types of charts for business reports
 * 
 * Business Purpose: Provides various types of visual representation
 * 
 * User Experience: Different types of charts users can choose from
 */
export const CHART_TYPES = {
  PIE: 'pie' as const,
  BAR: 'bar' as const,
  LINE: 'line' as const,
  AREA: 'area' as const,
  DONUT: 'donut' as const,
  GAUGE: 'gauge' as const,
  PROGRESS: 'progress' as const,
  TIMELINE: 'timeline' as const,
} as const;

// ============================================================================
// BUSINESS PROCESS DESCRIPTIONS
// ============================================================================

/**
 * Master Control Descriptions - Business-friendly descriptions
 * 
 * Business Purpose: Provides clear, business-friendly descriptions
 * 
 * User Experience: Clear descriptions that help users understand what each process does
 */
export const MASTER_CONTROL_DESCRIPTIONS = {
  WORKFORCE_TRAINING: {
    name: 'Workforce Training & Awareness',
    description: 'Ensures all staff understand how to protect patient information',
    businessValue: 'This keeps your patients\' information secure and builds trust',
    typicalActivities: [
      'Upload training materials',
      'Confirm staff completion',
      'Record review dates'
    ],
    commonChallenges: [
      'Keeping training current',
      'Tracking completion',
      'Documenting procedures'
    ],
    successIndicators: [
      'All staff trained',
      'Procedures documented',
      'Regular reviews scheduled'
    ],
    estimatedTime: 'About 2-3 hours to set up, 30 minutes monthly to maintain',
    difficulty: PROCESS_DIFFICULTY.SIMPLE,
    category: MASTER_CONTROL_CATEGORIES.PEOPLE,
  },
  ACCESS_CONTROL: {
    name: 'Access Control & User Management',
    description: 'Manages who can access patient information and systems',
    businessValue: 'This ensures only authorized people can access patient information',
    typicalActivities: [
      'Assign user access levels',
      'Review access permissions',
      'Document access procedures'
    ],
    commonChallenges: [
      'Managing user accounts',
      'Tracking access changes',
      'Documenting access procedures'
    ],
    successIndicators: [
      'Access levels documented',
      'Regular access reviews',
      'Clear access procedures'
    ],
    estimatedTime: 'About 3-4 hours to set up, 1 hour monthly to maintain',
    difficulty: PROCESS_DIFFICULTY.MODERATE,
    category: MASTER_CONTROL_CATEGORIES.TECHNOLOGY,
  },
  VENDOR_MANAGEMENT: {
    name: 'Vendor Management & Business Associates',
    description: 'Manages relationships with vendors who handle patient information',
    businessValue: 'This ensures your vendors protect patient information properly',
    typicalActivities: [
      'Review vendor agreements',
      'Confirm vendor compliance',
      'Document vendor procedures'
    ],
    commonChallenges: [
      'Tracking vendor agreements',
      'Confirming vendor compliance',
      'Managing vendor relationships'
    ],
    successIndicators: [
      'Vendor agreements current',
      'Vendor compliance confirmed',
      'Clear vendor procedures'
    ],
    estimatedTime: 'About 4-5 hours to set up, 2 hours quarterly to maintain',
    difficulty: PROCESS_DIFFICULTY.MODERATE,
    category: MASTER_CONTROL_CATEGORIES.VENDORS,
  },
  RISK_ASSESSMENT: {
    name: 'Risk Assessment & Management',
    description: 'Identifies and manages risks to patient information',
    businessValue: 'This helps you understand and manage risks to patient information',
    typicalActivities: [
      'Identify potential risks',
      'Assess risk levels',
      'Implement risk controls'
    ],
    commonChallenges: [
      'Identifying all risks',
      'Assessing risk levels',
      'Implementing controls'
    ],
    successIndicators: [
      'Risks identified and documented',
      'Risk levels assessed',
      'Controls implemented'
    ],
    estimatedTime: 'About 6-8 hours to set up, 4 hours annually to maintain',
    difficulty: PROCESS_DIFFICULTY.COMPLEX,
    category: MASTER_CONTROL_CATEGORIES.SECURITY,
  },
  INCIDENT_RESPONSE: {
    name: 'Incident Response & Breach Management',
    description: 'Handles security incidents and data breaches',
    businessValue: 'This helps you respond quickly and effectively to security incidents',
    typicalActivities: [
      'Document incident procedures',
      'Train staff on response',
      'Test response procedures'
    ],
    commonChallenges: [
      'Creating response procedures',
      'Training staff on response',
      'Testing procedures'
    ],
    successIndicators: [
      'Response procedures documented',
      'Staff trained on response',
      'Procedures tested'
    ],
    estimatedTime: 'About 4-6 hours to set up, 2 hours annually to maintain',
    difficulty: PROCESS_DIFFICULTY.MODERATE,
    category: MASTER_CONTROL_CATEGORIES.OPERATIONS,
  },
  PHYSICAL_SECURITY: {
    name: 'Physical Security & Facility Controls',
    description: 'Protects physical access to patient information',
    businessValue: 'This ensures physical security of patient information',
    typicalActivities: [
      'Document physical security',
      'Review access controls',
      'Test security measures'
    ],
    commonChallenges: [
      'Documenting physical security',
      'Reviewing access controls',
      'Testing security measures'
    ],
    successIndicators: [
      'Physical security documented',
      'Access controls reviewed',
      'Security measures tested'
    ],
    estimatedTime: 'About 3-4 hours to set up, 1 hour quarterly to maintain',
    difficulty: PROCESS_DIFFICULTY.SIMPLE,
    category: MASTER_CONTROL_CATEGORIES.SECURITY,
  },
  TECHNICAL_SAFEGUARDS: {
    name: 'Technical Safeguards & System Security',
    description: 'Protects electronic patient information',
    businessValue: 'This ensures electronic security of patient information',
    typicalActivities: [
      'Review system security',
      'Test security measures',
      'Document security procedures'
    ],
    commonChallenges: [
      'Reviewing system security',
      'Testing security measures',
      'Documenting procedures'
    ],
    successIndicators: [
      'System security reviewed',
      'Security measures tested',
      'Procedures documented'
    ],
    estimatedTime: 'About 4-6 hours to set up, 2 hours quarterly to maintain',
    difficulty: PROCESS_DIFFICULTY.COMPLEX,
    category: MASTER_CONTROL_CATEGORIES.TECHNOLOGY,
  },
  POLICIES_PROCEDURES: {
    name: 'Policies & Procedures Management',
    description: 'Manages HIPAA policies and procedures',
    businessValue: 'This ensures you have clear policies and procedures for protecting patient information',
    typicalActivities: [
      'Create and update policies',
      'Train staff on policies',
      'Review and update procedures'
    ],
    commonChallenges: [
      'Creating clear policies',
      'Training staff on policies',
      'Keeping procedures current'
    ],
    successIndicators: [
      'Policies created and current',
      'Staff trained on policies',
      'Procedures reviewed and updated'
    ],
    estimatedTime: 'About 5-7 hours to set up, 3 hours quarterly to maintain',
    difficulty: PROCESS_DIFFICULTY.MODERATE,
    category: MASTER_CONTROL_CATEGORIES.OPERATIONS,
  },
  AUDIT_MONITORING: {
    name: 'Audit & Monitoring',
    description: 'Monitors and audits compliance activities',
    businessValue: 'This helps you track and improve your compliance efforts',
    typicalActivities: [
      'Conduct compliance audits',
      'Monitor compliance activities',
      'Report compliance status'
    ],
    commonChallenges: [
      'Conducting audits',
      'Monitoring activities',
      'Reporting status'
    ],
    successIndicators: [
      'Audits conducted regularly',
      'Activities monitored',
      'Status reported clearly'
    ],
    estimatedTime: 'About 3-4 hours to set up, 2 hours monthly to maintain',
    difficulty: PROCESS_DIFFICULTY.MODERATE,
    category: MASTER_CONTROL_CATEGORIES.COMPLIANCE,
  },
} as const;

// ============================================================================
// EXPORT ALL CONSTANTS
// ============================================================================

export {
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
  MASTER_CONTROL_DESCRIPTIONS,
};
