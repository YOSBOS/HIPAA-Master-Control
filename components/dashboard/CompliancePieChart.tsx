'use client';

import React from 'react';
import { 
  OverallComplianceScore, 
  MasterControlScore, 
  ComplianceMaturityLevel,
  getMaturityLevelDescription,
  getMaturityLevelColor,
  getMaturityLevelIcon
} from '../../lib/hipaa';

interface CompliancePieChartProps {
  overallScore: OverallComplianceScore;
  masterControlScores: MasterControlScore[];
  className?: string;
}

export const CompliancePieChart: React.FC<CompliancePieChartProps> = ({
  overallScore,
  masterControlScores,
  className = ''
}) => {
  // Calculate pie chart data based on maturity levels
  const maturityLevelCounts = masterControlScores.reduce((acc, score) => {
    acc[score.maturityLevel] = (acc[score.maturityLevel] || 0) + 1;
    return acc;
  }, {} as Record<ComplianceMaturityLevel, number>);

  const totalControls = masterControlScores.length;
  
  // Create pie chart segments - always include all levels for proper visualization
  const segments = [
    { level: 'Excellent' as ComplianceMaturityLevel, count: maturityLevelCounts['Excellent'] || 0, color: '#059669' },
    { level: 'Great' as ComplianceMaturityLevel, count: maturityLevelCounts['Great'] || 0, color: '#16a34a' },
    { level: 'Good' as ComplianceMaturityLevel, count: maturityLevelCounts['Good'] || 0, color: '#ca8a04' },
    { level: 'Moderate' as ComplianceMaturityLevel, count: maturityLevelCounts['Moderate'] || 0, color: '#ea580c' },
    { level: 'Poor' as ComplianceMaturityLevel, count: maturityLevelCounts['Poor'] || 0, color: '#dc2626' },
  ];

  // Calculate angles for pie chart
  let cumulativeAngle = 0;
  const segmentsWithAngles = segments.map(segment => {
    const angle = totalControls > 0 ? (segment.count / totalControls) * 360 : 0;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle += angle;
    
    return {
      ...segment,
      angle,
      startAngle,
      endAngle,
      percentage: totalControls > 0 ? Math.round((segment.count / totalControls) * 100) : 0
    };
  });

  // Generate SVG path for pie chart
  const generatePath = (startAngle: number, endAngle: number, radius: number = 120) => {
    const centerX = 150;
    const centerY = 150;
    
    // Handle edge case where start and end angles are the same
    if (startAngle === endAngle) return "";
    
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", centerX, centerY,
      "L", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      "Z"
    ].join(" ");
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div className={`compliance-pie-chart ${className}`}>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <span className="text-4xl">
            {getMaturityLevelIcon(overallScore.maturityLevel)}
          </span>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Compliance Maturity Score
            </h2>
            <p className="text-base text-gray-600 mt-1">
              {getMaturityLevelDescription(overallScore.maturityLevel)}
            </p>
          </div>
        </div>

        {/* Circular Progress Pie Chart */}
        <div className="flex justify-center">
          <div className="relative">
            <svg width="300" height="300" viewBox="0 0 300 300" className="transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="150"
                cy="150"
                r="120"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="20"
              />
              {/* Progress circle */}
              <circle
                cx="150"
                cy="150"
                r="120"
                fill="none"
                stroke={getMaturityLevelColor(overallScore.maturityLevel)}
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 120}`}
                strokeDashoffset={`${2 * Math.PI * 120 * (1 - overallScore.percentageScore / 100)}`}
                className="transition-all duration-1000 ease-out"
              />
              {/* Center content */}
              <text
                x="150"
                y="140"
                textAnchor="middle"
                className="fill-blue-600 text-4xl font-bold"
                transform="rotate(90 150 150)"
              >
                {overallScore.percentageScore}%
              </text>
              <text
                x="150"
                y="170"
                textAnchor="middle"
                className="fill-gray-600 text-lg font-medium"
                transform="rotate(90 150 150)"
              >
                {overallScore.maturityLevel}
              </text>
            </svg>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {totalControls}
            </div>
            <div className="text-base font-medium text-gray-600">Total Controls</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {segments.filter(s => s.level === 'Excellent' || s.level === 'Great').reduce((sum, s) => sum + s.count, 0)}
            </div>
            <div className="text-base font-medium text-green-700">High Performing</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {segments.filter(s => s.level === 'Poor' || s.level === 'Moderate').reduce((sum, s) => sum + s.count, 0)}
            </div>
            <div className="text-base font-medium text-orange-700">Need Attention</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompliancePieChart;
