/**
 * Tenant Type Definitions
 * Multi-tenant architecture type definitions
 */

export interface Tenant {
  id: string;
  name: string;
  domain: string;
  subdomain?: string;
  contactEmail: string;
  contactPhone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  industry: string;
  size: 'Small' | 'Medium' | 'Large' | 'Enterprise';
  hipaaStatus: 'Covered Entity' | 'Business Associate' | 'Hybrid Entity';
  complianceOfficer: {
    name: string;
    email: string;
    phone: string;
  };
  securityOfficer: {
    name: string;
    email: string;
    phone: string;
  };
  settings: TenantSettings;
  createdAt: Date;
  updatedAt: Date;
  status: 'Active' | 'Inactive' | 'Suspended' | 'Pending';
}

export interface TenantSettings {
  branding: {
    logo?: string;
    primaryColor: string;
    secondaryColor: string;
    customDomain?: string;
  };
  features: {
    auditLogging: boolean;
    advancedReporting: boolean;
    apiAccess: boolean;
    customControls: boolean;
    integrations: boolean;
  };
  compliance: {
    autoAssessmentReminders: boolean;
    riskThreshold: 'Low' | 'Medium' | 'High';
    notificationSettings: {
      email: boolean;
      sms: boolean;
      inApp: boolean;
    };
  };
  security: {
    sessionTimeout: number; // minutes
    passwordPolicy: {
      minLength: number;
      requireUppercase: boolean;
      requireLowercase: boolean;
      requireNumbers: boolean;
      requireSpecialChars: boolean;
    };
    twoFactorAuth: boolean;
    ipWhitelist?: string[];
  };
  dataRetention: {
    auditLogs: number; // days
    reports: number; // days
    assessments: number; // days
  };
}

export interface TenantUser {
  id: string;
  tenantId: string;
  userId: string;
  role: TenantRole;
  permissions: string[];
  department?: string;
  title?: string;
  joinedAt: Date;
  lastActiveAt?: Date;
  status: 'Active' | 'Inactive' | 'Suspended';
}

export interface TenantRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  tenantId: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TenantInvitation {
  id: string;
  tenantId: string;
  email: string;
  role: string;
  invitedBy: string;
  invitedAt: Date;
  expiresAt: Date;
  status: 'Pending' | 'Accepted' | 'Expired' | 'Cancelled';
  token: string;
}

export interface TenantSubscription {
  id: string;
  tenantId: string;
  plan: string;
  status: 'Active' | 'Inactive' | 'Cancelled' | 'Past Due';
  startDate: Date;
  endDate: Date;
  features: string[];
  limits: {
    users: number;
    controls: number;
    reports: number;
    storage: number; // GB
  };
  usage: {
    users: number;
    controls: number;
    reports: number;
    storage: number; // GB
  };
}

export interface TenantActivity {
  id: string;
  tenantId: string;
  userId: string;
  action: string;
  resource: string;
  details: Record<string, any>;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
}

export interface TenantConfiguration {
  id: string;
  tenantId: string;
  key: string;
  value: any;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description?: string;
  isEncrypted: boolean;
  updatedBy: string;
  updatedAt: Date;
}

export interface TenantBackup {
  id: string;
  tenantId: string;
  type: 'Full' | 'Incremental' | 'Differential';
  status: 'In Progress' | 'Completed' | 'Failed';
  startedAt: Date;
  completedAt?: Date;
  size: number; // bytes
  location: string;
  retentionDays: number;
  expiresAt: Date;
}

export interface TenantMetrics {
  tenantId: string;
  period: {
    start: Date;
    end: Date;
  };
  users: {
    total: number;
    active: number;
    inactive: number;
  };
  compliance: {
    overallScore: number;
    controlsAssessed: number;
    controlsCompliant: number;
    controlsNonCompliant: number;
  };
  activity: {
    logins: number;
    assessments: number;
    reports: number;
    apiCalls: number;
  };
  storage: {
    used: number; // bytes
    limit: number; // bytes
    percentage: number;
  };
}

export interface TenantNotification {
  id: string;
  tenantId: string;
  type: 'System' | 'Compliance' | 'Security' | 'Maintenance';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  title: string;
  message: string;
  data?: Record<string, any>;
  readBy: string[];
  createdAt: Date;
  expiresAt?: Date;
}

export interface TenantIntegration {
  id: string;
  tenantId: string;
  name: string;
  type: 'API' | 'Webhook' | 'SSO' | 'Database' | 'File';
  configuration: Record<string, any>;
  status: 'Active' | 'Inactive' | 'Error';
  lastSync?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TenantAudit {
  id: string;
  tenantId: string;
  auditor: string;
  startDate: Date;
  endDate: Date;
  scope: string[];
  findings: string[];
  recommendations: string[];
  status: 'In Progress' | 'Completed' | 'Cancelled';
  reportUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
