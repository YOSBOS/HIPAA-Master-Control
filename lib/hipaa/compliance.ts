/**
 * HIPAA Compliance Management
 * Handles compliance tracking, assessments, and reporting
 */

import { HIPAAControl } from './controls';
import { 
  ComplianceMaturityLevel, 
  EvidenceScore, 
  MasterControlScore, 
  OverallComplianceScore 
} from './scoring';

// ============================================================================
// COMPLIANCE INTERFACES
// ============================================================================

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
  private masterControlScores: MasterControlScore[] = [];
  private overallScore: OverallComplianceScore | null = null;

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

    const recommendations: string[] = [];
    
    const nonCompliant = relevantAssessments.filter(a => a.status === 'Non-Compliant');
    const highRisk = relevantAssessments.filter(a => a.riskLevel === 'High' || a.riskLevel === 'Critical');
    
    if (nonCompliant.length > 0) {
      recommendations.push(`Address ${nonCompliant.length} non-compliant controls immediately`);
    }
    
    if (highRisk.length > 0) {
      recommendations.push(`Prioritize remediation of ${highRisk.length} high-risk controls`);
    }
    
    const overdue = relevantAssessments.filter(a => 
      a.nextAssessmentDate < new Date() && a.status !== 'Compliant'
    );
    
    if (overdue.length > 0) {
      recommendations.push(`Schedule reassessment for ${overdue.length} overdue controls`);
    }

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


  /**
   * Calculate compliance maturity score for a master control
   */
  calculateMasterControlMaturityScore(
    controlId: string,
    controlName: string,
    evidenceItems: Array<{
      id: string;
      type: string;
      status: string;
      lastUpdated: Date;
    }>
  ): MasterControlScore {
    const score = this.calculateMasterControlScore(controlId, controlName, evidenceItems);
    
    // Update cached score
    const existingIndex = this.masterControlScores.findIndex(s => s.controlId === controlId);
    if (existingIndex >= 0) {
      this.masterControlScores[existingIndex] = score;
    } else {
      this.masterControlScores.push(score);
    }
    
    // Invalidate overall score cache
    this.overallScore = null;
    
    this.logAuditEvent({
      userId: 'system',
      action: 'CALCULATE_MASTER_CONTROL_SCORE',
      resource: `control:${controlId}`,
      details: { 
        controlId,
        percentageScore: score.percentageScore,
        maturityLevel: score.maturityLevel,
      },
      ipAddress: '127.0.0.1',
      userAgent: 'System',
    });
    
    return score;
  }

  /**
   * Calculate overall compliance maturity score
   */
  calculateOverallMaturityScore(): OverallComplianceScore {
    if (this.overallScore && this.isOverallScoreCurrent()) {
      return this.overallScore;
    }
    
    this.overallScore = this.calculateOverallComplianceScore();
    
    this.logAuditEvent({
      userId: 'system',
      action: 'CALCULATE_OVERALL_SCORE',
      resource: 'compliance:overall',
      details: { 
        percentageScore: this.overallScore.percentageScore,
        maturityLevel: this.overallScore.maturityLevel,
        totalControls: this.masterControlScores.length,
      },
      ipAddress: '127.0.0.1',
      userAgent: 'System',
    });
    
    return this.overallScore;
  }

  /**
   * Get master control scores
   */
  getMasterControlScores(): MasterControlScore[] {
    return [...this.masterControlScores];
  }

  /**
   * Get overall compliance score
   */
  getOverallComplianceScore(): OverallComplianceScore | null {
    return this.overallScore;
  }


  /**
   * Get maturity level color for UI
   */
  getMaturityLevelColor(level: ComplianceMaturityLevel): string {
    const colors = {
      Poor: '#dc2626',        // Red
      Moderate: '#ea580c',     // Orange
      Good: '#ca8a04',        // Yellow
      Great: '#16a34a',       // Green
      Excellent: '#059669',   // Emerald
    };
    return colors[level];
  }

  /**
   * Get maturity level icon for UI
   */
  getMaturityLevelIcon(level: ComplianceMaturityLevel): string {
    const icons = {
      Poor: '⚠️',
      Moderate: '🔄',
      Good: '✅',
      Great: '🌟',
      Excellent: '🏆',
    };
    return icons[level];
  }

  /**
   * Get maturity level description
   */
  getMaturityLevelDescription(level: ComplianceMaturityLevel): string {
    const descriptions = {
      Poor: 'Significant compliance gaps exist. Immediate action required to establish basic controls and procedures.',
      Moderate: 'Some controls are in place but inconsistent. Focus on systematic implementation and regular maintenance.',
      Good: 'Most controls are working well with minor gaps. Focus on optimization and consistency.',
      Great: 'Strong compliance program with well-managed controls. Focus on continuous improvement.',
      Excellent: 'Exemplary compliance program that serves as a model for others. Focus on maintaining excellence.',
    };
    return descriptions[level];
  }

  /**
   * Check if overall score is current (within last 24 hours)
   */
  private isOverallScoreCurrent(): boolean {
    if (!this.overallScore) return false;
    
    const now = new Date();
    const scoreAge = now.getTime() - this.overallScore.calculatedAt.getTime();
    const hoursSinceCalculation = scoreAge / (1000 * 60 * 60);
    
    return hoursSinceCalculation < 24;
  }

  /**
   * Force recalculation of all scores
   */
  recalculateAllScores(): void {
    this.overallScore = null;
    this.masterControlScores = [];
    
    this.logAuditEvent({
      userId: 'system',
      action: 'RECALCULATE_ALL_SCORES',
      resource: 'compliance:all',
      details: {},
      ipAddress: '127.0.0.1',
      userAgent: 'System',
    });
  }

  /**
   * Calculate master control score (internal method)
   */
  private calculateMasterControlScore(
    controlId: string,
    controlName: string,
    evidenceItems: Array<{
      id: string;
      type: string;
      status: string;
      lastUpdated: Date;
    }>
  ): MasterControlScore {
    // Simplified scoring calculation
    const evidenceScores: EvidenceScore[] = evidenceItems.map(item => {
      const now = new Date();
      const daysSinceUpdate = Math.floor((now.getTime() - item.lastUpdated.getTime()) / (1000 * 60 * 60 * 24));
      const isCurrent = daysSinceUpdate <= 90;
      
      // Simple scoring logic
      let baseScore = 100;
      if (!isCurrent) baseScore *= 0.5;
      if (daysSinceUpdate > 365) baseScore *= 0.3;
      else if (daysSinceUpdate > 180) baseScore *= 0.6;
      else if (daysSinceUpdate > 90) baseScore *= 0.8;
      
      const typeWeight = this.getEvidenceTypeWeight(item.type);
      const statusWeight = this.getEvidenceStatusWeight(item.status);
      const finalScore = Math.round(baseScore * typeWeight * statusWeight);
      
      return {
        evidenceId: item.id,
        type: item.type,
        status: item.status,
        baseScore,
        typeWeight,
        statusWeight,
        finalScore,
        isCurrent,
        daysSinceUpdate,
      };
    });
    
    const totalPossibleScore = evidenceItems.length * 100;
    const actualScore = evidenceScores.reduce((sum, score) => sum + score.finalScore, 0);
    const percentageScore = totalPossibleScore > 0 ? Math.round((actualScore / totalPossibleScore) * 100) : 0;
    const maturityLevel = this.determineMaturityLevel(percentageScore);
    
    return {
      controlId,
      controlName,
      totalPossibleScore,
      actualScore,
      percentageScore,
      maturityLevel,
      evidenceScores,
      strengths: this.generateStrengths(evidenceScores, controlName),
      weaknesses: this.generateWeaknesses(evidenceScores, controlName),
      recommendations: this.generateRecommendations(evidenceScores, controlName, maturityLevel),
      lastUpdated: new Date(),
    };
  }

  /**
   * Calculate overall compliance score (internal method)
   */
  private calculateOverallComplianceScore(): OverallComplianceScore {
    const totalScore = this.masterControlScores.reduce((sum, score) => sum + score.actualScore, 0);
    const maxPossibleScore = this.masterControlScores.reduce((sum, score) => sum + score.totalPossibleScore, 0);
    const percentageScore = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;
    const maturityLevel = this.determineMaturityLevel(percentageScore);
    
    return {
      totalScore: Math.round(totalScore),
      maxPossibleScore: Math.round(maxPossibleScore),
      percentageScore,
      maturityLevel,
      masterControlScores: this.masterControlScores,
      overallStrengths: this.aggregateStrengths(this.masterControlScores),
      overallWeaknesses: this.aggregateWeaknesses(this.masterControlScores),
      priorityActions: this.generatePriorityActions(this.masterControlScores, maturityLevel),
      calculatedAt: new Date(),
    };
  }

  private getEvidenceTypeWeight(type: string): number {
    const weights: Record<string, number> = {
      document: 1.0,
      confirmation: 0.8,
      record: 0.7,
      assignment: 0.6,
      checklist: 0.9,
      testimony: 0.5,
    };
    return weights[type] || 0.5;
  }

  private getEvidenceStatusWeight(status: string): number {
    const weights: Record<string, number> = {
      uploaded: 0.6,
      confirmed: 0.8,
      recorded: 0.7,
      assigned: 0.5,
      pending: 0.2,
      expired: 0.1,
    };
    return weights[status] || 0.3;
  }

  private determineMaturityLevel(percentageScore: number): ComplianceMaturityLevel {
    // Correct maturity level ranges
    if (percentageScore >= 81) return 'Excellent';    // 81-100%
    if (percentageScore >= 61) return 'Great';        // 61-80%
    if (percentageScore >= 41) return 'Good';          // 41-60%
    if (percentageScore >= 21) return 'Moderate';      // 21-40%
    return 'Poor';                                     // 0-20%
  }

  private generateStrengths(evidenceScores: EvidenceScore[], controlName: string): string[] {
    const strengths: string[] = [];
    const highScoringEvidence = evidenceScores.filter(score => score.finalScore >= 80);
    if (highScoringEvidence.length > 0) {
      strengths.push(`${highScoringEvidence.length} evidence items are well-maintained and current`);
    }
    return strengths;
  }

  private generateWeaknesses(evidenceScores: EvidenceScore[], controlName: string): string[] {
    const weaknesses: string[] = [];
    const expiredEvidence = evidenceScores.filter(score => !score.isCurrent);
    if (expiredEvidence.length > 0) {
      weaknesses.push(`${expiredEvidence.length} evidence items are outdated and need updating`);
    }
    return weaknesses;
  }

  private generateRecommendations(evidenceScores: EvidenceScore[], controlName: string, maturityLevel: ComplianceMaturityLevel): string[] {
    const recommendations: string[] = [];
    if (maturityLevel === 'Poor') {
      recommendations.push('Focus on establishing basic controls and procedures');
    } else if (maturityLevel === 'Moderate') {
      recommendations.push('Update outdated evidence items to improve scores');
    }
    return recommendations;
  }

  private aggregateStrengths(masterControlScores: MasterControlScore[]): string[] {
    const strengths: string[] = [];
    const excellentControls = masterControlScores.filter(score => score.maturityLevel === 'Excellent');
    if (excellentControls.length > 0) {
      strengths.push(`${excellentControls.length} master controls are performing at an excellent level`);
    }
    return strengths;
  }

  private aggregateWeaknesses(masterControlScores: MasterControlScore[]): string[] {
    const weaknesses: string[] = [];
    const poorControls = masterControlScores.filter(score => score.maturityLevel === 'Poor');
    if (poorControls.length > 0) {
      weaknesses.push(`${poorControls.length} master controls need immediate attention`);
    }
    return weaknesses;
  }

  private generatePriorityActions(masterControlScores: MasterControlScore[], maturityLevel: ComplianceMaturityLevel): string[] {
    const actions: string[] = [];
    const sortedControls = masterControlScores.sort((a, b) => a.percentageScore - b.percentageScore);
    const lowestScoring = sortedControls.slice(0, 3);
    
    lowestScoring.forEach(control => {
      if (control.percentageScore < 40) {
        actions.push(`Immediate action needed: ${control.controlName} (${control.percentageScore}%)`);
      }
    });
    
    return actions;
  }
}
