/**
 * HIPAA Controls Configuration
 * Defines the standard HIPAA controls and their requirements
 */

export interface HIPAAControl {
  id: string;
  title: string;
  description: string;
  category: 'Administrative' | 'Physical' | 'Technical';
  priority: 'High' | 'Medium' | 'Low';
  status: 'Compliant' | 'Non-Compliant' | 'In Progress' | 'Not Assessed';
  lastAssessed?: Date;
  nextAssessment?: Date;
  responsibleParty?: string;
  evidence?: string[];
  notes?: string;
}

export const HIPAA_CONTROLS: HIPAAControl[] = [
  // Administrative Safeguards
  {
    id: '164.308(a)(1)',
    title: 'Security Officer',
    description: 'Designate a security officer who is responsible for the development and implementation of the policies and procedures required by this subpart.',
    category: 'Administrative',
    priority: 'High',
    status: 'Not Assessed',
  },
  {
    id: '164.308(a)(2)',
    title: 'Workforce Security',
    description: 'Implement policies and procedures to ensure that all members of its workforce have appropriate access to electronic protected health information.',
    category: 'Administrative',
    priority: 'High',
    status: 'Not Assessed',
  },
  {
    id: '164.308(a)(3)',
    title: 'Information Access Management',
    description: 'Implement policies and procedures for authorizing access to electronic protected health information.',
    category: 'Administrative',
    priority: 'High',
    status: 'Not Assessed',
  },
  {
    id: '164.308(a)(4)',
    title: 'Security Awareness and Training',
    description: 'Implement a security awareness and training program for all members of the workforce.',
    category: 'Administrative',
    priority: 'High',
    status: 'Not Assessed',
  },
  {
    id: '164.308(a)(5)',
    title: 'Security Incident Procedures',
    description: 'Implement policies and procedures to address security incidents.',
    category: 'Administrative',
    priority: 'High',
    status: 'Not Assessed',
  },
  {
    id: '164.308(a)(6)',
    title: 'Contingency Plan',
    description: 'Establish and implement procedures to respond to an emergency or other occurrence that damages systems that contain electronic protected health information.',
    category: 'Administrative',
    priority: 'High',
    status: 'Not Assessed',
  },
  {
    id: '164.308(a)(7)',
    title: 'Evaluation',
    description: 'Perform a periodic technical and nontechnical evaluation.',
    category: 'Administrative',
    priority: 'Medium',
    status: 'Not Assessed',
  },
  {
    id: '164.308(a)(8)',
    title: 'Business Associate Contracts',
    description: 'Ensure that the contract or other arrangement with business associates requires them to comply with applicable requirements.',
    category: 'Administrative',
    priority: 'High',
    status: 'Not Assessed',
  },

  // Physical Safeguards
  {
    id: '164.310(a)(1)',
    title: 'Facility Access Controls',
    description: 'Implement policies and procedures to limit physical access to its electronic information systems and the facility or facilities in which they are housed.',
    category: 'Physical',
    priority: 'High',
    status: 'Not Assessed',
  },
  {
    id: '164.310(a)(2)',
    title: 'Workstation Use',
    description: 'Implement policies and procedures that specify the proper functions to be performed, the manner in which those functions are to be performed.',
    category: 'Physical',
    priority: 'Medium',
    status: 'Not Assessed',
  },
  {
    id: '164.310(a)(2)',
    title: 'Workstation Security',
    description: 'Implement physical safeguards for all workstations that access electronic protected health information.',
    category: 'Physical',
    priority: 'Medium',
    status: 'Not Assessed',
  },
  {
    id: '164.310(a)(2)',
    title: 'Device and Media Controls',
    description: 'Implement policies and procedures that govern the receipt and removal of hardware and electronic media.',
    category: 'Physical',
    priority: 'High',
    status: 'Not Assessed',
  },

  // Technical Safeguards
  {
    id: '164.312(a)(1)',
    title: 'Access Control',
    description: 'Implement technical policies and procedures for electronic information systems that maintain electronic protected health information.',
    category: 'Technical',
    priority: 'High',
    status: 'Not Assessed',
  },
  {
    id: '164.312(b)',
    title: 'Audit Controls',
    description: 'Implement hardware, software, and/or procedural mechanisms that record and examine activity in information systems.',
    category: 'Technical',
    priority: 'High',
    status: 'Not Assessed',
  },
  {
    id: '164.312(c)(1)',
    title: 'Integrity',
    description: 'Implement policies and procedures to protect electronic protected health information from improper alteration or destruction.',
    category: 'Technical',
    priority: 'High',
    status: 'Not Assessed',
  },
  {
    id: '164.312(d)',
    title: 'Person or Entity Authentication',
    description: 'Implement procedures to verify that a person or entity seeking access to electronic protected health information is the one claimed.',
    category: 'Technical',
    priority: 'High',
    status: 'Not Assessed',
  },
  {
    id: '164.312(e)(1)',
    title: 'Transmission Security',
    description: 'Implement technical security measures to guard against unauthorized access to electronic protected health information.',
    category: 'Technical',
    priority: 'High',
    status: 'Not Assessed',
  },
];

export const getControlsByCategory = (category: HIPAAControl['category']) => {
  return HIPAA_CONTROLS.filter(control => control.category === category);
};

export const getControlsByStatus = (status: HIPAAControl['status']) => {
  return HIPAA_CONTROLS.filter(control => control.status === status);
};

export const getControlsByPriority = (priority: HIPAAControl['priority']) => {
  return HIPAA_CONTROLS.filter(control => control.priority === priority);
};
