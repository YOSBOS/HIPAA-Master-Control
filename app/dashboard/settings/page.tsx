import { Metadata } from 'next';
import { SettingsTabs, Card, CardHeader } from '@/components';

export const metadata: Metadata = {
  title: 'Settings - HIPAA Master Control',
  description: 'Configure your HIPAA Master Control settings',
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader 
          title="Settings"
          subtitle="Configure your HIPAA Master Control settings and preferences"
        />
      </Card>
      
      <SettingsTabs />
    </div>
  );
}
