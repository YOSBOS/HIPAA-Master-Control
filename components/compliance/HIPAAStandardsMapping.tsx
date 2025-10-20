'use client';

/**
 * HIPAA Standards Mapping Component
 * 
 * Shows how Master Controls map to HIPAA standards with visual indicators
 */

import React, { useState } from 'react';
import { 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { Card, CardHeader, CardContent } from '../ui/Card';

interface HIPAAStandard {
  id: string;
  code: string;
  title: string;
  description: string;
  masterControl: string;
  status: 'covered' | 'partial' | 'pending';
}

interface MasterControlMapping {
  id: string;
  name: string;
  icon: string;
  description: string;
  standards: HIPAAStandard[];
  coverage: number;
  status: 'completed' | 'in-progress' | 'pending';
}

export default function HIPAAStandardsMapping() {
  const [expandedControl, setExpandedControl] = useState<string | null>(null);

  const masterControls: MasterControlMapping[] = [
    {
      id: 'workforce-training',
      name: 'Workforce Training & Awareness',
      icon: '🎓',
      description: 'Ensures all staff understand how to protect patient information',
      coverage: 100,
      status: 'completed',
      standards: [
        {
          id: '164.308.a.5.i',
          code: '164.308(a)(5)(i)',
          title: 'Security Awareness and Training Program',
          description: 'Implement a security awareness and training program for all workforce members',
          masterControl: 'Workforce Training & Awareness',
          status: 'covered'
        },
        {
          id: '164.308.a.5.ii.A',
          code: '164.308(a)(5)(ii)(A)',
          title: 'Security Reminders',
          description: 'Periodic security updates and reminders to workforce members',
          masterControl: 'Workforce Training & Awareness',
          status: 'covered'
        },
        {
          id: '164.308.a.5.ii.B',
          code: '164.308(a)(5)(ii)(B)',
          title: 'Protection from Malicious Software',
          description: 'Training on protection from malicious software and reporting procedures',
          masterControl: 'Workforce Training & Awareness',
          status: 'covered'
        },
        {
          id: '164.308.a.5.ii.C',
          code: '164.308(a)(5)(ii)(C)',
          title: 'Log-in Monitoring',
          description: 'Training on monitoring log-in attempts and reporting discrepancies',
          masterControl: 'Workforce Training & Awareness',
          status: 'covered'
        },
        {
          id: '164.308.a.5.ii.D',
          code: '164.308(a)(5)(ii)(D)',
          title: 'Password Management',
          description: 'Training on creating, changing, and safeguarding passwords',
          masterControl: 'Workforce Training & Awareness',
          status: 'covered'
        }
      ]
    },
    {
      id: 'access-control',
      name: 'Access Control & User Management',
      icon: '🔐',
      description: 'Manages who has access to patient information systems',
      coverage: 100,
      status: 'in-progress',
      standards: [
        {
          id: '164.308.a.3.i',
          code: '164.308(a)(3)(i)',
          title: 'Workforce Access Management',
          description: 'Implement policies and procedures for workforce access management',
          masterControl: 'Access Control & User Management',
          status: 'covered'
        },
        {
          id: '164.308.a.3.ii.A',
          code: '164.308(a)(3)(ii)(A)',
          title: 'Access Authorization',
          description: 'Implement procedures for granting access to ePHI',
          masterControl: 'Access Control & User Management',
          status: 'covered'
        },
        {
          id: '164.308.a.3.ii.B',
          code: '164.308(a)(3)(ii)(B)',
          title: 'Access Establishment and Modification',
          description: 'Implement procedures for establishing and modifying access to ePHI',
          masterControl: 'Access Control & User Management',
          status: 'covered'
        },
        {
          id: '164.308.a.3.ii.C',
          code: '164.308(a)(3)(ii)(C)',
          title: 'Access Termination',
          description: 'Implement procedures for terminating access to ePHI',
          masterControl: 'Access Control & User Management',
          status: 'covered'
        },
        {
          id: '164.312.a.1',
          code: '164.312(a)(1)',
          title: 'Unique User Identification',
          description: 'Assign a unique name and/or number for identifying and tracking user identity',
          masterControl: 'Access Control & User Management',
          status: 'covered'
        },
        {
          id: '164.312.a.2.i',
          code: '164.312(a)(2)(i)',
          title: 'Automatic Logoff',
          description: 'Implement electronic procedures that terminate an electronic session after a predetermined time of inactivity',
          masterControl: 'Access Control & User Management',
          status: 'covered'
        },
        {
          id: '164.312.a.2.ii',
          code: '164.312(a)(2)(ii)',
          title: 'Encryption and Decryption',
          description: 'Implement a mechanism to encrypt and decrypt ePHI',
          masterControl: 'Access Control & User Management',
          status: 'covered'
        }
      ]
    },
    {
      id: 'security-risk-management',
      name: 'Security Risk Management & Contingency Planning',
      icon: '🛡️',
      description: 'Identifies and manages security risks to patient information',
      coverage: 100,
      status: 'completed',
      standards: [
        {
          id: '164.308.a.1.i',
          code: '164.308(a)(1)(i)',
          title: 'Security Management Process',
          description: 'Implement policies and procedures to prevent, detect, contain, and correct security violations',
          masterControl: 'Security Risk Management & Contingency Planning',
          status: 'covered'
        },
        {
          id: '164.308.a.1.ii.A',
          code: '164.308(a)(1)(ii)(A)',
          title: 'Risk Analysis',
          description: 'Conduct an accurate and thorough assessment of the potential risks and vulnerabilities',
          masterControl: 'Security Risk Management & Contingency Planning',
          status: 'covered'
        },
        {
          id: '164.308.a.1.ii.B',
          code: '164.308(a)(1)(ii)(B)',
          title: 'Risk Management',
          description: 'Implement security measures sufficient to reduce risks and vulnerabilities',
          masterControl: 'Security Risk Management & Contingency Planning',
          status: 'covered'
        },
        {
          id: '164.308.a.1.ii.C',
          code: '164.308(a)(1)(ii)(C)',
          title: 'Sanction Policy',
          description: 'Apply appropriate sanctions against workforce members who fail to comply with security policies',
          masterControl: 'Security Risk Management & Contingency Planning',
          status: 'covered'
        },
        {
          id: '164.308.a.1.ii.D',
          code: '164.308(a)(1)(ii)(D)',
          title: 'Information System Activity Review',
          description: 'Implement procedures to regularly review records of information system activity',
          masterControl: 'Security Risk Management & Contingency Planning',
          status: 'covered'
        },
        {
          id: '164.308.a.7.i',
          code: '164.308(a)(7)(i)',
          title: 'Contingency Plan',
          description: 'Establish and implement procedures for responding to an emergency or other occurrence',
          masterControl: 'Security Risk Management & Contingency Planning',
          status: 'covered'
        },
        {
          id: '164.308.a.7.ii.A',
          code: '164.308(a)(7)(ii)(A)',
          title: 'Data Backup Plan',
          description: 'Establish and implement procedures to create and maintain retrievable exact copies of ePHI',
          masterControl: 'Security Risk Management & Contingency Planning',
          status: 'covered'
        },
        {
          id: '164.308.a.7.ii.B',
          code: '164.308(a)(7)(ii)(B)',
          title: 'Disaster Recovery Plan',
          description: 'Establish and implement procedures to restore any loss of data',
          masterControl: 'Security Risk Management & Contingency Planning',
          status: 'covered'
        },
        {
          id: '164.308.a.7.ii.C',
          code: '164.308(a)(7)(ii)(C)',
          title: 'Emergency Mode Operation Plan',
          description: 'Establish and implement procedures to enable continuation of critical business processes',
          masterControl: 'Security Risk Management & Contingency Planning',
          status: 'covered'
        },
        {
          id: '164.308.a.7.ii.D',
          code: '164.308(a)(7)(ii)(D)',
          title: 'Testing and Revision Procedures',
          description: 'Implement procedures for periodic testing and revision of contingency plans',
          masterControl: 'Security Risk Management & Contingency Planning',
          status: 'covered'
        },
        {
          id: '164.308.a.7.ii.E',
          code: '164.308(a)(7)(ii)(E)',
          title: 'Applications and Data Criticality Analysis',
          description: 'Assess the relative criticality of specific applications and data in support of other contingency plan components',
          masterControl: 'Security Risk Management & Contingency Planning',
          status: 'covered'
        }
      ]
    },
    {
      id: 'vendor-management',
      name: 'Vendor Management & Business Associates',
      icon: '🤝',
      description: 'Oversees third-party vendors who handle patient information',
      coverage: 100,
      status: 'pending',
      standards: [
        {
          id: '164.308.b.1',
          code: '164.308(b)(1)',
          title: 'Business Associate Contracts',
          description: 'A covered entity may permit a business associate to create, receive, maintain, or transmit ePHI on its behalf',
          masterControl: 'Vendor Management & Business Associates',
          status: 'covered'
        },
        {
          id: '164.308.b.2',
          code: '164.308(b)(2)',
          title: 'Written Contract or Other Arrangement',
          description: 'A covered entity may permit a business associate to create, receive, maintain, or transmit ePHI on its behalf',
          masterControl: 'Vendor Management & Business Associates',
          status: 'covered'
        },
        {
          id: '164.308.b.3',
          code: '164.308(b)(3)',
          title: 'Other Arrangements',
          description: 'A covered entity may permit a business associate to create, receive, maintain, or transmit ePHI on its behalf',
          masterControl: 'Vendor Management & Business Associates',
          status: 'covered'
        },
        {
          id: '164.308.b.4',
          code: '164.308(b)(4)',
          title: 'Standard for Business Associate Contracts',
          description: 'A covered entity may permit a business associate to create, receive, maintain, or transmit ePHI on its behalf',
          masterControl: 'Vendor Management & Business Associates',
          status: 'covered'
        }
      ]
    },
    {
      id: 'incident-response',
      name: 'Incident Response & Breach Management',
      icon: '🚨',
      description: 'Establishes procedures for responding to security incidents',
      coverage: 100,
      status: 'pending',
      standards: [
        {
          id: '164.308.a.6.i',
          code: '164.308(a)(6)(i)',
          title: 'Security Incident Procedures',
          description: 'Implement policies and procedures to address security incidents',
          masterControl: 'Incident Response & Breach Management',
          status: 'covered'
        },
        {
          id: '164.308.a.6.ii',
          code: '164.308(a)(6)(ii)',
          title: 'Response and Reporting',
          description: 'Identify and respond to suspected or known security incidents',
          masterControl: 'Incident Response & Breach Management',
          status: 'covered'
        },
        {
          id: '164.400-414',
          code: '164.400-414',
          title: 'Breach Notification Rule',
          description: 'Notify individuals and the Secretary of breaches of unsecured protected health information',
          masterControl: 'Incident Response & Breach Management',
          status: 'covered'
        }
      ]
    },
    {
      id: 'physical-security',
      name: 'Physical Security & Facility Controls',
      icon: '🏢',
      description: 'Protects physical access to patient information and systems',
      coverage: 100,
      status: 'pending',
      standards: [
        {
          id: '164.310.a.1',
          code: '164.310(a)(1)',
          title: 'Facility Access Controls',
          description: 'Implement policies and procedures to limit physical access to electronic information systems',
          masterControl: 'Physical Security & Facility Controls',
          status: 'covered'
        },
        {
          id: '164.310.a.2.i',
          code: '164.310(a)(2)(i)',
          title: 'Contingency Operations',
          description: 'Establish and implement procedures that allow facility access in support of restoration of lost data',
          masterControl: 'Physical Security & Facility Controls',
          status: 'covered'
        },
        {
          id: '164.310.a.2.ii',
          code: '164.310(a)(2)(ii)',
          title: 'Facility Security Plan',
          description: 'Implement policies and procedures to safeguard the facility and the equipment therein',
          masterControl: 'Physical Security & Facility Controls',
          status: 'covered'
        },
        {
          id: '164.310.a.2.iii',
          code: '164.310(a)(2)(iii)',
          title: 'Access Control and Validation Procedures',
          description: 'Implement procedures to control and validate a person\'s access to facilities',
          masterControl: 'Physical Security & Facility Controls',
          status: 'covered'
        },
        {
          id: '164.310.a.2.iv',
          code: '164.310(a)(2)(iv)',
          title: 'Maintenance Records',
          description: 'Implement policies and procedures to document repairs and modifications to the physical components',
          masterControl: 'Physical Security & Facility Controls',
          status: 'covered'
        },
        {
          id: '164.310.b',
          code: '164.310(b)',
          title: 'Workstation Use',
          description: 'Implement policies and procedures that specify the proper functions to be performed',
          masterControl: 'Physical Security & Facility Controls',
          status: 'covered'
        },
        {
          id: '164.310.c',
          code: '164.310(c)',
          title: 'Workstation Security',
          description: 'Implement physical safeguards for all workstations that access ePHI',
          masterControl: 'Physical Security & Facility Controls',
          status: 'covered'
        },
        {
          id: '164.310.d',
          code: '164.310(d)',
          title: 'Device and Media Controls',
          description: 'Implement policies and procedures that govern the receipt and removal of hardware and electronic media',
          masterControl: 'Physical Security & Facility Controls',
          status: 'covered'
        }
      ]
    },
    {
      id: 'technical-safeguards',
      name: 'Technical Safeguards & System Security',
      icon: '💻',
      description: 'Implements technology-based protections for electronic data',
      coverage: 100,
      status: 'pending',
      standards: [
        {
          id: '164.312.b',
          code: '164.312(b)',
          title: 'Audit Controls',
          description: 'Implement hardware, software, and/or procedural mechanisms that record and examine activity',
          masterControl: 'Technical Safeguards & System Security',
          status: 'covered'
        },
        {
          id: '164.312.c.1',
          code: '164.312(c)(1)',
          title: 'Integrity',
          description: 'Implement policies and procedures to protect ePHI from improper alteration or destruction',
          masterControl: 'Technical Safeguards & System Security',
          status: 'covered'
        },
        {
          id: '164.312.c.2',
          code: '164.312(c)(2)',
          title: 'Person or Entity Authentication',
          description: 'Implement procedures to verify that a person or entity seeking access to ePHI is the one claimed',
          masterControl: 'Technical Safeguards & System Security',
          status: 'covered'
        },
        {
          id: '164.312.d',
          code: '164.312(d)',
          title: 'Transmission Security',
          description: 'Implement technical security measures to guard against unauthorized access to ePHI',
          masterControl: 'Technical Safeguards & System Security',
          status: 'covered'
        }
      ]
    },
    {
      id: 'audit-monitoring',
      name: 'Audit & Monitoring',
      icon: '🔍',
      description: 'Regularly reviews system activity and compliance records',
      coverage: 100,
      status: 'pending',
      standards: [
        {
          id: '164.316.a',
          code: '164.316(a)',
          title: 'Policies and Procedures',
          description: 'Implement reasonable and appropriate policies and procedures to comply with the standards',
          masterControl: 'Audit & Monitoring',
          status: 'covered'
        },
        {
          id: '164.316.b',
          code: '164.316(b)',
          title: 'Documentation Retention',
          description: 'Maintain the policies and procedures required by this subpart in written form',
          masterControl: 'Audit & Monitoring',
          status: 'covered'
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircleIcon className="w-5 h-5" />;
      case 'in-progress': return <ExclamationTriangleIcon className="w-5 h-5" />;
      case 'pending': return <InformationCircleIcon className="w-5 h-5" />;
      default: return <InformationCircleIcon className="w-5 h-5" />;
    }
  };

  const getStandardStatusColor = (status: string) => {
    switch (status) {
      case 'covered': return 'text-green-600 bg-green-100';
      case 'partial': return 'text-yellow-600 bg-yellow-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const totalStandards = masterControls.reduce((sum, control) => sum + control.standards.length, 0);
  const completedControls = masterControls.filter(control => control.status === 'completed').length;
  const overallCoverage = Math.round((completedControls / masterControls.length) * 100);

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold text-gray-900">HIPAA Standards Coverage</h2>
          <p className="text-gray-600">Complete mapping of Master Controls to HIPAA Security Rule standards</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{totalStandards}</div>
              <div className="text-sm text-gray-600">HIPAA Standards</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{masterControls.length}</div>
              <div className="text-sm text-gray-600">Master Controls</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">100%</div>
              <div className="text-sm text-gray-600">Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">{overallCoverage}%</div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Master Controls Mapping */}
      <div className="space-y-4">
        {masterControls.map((control) => (
          <Card key={control.id} className="overflow-hidden">
            <CardHeader>
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedControl(expandedControl === control.id ? null : control.id)}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{control.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{control.name}</h3>
                    <p className="text-gray-600">{control.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Standards Covered</div>
                    <div className="text-lg font-semibold text-blue-600">{control.standards.length}</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 ${getStatusColor(control.status)}`}>
                    {getStatusIcon(control.status)}
                    <span>{control.status.replace('-', ' ')}</span>
                  </div>
                  {expandedControl === control.id ? (
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </CardHeader>
            
            {expandedControl === control.id && (
              <CardContent>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-4">HIPAA Standards Covered:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {control.standards.map((standard) => (
                      <div key={standard.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 text-sm">{standard.code}</div>
                            <div className="font-semibold text-gray-900">{standard.title}</div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStandardStatusColor(standard.status)}`}>
                            {standard.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">{standard.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
