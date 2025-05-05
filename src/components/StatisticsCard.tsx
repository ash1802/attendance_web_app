
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface StatisticsCardProps {
  title: string;
  value: number;
  total?: number;
  percentage: number;
  color: string;
  icon?: React.ReactNode;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  total,
  percentage,
  color,
  icon
}) => {
  return (
    <Card className="shadow-sm hover:shadow transition-shadow duration-200 animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value}{total && <span className="text-sm font-normal text-muted-foreground"> / {total}</span>}
        </div>
        <Progress 
          value={percentage} 
          className="h-2 mt-2" 
          indicatorClassName={`bg-[${color}]`}
        />
        <p className="text-xs text-muted-foreground mt-2">{percentage}% of total</p>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
