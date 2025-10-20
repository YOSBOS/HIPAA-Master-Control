/**
 * HIPAA Master Control Tracker - API and Service Interfaces
 * 
 * This file defines the API contracts and service interfaces that implement
 * the business language philosophy in all data interactions.
 */

// ============================================================================
// API REQUEST/RESPONSE INTERFACES
// ============================================================================

/**
 * API Response - Standard response format for all API calls
 * 
 * Business Purpose: Provides consistent, user-friendly responses
 * 
 * User Experience: Clear success/error messages in business language
 */
export interface APIResponse<T = any> {
  success: boolean;
  message: string; // Business-friendly message
  data?: T;
  errors?: APIError[];
  metadata?: ResponseMetadata;
}

/**
 * API Error - User-friendly error information
 * 
 * Business Purpose: Provides helpful error messages in business language
 * 
 * User Experience: Clear error messages that help users understand what went wrong
 */
export interface APIError {
  code: string; // Business-friendly error code
  message: string; // Business-friendly error message
  field?: string; // Which field caused the error
  suggestion?: string; // What the user should do to fix it
  helpUrl?: string; // Link to help documentation
}

/**
 * Response Metadata - Additional information about API responses
 * 
 * Business Purpose: Provides context and guidance for users
 * 
 * User Experience: Helpful metadata that guides user actions
 */
export interface ResponseMetadata {
  totalItems?: number;
  currentPage?: number;
  totalPages?: number;
  nextAction?: string; // What the user should do next
  guidance?: string; // Helpful guidance for the user
  warnings?: string[]; // Things the user should be aware of
  suggestions?: string[]; // Suggested next steps
}

// ============================================================================
// MASTER CONTROL API INTERFACES
// ============================================================================

/**
 * Get Master Controls Request - Fetch business processes
 * 
 * Business Purpose: Retrieves the business processes users need to manage
 * 
 * User Experience: Simple, clear request for business process information
 */
export interface GetMasterControlsRequest {
  status?: ComplianceStatus; // Filter by business status
  category?: ProcessCategory; // Filter by business category
  priority?: Priority; // Filter by business priority
  search?: string; // Search by business name or description
  limit?: number;
  offset?: number;
}

/**
 * Get Master Controls Response - Business processes with guidance
 * 
 * Business Purpose: Provides business processes with helpful guidance
 * 
 * User Experience: Clear business processes with actionable guidance
 */
export interface GetMasterControlsResponse {
  controls: MasterControl[];
  summary: MasterControlSummary;
  guidance: AIGuidance[];
  nextActions: ActionSuggestion[];
  progress: ComplianceProgress;
}

/**
 * Update Master Control Request - Update business process
 * 
 * Business Purpose: Allows users to update their business processes
 * 
 * User Experience: Simple, clear way to update business process information
 */
export interface UpdateMasterControlRequest {
  id: string;
  status?: ComplianceStatus;
  responsiblePerson?: string;
  lastReviewDate?: Date;
  nextReviewDate?: Date;
  notes?: string; // User notes about the process
}

/**
 * Update Master Control Response - Confirmation with guidance
 * 
 * Business Purpose: Confirms updates and provides helpful guidance
 * 
 * User Experience: Clear confirmation with next steps
 */
export interface UpdateMasterControlResponse {
  control: MasterControl;
  guidance: AIGuidance[];
  nextActions: ActionSuggestion[];
  progress: ComplianceProgress;
}

// ============================================================================
// EVIDENCE API INTERFACES
// ============================================================================

/**
 * Upload Evidence Request - Upload business evidence
 * 
 * Business Purpose: Allows users to upload evidence of their business processes
 * 
 * User Experience: Simple, clear way to upload business evidence
 */
export interface UploadEvidenceRequest {
  masterControlId: string;
  type: EvidenceType;
  title: string; // Business-friendly title
  description: string; // What this evidence shows
  file?: File; // For document uploads
  value?: string | boolean | Date; // For other evidence types
  metadata?: EvidenceMetadata;
}

/**
 * Upload Evidence Response - Confirmation with guidance
 * 
 * Business Purpose: Confirms evidence upload and provides helpful guidance
 * 
 * User Experience: Clear confirmation with next steps
 */
export interface UploadEvidenceResponse {
  evidence: EvidenceItem;
  guidance: AIGuidance[];
  nextActions: ActionSuggestion[];
  progress: ComplianceProgress;
}

/**
 * Get Evidence Request - Fetch business evidence
 * 
 * Business Purpose: Retrieves evidence of business processes
 * 
 * User Experience: Simple, clear request for business evidence
 */
export interface GetEvidenceRequest {
  masterControlId?: string;
  type?: EvidenceType;
  status?: EvidenceStatus;
  search?: string; // Search by title or description
  limit?: number;
  offset?: number;
}

/**
 * Get Evidence Response - Business evidence with guidance
 * 
 * Business Purpose: Provides business evidence with helpful guidance
 * 
 * User Experience: Clear business evidence with actionable guidance
 */
export interface GetEvidenceResponse {
  evidence: EvidenceItem[];
  guidance: AIGuidance[];
  nextActions: ActionSuggestion[];
  progress: ComplianceProgress;
}

// ============================================================================
// GUIDANCE API INTERFACES
// ============================================================================

/**
 * Get Guidance Request - Fetch business guidance
 * 
 * Business Purpose: Retrieves helpful guidance for business processes
 * 
 * User Experience: Simple, clear request for business guidance
 */
export interface GetGuidanceRequest {
  masterControlId?: string;
  type?: GuidanceType;
  context?: GuidanceContext;
  search?: string; // Search by title or message
  limit?: number;
  offset?: number;
}

/**
 * Get Guidance Response - Business guidance with examples
 * 
 * Business Purpose: Provides helpful guidance for business processes
 * 
 * User Experience: Clear business guidance with practical examples
 */
export interface GetGuidanceResponse {
  guidance: AIGuidance[];
  examples: GuidanceExample[];
  resources: GuidanceResource[];
  nextActions: ActionSuggestion[];
}

/**
 * Request Guidance Request - Ask for specific help
 * 
 * Business Purpose: Allows users to request specific guidance
 * 
 * User Experience: Simple, clear way to ask for help
 */
export interface RequestGuidanceRequest {
  masterControlId: string;
  question: string; // User's specific question
  context: string; // Additional context about their situation
  priority: SuggestionPriority;
}

/**
 * Request Guidance Response - Personalized guidance
 * 
 * Business Purpose: Provides personalized guidance for specific questions
 * 
 * User Experience: Clear, personalized guidance that addresses their specific needs
 */
export interface RequestGuidanceResponse {
  guidance: AIGuidance[];
  examples: GuidanceExample[];
  resources: GuidanceResource[];
  nextActions: ActionSuggestion[];
  followUpQuestions?: string[]; // Questions to help clarify their needs
}

// ============================================================================
// PROGRESS AND REPORTING API INTERFACES
// ============================================================================

/**
 * Get Progress Request - Fetch compliance progress
 * 
 * Business Purpose: Retrieves progress information for business processes
 * 
 * User Experience: Simple, clear request for progress information
 */
export interface GetProgressRequest {
  masterControlId?: string;
  timeRange?: {
    start: Date;
    end: Date;
  };
  includeDetails?: boolean;
}

/**
 * Get Progress Response - Business progress with guidance
 * 
 * Business Purpose: Provides progress information with helpful guidance
 * 
 * User Experience: Clear progress information with actionable guidance
 */
export interface GetProgressResponse {
  progress: ComplianceProgress;
  controls: MasterControl[];
  evidence: EvidenceItem[];
  guidance: AIGuidance[];
  nextActions: ActionSuggestion[];
  recommendations: string[]; // Specific recommendations for improvement
}

/**
 * Generate Report Request - Generate business report
 * 
 * Business Purpose: Allows users to generate business reports
 * 
 * User Experience: Simple, clear way to generate business reports
 */
export interface GenerateReportRequest {
  type: ReportType;
  masterControlIds?: string[];
  timeRange?: {
    start: Date;
    end: Date;
  };
  format: ReportFormat;
  includeGuidance?: boolean;
}

/**
 * Generate Report Response - Business report with guidance
 * 
 * Business Purpose: Provides business reports with helpful guidance
 * 
 * User Experience: Clear business reports with actionable guidance
 */
export interface GenerateReportResponse {
  report: BusinessReport;
  guidance: AIGuidance[];
  nextActions: ActionSuggestion[];
  recommendations: string[];
}

// ============================================================================
// REPORT TYPES AND FORMATS
// ============================================================================

/**
 * Report Type - Different types of business reports
 * 
 * Business Purpose: Provides various types of business reports
 * 
 * User Experience: Different formats of business information users can access
 */
export type ReportType = 
  | 'overview' // High-level business process overview
  | 'detailed' // Detailed business process information
  | 'progress' // Progress tracking report
  | 'compliance' // Compliance status report
  | 'evidence' // Evidence collection report
  | 'guidance' // Guidance and recommendations report
  | 'audit' // Audit-ready report
  | 'executive'; // Executive summary report

/**
 * Report Format - Different formats for business reports
 * 
 * Business Purpose: Provides various formats for business reports
 * 
 * User Experience: Different formats users can choose from
 */
export type ReportFormat = 
  | 'pdf' // PDF document
  | 'excel' // Excel spreadsheet
  | 'csv' // CSV data file
  | 'json' // JSON data file
  | 'html' // HTML web page
  | 'email'; // Email report

/**
 * Business Report - Business-friendly report content
 * 
 * Business Purpose: Provides business reports in user-friendly format
 * 
 * User Experience: Clear, actionable business reports
 */
export interface BusinessReport {
  id: string;
  type: ReportType;
  title: string; // Business-friendly title
  description: string; // What this report shows
  content: ReportContent;
  generatedAt: Date;
  generatedBy: string;
  masterControlIds: string[];
  timeRange: {
    start: Date;
    end: Date;
  };
  metadata: ReportMetadata;
}

/**
 * Report Content - The actual content of a business report
 * 
 * Business Purpose: Provides the actual content of business reports
 * 
 * User Experience: Clear, well-organized business information
 */
export interface ReportContent {
  summary: string; // Executive summary
  sections: ReportSection[];
  charts?: ReportChart[];
  tables?: ReportTable[];
  recommendations: string[];
  nextActions: ActionSuggestion[];
}

/**
 * Report Section - Individual sections of a business report
 * 
 * Business Purpose: Organizes business information into logical sections
 * 
 * User Experience: Clear, well-organized business information
 */
export interface ReportSection {
  title: string; // Business-friendly section title
  content: string; // Section content
  subsections?: ReportSection[];
  charts?: ReportChart[];
  tables?: ReportTable[];
}

/**
 * Report Chart - Visual representation of business data
 * 
 * Business Purpose: Provides visual representation of business information
 * 
 * User Experience: Clear, easy-to-understand visual information
 */
export interface ReportChart {
  type: ChartType;
  title: string; // Business-friendly chart title
  data: ChartData;
  description: string; // What this chart shows
}

/**
 * Report Table - Tabular representation of business data
 * 
 * Business Purpose: Provides tabular representation of business information
 * 
 * User Experience: Clear, easy-to-understand tabular information
 */
export interface ReportTable {
  title: string; // Business-friendly table title
  headers: string[];
  rows: string[][];
  description: string; // What this table shows
}

/**
 * Report Metadata - Additional information about business reports
 * 
 * Business Purpose: Provides context and guidance for business reports
 * 
 * User Experience: Helpful metadata that guides user understanding
 */
export interface ReportMetadata {
  totalControls: number;
  completeControls: number;
  inProgressControls: number;
  needsAttentionControls: number;
  notStartedControls: number;
  overallProgress: number;
  lastUpdated: Date;
  nextReviewDate: Date;
  riskAreas: string[];
  successAreas: string[];
}

// ============================================================================
// CHART AND DATA TYPES
// ============================================================================

/**
 * Chart Type - Different types of charts for business reports
 * 
 * Business Purpose: Provides various types of visual representation
 * 
 * User Experience: Different types of charts users can choose from
 */
export type ChartType = 
  | 'pie' // Pie chart
  | 'bar' // Bar chart
  | 'line' // Line chart
  | 'area' // Area chart
  | 'donut' // Donut chart
  | 'gauge' // Gauge chart
  | 'progress' // Progress chart
  | 'timeline'; // Timeline chart

/**
 * Chart Data - Data for business report charts
 * 
 * Business Purpose: Provides data for visual representation
 * 
 * User Experience: Clear, easy-to-understand chart data
 */
export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
  options?: ChartOptions;
}

/**
 * Chart Dataset - Individual dataset for business report charts
 * 
 * Business Purpose: Provides data for visual representation
 * 
 * User Experience: Clear, easy-to-understand chart data
 */
export interface ChartDataset {
  label: string; // Business-friendly label
  data: number[];
  backgroundColor?: string[];
  borderColor?: string[];
  borderWidth?: number;
}

/**
 * Chart Options - Options for business report charts
 * 
 * Business Purpose: Provides options for visual representation
 * 
 * User Experience: Clear, easy-to-understand chart options
 */
export interface ChartOptions {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  plugins?: {
    legend?: {
      display?: boolean;
      position?: string;
    };
    title?: {
      display?: boolean;
      text?: string;
    };
  };
}

// ============================================================================
// EXPORT ALL TYPES
// ============================================================================

export type {
  APIResponse,
  APIError,
  ResponseMetadata,
  GetMasterControlsRequest,
  GetMasterControlsResponse,
  UpdateMasterControlRequest,
  UpdateMasterControlResponse,
  UploadEvidenceRequest,
  UploadEvidenceResponse,
  GetEvidenceRequest,
  GetEvidenceResponse,
  GetGuidanceRequest,
  GetGuidanceResponse,
  RequestGuidanceRequest,
  RequestGuidanceResponse,
  GetProgressRequest,
  GetProgressResponse,
  GenerateReportRequest,
  GenerateReportResponse,
  ReportType,
  ReportFormat,
  BusinessReport,
  ReportContent,
  ReportSection,
  ReportChart,
  ReportTable,
  ReportMetadata,
  ChartType,
  ChartData,
  ChartDataset,
  ChartOptions
};
