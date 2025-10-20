/**
 * HIPAA Master Control Tracker - Service Interfaces
 * 
 * This file defines the service interfaces that implement the business language
 * philosophy in all business logic and data operations.
 */

// ============================================================================
// CORE SERVICE INTERFACES
// ============================================================================

/**
 * Master Control Service - Manages business processes
 * 
 * Business Purpose: Provides business process management functionality
 * 
 * User Experience: Simple, clear interface for managing business processes
 */
export interface MasterControlService {
  // Get business processes
  getControls(request: GetMasterControlsRequest): Promise<GetMasterControlsResponse>;
  
  // Get specific business process
  getControl(id: string): Promise<MasterControl>;
  
  // Update business process
  updateControl(request: UpdateMasterControlRequest): Promise<UpdateMasterControlResponse>;
  
  // Create new business process
  createControl(control: Omit<MasterControl, 'id' | 'createdAt' | 'updatedAt'>): Promise<MasterControl>;
  
  // Delete business process
  deleteControl(id: string): Promise<void>;
  
  // Get business process summary
  getSummary(): Promise<MasterControlSummary>;
  
  // Get business process progress
  getProgress(request: GetProgressRequest): Promise<GetProgressResponse>;
}

/**
 * Evidence Service - Manages business evidence
 * 
 * Business Purpose: Provides evidence management functionality
 * 
 * User Experience: Simple, clear interface for managing business evidence
 */
export interface EvidenceService {
  // Upload business evidence
  uploadEvidence(request: UploadEvidenceRequest): Promise<UploadEvidenceResponse>;
  
  // Get business evidence
  getEvidence(request: GetEvidenceRequest): Promise<GetEvidenceResponse>;
  
  // Get specific evidence item
  getEvidenceItem(id: string): Promise<EvidenceItem>;
  
  // Update evidence item
  updateEvidenceItem(id: string, updates: Partial<EvidenceItem>): Promise<EvidenceItem>;
  
  // Delete evidence item
  deleteEvidenceItem(id: string): Promise<void>;
  
  // Validate evidence
  validateEvidence(evidence: EvidenceItem): Promise<ValidationResult>;
  
  // Get evidence summary
  getEvidenceSummary(masterControlId: string): Promise<EvidenceSummary>;
}

/**
 * Guidance Service - Provides business guidance
 * 
 * Business Purpose: Provides helpful guidance for business processes
 * 
 * User Experience: Simple, clear interface for getting business guidance
 */
export interface GuidanceService {
  // Get business guidance
  getGuidance(request: GetGuidanceRequest): Promise<GetGuidanceResponse>;
  
  // Request specific guidance
  requestGuidance(request: RequestGuidanceRequest): Promise<RequestGuidanceResponse>;
  
  // Get guidance examples
  getExamples(masterControlId: string): Promise<GuidanceExample[]>;
  
  // Get guidance resources
  getResources(masterControlId: string): Promise<GuidanceResource[]>;
  
  // Get guidance suggestions
  getSuggestions(masterControlId: string): Promise<ActionSuggestion[]>;
  
  // Update guidance
  updateGuidance(id: string, updates: Partial<AIGuidance>): Promise<AIGuidance>;
}

/**
 * Compliance Service - Manages compliance tracking
 * 
 * Business Purpose: Provides compliance tracking functionality
 * 
 * User Experience: Simple, clear interface for tracking compliance progress
 */
export interface ComplianceService {
  // Get compliance status
  getComplianceStatus(masterControlId: string): Promise<ComplianceStatus>;
  
  // Update compliance status
  updateComplianceStatus(masterControlId: string, status: ComplianceStatus): Promise<void>;
  
  // Get compliance progress
  getComplianceProgress(): Promise<ComplianceProgress>;
  
  // Get compliance mapping
  getComplianceMapping(masterControlId: string): Promise<ComplianceMapping[]>;
  
  // Validate compliance
  validateCompliance(masterControlId: string): Promise<ValidationResult>;
  
  // Get compliance report
  generateComplianceReport(request: GenerateReportRequest): Promise<GenerateReportResponse>;
}

/**
 * Report Service - Generates business reports
 * 
 * Business Purpose: Provides business report generation functionality
 * 
 * User Experience: Simple, clear interface for generating business reports
 */
export interface ReportService {
  // Generate business report
  generateReport(request: GenerateReportRequest): Promise<GenerateReportResponse>;
  
  // Get available report types
  getReportTypes(): Promise<ReportType[]>;
  
  // Get report templates
  getReportTemplates(): Promise<ReportTemplate[]>;
  
  // Save report
  saveReport(report: BusinessReport): Promise<string>;
  
  // Get saved reports
  getSavedReports(): Promise<BusinessReport[]>;
  
  // Delete saved report
  deleteReport(id: string): Promise<void>;
}

// ============================================================================
// AI AND GUIDANCE INTERFACES
// ============================================================================

/**
 * AI Guidance Service - Provides AI-powered business guidance
 * 
 * Business Purpose: Provides intelligent guidance for business processes
 * 
 * User Experience: Smart, helpful guidance that feels like a business mentor
 */
export interface AIGuidanceService {
  // Generate business guidance
  generateGuidance(context: GuidanceContext, masterControlId: string): Promise<AIGuidance>;
  
  // Analyze business process
  analyzeProcess(masterControlId: string): Promise<ProcessAnalysis>;
  
  // Suggest improvements
  suggestImprovements(masterControlId: string): Promise<ImprovementSuggestion[]>;
  
  // Generate examples
  generateExamples(masterControlId: string, scenario: string): Promise<GuidanceExample[]>;
  
  // Answer questions
  answerQuestion(question: string, context: string): Promise<GuidanceAnswer>;
  
  // Update guidance
  updateGuidance(id: string, updates: Partial<AIGuidance>): Promise<AIGuidance>;
}

/**
 * Process Analysis - Analysis of business processes
 * 
 * Business Purpose: Provides insights into business process effectiveness
 * 
 * User Experience: Clear insights into how well their business processes are working
 */
export interface ProcessAnalysis {
  id: string;
  masterControlId: string;
  overallScore: number; // 0-100
  strengths: string[]; // What's working well
  weaknesses: string[]; // What needs improvement
  opportunities: string[]; // Potential improvements
  threats: string[]; // Potential risks
  recommendations: string[]; // Specific recommendations
  nextActions: ActionSuggestion[]; // What to do next
  analyzedAt: Date;
}

/**
 * Improvement Suggestion - Suggestions for improving business processes
 * 
 * Business Purpose: Provides specific suggestions for improvement
 * 
 * User Experience: Clear, actionable suggestions for improvement
 */
export interface ImprovementSuggestion {
  id: string;
  title: string; // Business-friendly title
  description: string; // What this improvement does
  impact: ImprovementImpact; // How much this will help
  effort: ImprovementEffort; // How much work this requires
  priority: SuggestionPriority; // How important this is
  steps: string[]; // How to implement this improvement
  resources: GuidanceResource[]; // Resources to help with implementation
  estimatedTime: string; // How long this will take
  expectedOutcome: string; // What this will accomplish
}

/**
 * Guidance Answer - AI-generated answers to user questions
 * 
 * Business Purpose: Provides intelligent answers to user questions
 * 
 * User Experience: Clear, helpful answers that address their specific needs
 */
export interface GuidanceAnswer {
  id: string;
  question: string; // User's question
  answer: string; // AI-generated answer
  confidence: number; // 0-100 confidence score
  sources: string[]; // Sources used to generate the answer
  followUpQuestions: string[]; // Questions to help clarify their needs
  relatedGuidance: AIGuidance[]; // Related guidance
  createdAt: Date;
}

// ============================================================================
// VALIDATION AND QUALITY INTERFACES
// ============================================================================

/**
 * Validation Result - Result of validating business data
 * 
 * Business Purpose: Provides validation results for business data
 * 
 * User Experience: Clear validation results that help users understand what's valid
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions: string[]; // Suggestions for improvement
  score: number; // 0-100 validation score
}

/**
 * Validation Error - Specific validation error
 * 
 * Business Purpose: Provides specific information about validation errors
 * 
 * User Experience: Clear error information that helps users fix problems
 */
export interface ValidationError {
  field: string; // Which field has the error
  message: string; // Business-friendly error message
  code: string; // Error code for reference
  suggestion: string; // How to fix the error
  helpUrl?: string; // Link to help documentation
}

/**
 * Validation Warning - Validation warning
 * 
 * Business Purpose: Provides warnings about potential issues
 * 
 * User Experience: Clear warnings that help users avoid problems
 */
export interface ValidationWarning {
  field: string; // Which field has the warning
  message: string; // Business-friendly warning message
  code: string; // Warning code for reference
  suggestion: string; // How to address the warning
  helpUrl?: string; // Link to help documentation
}

// ============================================================================
// SUMMARY AND METADATA INTERFACES
// ============================================================================

/**
 * Evidence Summary - Summary of evidence for a business process
 * 
 * Business Purpose: Provides overview of evidence for business processes
 * 
 * User Experience: Clear overview of what evidence they have and what they need
 */
export interface EvidenceSummary {
  masterControlId: string;
  totalEvidence: number;
  completeEvidence: number;
  pendingEvidence: number;
  expiredEvidence: number;
  evidenceTypes: EvidenceTypeSummary[];
  lastUpdated: Date;
  nextReviewDate: Date;
  recommendations: string[];
}

/**
 * Evidence Type Summary - Summary of evidence by type
 * 
 * Business Purpose: Provides overview of evidence by type
 * 
 * User Experience: Clear overview of evidence types and their status
 */
export interface EvidenceTypeSummary {
  type: EvidenceType;
  total: number;
  complete: number;
  pending: number;
  expired: number;
  percentage: number; // 0-100 completion percentage
}

/**
 * Report Template - Template for business reports
 * 
 * Business Purpose: Provides templates for business reports
 * 
 * User Experience: Clear templates for generating business reports
 */
export interface ReportTemplate {
  id: string;
  name: string; // Business-friendly name
  description: string; // What this template does
  type: ReportType;
  format: ReportFormat;
  sections: ReportSection[];
  isDefault: boolean;
  isCustom: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// IMPROVEMENT IMPACT AND EFFORT TYPES
// ============================================================================

/**
 * Improvement Impact - How much an improvement will help
 * 
 * Business Purpose: Helps users understand the value of improvements
 * 
 * User Experience: Clear indicators of how much improvements will help
 */
export type ImprovementImpact = 
  | 'high' // "This will significantly improve your compliance"
  | 'medium' // "This will moderately improve your compliance"
  | 'low'; // "This will slightly improve your compliance"

/**
 * Improvement Effort - How much work an improvement requires
 * 
 * Business Purpose: Helps users understand the effort required for improvements
 * 
 * User Experience: Clear indicators of how much work improvements require
 */
export type ImprovementEffort = 
  | 'high' // "This requires significant effort and expertise"
  | 'medium' // "This requires moderate effort and planning"
  | 'low'; // "This requires minimal effort and can be done quickly"

// ============================================================================
// EXPORT ALL TYPES
// ============================================================================

export type {
  MasterControlService,
  EvidenceService,
  GuidanceService,
  ComplianceService,
  ReportService,
  AIGuidanceService,
  ProcessAnalysis,
  ImprovementSuggestion,
  GuidanceAnswer,
  ValidationResult,
  ValidationError,
  ValidationWarning,
  EvidenceSummary,
  EvidenceTypeSummary,
  ReportTemplate,
  ImprovementImpact,
  ImprovementEffort
};
