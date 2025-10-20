/**
 * HIPAA Master Control Tracker - Business Logic Types
 * 
 * This file defines the business logic interfaces that implement the core philosophy:
 * Business language over legal jargon, actionable guidance over status tracking.
 */

// ============================================================================
// BUSINESS PROCESS INTERFACES
// ============================================================================

/**
 * Business Process - The core business activities users understand
 * 
 * Business Purpose: Represents the actual work healthcare organizations do
 * (training staff, managing access, working with vendors, etc.)
 * 
 * User Experience: Clear, familiar business activities that managers recognize
 */
export interface BusinessProcess {
  id: string;
  name: string; // "Workforce Training & Awareness"
  description: string; // "Ensuring your team knows how to protect patient information"
  businessValue: string; // "This keeps your patients' information secure and builds trust"
  typicalActivities: string[]; // "Upload training materials, confirm staff completion, record review dates"
  commonChallenges: string[]; // "Keeping training current, tracking completion, documenting procedures"
  successIndicators: string[]; // "All staff trained, procedures documented, regular reviews scheduled"
  estimatedTime: string; // "About 2-3 hours to set up, 30 minutes monthly to maintain"
  difficulty: ProcessDifficulty;
  category: ProcessCategory;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Process Category - Groups related business processes
 * 
 * Business Purpose: Helps users understand how processes relate to each other
 * 
 * User Experience: Logical grouping that makes sense to healthcare managers
 */
export type ProcessCategory = 
  | 'people' // Workforce, training, access management
  | 'technology' // Systems, security, data protection
  | 'vendors' // Business associates, third-party management
  | 'operations' // Policies, procedures, incident response
  | 'compliance' // Auditing, monitoring, reporting
  | 'security' // Physical security, access controls, risk management;

/**
 * Process Difficulty - How complex a process is to implement
 * 
 * Business Purpose: Helps users plan their compliance journey
 * 
 * User Experience: Clear expectations about what's involved
 */
export type ProcessDifficulty = 
  | 'simple' // "Easy to set up and maintain"
  | 'moderate' // "Some planning required, but manageable"
  | 'complex' // "Requires significant effort and expertise"
  | 'expert'; // "Best done with professional help"

// ============================================================================
// USER GUIDANCE INTERFACES
// ============================================================================

/**
 * User Guidance - Contextual help for users
 * 
 * Business Purpose: Guides users through their compliance journey
 * 
 * User Experience: Helpful, encouraging guidance that feels like a mentor
 */
export interface UserGuidance {
  id: string;
  type: GuidanceType;
  title: string; // "Why workforce training matters to your business"
  message: string; // Business-friendly explanation
  context: GuidanceContext;
  suggestions: ActionSuggestion[];
  examples: GuidanceExample[];
  resources: GuidanceResource[];
  isActive: boolean;
  createdAt: Date;
}

/**
 * Action Suggestion - Specific next steps for users
 * 
 * Business Purpose: Gives users clear, actionable next steps
 * 
 * User Experience: Specific actions users can take right now
 */
export interface ActionSuggestion {
  id: string;
  title: string; // "Upload your current training materials"
  description: string; // "This shows you have a training program in place"
  action: ActionType;
  priority: SuggestionPriority;
  estimatedTime: string; // "About 15 minutes"
  prerequisites: string[]; // What needs to be done first
  expectedOutcome: string; // What this will accomplish
  isCompleted: boolean;
}

/**
 * Guidance Example - Real-world examples for users
 * 
 * Business Purpose: Shows users what good compliance looks like
 * 
 * User Experience: Concrete examples users can relate to
 */
export interface GuidanceExample {
  id: string;
  title: string; // "Example: Small clinic training program"
  description: string; // "Here's how a 10-person clinic handles training"
  scenario: string; // "Your clinic has 10 staff members who need HIPAA training"
  solution: string; // "Upload your onboarding slides and completion certificates"
  outcome: string; // "This demonstrates your training program is working"
  isRelevant: boolean; // Whether this example applies to the user
}

/**
 * Guidance Resource - Helpful resources for users
 * 
 * Business Purpose: Provides users with tools and templates
 * 
 * User Experience: Practical resources users can use immediately
 */
export interface GuidanceResource {
  id: string;
  title: string; // "HIPAA Training Checklist Template"
  description: string; // "A simple checklist to track staff training"
  type: ResourceType;
  url: string;
  isTemplate: boolean; // Whether this is a downloadable template
  isRequired: boolean; // Whether this is essential for compliance
  difficulty: ProcessDifficulty;
}

// ============================================================================
// ACTION AND WORKFLOW INTERFACES
// ============================================================================

/**
 * Action Type - Different types of actions users can take
 * 
 * Business Purpose: Provides multiple ways for users to demonstrate compliance
 * 
 * User Experience: Clear options for how to show their process is working
 */
export type ActionType = 
  | 'upload' // Upload a document or file
  | 'confirm' // Confirm a procedure exists
  | 'record' // Record a date or event
  | 'assign' // Assign responsibility to someone
  | 'schedule' // Schedule a review or training
  | 'review' // Review and approve something
  | 'test' // Test a procedure or system
  | 'train' // Conduct training or education
  | 'audit' // Perform an audit or assessment
  | 'update' // Update a policy or procedure;

/**
 * Suggestion Priority - How important a suggestion is
 * 
 * Business Purpose: Helps users focus on what matters most
 * 
 * User Experience: Clear priority indicators that guide user attention
 */
export type SuggestionPriority = 
  | 'critical' // "Do this first - it's essential for compliance"
  | 'high' // "Important - should be done soon"
  | 'medium' // "Good to do - helps with compliance"
  | 'low'; // "Nice to have - can be done later"

/**
 * Guidance Context - When to show guidance to users
 * 
 * Business Purpose: Provides context-appropriate help
 * 
 * User Experience: Guidance that appears when users need it most
 */
export type GuidanceContext = 
  | 'onboarding' // First-time user guidance
  | 'stuck' // User is having trouble
  | 'progress' // User is making good progress
  | 'completion' // User has completed something
  | 'maintenance' // Regular maintenance activities
  | 'crisis' // Something needs immediate attention
  | 'celebration' // User has achieved something significant;

/**
 * Resource Type - Different types of resources available
 * 
 * Business Purpose: Provides various types of help to users
 * 
 * User Experience: Different formats of assistance users can access
 */
export type ResourceType = 
  | 'template' // Downloadable template
  | 'checklist' // Step-by-step checklist
  | 'guide' // How-to guide
  | 'video' // Instructional video
  | 'webinar' // Live or recorded webinar
  | 'tool' // Interactive tool or calculator
  | 'contact' // Contact information for help
  | 'reference' // Reference material or documentation;

// ============================================================================
// WORKFLOW AND STATE MANAGEMENT
// ============================================================================

/**
 * User Workflow - The path users take through compliance
 * 
 * Business Purpose: Guides users through their compliance journey
 * 
 * User Experience: Clear, logical progression through compliance tasks
 */
export interface UserWorkflow {
  id: string;
  name: string; // "Getting Started with HIPAA Compliance"
  description: string; // "A step-by-step guide to setting up your compliance program"
  steps: WorkflowStep[];
  currentStep: number;
  isCompleted: boolean;
  startedAt: Date;
  completedAt?: Date;
  estimatedTime: string; // "About 4-6 hours total"
  difficulty: ProcessDifficulty;
}

/**
 * Workflow Step - Individual steps in a user workflow
 * 
 * Business Purpose: Breaks down complex processes into manageable steps
 * 
 * User Experience: Clear, achievable steps that build confidence
 */
export interface WorkflowStep {
  id: string;
  title: string; // "Set up your training program"
  description: string; // "Upload your training materials and confirm staff completion"
  actions: ActionSuggestion[];
  isCompleted: boolean;
  completedAt?: Date;
  estimatedTime: string; // "About 30 minutes"
  prerequisites: string[]; // Steps that must be completed first
  nextSteps: string[]; // Steps that can be done next
}

// ============================================================================
// NOTIFICATION AND COMMUNICATION
// ============================================================================

/**
 * User Notification - Important messages for users
 * 
 * Business Purpose: Keeps users informed about their compliance status
 * 
 * User Experience: Helpful, timely notifications that guide user actions
 */
export interface UserNotification {
  id: string;
  type: NotificationType;
  title: string; // "Your training program needs attention"
  message: string; // "It's been 6 months since your last training review"
  priority: NotificationPriority;
  actionRequired: boolean;
  actionUrl?: string; // Link to take action
  expiresAt?: Date;
  isRead: boolean;
  createdAt: Date;
}

/**
 * Notification Type - Different types of notifications
 * 
 * Business Purpose: Provides appropriate notifications for different situations
 * 
 * User Experience: Clear, relevant notifications that help users stay on track
 */
export type NotificationType = 
  | 'reminder' // "Don't forget to review your training program"
  | 'deadline' // "Your training review is due next week"
  | 'celebration' // "Great job completing your risk assessment"
  | 'warning' // "Your training program is overdue"
  | 'update' // "New guidance available for your training program"
  | 'system' // "System maintenance scheduled for tonight";

/**
 * Notification Priority - How urgent a notification is
 * 
 * Business Purpose: Helps users prioritize their attention
 * 
 * User Experience: Clear priority indicators that guide user attention
 */
export type NotificationPriority = 
  | 'urgent' // "Action required immediately"
  | 'high' // "Important - should be addressed soon"
  | 'medium' // "Good to know - can be addressed when convenient"
  | 'low'; // "Informational - no action required"

// ============================================================================
// EXPORT ALL TYPES
// ============================================================================

export type {
  BusinessProcess,
  ProcessCategory,
  ProcessDifficulty,
  UserGuidance,
  ActionSuggestion,
  GuidanceExample,
  GuidanceResource,
  ActionType,
  SuggestionPriority,
  GuidanceContext,
  ResourceType,
  UserWorkflow,
  WorkflowStep,
  UserNotification,
  NotificationType,
  NotificationPriority
};
