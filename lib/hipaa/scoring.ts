/**
 * HIPAA Compliance Maturity Scoring System
 * 
 * Provides a comprehensive scoring framework that calculates compliance maturity
 * across all HIPAA standards within each Master Control, resulting in an overall
 * compliance score with 5 maturity levels.
 */

// ============================================================================
// COMPLIANCE MATURITY LEVELS
// ============================================================================

/**
 * Compliance Maturity Levels - Business-friendly maturity indicators
 * 
 * Business Purpose: Shows users their compliance maturity in clear terms
 * 
 * User Experience: Clear progression from basic compliance to excellence
 */
export type ComplianceMaturityLevel = 
  | 'Poor'        // 0-20% - Basic compliance issues, significant gaps
  | 'Moderate'    // 21-40% - Some controls in place, but inconsistent
  | 'Good'        // 41-60% - Most controls working, minor gaps
  | 'Great'       // 61-80% - Strong compliance program, well-managed
  | 'Excellent';  // 81-100% - Exemplary compliance, industry leading

/**
 * Compliance Maturity Scoring Constants
 */
export const MATURITY_SCORING = {
  POOR: { min: 0, max: 20, label: 'Poor' as const },        // 0-20%
  MODERATE: { min: 21, max: 40, label: 'Moderate' as const }, // 21-40%
  GOOD: { min: 41, max: 60, label: 'Good' as const },        // 41-60%
  GREAT: { min: 61, max: 80, label: 'Great' as const },       // 61-80%
  EXCELLENT: { min: 81, max: 100, label: 'Excellent' as const }, // 81-100%
} as const;

// ============================================================================
// SCORING WEIGHTS AND FACTORS
// ============================================================================

/**
 * Evidence Type Weights - How much each evidence type contributes to compliance
 * 
 * Business Purpose: Reflects the relative importance of different evidence types
 * 
 * User Experience: Ensures scoring reflects real business value
 */
export const EVIDENCE_TYPE_WEIGHTS = {
  document: 1.0,      // Full weight - concrete evidence
  confirmation: 0.8,   // High weight - verified process
  record: 0.7,        // Good weight - documented activity
  assignment: 0.6,     // Medium weight - responsibility assigned
  checklist: 0.9,      // High weight - comprehensive verification
  testimony: 0.5,      // Lower weight - subjective evidence
} as const;

/**
 * Evidence Status Weights - How much each status contributes to compliance
 * 
 * Business Purpose: Reflects the quality and currency of evidence
 * 
 * User Experience: Encourages users to maintain current, reviewed evidence
 */
export const EVIDENCE_STATUS_WEIGHTS = {
  uploaded: 0.6,      // Basic evidence provided
  confirmed: 0.8,      // Evidence verified and confirmed
  recorded: 0.7,       // Activity documented
  assigned: 0.5,       // Responsibility assigned
  pending: 0.2,        // Waiting for action
  expired: 0.1,       // Outdated evidence
} as const;

/**
 * Master Control Priority Weights - How much each control contributes to overall score
 * 
 * Business Purpose: Reflects the relative importance of different business processes
 * 
 * User Experience: Ensures critical controls have appropriate impact on overall score
 */
export const MASTER_CONTROL_WEIGHTS = {
  'workforce-training': 1.0,           // Critical - foundation of compliance
  'access-control': 1.0,              // Critical - core security function
  'vendor-management': 0.9,            // High - third-party risk management
  'incident-response': 0.9,            // High - breach prevention and response
  'physical-security': 0.8,            // Important - facility protection
  'technical-safeguards': 1.0,         // Critical - system security
  'audit-monitoring': 0.8,             // Important - ongoing compliance
  'security-risk-management': 1.0,      // Critical - risk-based approach
} as const;

// ============================================================================
// SCORING INTERFACES
// ============================================================================

/**
 * Evidence Score - Individual evidence item scoring
 */
export interface EvidenceScore {
  evidenceId: string;
  type: string;
  status: string;
  baseScore: number;
  typeWeight: number;
  statusWeight: number;
  finalScore: number;
  isCurrent: boolean;
  daysSinceUpdate: number;
}

/**
 * Master Control Score - Overall score for a single master control
 */
export interface MasterControlScore {
  controlId: string;
  controlName: string;
  totalPossibleScore: number;
  actualScore: number;
  percentageScore: number;
  maturityLevel: ComplianceMaturityLevel;
  evidenceScores: EvidenceScore[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  lastUpdated: Date;
}

/**
 * Overall Compliance Score - Organization-wide compliance maturity
 */
export interface OverallComplianceScore {
  totalScore: number;
  maxPossibleScore: number;
  percentageScore: number;
  maturityLevel: ComplianceMaturityLevel;
  masterControlScores: MasterControlScore[];
  overallStrengths: string[];
  overallWeaknesses: string[];
  priorityActions: string[];
  calculatedAt: Date;
}

// ============================================================================
// SCORING CALCULATION FUNCTIONS
// ============================================================================

/**
 * Calculate evidence item score
 */
export function calculateEvidenceScore(
  evidenceType: string,
  evidenceStatus: string,
  isCurrent: boolean = true,
  daysSinceUpdate: number = 0
): EvidenceScore {
  const typeWeight = EVIDENCE_TYPE_WEIGHTS[evidenceType as keyof typeof EVIDENCE_TYPE_WEIGHTS] || 0.5;
  const statusWeight = EVIDENCE_STATUS_WEIGHTS[evidenceStatus as keyof typeof EVIDENCE_STATUS_WEIGHTS] || 0.3;
  
  // Base score starts at 100
  let baseScore = 100;
  
  // Reduce score for outdated evidence
  if (!isCurrent) {
    baseScore *= 0.5;
  }
  
  // Reduce score based on how long since update
  if (daysSinceUpdate > 365) {
    baseScore *= 0.3;
  } else if (daysSinceUpdate > 180) {
    baseScore *= 0.6;
  } else if (daysSinceUpdate > 90) {
    baseScore *= 0.8;
  }
  
  const finalScore = baseScore * typeWeight * statusWeight;
  
  return {
    evidenceId: '',
    type: evidenceType,
    status: evidenceStatus,
    baseScore,
    typeWeight,
    statusWeight,
    finalScore: Math.round(finalScore),
    isCurrent,
    daysSinceUpdate,
  };
}

/**
 * Calculate master control score
 */
export function calculateMasterControlScore(
  controlId: string,
  controlName: string,
  evidenceItems: Array<{
    id: string;
    type: string;
    status: string;
    lastUpdated: Date;
  }>
): MasterControlScore {
  const controlWeight = MASTER_CONTROL_WEIGHTS[controlId as keyof typeof MASTER_CONTROL_WEIGHTS] || 0.5;
  
  // Calculate individual evidence scores
  const evidenceScores: EvidenceScore[] = evidenceItems.map(item => {
    const now = new Date();
    const daysSinceUpdate = Math.floor((now.getTime() - item.lastUpdated.getTime()) / (1000 * 60 * 60 * 24));
    const isCurrent = daysSinceUpdate <= 90; // Consider current if updated within 90 days
    
    const score = calculateEvidenceScore(item.type, item.status, isCurrent, daysSinceUpdate);
    return {
      ...score,
      evidenceId: item.id,
    };
  });
  
  // Calculate total scores
  const totalPossibleScore = evidenceItems.length * 100 * controlWeight;
  const actualScore = evidenceScores.reduce((sum, score) => sum + score.finalScore, 0) * controlWeight;
  const percentageScore = totalPossibleScore > 0 ? Math.round((actualScore / totalPossibleScore) * 100) : 0;
  
  // Determine maturity level
  const maturityLevel = determineMaturityLevel(percentageScore);
  
  // Generate insights
  const strengths = generateStrengths(evidenceScores, controlName);
  const weaknesses = generateWeaknesses(evidenceScores, controlName);
  const recommendations = generateRecommendations(evidenceScores, controlName, maturityLevel);
  
  return {
    controlId,
    controlName,
    totalPossibleScore: Math.round(totalPossibleScore),
    actualScore: Math.round(actualScore),
    percentageScore,
    maturityLevel,
    evidenceScores,
    strengths,
    weaknesses,
    recommendations,
    lastUpdated: new Date(),
  };
}

/**
 * Calculate overall compliance score
 */
export function calculateOverallComplianceScore(
  masterControlScores: MasterControlScore[]
): OverallComplianceScore {
  const totalScore = masterControlScores.reduce((sum, score) => sum + score.actualScore, 0);
  const maxPossibleScore = masterControlScores.reduce((sum, score) => sum + score.totalPossibleScore, 0);
  const percentageScore = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;
  
  const maturityLevel = determineMaturityLevel(percentageScore);
  
  // Aggregate insights
  const overallStrengths = aggregateStrengths(masterControlScores);
  const overallWeaknesses = aggregateWeaknesses(masterControlScores);
  const priorityActions = generatePriorityActions(masterControlScores, maturityLevel);
  
  return {
    totalScore: Math.round(totalScore),
    maxPossibleScore: Math.round(maxPossibleScore),
    percentageScore,
    maturityLevel,
    masterControlScores,
    overallStrengths,
    overallWeaknesses,
    priorityActions,
    calculatedAt: new Date(),
  };
}

/**
 * Determine maturity level based on percentage score
 */
export function determineMaturityLevel(percentageScore: number): ComplianceMaturityLevel {
  // Correct maturity level ranges
  if (percentageScore >= 81) return 'Excellent';    // 81-100%
  if (percentageScore >= 61) return 'Great';        // 61-80%
  if (percentageScore >= 41) return 'Good';          // 41-60%
  if (percentageScore >= 21) return 'Moderate';      // 21-40%
  return 'Poor';                                     // 0-20%
}

// ============================================================================
// INSIGHT GENERATION FUNCTIONS
// ============================================================================

/**
 * Generate strengths for a master control
 */
function generateStrengths(evidenceScores: EvidenceScore[], controlName: string): string[] {
  const strengths: string[] = [];
  
  const highScoringEvidence = evidenceScores.filter(score => score.finalScore >= 80);
  if (highScoringEvidence.length > 0) {
    strengths.push(`${highScoringEvidence.length} evidence items are well-maintained and current`);
  }
  
  const currentEvidence = evidenceScores.filter(score => score.isCurrent);
  if (currentEvidence.length === evidenceScores.length && evidenceScores.length > 0) {
    strengths.push('All evidence is current and up-to-date');
  }
  
  const confirmedEvidence = evidenceScores.filter(score => score.status === 'confirmed');
  if (confirmedEvidence.length > 0) {
    strengths.push(`${confirmedEvidence.length} procedures have been verified and confirmed`);
  }
  
  return strengths;
}

/**
 * Generate weaknesses for a master control
 */
function generateWeaknesses(evidenceScores: EvidenceScore[], controlName: string): string[] {
  const weaknesses: string[] = [];
  
  const expiredEvidence = evidenceScores.filter(score => !score.isCurrent);
  if (expiredEvidence.length > 0) {
    weaknesses.push(`${expiredEvidence.length} evidence items are outdated and need updating`);
  }
  
  const pendingEvidence = evidenceScores.filter(score => score.status === 'pending');
  if (pendingEvidence.length > 0) {
    weaknesses.push(`${pendingEvidence.length} evidence items are pending action`);
  }
  
  const lowScoringEvidence = evidenceScores.filter(score => score.finalScore < 40);
  if (lowScoringEvidence.length > 0) {
    weaknesses.push(`${lowScoringEvidence.length} evidence items need significant improvement`);
  }
  
  return weaknesses;
}

/**
 * Generate recommendations for a master control
 */
function generateRecommendations(
  evidenceScores: EvidenceScore[], 
  controlName: string, 
  maturityLevel: ComplianceMaturityLevel
): string[] {
  const recommendations: string[] = [];
  
  if (maturityLevel === 'Poor') {
    recommendations.push('Focus on establishing basic controls and procedures');
    recommendations.push('Prioritize getting evidence items to "confirmed" status');
    recommendations.push('Consider seeking external compliance assistance');
  } else if (maturityLevel === 'Moderate') {
    recommendations.push('Update outdated evidence items to improve scores');
    recommendations.push('Focus on moving evidence from "pending" to "confirmed" status');
    recommendations.push('Establish regular review schedules for all evidence');
  } else if (maturityLevel === 'Good') {
    recommendations.push('Maintain current evidence and prevent expiration');
    recommendations.push('Consider adding additional evidence types for comprehensive coverage');
    recommendations.push('Implement automated monitoring where possible');
  } else if (maturityLevel === 'Great') {
    recommendations.push('Focus on continuous improvement and optimization');
    recommendations.push('Consider advanced monitoring and analytics');
    recommendations.push('Share best practices with other areas of the organization');
  } else if (maturityLevel === 'Excellent') {
    recommendations.push('Maintain excellence through regular reviews and updates');
    recommendations.push('Consider becoming a compliance leader in your industry');
    recommendations.push('Document and share your success strategies');
  }
  
  return recommendations;
}

/**
 * Aggregate strengths across all master controls
 */
function aggregateStrengths(masterControlScores: MasterControlScore[]): string[] {
  const strengths: string[] = [];
  
  const excellentControls = masterControlScores.filter(score => score.maturityLevel === 'Excellent');
  if (excellentControls.length > 0) {
    strengths.push(`${excellentControls.length} master controls are performing at an excellent level`);
  }
  
  const greatControls = masterControlScores.filter(score => score.maturityLevel === 'Great');
  if (greatControls.length > 0) {
    strengths.push(`${greatControls.length} master controls are performing at a great level`);
  }
  
  const totalEvidence = masterControlScores.reduce((sum, score) => sum + score.evidenceScores.length, 0);
  const currentEvidence = masterControlScores.reduce((sum, score) => 
    sum + score.evidenceScores.filter(evidence => evidence.isCurrent).length, 0
  );
  
  if (totalEvidence > 0) {
    const currentPercentage = Math.round((currentEvidence / totalEvidence) * 100);
    strengths.push(`${currentPercentage}% of evidence items are current and up-to-date`);
  }
  
  return strengths;
}

/**
 * Aggregate weaknesses across all master controls
 */
function aggregateWeaknesses(masterControlScores: MasterControlScore[]): string[] {
  const weaknesses: string[] = [];
  
  const poorControls = masterControlScores.filter(score => score.maturityLevel === 'Poor');
  if (poorControls.length > 0) {
    weaknesses.push(`${poorControls.length} master controls need immediate attention`);
  }
  
  const moderateControls = masterControlScores.filter(score => score.maturityLevel === 'Moderate');
  if (moderateControls.length > 0) {
    weaknesses.push(`${moderateControls.length} master controls need improvement`);
  }
  
  const totalEvidence = masterControlScores.reduce((sum, score) => sum + score.evidenceScores.length, 0);
  const expiredEvidence = masterControlScores.reduce((sum, score) => 
    sum + score.evidenceScores.filter(evidence => !evidence.isCurrent).length, 0
  );
  
  if (totalEvidence > 0) {
    const expiredPercentage = Math.round((expiredEvidence / totalEvidence) * 100);
    if (expiredPercentage > 0) {
      weaknesses.push(`${expiredPercentage}% of evidence items are outdated and need updating`);
    }
  }
  
  return weaknesses;
}

/**
 * Generate priority actions based on overall compliance
 */
function generatePriorityActions(
  masterControlScores: MasterControlScore[], 
  maturityLevel: ComplianceMaturityLevel
): string[] {
  const actions: string[] = [];
  
  // Always prioritize the lowest scoring controls
  const sortedControls = masterControlScores.sort((a, b) => a.percentageScore - b.percentageScore);
  const lowestScoring = sortedControls.slice(0, 3);
  
  lowestScoring.forEach(control => {
    if (control.percentageScore < 40) {
      actions.push(`Immediate action needed: ${control.controlName} (${control.percentageScore}%)`);
    } else if (control.percentageScore < 60) {
      actions.push(`Priority improvement: ${control.controlName} (${control.percentageScore}%)`);
    }
  });
  
  // Add maturity-specific actions
  if (maturityLevel === 'Poor') {
    actions.push('Establish basic compliance framework and procedures');
    actions.push('Assign dedicated compliance resources and responsibilities');
  } else if (maturityLevel === 'Moderate') {
    actions.push('Focus on evidence maintenance and regular updates');
    actions.push('Implement systematic review processes');
  } else if (maturityLevel === 'Good') {
    actions.push('Optimize existing processes and add automation where possible');
    actions.push('Develop advanced monitoring and analytics');
  } else if (maturityLevel === 'Great') {
    actions.push('Focus on continuous improvement and innovation');
    actions.push('Consider advanced compliance technologies and tools');
  } else if (maturityLevel === 'Excellent') {
    actions.push('Maintain excellence through regular reviews and updates');
    actions.push('Share best practices and mentor other organizations');
  }
  
  return actions;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get maturity level description
 */
export function getMaturityLevelDescription(level: ComplianceMaturityLevel): string {
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
 * Get maturity level color for UI
 */
export function getMaturityLevelColor(level: ComplianceMaturityLevel): string {
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
export function getMaturityLevelIcon(level: ComplianceMaturityLevel): string {
  const icons = {
    Poor: '⚠️',
    Moderate: '🔄',
    Good: '✅',
    Great: '🌟',
    Excellent: '🏆',
  };
  
  return icons[level];
}
