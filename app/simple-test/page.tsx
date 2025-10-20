/**
 * Simple Test Page
 */

'use client';

import React from 'react';

export default function SimpleTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Simple Test Page
        </h1>
        <p className="text-gray-600 mb-4">
          This is a simple test page to verify the basic setup is working.
        </p>
        <div className="space-y-2">
          <a 
            href="/dashboard" 
            className="block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Dashboard
          </a>
          <a 
            href="/debug-scoring" 
            className="block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Debug Scoring
          </a>
        </div>
      </div>
    </div>
  );
}
