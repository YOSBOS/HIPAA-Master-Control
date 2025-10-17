import { Metadata } from 'next';
import { DashboardSidebar, DashboardHeader } from '@/components';

export const metadata: Metadata = {
  title: 'Dashboard - HIPAA Master Control',
  description: 'HIPAA Master Control Tracker Dashboard',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
