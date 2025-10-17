import { Metadata } from 'next';
import { ReportsList, ReportFilters, Card, CardHeader } from '@/components';

export const metadata: Metadata = {
  title: 'Compliance Reports - HIPAA Master Control',
  description: 'Generate and view HIPAA compliance reports',
};

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader 
          title="Compliance Reports"
          subtitle="Generate and view HIPAA compliance reports and audits"
        />
      </Card>
      
      <ReportFilters />
      <ReportsList />
    </div>
  );
}
