/**
 * Mock Data Generator for HIPAA Compliance Scoring
 * 
 * Provides realistic sample data for testing and demonstration purposes.
 */

import { 
  OverallComplianceScore, 
  MasterControlScore, 
  EvidenceScore,
  calculateOverallComplianceScore,
  calculateMasterControlScore,
  calculateEvidenceScore
} from './scoring';

// Sample evidence data for each master control - designed to show different maturity levels
const sampleEvidenceData = {
  'workforce-training': [
    { id: 'wt-1', type: 'document', status: 'confirmed', lastUpdated: new Date('2024-01-15') },
    { id: 'wt-2', type: 'checklist', status: 'confirmed', lastUpdated: new Date('2024-01-10') },
    { id: 'wt-3', type: 'record', status: 'confirmed', lastUpdated: new Date('2024-01-05') },
    { id: 'wt-4', type: 'testimony', status: 'confirmed', lastUpdated: new Date('2024-01-01') },
  ],
  'access-control': [
    { id: 'ac-1', type: 'document', status: 'confirmed', lastUpdated: new Date('2024-01-20') },
    { id: 'ac-2', type: 'record', status: 'confirmed', lastUpdated: new Date('2024-01-18') },
    { id: 'ac-3', type: 'assignment', status: 'confirmed', lastUpdated: new Date('2024-01-12') },
    { id: 'ac-4', type: 'document', status: 'confirmed', lastUpdated: new Date('2024-01-08') },
    { id: 'ac-5', type: 'record', status: 'confirmed', lastUpdated: new Date('2024-01-05') },
  ],
  'security-risk-management': [
    { id: 'srm-1', type: 'document', status: 'confirmed', lastUpdated: new Date('2024-01-25') },
    { id: 'srm-2', type: 'checklist', status: 'confirmed', lastUpdated: new Date('2024-01-22') },
    { id: 'srm-3', type: 'record', status: 'confirmed', lastUpdated: new Date('2024-01-20') },
    { id: 'srm-4', type: 'document', status: 'confirmed', lastUpdated: new Date('2024-01-18') },
    { id: 'srm-5', type: 'testimony', status: 'confirmed', lastUpdated: new Date('2024-01-15') },
  ],
  'vendor-management': [
    { id: 'vm-1', type: 'document', status: 'confirmed', lastUpdated: new Date('2024-01-10') },
    { id: 'vm-2', type: 'record', status: 'confirmed', lastUpdated: new Date('2024-01-08') },
    { id: 'vm-3', type: 'assignment', status: 'confirmed', lastUpdated: new Date('2024-01-05') },
    { id: 'vm-4', type: 'document', status: 'uploaded', lastUpdated: new Date('2023-12-15') },
  ],
  'incident-response': [
    { id: 'ir-1', type: 'document', status: 'confirmed', lastUpdated: new Date('2024-01-12') },
    { id: 'ir-2', type: 'checklist', status: 'confirmed', lastUpdated: new Date('2024-01-10') },
    { id: 'ir-3', type: 'record', status: 'uploaded', lastUpdated: new Date('2023-12-20') },
  ],
  'physical-security': [
    { id: 'ps-1', type: 'document', status: 'confirmed', lastUpdated: new Date('2024-01-15') },
    { id: 'ps-2', type: 'record', status: 'confirmed', lastUpdated: new Date('2024-01-12') },
    { id: 'ps-3', type: 'assignment', status: 'uploaded', lastUpdated: new Date('2023-12-10') },
    { id: 'ps-4', type: 'document', status: 'pending', lastUpdated: new Date('2023-10-15') },
  ],
  'technical-safeguards': [
    { id: 'ts-1', type: 'document', status: 'confirmed', lastUpdated: new Date('2024-01-18') },
    { id: 'ts-2', type: 'record', status: 'confirmed', lastUpdated: new Date('2024-01-15') },
    { id: 'ts-3', type: 'checklist', status: 'uploaded', lastUpdated: new Date('2023-12-05') },
    { id: 'ts-4', type: 'assignment', status: 'pending', lastUpdated: new Date('2023-11-20') },
  ],
  'audit-monitoring': [
    { id: 'am-1', type: 'record', status: 'confirmed', lastUpdated: new Date('2024-01-20') },
    { id: 'am-2', type: 'document', status: 'confirmed', lastUpdated: new Date('2024-01-18') },
    { id: 'am-3', type: 'record', status: 'uploaded', lastUpdated: new Date('2023-12-15') },
    { id: 'am-4', type: 'checklist', status: 'pending', lastUpdated: new Date('2023-11-01') },
  ],
};

// Master control names mapping
const masterControlNames = {
  'workforce-training': 'Workforce Training & Awareness',
  'access-control': 'Access Control & User Management',
  'security-risk-management': 'Security Risk Management',
  'vendor-management': 'Vendor Management & Business Associates',
  'incident-response': 'Incident Response & Breach Management',
  'physical-security': 'Physical Security & Facility Controls',
  'technical-safeguards': 'Technical Safeguards & System Security',
  'audit-monitoring': 'Audit & Monitoring',
};

/**
 * Generate mock master control scores
 */
export function generateMockMasterControlScores(): MasterControlScore[] {
  const masterControlScores: MasterControlScore[] = [];
  
  Object.entries(sampleEvidenceData).forEach(([controlId, evidenceItems]) => {
    const controlName = masterControlNames[controlId as keyof typeof masterControlNames];
    const score = calculateMasterControlScore(controlId, controlName, evidenceItems);
    masterControlScores.push(score);
  });
  
  return masterControlScores;
}

/**
 * Generate mock overall compliance score
 */
export function generateMockOverallComplianceScore(): OverallComplianceScore {
  const masterControlScores = generateMockMasterControlScores();
  return calculateOverallComplianceScore(masterControlScores);
}

/**
 * Get mock data for dashboard display
 */
export function getMockDashboardData() {
  const masterControlScores = generateMockMasterControlScores();
  const overallScore = calculateOverallComplianceScore(masterControlScores);
  
  return {
    overallScore,
    masterControlScores,
    // Legacy format for backward compatibility
    overallCompliance: {
      score: overallScore.percentageScore,
      status: overallScore.maturityLevel === 'Poor' || overallScore.maturityLevel === 'Moderate' ? 'needs_attention' : 'good',
      totalControls: masterControlScores.length,
      completedControls: masterControlScores.filter(s => s.maturityLevel === 'Excellent' || s.maturityLevel === 'Great').length,
      inProgressControls: masterControlScores.filter(s => s.maturityLevel === 'Good').length,
      pendingControls: masterControlScores.filter(s => s.maturityLevel === 'Poor' || s.maturityLevel === 'Moderate').length
    }
  };
}
