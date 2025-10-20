/**
 * Test Scoring Page - Simple test to check for errors
 */

'use client';

import React from 'react';

export default function TestScoringPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Test Scoring Page
        </h1>
        <p className="text-gray-600">
          If you can see this page, the basic routing is working.
        </p>
        <div className="mt-4">
          <a 
            href="/compliance-scoring" 
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Compliance Scoring
          </a>
        </div>
      </div>
    </div>
  );
}
