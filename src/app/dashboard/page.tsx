'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, DollarSign, PieChart, BarChart3 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SummaryCard } from '@/components/dashboard/summary-card';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';
import { MonthlyExpensesChart } from '@/components/charts/monthly-expenses-chart';
import { CategoryPieChart } from '@/components/charts/category-pie-chart';
import { ITransaction } from '@/lib/models/transaction';
import { Header } from '@/components/header';

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    setIsLoading(true);
    setError(null);
    try {
      // Use absolute URL to ensure correct path resolution
      const baseUrl = window.location.origin;
      const apiUrl = `${baseUrl}/api/transactions`;
      console.log('Client: Fetching transactions from:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      console.log('Client: Response status:', response.status);
      
      if (!response.ok) {
        let errorMessage = `Server responded with status: ${response.status}`;
        
        try {
          // Try to get more detailed error from response
          const errorData = await response.json();
          if (errorData && errorData.error) {
            errorMessage = `${errorMessage} - ${errorData.error}`;
            if (errorData.message) {
              errorMessage = `${errorMessage}: ${errorData.message}`;
            }
          }
        } catch (e) {
          // If response is not JSON, try to get text
          try {
            const errorText = await response.text();
            if (errorText) {
              errorMessage = `${errorMessage} - ${errorText}`;
            }
          } catch (textError) {
            // If we can't get text either, just use the status
          }
        }
        
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log('Client: Transactions loaded successfully:', data.length);
      setTransactions(data);
    } catch (error) {
      console.error('Client: Error fetching transactions:', error);
      setError(`Failed to load transactions. ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setIsLoading(false);
    }
  }

  // Calculate total expenses
  const totalExpenses = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  // Get top categories
  const getCategoryBreakdown = () => {
    const categoryMap = new Map<string, number>();
    
    transactions.forEach(transaction => {
      const category = transaction.category || 'Uncategorized';
      const currentAmount = categoryMap.get(category) || 0;
      categoryMap.set(category, currentAmount + transaction.amount);
    });

    // Convert to array and sort by amount
    return Array.from(categoryMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 1)
      .map(([category, amount]) => ({ category, amount }));
  };

  const topCategory = getCategoryBreakdown()[0];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-palette-noir-dark">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-palette-sapphire-dark dark:text-palette-sapphire-light">Dashboard</h1>
          <Link href="/transactions">
            <Button className="bg-palette-sapphire-medium hover:bg-palette-sapphire-dark text-white">
              View All Transactions <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-palette-sapphire-light/30 h-12 w-12"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-palette-sapphire-light/30 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-palette-sapphire-light/30 rounded"></div>
                  <div className="h-4 bg-palette-sapphire-light/30 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center py-8 text-palette-velvet-medium">
            <p className="bg-palette-velvet-light/20 px-4 py-2 rounded-md">{error}</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="mb-4 text-muted-foreground">No transactions found</p>
            <Link href="/transactions">
              <Button className="bg-palette-sapphire-medium hover:bg-palette-sapphire-dark text-white">
                Add your first transaction
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
              <SummaryCard
                title="Total Expenses"
                value={formatCurrency(totalExpenses)}
                icon={<DollarSign className="h-4 w-4 text-chart-amber" />}
                className="border-palette-amber-medium/20 bg-palette-amber-light/5 dark:bg-palette-amber-dark/20"
              />
              {topCategory && (
                <SummaryCard
                  title="Top Category"
                  value={topCategory.category}
                  description={`${formatCurrency(topCategory.amount)} spent`}
                  icon={<PieChart className="h-4 w-4 text-chart-lavender" />}
                  className="border-palette-mauve-medium/20 bg-palette-mauve-light/5 dark:bg-palette-mauve-dark/20"
                />
              )}
              <SummaryCard
                title="Transactions"
                value={transactions.length.toString()}
                description="Total number of transactions"
                icon={<BarChart3 className="h-4 w-4 text-chart-sapphire" />}
                className="border-palette-sapphire-medium/20 bg-palette-sapphire-light/5 dark:bg-palette-sapphire-dark/20"
              />
            </div>

            {/* Charts */}
            <div className="grid gap-6 md:grid-cols-2 mb-6">
              <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-palette-sapphire-dark dark:text-palette-sapphire-light">Monthly Expenses</h3>
                <MonthlyExpensesChart transactions={transactions} />
              </div>
              <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-palette-lavender-dark dark:text-palette-lavender-light">Category Breakdown</h3>
                <CategoryPieChart transactions={transactions} />
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
              <h3 className="text-lg font-semibold mb-4 text-palette-pine-dark dark:text-palette-pine-light">Recent Transactions</h3>
              <RecentTransactions transactions={transactions} />
            </div>
          </>
        )}
      </main>
      <footer className="py-6 border-t bg-muted/40">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Personal Finance Visualizer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}