import type { ElementType } from 'react';

import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  icon: ElementType;
  label: string;
  value: string;
  bgColor: string;
  iconColor: string;
}

export default function AdminStatsCard({
  bgColor,
  iconColor,
  label,
  value,
  icon: Icon,
}: StatsCardProps) {
  return (
    <Card className="transition-colors bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/80">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg ${bgColor}`}>
            <Icon className={`size-6 ${iconColor}`} />
          </div>

          <div>
            <p className="text-sm text-zinc-400">{label}</p>
            <p className="text-2xl font-bold text-zinc-400">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
