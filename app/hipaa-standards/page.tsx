'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import HIPAAStandardsMapping from '../../components/compliance/HIPAAStandardsMapping';

export default function HIPAAStandardsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/dashboard"
                className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm mr-4"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">HIPAA Standards Coverage</h1>
                <p className="text-sm text-gray-600">Complete mapping of HIPAA requirements to Master Controls</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Introduction */}
          <div className="mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-3">HIPAA Standards Mapping</h2>
              <p className="text-blue-800 mb-4">
                This comprehensive mapping shows how our 8 Master Controls cover all 40+ HIPAA requirements, 
                providing a business-friendly approach to compliance management.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-3 rounded border border-blue-100">
                  <div className="font-semibold text-blue-900">8 Master Controls</div>
                  <div className="text-blue-700">Business-friendly processes</div>
                </div>
                <div className="bg-white p-3 rounded border border-blue-100">
                  <div className="font-semibold text-blue-900">40+ HIPAA Requirements</div>
                  <div className="text-blue-700">Complete regulatory coverage</div>
                </div>
                <div className="bg-white p-3 rounded border border-blue-100">
                  <div className="font-semibold text-blue-900">100% Coverage</div>
                  <div className="text-blue-700">No gaps in compliance</div>
                </div>
              </div>
            </div>
          </div>

          {/* HIPAA Standards Mapping Component */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <HIPAAStandardsMapping />
          </div>

          {/* Footer Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              This mapping ensures complete HIPAA compliance through simplified business processes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
