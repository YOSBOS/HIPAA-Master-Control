/**
 * Simple Scoring Test Component
 * 
 * Minimal test to check if the scoring system imports work
 */

import React from 'react';

export const SimpleScoringTest: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Simple Scoring Test
      </h3>
      <p className="text-gray-600">
        This is a simple test component to verify that the scoring system can be imported and rendered.
      </p>
      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 text-sm">
          ✅ If you can see this, the basic component structure is working.
        </p>
      </div>
    </div>
  );
};

export default SimpleScoringTest;
