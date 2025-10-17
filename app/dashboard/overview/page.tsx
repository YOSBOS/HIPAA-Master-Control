import { Metadata } from 'next';
import { ComplianceOverview, ControlStatus, RecentActivity, Card, CardHeader, CardGrid } from '@/components';

export const metadata: Metadata = {
  title: 'Overview - HIPAA Master Control',
  description: 'HIPAA compliance overview and status',
};

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader 
          title="Compliance Overview"
          subtitle="Current status of your HIPAA compliance controls"
        />
      </Card>
      
      <CardGrid cols={2} gap="md">
        <ComplianceOverview />
        <ControlStatus />
      </CardGrid>
      
      <RecentActivity />
    </div>
  );
}
