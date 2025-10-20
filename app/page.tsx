import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          HIPAA Master Control Tracker
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Business Language Over Legal Jargon
        </p>
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            🎯 Core Philosophy
          </h2>
          <p className="text-gray-700 mb-4">
            Instead of asking: <em>"Do you comply with §164.308(a)(1)(ii)(A) Risk Analysis?"</em>
          </p>
          <p className="text-gray-700 mb-6">
            We ask: <strong>"Have you reviewed how your clinic identifies and documents risks to patient information each year?"</strong>
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">✅ Same compliance goal</span>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">❌ No legal jargon</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">💡 Action the clinic can actually perform</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/foundation-demo" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View Foundation Demo
          </Link>
          <div className="text-sm text-gray-500">
            <p>Phase 1 Complete: Foundation & Core Architecture</p>
            <p>Ready for Phase 2: Master Controls Implementation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
