/**
 * HIPAA Requirements Configuration
 * Defines HIPAA requirements, standards, and compliance criteria
 */

export interface HIPAARequirement {
  id: string;
  title: string;
  description: string;
  category: 'Administrative' | 'Physical' | 'Technical';
  subcategory?: string;
  required: boolean;
  implementationSpecification?: string;
  addressable?: boolean;
  guidance?: string;
  references?: string[];
}

export interface HIPAAStandard {
  id: string;
  title: string;
  description: string;
  requirements: HIPAARequirement[];
  category: 'Administrative' | 'Physical' | 'Technical';
}

export const HIPAA_STANDARDS: HIPAAStandard[] = [
  {
    id: '164.308',
    title: 'Administrative Safeguards',
    description: 'Administrative actions, and policies and procedures, to manage the selection, development, implementation, and maintenance of security measures.',
    category: 'Administrative',
    requirements: [
      {
        id: '164.308(a)(1)',
        title: 'Security Officer',
        description: 'Designate a security officer who is responsible for the development and implementation of the policies and procedures required by this subpart.',
        category: 'Administrative',
        required: true,
        guidance: 'The security officer should have appropriate authority and resources to implement security policies and procedures.',
      },
      {
        id: '164.308(a)(2)',
        title: 'Workforce Security',
        description: 'Implement policies and procedures to ensure that all members of its workforce have appropriate access to electronic protected health information.',
        category: 'Administrative',
        required: true,
        implementationSpecification: '164.308(a)(2)(i) - Authorization and/or supervision',
        addressable: false,
        guidance: 'Ensure proper authorization and supervision of workforce members who have access to ePHI.',
      },
      {
        id: '164.308(a)(3)',
        title: 'Information Access Management',
        description: 'Implement policies and procedures for authorizing access to electronic protected health information.',
        category: 'Administrative',
        required: true,
        implementationSpecification: '164.308(a)(3)(i) - Isolating health care clearinghouse functions',
        addressable: true,
        guidance: 'Implement access controls to isolate health care clearinghouse functions from other functions.',
      },
      {
        id: '164.308(a)(4)',
        title: 'Security Awareness and Training',
        description: 'Implement a security awareness and training program for all members of the workforce.',
        category: 'Administrative',
        required: true,
        implementationSpecification: '164.308(a)(4)(i) - Security reminders',
        addressable: true,
        guidance: 'Provide periodic security updates and reminders to workforce members.',
      },
      {
        id: '164.308(a)(5)',
        title: 'Security Incident Procedures',
        description: 'Implement policies and procedures to address security incidents.',
        category: 'Administrative',
        required: true,
        guidance: 'Establish procedures for identifying, responding to, and documenting security incidents.',
      },
      {
        id: '164.308(a)(6)',
        title: 'Contingency Plan',
        description: 'Establish and implement procedures to respond to an emergency or other occurrence that damages systems that contain electronic protected health information.',
        category: 'Administrative',
        required: true,
        implementationSpecification: '164.308(a)(6)(i) - Data backup plan',
        addressable: false,
        guidance: 'Implement regular data backup procedures and test restoration processes.',
      },
      {
        id: '164.308(a)(7)',
        title: 'Evaluation',
        description: 'Perform a periodic technical and nontechnical evaluation.',
        category: 'Administrative',
        required: true,
        guidance: 'Conduct regular evaluations of security measures and update as necessary.',
      },
      {
        id: '164.308(a)(8)',
        title: 'Business Associate Contracts',
        description: 'Ensure that the contract or other arrangement with business associates requires them to comply with applicable requirements.',
        category: 'Administrative',
        required: true,
        guidance: 'Establish business associate agreements that include HIPAA compliance requirements.',
      },
    ],
  },
  {
    id: '164.310',
    title: 'Physical Safeguards',
    description: 'Physical measures, policies, and procedures to protect a covered entity\'s electronic information systems and related buildings and equipment.',
    category: 'Physical',
    requirements: [
      {
        id: '164.310(a)(1)',
        title: 'Facility Access Controls',
        description: 'Implement policies and procedures to limit physical access to its electronic information systems and the facility or facilities in which they are housed.',
        category: 'Physical',
        required: true,
        implementationSpecification: '164.310(a)(1)(i) - Contingency operations',
        addressable: true,
        guidance: 'Establish procedures for accessing facilities during emergency situations.',
      },
      {
        id: '164.310(a)(2)',
        title: 'Workstation Use',
        description: 'Implement policies and procedures that specify the proper functions to be performed, the manner in which those functions are to be performed.',
        category: 'Physical',
        required: true,
        guidance: 'Define acceptable use policies for workstations that access ePHI.',
      },
      {
        id: '164.310(a)(2)',
        title: 'Workstation Security',
        description: 'Implement physical safeguards for all workstations that access electronic protected health information.',
        category: 'Physical',
        required: true,
        guidance: 'Implement physical security measures for workstations to prevent unauthorized access.',
      },
      {
        id: '164.310(a)(2)',
        title: 'Device and Media Controls',
        description: 'Implement policies and procedures that govern the receipt and removal of hardware and electronic media.',
        category: 'Physical',
        required: true,
        implementationSpecification: '164.310(a)(2)(i) - Disposal',
        addressable: false,
        guidance: 'Establish secure disposal procedures for hardware and media containing ePHI.',
      },
    ],
  },
  {
    id: '164.312',
    title: 'Technical Safeguards',
    description: 'The technology and the policy and procedures for its use that protect electronic protected health information and control access to it.',
    category: 'Technical',
    requirements: [
      {
        id: '164.312(a)(1)',
        title: 'Access Control',
        description: 'Implement technical policies and procedures for electronic information systems that maintain electronic protected health information.',
        category: 'Technical',
        required: true,
        implementationSpecification: '164.312(a)(1)(i) - Unique user identification',
        addressable: false,
        guidance: 'Assign unique user identifiers to each user accessing ePHI.',
      },
      {
        id: '164.312(b)',
        title: 'Audit Controls',
        description: 'Implement hardware, software, and/or procedural mechanisms that record and examine activity in information systems.',
        category: 'Technical',
        required: true,
        guidance: 'Implement comprehensive audit logging for all ePHI access and modifications.',
      },
      {
        id: '164.312(c)(1)',
        title: 'Integrity',
        description: 'Implement policies and procedures to protect electronic protected health information from improper alteration or destruction.',
        category: 'Technical',
        required: true,
        guidance: 'Implement mechanisms to detect and prevent unauthorized alteration of ePHI.',
      },
      {
        id: '164.312(d)',
        title: 'Person or Entity Authentication',
        description: 'Implement procedures to verify that a person or entity seeking access to electronic protected health information is the one claimed.',
        category: 'Technical',
        required: true,
        guidance: 'Implement strong authentication mechanisms to verify user identity.',
      },
      {
        id: '164.312(e)(1)',
        title: 'Transmission Security',
        description: 'Implement technical security measures to guard against unauthorized access to electronic protected health information.',
        category: 'Technical',
        required: true,
        implementationSpecification: '164.312(e)(1)(i) - Integrity controls',
        addressable: true,
        guidance: 'Implement encryption and integrity controls for ePHI transmission.',
      },
    ],
  },
];

export const getRequirementsByCategory = (category: 'Administrative' | 'Physical' | 'Technical') => {
  return HIPAA_STANDARDS
    .filter(standard => standard.category === category)
    .flatMap(standard => standard.requirements);
};

export const getRequiredRequirements = () => {
  return HIPAA_STANDARDS
    .flatMap(standard => standard.requirements)
    .filter(requirement => requirement.required);
};

export const getAddressableRequirements = () => {
  return HIPAA_STANDARDS
    .flatMap(standard => standard.requirements)
    .filter(requirement => requirement.addressable);
};

export const getRequirementById = (id: string): HIPAARequirement | undefined => {
  return HIPAA_STANDARDS
    .flatMap(standard => standard.requirements)
    .find(requirement => requirement.id === id);
};
