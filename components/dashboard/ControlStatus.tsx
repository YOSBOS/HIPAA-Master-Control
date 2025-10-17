'use client';

import { CheckCircleIcon, ExclamationTriangleIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Card, CardHeader, CardContent } from '@/components';

const controlStatuses = [
  { name: 'Access Control', status: 'Compliant', icon: CheckCircleIcon, color: 'text-green-500' },
  { name: 'Audit Controls', status: 'In Progress', icon: ClockIcon, color: 'text-yellow-500' },
  { name: 'Transmission Security', status: 'Non-Compliant', icon: XCircleIcon, color: 'text-red-500' },
  { name: 'Workforce Security', status: 'Compliant', icon: CheckCircleIcon, color: 'text-green-500' },
  { name: 'Facility Access', status: 'Compliant', icon: CheckCircleIcon, color: 'text-green-500' },
  { name: 'Device Controls', status: 'In Progress', icon: ClockIcon, color: 'text-yellow-500' },
];

export default function ControlStatus() {
  return (
    <Card className="h-full">
      <CardHeader title="Control Status" />
      <CardContent>
        <div className="space-y-3">
          {controlStatuses.map((control, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <control.icon className={`h-5 w-5 ${control.color} mr-3`} />
                <span className="text-sm font-medium text-gray-700">{control.name}</span>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                control.status === 'Compliant' 
                  ? 'bg-green-100 text-green-800'
                  : control.status === 'In Progress'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {control.status}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
