import { Metadata } from 'next';
import { DashboardOverview, Card, CardHeader } from '@/components';

export const metadata: Metadata = {
  title: 'Dashboard Overview - HIPAA Master Control',
  description: 'HIPAA Master Control Tracker Dashboard Overview',
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader 
          title="HIPAA Master Control Dashboard"
          subtitle="Monitor and manage your HIPAA compliance controls"
        />
      </Card>
      
      <DashboardOverview />
    </div>
  );
}
