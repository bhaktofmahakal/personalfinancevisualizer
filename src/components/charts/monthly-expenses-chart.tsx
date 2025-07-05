'use client';

import { useState, useEffect } from 'react';
import { format, parseISO, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ITransaction } from '@/lib/models/transaction';

interface MonthlyExpensesChartProps {
  transactions: ITransaction[];
}

export function MonthlyExpensesChart({ transactions }: MonthlyExpensesChartProps) {
  const [chartData, setChartData] = useState<{ name: string; total: number }[]>([]);

  useEffect(() => {
    if (transactions.length === 0) {
      setChartData([]);
      return;
    }

    //lastt 6 months
    const today = new Date();
    const sixMonthsAgo = subMonths(today, 5);
    
    const months = eachMonthOfInterval({
      start: sixMonthsAgo,
      end: today,
    });

    const monthlyData = months.map(month => {
      const monthStart = startOfMonth(month);
      const monthEnd = endOfMonth(month);
      const monthName = format(month, 'MMM yyyy');

  
      const monthTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= monthStart && transactionDate <= monthEnd;
      });

      // Sum 
      const total = monthTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

      return {
        name: monthName,
        total: parseFloat(total.toFixed(2)),
      };
    });

    setChartData(monthlyData);
  }, [transactions]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
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
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.3} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'var(--foreground)', fontSize: 12 }}
                axisLine={{ stroke: 'var(--border)' }}
              />
              <YAxis 
                tickFormatter={formatCurrency} 
                tick={{ fill: 'var(--foreground)', fontSize: 12 }}
                axisLine={{ stroke: 'var(--border)' }}
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(value as number), 'Total']}
                labelFormatter={(label) => `Month: ${label}`}
                contentStyle={{ 
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                  borderRadius: 'var(--radius)',
                }}
              />
              <Bar 
                dataKey="total" 
                fill="#2C5DA9" // Sapphire Drift medium
                name="Total Expenses" 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}