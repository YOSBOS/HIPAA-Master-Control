import { Metadata } from 'next';
import { ControlsList, ControlFilters, Card, CardHeader } from '@/components';

export const metadata: Metadata = {
  title: 'HIPAA Controls - HIPAA Master Control',
  description: 'Manage and monitor HIPAA compliance controls',
};

export default function ControlsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader 
          title="HIPAA Controls"
          subtitle="Manage and monitor your HIPAA compliance controls"
        />
      </Card>
      
      <ControlFilters />
      <ControlsList />
    </div>
  );
}
