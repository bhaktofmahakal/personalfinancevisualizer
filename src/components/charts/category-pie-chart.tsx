'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ITransaction } from '@/lib/models/transaction';

interface CategoryPieChartProps {
  transactions: ITransaction[];
}

const COLORS = [
  '#2C5DA9', // Sapphire medium
  '#C46C45', // Amber medium
  '#5F4B8B', // Lavender medium
  '#A593E0', // Mauve medium
  '#5B7768', // Pine medium
  '#AF5279', // Velvet medium
  '#8A2B2B', // Crimson medium
  '#C49A6C', // Golden medium
  '#96C7B9', // Ivory dark
  '#D1F0E0', // Ivory medium
];

export function CategoryPieChart({ transactions }: CategoryPieChartProps) {
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    if (transactions.length === 0) {
      setChartData([]);
      return;
    }

    // Group transactions by category and sum amounts
    const categoryMap = new Map<string, number>();
    
    transactions.forEach(transaction => {
      const category = transaction.category || 'Uncategorized';
      const currentAmount = categoryMap.get(category) || 0;
      categoryMap.set(category, currentAmount + transaction.amount);
    });


    const data = Array.from(categoryMap.entries()).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2)),
    }));


    data.sort((a, b) => b.value - a.value);

    setChartData(data);
  }, [transactions]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="w-full">
      {chartData.length === 0 ? (
        <div className="flex justify-center items-center h-[300px] text-muted-foreground">
          No data available
        </div>
      ) : (
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                animationDuration={1500}
                animationBegin={200}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    stroke="var(--background)"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => formatCurrency(value as number)} 
                contentStyle={{ 
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                  borderRadius: 'var(--radius)',
                }}
              />
              <Legend 
                formatter={(value) => <span style={{ color: 'var(--foreground)' }}>{value}</span>}
                iconSize={10}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}