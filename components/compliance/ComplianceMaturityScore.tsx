/**
 * Compliance Maturity Score Component
 * 
 * Displays the overall compliance maturity score and individual master control scores
 * with business-friendly language and visual indicators.
 */

import React from 'react';
import { 
  OverallComplianceScore, 
  MasterControlScore, 
  ComplianceMaturityLevel,
  getMaturityLevelDescription,
  getMaturityLevelColor,
  getMaturityLevelIcon
} from '../../lib/hipaa';

interface ComplianceMaturityScoreProps {
  overallScore: OverallComplianceScore;
  masterControlScores: MasterControlScore[];
  showDetails?: boolean;
  className?: string;
}

export const ComplianceMaturityScore: React.FC<ComplianceMaturityScoreProps> = ({
  overallScore,
  masterControlScores,
  showDetails = true,
  className = ''
}) => {
  const getScoreColor = (percentage: number): string => {
    if (percentage >= 81) return 'text-emerald-600';
    if (percentage >= 61) return 'text-green-600';
    if (percentage >= 41) return 'text-yellow-600';
    if (percentage >= 21) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (percentage: number): string => {
    if (percentage >= 81) return 'bg-emerald-50 border-emerald-200';
    if (percentage >= 61) return 'bg-green-50 border-green-200';
    if (percentage >= 41) return 'bg-yellow-50 border-yellow-200';
    if (percentage >= 21) return 'bg-orange-50 border-orange-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className={`compliance-maturity-score ${className}`}>
      {/* Overall Score Card */}
      <div className={`rounded-lg border-2 p-6 mb-6 ${getScoreBgColor(overallScore.percentageScore)}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">
              {getMaturityLevelIcon(overallScore.maturityLevel)}
            </span>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Overall Compliance Score
              </h2>
              <p className="text-sm text-gray-600">
                {getMaturityLevelDescription(overallScore.maturityLevel)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-bold ${getScoreColor(overallScore.percentageScore)}`}>
              {overallScore.percentageScore}%
            </div>
            <div className="text-sm font-medium text-gray-600">
              {overallScore.maturityLevel}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="h-3 rounded-full transition-all duration-500"
            style={{ 
              width: `${overallScore.percentageScore}%`,
              backgroundColor: getMaturityLevelColor(overallScore.maturityLevel)
            }}
          />
        </div>

        {/* Score Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Total Score:</span>
            <span className="font-medium ml-2">{overallScore.totalScore.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-gray-600">Max Possible:</span>
            <span className="font-medium ml-2">{overallScore.maxPossibleScore.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Master Control Scores */}
      {showDetails && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Master Control Scores
          </h3>
          
          <div className="grid gap-4">
            {masterControlScores.map((score) => (
              <div 
                key={score.controlId}
                className={`rounded-lg border p-4 ${getScoreBgColor(score.percentageScore)}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">
                      {getMaturityLevelIcon(score.maturityLevel)}
                    </span>
                    <h4 className="font-medium text-gray-900">
                      {score.controlName}
                    </h4>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-bold ${getScoreColor(score.percentageScore)}`}>
                      {score.percentageScore}%
                    </div>
                    <div className="text-xs text-gray-600">
                      {score.maturityLevel}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${score.percentageScore}%`,
                      backgroundColor: getMaturityLevelColor(score.maturityLevel)
                    }}
                  />
                </div>

                {/* Score Details */}
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div>
                    Score: {score.actualScore} / {score.totalPossibleScore}
                  </div>
                  <div>
                    Evidence: {score.evidenceScores.length} items
                  </div>
                </div>

                {/* Strengths and Weaknesses */}
                {(score.strengths.length > 0 || score.weaknesses.length > 0) && (
                  <div className="mt-3 space-y-2">
                    {score.strengths.length > 0 && (
                      <div>
                        <span className="text-xs font-medium text-green-700">Strengths:</span>
                        <ul className="text-xs text-green-600 ml-2">
                          {score.strengths.map((strength, index) => (
                            <li key={index}>• {strength}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {score.weaknesses.length > 0 && (
                      <div>
                        <span className="text-xs font-medium text-red-700">Areas for Improvement:</span>
                        <ul className="text-xs text-red-600 ml-2">
                          {score.weaknesses.map((weakness, index) => (
                            <li key={index}>• {weakness}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Priority Actions */}
      {overallScore.priorityActions.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">Priority Actions</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            {overallScore.priorityActions.map((action, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Overall Insights */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {overallScore.overallStrengths.length > 0 && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-medium text-green-900 mb-2">Strengths</h3>
            <ul className="text-sm text-green-800 space-y-1">
              {overallScore.overallStrengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {overallScore.overallWeaknesses.length > 0 && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="font-medium text-red-900 mb-2">Areas for Improvement</h3>
            <ul className="text-sm text-red-800 space-y-1">
              {overallScore.overallWeaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-600 mr-2">⚠</span>
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplianceMaturityScore;
