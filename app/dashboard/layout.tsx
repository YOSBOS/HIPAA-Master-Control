/**
 * Dashboard Layout
 * 
 * Provides consistent layout for all dashboard pages
 */

import React from 'react';
import DashboardNav from '../../components/layout/DashboardNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      <main>{children}</main>
    </div>
  );
}