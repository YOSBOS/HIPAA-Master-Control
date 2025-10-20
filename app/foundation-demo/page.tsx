/**
 * HIPAA Master Control Tracker - Foundation Demo
 * 
 * This page demonstrates the foundation we've built for the HIPAA Master Control Tracker.
 * It shows the core data models, business language philosophy, and architecture.
 */

import { 
  MASTER_CONTROL_DESCRIPTIONS,
  MASTER_CONTROL_CATEGORIES,
  PROCESS_DIFFICULTY,
  PRIORITY_LEVELS,
  getBusinessStatusMessage,
  getBusinessPriorityMessage,
  formatBusinessDate,
  formatBusinessPercentage
} from '../../lib/hipaa';

export default function FoundationDemo() {
  const sampleControls = Object.entries(MASTER_CONTROL_DESCRIPTIONS).slice(0, 3);
  const sampleStatuses = ['complete', 'in-progress', 'needs-attention', 'not-started'] as const;
  const samplePriorities = ['high', 'medium', 'low'] as const;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            HIPAA Master Control Tracker
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Foundation Demo - Business Language Over Legal Jargon
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              🎯 Core Philosophy
            </h2>
            <p className="text-blue-800 text-lg leading-relaxed">
              Instead of asking: <em>"Do you comply with §164.308(a)(1)(ii)(A) Risk Analysis?"</em>
            </p>
            <p className="text-blue-800 text-lg leading-relaxed mt-2">
              We ask: <strong>"Have you reviewed how your clinic identifies and documents risks to patient information each year?"</strong>
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">✅ Same compliance goal</span>
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">❌ No legal jargon</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">💡 Action the clinic can actually perform</span>
            </div>
          </div>
        </div>

        {/* Master Controls Demo */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            🏗️ Master Controls (Business Processes)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleControls.map(([key, control]) => (
              <div key={key} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{control.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    control.difficulty === 'simple' ? 'bg-green-100 text-green-800' :
                    control.difficulty === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                    control.difficulty === 'complex' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {control.difficulty}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{control.description}</p>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-gray-700">Business Value:</span>
                    <p className="text-sm text-gray-600">{control.businessValue}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Typical Activities:</span>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {control.typicalActivities.slice(0, 2).map((activity, index) => (
                        <li key={index}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Time Estimate:</span>
                    <p className="text-sm text-gray-600">{control.estimatedTime}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Language Demo */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            🗣️ Business Language Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Status Messages */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Status Messages</h3>
              <div className="space-y-3">
                {sampleStatuses.map((status) => (
                  <div key={status} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{status}:</span>
                    <span className="text-sm text-gray-600">{getBusinessStatusMessage(status)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Priority Messages */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Priority Messages</h3>
              <div className="space-y-3">
                {samplePriorities.map((priority) => (
                  <div key={priority} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{priority}:</span>
                    <span className="text-sm text-gray-600">{getBusinessPriorityMessage(priority)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Architecture Overview */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            🏛️ Architecture Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">📊 Data Models</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• MasterControl - Business processes</li>
                <li>• EvidenceItem - User evidence</li>
                <li>• AIGuidance - Business guidance</li>
                <li>• SubControl - Hidden HIPAA mapping</li>
                <li>• ComplianceMapping - Regulatory links</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🔧 Services</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• MasterControlService</li>
                <li>• EvidenceService</li>
                <li>• GuidanceService</li>
                <li>• ComplianceService</li>
                <li>• ReportService</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Business language interface</li>
                <li>• AI guidance system</li>
                <li>• Evidence management</li>
                <li>• Progress tracking</li>
                <li>• Compliance reporting</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            🚀 Ready for Phase 2: Master Controls Implementation
          </h2>
          <p className="text-gray-700 text-center mb-6">
            The foundation is complete! We have all the core types, services, and utilities needed to build the 8-9 business process areas.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">✅ Completed</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Core data models and types</li>
                <li>• Business language constants</li>
                <li>• Utility functions</li>
                <li>• Service interfaces</li>
                <li>• Validation system</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">🎯 Next Phase</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Build 8-9 Master Controls</li>
                <li>• Create business process components</li>
                <li>• Implement evidence management</li>
                <li>• Add AI guidance system</li>
                <li>• Create compliance engine</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>Foundation built with business language philosophy in mind</p>
          <p className="text-sm mt-2">
            Last updated: {formatBusinessDate(new Date())}
          </p>
        </div>
      </div>
    </div>
  );
}
