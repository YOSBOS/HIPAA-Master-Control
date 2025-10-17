/**
 * HIPAA Compliance Management
 * Handles compliance tracking, assessments, and reporting
 */

import { HIPAAControl } from './controls';

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
}

export class ComplianceManager {
  private assessments: ComplianceAssessment[] = [];
  private auditLogs: AuditLog[] = [];

  /**
   * Create a new compliance assessment
   */
  createAssessment(assessment: Omit<ComplianceAssessment, 'id'>): ComplianceAssessment {
    const newAssessment: ComplianceAssessment = {
      ...assessment,
      id: this.generateId(),
    };

    this.assessments.push(newAssessment);
    this.logAuditEvent({
      userId: assessment.assessor,
      action: 'CREATE_ASSESSMENT',
      resource: `control:${assessment.controlId}`,
      details: { assessmentId: newAssessment.id },
      ipAddress: '127.0.0.1', // TODO: Get from request context
      userAgent: 'System', // TODO: Get from request context
    });

    return newAssessment;
  }

  /**
   * Update an existing assessment
   */
  updateAssessment(id: string, updates: Partial<ComplianceAssessment>): ComplianceAssessment | null {
    const index = this.assessments.findIndex(a => a.id === id);
    if (index === -1) return null;

    const oldAssessment = { ...this.assessments[index] };
    this.assessments[index] = { ...this.assessments[index], ...updates };

    this.logAuditEvent({
      userId: updates.assessor || oldAssessment.assessor,
      action: 'UPDATE_ASSESSMENT',
      resource: `assessment:${id}`,
      details: { 
        oldValues: oldAssessment,
        newValues: updates,
      },
      ipAddress: '127.0.0.1', // TODO: Get from request context
      userAgent: 'System', // TODO: Get from request context
    });

    return this.assessments[index];
  }

  /**
   * Get assessments for a specific control
   */
  getAssessmentsForControl(controlId: string): ComplianceAssessment[] {
    return this.assessments.filter(a => a.controlId === controlId);
  }

  /**
   * Get the latest assessment for a control
   */
  getLatestAssessment(controlId: string): ComplianceAssessment | null {
    const assessments = this.getAssessmentsForControl(controlId);
    if (assessments.length === 0) return null;

    return assessments.sort((a, b) => 
      new Date(b.assessmentDate).getTime() - new Date(a.assessmentDate).getTime()
    )[0];
  }

  /**
   * Generate a compliance report
   */
  generateComplianceReport(
    title: string,
    generatedBy: string,
    period: { start: Date; end: Date },
    controls: HIPAAControl[]
  ): ComplianceReport {
    const assessmentsInPeriod = this.assessments.filter(a => 
      a.assessmentDate >= period.start && a.assessmentDate <= period.end
    );

    const controlIds = controls.map(c => c.id);
    const relevantAssessments = assessmentsInPeriod.filter(a => 
      controlIds.includes(a.controlId)
    );

    const summary = {
      totalControls: controls.length,
      compliantControls: relevantAssessments.filter(a => a.status === 'Compliant').length,
      nonCompliantControls: relevantAssessments.filter(a => a.status === 'Non-Compliant').length,
      inProgressControls: relevantAssessments.filter(a => a.status === 'In Progress').length,
      notAssessedControls: controls.length - relevantAssessments.length,
      compliancePercentage: 0,
    };

    summary.compliancePercentage = summary.totalControls > 0 
      ? Math.round((summary.compliantControls / summary.totalControls) * 100)
      : 0;

    const riskAssessment = {
      criticalRisks: relevantAssessments.filter(a => a.riskLevel === 'Critical').length,
      highRisks: relevantAssessments.filter(a => a.riskLevel === 'High').length,
      mediumRisks: relevantAssessments.filter(a => a.riskLevel === 'Medium').length,
      lowRisks: relevantAssessments.filter(a => a.riskLevel === 'Low').length,
    };

    const recommendations = this.generateRecommendations(relevantAssessments);

    return {
      id: this.generateId(),
      title,
      generatedDate: new Date(),
      generatedBy,
      period,
      summary,
      controls: relevantAssessments,
      recommendations,
      riskAssessment,
    };
  }

  /**
   * Log an audit event
   */
  logAuditEvent(event: Omit<AuditLog, 'id' | 'timestamp'>): void {
    const auditLog: AuditLog = {
      ...event,
      id: this.generateId(),
      timestamp: new Date(),
    };

    this.auditLogs.push(auditLog);
  }

  /**
   * Get audit logs with optional filtering
   */
  getAuditLogs(filters?: {
    userId?: string;
    action?: string;
    resource?: string;
    startDate?: Date;
    endDate?: Date;
  }): AuditLog[] {
    let logs = [...this.auditLogs];

    if (filters) {
      if (filters.userId) {
        logs = logs.filter(log => log.userId === filters.userId);
      }
      if (filters.action) {
        logs = logs.filter(log => log.action === filters.action);
      }
      if (filters.resource) {
        logs = logs.filter(log => log.resource.includes(filters.resource!));
      }
      if (filters.startDate) {
        logs = logs.filter(log => log.timestamp >= filters.startDate!);
      }
      if (filters.endDate) {
        logs = logs.filter(log => log.timestamp <= filters.endDate!);
      }
    }

    return logs.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private generateRecommendations(assessments: ComplianceAssessment[]): string[] {
    const recommendations: string[] = [];
    
    const nonCompliant = assessments.filter(a => a.status === 'Non-Compliant');
    const highRisk = assessments.filter(a => a.riskLevel === 'High' || a.riskLevel === 'Critical');
    
    if (nonCompliant.length > 0) {
      recommendations.push(`Address ${nonCompliant.length} non-compliant controls immediately`);
    }
    
    if (highRisk.length > 0) {
      recommendations.push(`Prioritize remediation of ${highRisk.length} high-risk controls`);
    }
    
    const overdue = assessments.filter(a => 
      a.nextAssessmentDate < new Date() && a.status !== 'Compliant'
    );
    
    if (overdue.length > 0) {
      recommendations.push(`Schedule reassessment for ${overdue.length} overdue controls`);
    }
    
    return recommendations;
  }
}
