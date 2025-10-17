/**
 * HIPAA Type Definitions
 * Central type definitions for HIPAA compliance tracking
 */

export interface HIPAAControl {
  id: string;
  title: string;
  description: string;
  category: 'Administrative' | 'Physical' | 'Technical';
  priority: 'High' | 'Medium' | 'Low';
  status: 'Compliant' | 'Non-Compliant' | 'In Progress' | 'Not Assessed';
  lastAssessed?: Date;
  nextAssessment?: Date;
  responsibleParty?: string;
  evidence?: string[];
  notes?: string;
  tenantId?: string;
}

export interface ComplianceAssessment {
  id: string;
  controlId: string;
  assessmentDate: Date;
  assessor: string;
  status: 'Compliant' | 'Non-Compliant' | 'In Progress' | 'Not Assessed';
  evidence: string[];
  findings: string;
  recommendations: string[];
  nextAssessmentDate: Date;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  tenantId?: string;
}

export interface ComplianceReport {
  id: string;
  title: string;
  generatedDate: Date;
  generatedBy: string;
  period: {
    start: Date;
    end: Date;
  };
  summary: {
    totalControls: number;
    compliantControls: number;
    nonCompliantControls: number;
    inProgressControls: number;
    notAssessedControls: number;
    compliancePercentage: number;
  };
  controls: ComplianceAssessment[];
  recommendations: string[];
  riskAssessment: {
    criticalRisks: number;
    highRisks: number;
    mediumRisks: number;
    lowRisks: number;
  };
  tenantId?: string;
}

export interface AuditLog {
  id: string;
  timestamp: Date;
  userId: string;
  action: string;
  resource: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  tenantId?: string;
}

export interface HIPAARequirement {
  id: string;
  title: string;
  description: string;
  category: 'Administrative' | 'Physical' | 'Technical';
  subcategory?: string;
  required: boolean;
  implementationSpecification?: string;
  addressable?: boolean;
  guidance?: string;
  references?: string[];
}

export interface HIPAAStandard {
  id: string;
  title: string;
  description: string;
  requirements: HIPAARequirement[];
  category: 'Administrative' | 'Physical' | 'Technical';
}

export interface RiskAssessment {
  id: string;
  controlId: string;
  assessmentDate: Date;
  assessor: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  likelihood: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High';
  description: string;
  mitigationStrategies: string[];
  residualRisk: 'Low' | 'Medium' | 'High' | 'Critical';
  tenantId?: string;
}

export interface SecurityIncident {
  id: string;
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  reportedDate: Date;
  reportedBy: string;
  affectedSystems: string[];
  affectedData: string[];
  containmentActions: string[];
  investigationFindings: string;
  remediationActions: string[];
  lessonsLearned: string[];
  tenantId?: string;
}

export interface BusinessAssociate {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  servicesProvided: string[];
  agreementDate: Date;
  agreementExpiry: Date;
  status: 'Active' | 'Inactive' | 'Expired';
  hipaaCompliant: boolean;
  lastAssessment: Date;
  nextAssessment: Date;
  tenantId?: string;
}

export interface TrainingRecord {
  id: string;
  userId: string;
  trainingType: string;
  completionDate: Date;
  expiryDate?: Date;
  status: 'Completed' | 'In Progress' | 'Expired' | 'Required';
  score?: number;
  certificate?: string;
  tenantId?: string;
}

export interface PolicyDocument {
  id: string;
  title: string;
  category: string;
  version: string;
  effectiveDate: Date;
  reviewDate: Date;
  approvedBy: string;
  content: string;
  status: 'Draft' | 'Active' | 'Under Review' | 'Archived';
  tenantId?: string;
}

export interface ComplianceMetrics {
  overallCompliance: number;
  administrativeCompliance: number;
  physicalCompliance: number;
  technicalCompliance: number;
  totalControls: number;
  compliantControls: number;
  nonCompliantControls: number;
  inProgressControls: number;
  notAssessedControls: number;
  criticalRisks: number;
  highRisks: number;
  mediumRisks: number;
  lowRisks: number;
  lastUpdated: Date;
  tenantId?: string;
}

export interface Tenant {
  id: string;
  name: string;
  domain: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  industry: string;
  size: 'Small' | 'Medium' | 'Large' | 'Enterprise';
  hipaaStatus: 'Covered Entity' | 'Business Associate' | 'Hybrid Entity';
  complianceOfficer: string;
  securityOfficer: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'Active' | 'Inactive' | 'Suspended';
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'Admin' | 'Compliance Officer' | 'Security Officer' | 'Auditor' | 'User';
  tenantId: string;
  permissions: string[];
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  status: 'Active' | 'Inactive' | 'Suspended';
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'Info' | 'Warning' | 'Error' | 'Success';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  read: boolean;
  createdAt: Date;
  tenantId?: string;
}

export interface DashboardWidget {
  id: string;
  title: string;
  type: 'chart' | 'metric' | 'table' | 'list';
  data: any;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  tenantId?: string;
}

export interface ComplianceCalendar {
  id: string;
  title: string;
  type: 'Assessment' | 'Review' | 'Training' | 'Audit' | 'Policy Review';
  dueDate: Date;
  assignedTo: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Overdue';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  tenantId?: string;
}
