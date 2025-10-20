/**
 * HIPAA Master Control Tracker - Core Types Index
 * 
 * This file exports all the core types and interfaces for the HIPAA Master Control Tracker.
 * It implements the business language philosophy: users see business processes, not legal jargon.
 */

// ============================================================================
// CORE DATA MODELS
// ============================================================================
export * from './master-controls';

// ============================================================================
// BUSINESS LOGIC
// ============================================================================
export * from './business-logic';

// ============================================================================
// API INTERFACES
// ============================================================================
export * from './api';

// ============================================================================
// SERVICE INTERFACES
// ============================================================================
export * from './services';

// ============================================================================
// RE-EXPORT COMMON TYPES FOR CONVENIENCE
// ============================================================================

// Core business types
export type {
  MasterControl,
  EvidenceItem,
  AIGuidance,
  ComplianceStatus,
  EvidenceStatus,
  Priority,
  EvidenceType,
  GuidanceType
} from './master-controls';

// Business logic types
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
  ResourceType
} from './business-logic';

// API types
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
  GenerateReportResponse
} from './api';

// Service types
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
  ValidationWarning
} from './services';