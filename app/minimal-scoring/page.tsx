/**
 * Minimal Scoring Page - Test imports step by step
 */

'use client';

import React, { useState, useEffect } from 'react';

export default function MinimalScoringPage() {
  const [importStatus, setImportStatus] = useState<string>('Not started');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testImports = async () => {
      try {
        setImportStatus('Testing basic imports...');
        
        // Test 1: Basic React
        setImportStatus('✅ React working');
        
        // Test 2: Try importing from lib/hipaa
        setImportStatus('Testing lib/hipaa imports...');
        const hipaaModule = await import('../../lib/hipaa');
        setImportStatus('✅ lib/hipaa imported');
        
        // Test 3: Try creating ComplianceManager
        setImportStatus('Testing ComplianceManager...');
        const { ComplianceManager } = hipaaModule;
        const manager = new ComplianceManager();
        setImportStatus('✅ ComplianceManager created');
        
        // Test 4: Try scoring functions
        setImportStatus('Testing scoring functions...');
        const { calculateOverallComplianceScore } = hipaaModule;
        setImportStatus('✅ Scoring functions imported');
        
        setImportStatus('🎉 All imports successful!');
        setError(null);
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        setImportStatus(`❌ Error: ${errorMessage}`);
      }
    };

    testImports();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Minimal Scoring Test
        </h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Import Test Status
          </h2>
          <div className="text-lg font-mono">
            {importStatus}
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-900 mb-2">Error Details:</h3>
              <pre className="text-sm text-red-800 whitespace-pre-wrap">{error}</pre>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <a 
            href="/dashboard" 
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </a>
          <a 
            href="/compliance-scoring" 
            className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 ml-4"
          >
            Try Compliance Scoring
          </a>
        </div>
      </div>
    </div>
  );
}
