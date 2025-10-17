'use client';

import { CardGrid, ReportCard } from '@/components';

const reports = [
  {
    id: 1,
    title: 'Monthly Compliance Report - January 2024',
    type: 'Compliance Summary',
    generatedBy: 'John Smith',
    generatedDate: '2024-01-31',
    status: 'Completed' as const,
    downloadUrl: '#',
  },
  {
    id: 2,
    title: 'HIPAA Risk Assessment Report',
    type: 'Risk Assessment',
    generatedBy: 'Jane Doe',
    generatedDate: '2024-01-25',
    status: 'Completed' as const,
    downloadUrl: '#',
  },
  {
    id: 3,
    title: 'Quarterly Audit Report - Q4 2023',
    type: 'Audit Report',
    generatedBy: 'Mike Johnson',
    generatedDate: '2024-01-15',
    status: 'Completed' as const,
    downloadUrl: '#',
  },
  {
    id: 4,
    title: 'Security Incident Report',
    type: 'Incident Report',
    generatedBy: 'Sarah Wilson',
    generatedDate: '2024-01-10',
    status: 'Completed' as const,
    downloadUrl: '#',
  },
  {
    id: 5,
    title: 'Annual Compliance Review',
    type: 'Compliance Summary',
    generatedBy: 'Alex Brown',
    generatedDate: '2024-01-05',
    status: 'In Progress' as const,
    downloadUrl: undefined,
  },
  {
    id: 6,
    title: 'Data Breach Assessment',
    type: 'Risk Assessment',
    generatedBy: 'Lisa Davis',
    generatedDate: '2024-01-01',
    status: 'Failed' as const,
    downloadUrl: undefined,
  },
];

export default function ReportsList() {
  return (
    <CardGrid cols={2} gap="md">
      {reports.map((report) => (
        <ReportCard
          key={report.id}
          {...report}
          onClick={() => {
            // Handle report click - could navigate to detail view
            console.log('Report clicked:', report.id);
          }}
        />
      ))}
    </CardGrid>
  );
}
