/**
 * API Type Definitions
 * Common API response and request type definitions
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
  timestamp: Date;
  requestId: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  field?: string;
  stack?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
}

export interface ApiRequest {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, any>;
  query?: Record<string, any>;
}

export interface ApiEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  description: string;
  parameters?: ApiParameter[];
  requestBody?: ApiRequestBody;
  responses: ApiResponseSchema[];
  authentication?: boolean;
  permissions?: string[];
}

export interface ApiParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  required: boolean;
  description: string;
  location: 'path' | 'query' | 'header' | 'body';
  example?: any;
}

export interface ApiRequestBody {
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  required: boolean;
  description: string;
  schema?: Record<string, any>;
  example?: any;
}

export interface ApiResponseSchema {
  status: number;
  description: string;
  schema?: Record<string, any>;
  example?: any;
}

export interface ApiValidationError {
  field: string;
  message: string;
  value?: any;
  constraint?: string;
}

export interface ApiRateLimit {
  limit: number;
  remaining: number;
  reset: Date;
  retryAfter?: number;
}

export interface ApiMetrics {
  endpoint: string;
  method: string;
  requests: number;
  errors: number;
  averageResponseTime: number;
  lastRequest?: Date;
}

export interface WebhookEvent {
  id: string;
  type: string;
  tenantId: string;
  data: Record<string, any>;
  timestamp: Date;
  retryCount: number;
  maxRetries: number;
  status: 'Pending' | 'Delivered' | 'Failed' | 'Retrying';
  nextRetryAt?: Date;
}

export interface WebhookSubscription {
  id: string;
  tenantId: string;
  url: string;
  events: string[];
  secret: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FileUpload {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  uploadedBy: string;
  tenantId: string;
  uploadedAt: Date;
  metadata?: Record<string, any>;
}

export interface ExportRequest {
  id: string;
  type: 'report' | 'data' | 'audit';
  format: 'pdf' | 'excel' | 'csv' | 'json';
  filters: Record<string, any>;
  requestedBy: string;
  tenantId: string;
  status: 'Pending' | 'Processing' | 'Completed' | 'Failed';
  createdAt: Date;
  completedAt?: Date;
  downloadUrl?: string;
  expiresAt?: Date;
}

export interface ImportRequest {
  id: string;
  type: 'controls' | 'assessments' | 'users' | 'data';
  format: 'excel' | 'csv' | 'json';
  filename: string;
  uploadedBy: string;
  tenantId: string;
  status: 'Pending' | 'Processing' | 'Completed' | 'Failed';
  progress: number;
  totalRecords: number;
  processedRecords: number;
  errors: ImportError[];
  createdAt: Date;
  completedAt?: Date;
}

export interface ImportError {
  row: number;
  field: string;
  message: string;
  value?: any;
}

export interface ApiHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  version: string;
  uptime: number;
  timestamp: Date;
  services: {
    database: ServiceHealth;
    cache: ServiceHealth;
    storage: ServiceHealth;
    external: ServiceHealth;
  };
}

export interface ServiceHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  responseTime?: number;
  lastCheck: Date;
  error?: string;
}

export interface ApiUsage {
  tenantId: string;
  period: {
    start: Date;
    end: Date;
  };
  requests: number;
  errors: number;
  dataTransfer: number; // bytes
  storage: number; // bytes
  limits: {
    requests: number;
    dataTransfer: number; // bytes
    storage: number; // bytes
  };
}

export interface ApiKeyUsage {
  apiKeyId: string;
  requests: number;
  lastUsed: Date;
  ipAddress: string;
  userAgent: string;
}

export interface ApiLog {
  id: string;
  requestId: string;
  method: string;
  url: string;
  statusCode: number;
  responseTime: number;
  userId?: string;
  tenantId?: string;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  error?: string;
}

export interface ApiCache {
  key: string;
  value: any;
  ttl: number;
  createdAt: Date;
  expiresAt: Date;
  hits: number;
  lastHit?: Date;
}

export interface ApiMiddleware {
  name: string;
  order: number;
  enabled: boolean;
  configuration: Record<string, any>;
}

export interface ApiRoute {
  path: string;
  method: string;
  handler: string;
  middleware: string[];
  authentication: boolean;
  permissions: string[];
  rateLimit?: {
    windowMs: number;
    max: number;
  };
}
