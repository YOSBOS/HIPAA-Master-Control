'use client';

import { ShieldCheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Card, CardHeader, CardContent } from '@/components';

const safeguards = [
  {
    name: 'Administrative Safeguards',
    percentage: 85,
    icon: ShieldCheckIcon,
    color: 'green' as const,
  },
  {
    name: 'Physical Safeguards',
    percentage: 78,
    icon: ShieldCheckIcon,
    color: 'green' as const,
  },
  {
    name: 'Technical Safeguards',
    percentage: 65,
    icon: ExclamationTriangleIcon,
    color: 'yellow' as const,
  },
];

export default function ComplianceOverview() {
  return (
    <Card className="h-full">
      <CardHeader title="Compliance Status" />
      <CardContent>
        <div className="space-y-4">
          {safeguards.map((safeguard) => {
            const Icon = safeguard.icon;
            const colorClasses = {
              green: 'text-green-500',
              yellow: 'text-yellow-500',
              red: 'text-red-500',
            };
            
            const progressColorClasses = {
              green: 'bg-green-600',
              yellow: 'bg-yellow-600',
              red: 'bg-red-600',
            };

            return (
              <div key={safeguard.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Icon className={`h-5 w-5 ${colorClasses[safeguard.color]} mr-2`} />
                    <span className="text-sm font-medium text-gray-700">
                      {safeguard.name}
                    </span>
                  </div>
                  <span className={`text-sm font-medium ${
                    safeguard.color === 'green' ? 'text-green-600' :
                    safeguard.color === 'yellow' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {safeguard.percentage}%
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${progressColorClasses[safeguard.color]}`}
                    style={{ width: `${safeguard.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
