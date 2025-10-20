/**
 * Debug Scoring Page - Step by step import testing
 */

'use client';

import React, { useState } from 'react';

export default function DebugScoringPage() {
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, result]);
  };

  const testImports = async () => {
    setTestResults([]);
    
    try {
      addResult('🔄 Testing basic React imports...');
      await new Promise(resolve => setTimeout(resolve, 100));
      addResult('✅ React imports working');

      addResult('🔄 Testing lib/hipaa imports...');
      const { ComplianceManager } = await import('../../lib/hipaa');
      addResult('✅ ComplianceManager imported successfully');

      addResult('🔄 Testing scoring imports...');
      const { calculateOverallComplianceScore } = await import('../../lib/hipaa');
      addResult('✅ Scoring functions imported successfully');

      addResult('🔄 Testing component imports...');
      const { SimpleScoringTest } = await import('../../components/compliance/SimpleScoringTest');
      addResult('✅ Component imports working');

      addResult('🎉 All imports successful!');
    } catch (error) {
      addResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Debug Scoring System
        </h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Import Testing
          </h2>
          <button
            onClick={testImports}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Test Imports
          </button>
        </div>

        {testResults.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Test Results
            </h3>
            <div className="space-y-2">
              {testResults.map((result, index) => (
                <div key={index} className="text-sm font-mono">
                  {result}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <a 
            href="/compliance-scoring" 
            className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Go to Compliance Scoring
          </a>
        </div>
      </div>
    </div>
  );
}
