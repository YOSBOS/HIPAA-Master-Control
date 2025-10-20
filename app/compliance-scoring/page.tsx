/**
 * Compliance Maturity Scoring Demo Page
 * 
 * Demonstrates the 5-level compliance maturity scoring system
 * with interactive examples and business-friendly insights.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import ScoringExample from '../../components/compliance/ScoringExample';

export default function ComplianceScoringPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Compliance Maturity Scoring</h1>
                <p className="text-lg text-gray-600 mt-1">5-Level Scoring System with Business Insights</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Status</p>
                <p className="text-lg font-semibold text-green-600">✅ Complete</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="p-3 bg-green-100 rounded-lg">
                <ChartBarIcon className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Compliance Maturity Scoring System
              </h2>
              <p className="text-gray-600 mb-4">
                A comprehensive scoring framework that calculates compliance maturity across all HIPAA standards 
                within each Master Control, resulting in an overall compliance score with 5 maturity levels.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🎯 5 Maturity Levels</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                  <li>• <strong>Poor (0-20%):</strong> Basic compliance issues, significant gaps</li>
                  <li>• <strong>Moderate (21-40%):</strong> Some controls in place, but inconsistent</li>
                  <li>• <strong>Good (41-60%):</strong> Most controls working, minor gaps</li>
                  <li>• <strong>Great (61-80%):</strong> Strong compliance program, well-managed</li>
                  <li>• <strong>Excellent (81-100%):</strong> Exemplary compliance, industry leading</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">📊 Scoring Factors</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• <strong>Evidence Type:</strong> Documents (1.0), Checklists (0.9), Confirmations (0.8)</li>
                    <li>• <strong>Evidence Status:</strong> Confirmed (0.8), Recorded (0.7), Uploaded (0.6)</li>
                    <li>• <strong>Currency:</strong> Recent updates score higher than outdated evidence</li>
                    <li>• <strong>Control Priority:</strong> Critical controls weighted higher</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Interactive Scoring Examples
            </h3>
            <Link
              href="/compliance-scoring/demo"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              View Live Demo
              <ArrowLeftIcon className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </div>
          <p className="text-gray-600 mb-6">
            Click on different maturity levels below to see how the scoring system works with sample data.
            Each example shows realistic evidence scenarios and their corresponding scores.
          </p>
          
          <ScoringExample />
        </div>

        {/* Technical Details */}
        <div className="mt-8 bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            🔧 Technical Implementation
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-blue-800">
            <div>
              <h4 className="font-medium mb-2">Core Files Created:</h4>
              <ul className="space-y-1">
                <li>• <code>lib/hipaa/scoring.ts</code> - Core scoring logic</li>
                <li>• <code>lib/hipaa/compliance.ts</code> - Updated with scoring integration</li>
                <li>• <code>components/compliance/ComplianceMaturityScore.tsx</code> - UI component</li>
                <li>• <code>components/compliance/ScoringExample.tsx</code> - Interactive examples</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Key Features:</h4>
              <ul className="space-y-1">
                <li>• Automatic score calculation based on evidence quality</li>
                <li>• Business-friendly maturity level descriptions</li>
                <li>• Visual progress indicators and color coding</li>
                <li>• Actionable insights and recommendations</li>
                <li>• Real-time score updates as evidence changes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Business Value */}
        <div className="mt-8 bg-green-50 rounded-lg border border-green-200 p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-3">
            💼 Business Value
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-green-800">
            <div>
              <h4 className="font-medium mb-2">For Clinic Managers:</h4>
              <ul className="space-y-1">
                <li>• Clear understanding of compliance status</li>
                <li>• Specific actions to improve scores</li>
                <li>• Visual progress tracking</li>
                <li>• Business language, not legal jargon</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">For Compliance:</h4>
              <ul className="space-y-1">
                <li>• Comprehensive HIPAA coverage</li>
                <li>• Evidence-based scoring</li>
                <li>• Audit-ready documentation</li>
                <li>• Risk-based prioritization</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">For Implementation:</h4>
              <ul className="space-y-1">
                <li>• Modular, reusable components</li>
                <li>• Real-time score updates</li>
                <li>• Extensible scoring framework</li>
                <li>• Business-friendly UI/UX</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link
            href="/dashboard"
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
          
          <Link
            href="/compliance-dashboard"
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            View Client Dashboard
            <ArrowLeftIcon className="w-5 h-5 ml-2 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
