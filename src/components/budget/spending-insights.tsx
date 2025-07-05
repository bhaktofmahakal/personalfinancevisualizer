import { format } from 'date-fns';
import { AlertTriangle, CheckCircle, TrendingDown, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ITransaction } from '@/lib/models/transaction';
import { IBudget } from '@/lib/models/budget';

interface SpendingInsightsProps {
  transactions: ITransaction[];
  budgets: IBudget[];
  month: string; // Format: YYYY-MM
}

export function SpendingInsights({ transactions, budgets, month }: SpendingInsightsProps) {
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

  // Generate insights
  const generateInsights = () => {
    const insights = [];
    
    // Check for categories over budget
    categoryBudgets.forEach((budgetAmount, category) => {
      const spentAmount = categorySpending.get(category) || 0;
      const percentUsed = (spentAmount / budgetAmount) * 100;
      
      if (percentUsed >= 100) {
        insights.push({
          type: 'warning',
          icon: <AlertTriangle className="h-4 w-4 text-red-500" />,
          message: `You've exceeded your ${category} budget by ${formatCurrency(spentAmount - budgetAmount)}`,
        });
      } else if (percentUsed >= 80) {
        insights.push({
          type: 'caution',
          icon: <TrendingUp className="h-4 w-4 text-amber-500" />,
          message: `You've used ${percentUsed.toFixed(0)}% of your ${category} budget`,
        });
      } else if (percentUsed <= 20 && spentAmount > 0) {
        insights.push({
          type: 'good',
          icon: <TrendingDown className="h-4 w-4 text-green-500" />,
          message: `You're well under your ${category} budget (${percentUsed.toFixed(0)}% used)`,
        });
      }
    });
    
    // Check for categories with no budget
    categorySpending.forEach((spentAmount, category) => {
      if (!categoryBudgets.has(category) && spentAmount > 0) {
        insights.push({
          type: 'info',
          icon: <AlertTriangle className="h-4 w-4 text-blue-500" />,
          message: `You spent ${formatCurrency(spentAmount)} on ${category} without a budget`,
        });
      }
    });
    
    // If no insights, add a default one
    if (insights.length === 0 && categoryBudgets.size > 0) {
      insights.push({
        type: 'good',
        icon: <CheckCircle className="h-4 w-4 text-green-500" />,
        message: 'You\'re on track with all your budgets this month!',
      });
    } else if (insights.length === 0) {
      insights.push({
        type: 'info',
        icon: <AlertTriangle className="h-4 w-4 text-blue-500" />,
        message: 'Set up budgets to get spending insights',
      });
    }
    
    return insights;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const insights = generateInsights();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="mt-0.5">{insight.icon}</div>
              <p>{insight.message}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}