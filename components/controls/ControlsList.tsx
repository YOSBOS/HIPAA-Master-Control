'use client';

import { CardGrid, ControlCard } from '@/components';

const controls = [
  {
    id: '164.308(a)(1)',
    title: 'Security Officer',
    description: 'Designate a security officer responsible for HIPAA compliance',
    category: 'Administrative',
    status: 'Compliant' as const,
    priority: 'High' as const,
    lastAssessed: '2024-01-10',
    nextAssessment: '2024-04-10',
    responsibleParty: 'John Smith',
  },
  {
    id: '164.312(a)(1)',
    title: 'Access Control',
    description: 'Implement technical policies for ePHI access control',
    category: 'Technical',
    status: 'Compliant' as const,
    priority: 'High' as const,
    lastAssessed: '2024-01-15',
    nextAssessment: '2024-04-15',
    responsibleParty: 'Jane Doe',
  },
  {
    id: '164.312(b)',
    title: 'Audit Controls',
    description: 'Implement audit logging for information systems',
    category: 'Technical',
    status: 'In Progress' as const,
    priority: 'High' as const,
    lastAssessed: '2024-01-12',
    nextAssessment: '2024-04-12',
    responsibleParty: 'Mike Johnson',
  },
  {
    id: '164.310(a)(1)',
    title: 'Facility Access Controls',
    description: 'Limit physical access to electronic information systems',
    category: 'Physical',
    status: 'Non-Compliant' as const,
    priority: 'High' as const,
    lastAssessed: '2024-01-08',
    nextAssessment: '2024-04-08',
    responsibleParty: 'Sarah Wilson',
  },
  {
    id: '164.312(c)(1)',
    title: 'Integrity',
    description: 'Implement policies to protect ePHI from improper alteration or destruction',
    category: 'Technical',
    status: 'Compliant' as const,
    priority: 'Medium' as const,
    lastAssessed: '2024-01-14',
    nextAssessment: '2024-04-14',
    responsibleParty: 'Alex Brown',
  },
  {
    id: '164.312(e)(1)',
    title: 'Transmission Security',
    description: 'Implement technical security measures to guard against unauthorized access',
    category: 'Technical',
    status: 'Non-Compliant' as const,
    priority: 'High' as const,
    lastAssessed: '2024-01-05',
    nextAssessment: '2024-04-05',
    responsibleParty: 'Lisa Davis',
  },
];

export default function ControlsList() {
  return (
    <CardGrid cols={3} gap="md">
      {controls.map((control) => (
        <ControlCard
          key={control.id}
          {...control}
          onClick={() => {
            // Handle control click - could navigate to detail view
            console.log('Control clicked:', control.id);
          }}
        />
      ))}
    </CardGrid>
  );
}
