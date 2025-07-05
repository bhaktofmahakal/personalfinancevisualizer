'use client';

import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ITransaction } from '@/lib/models/transaction';
import { IBudget } from '@/lib/models/budget';

interface BudgetComparisonChartProps {
  transactions: ITransaction[];
  budgets: IBudget[];
  month: string; // Format: YYYY-MM
}

export function BudgetComparisonChart({ transactions, budgets, month }: BudgetComparisonChartProps) {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (transactions.length === 0 && budgets.length === 0) {
      setChartData([]);
      return;
    }

    // Filter transactions for the selected month
    const monthTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      const transactionMonth = format(transactionDate, 'yyyy-MM');
      return transactionMonth === month;
    });

    // Group transactions by category
    const categorySpending = new Map<string, number>();
    
    monthTransactions.forEach(transaction => {
      const category = transaction.category || 'Uncategorized';
      const currentAmount = categorySpending.get(category) || 0;
      categorySpending.set(category, currentAmount + transaction.amount);
    });

    // Create a map of budgets by category
    const categoryBudgets = new Map<string, number>();
    
    budgets.forEach(budget => {
      if (budget.month === month) {
        categoryBudgets.set(budget.category, budget.amount);
      }
    });

    // Combine data for chart
    const combinedData: any[] = [];
    
    // Add categories with budgets
    categoryBudgets.forEach((budgetAmount, category) => {
      combinedData.push({
        category,
        budget: budgetAmount,
        actual: categorySpending.get(category) || 0,
      });
    });
    
    // Add categories without budgets but with spending
    categorySpending.forEach((spendAmount, category) => {
      if (!categoryBudgets.has(category)) {
        combinedData.push({
          category,
          budget: 0,
          actual: spendAmount,
        });
      }
    });

    // Sort by category name
    combinedData.sort((a, b) => a.category.localeCompare(b.category));
    
    setChartData(combinedData);
  }, [transactions, budgets, month]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget vs. Actual Spending ({format(new Date(month + '-01'), 'MMMM yyyy')})</CardTitle>
      </CardHeader>
      <CardContent>
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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value as number), '']}
                />
                <Legend />
                <Bar dataKey="budget" fill="#8884d8" name="Budget" />
                <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}