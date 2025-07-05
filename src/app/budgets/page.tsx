'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Edit, Trash2, Plus, ArrowLeft, Calendar } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BudgetForm } from '@/components/budget/budget-form';
import { BudgetComparisonChart } from '@/components/charts/budget-comparison-chart';
import { SpendingInsights } from '@/components/budget/spending-insights';
import { useToast } from '@/components/ui/use-toast';
import { IBudget } from '@/lib/models/budget';
import { ITransaction } from '@/lib/models/transaction';

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<IBudget[]>([]);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<IBudget | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, [selectedMonth]);

  async function fetchData() {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch budgets for the selected month
      const budgetsResponse = await fetch(`/api/budgets?month=${selectedMonth}`);
      if (!budgetsResponse.ok) {
        throw new Error('Failed to fetch budgets');
      }
      const budgetsData = await budgetsResponse.json();
      setBudgets(budgetsData);

      // Fetch all transactions (we'll filter by month in the components)
      const transactionsResponse = await fetch('/api/transactions');
      if (!transactionsResponse.ok) {
        throw new Error('Failed to fetch transactions');
      }
      const transactionsData = await transactionsResponse.json();
      setTransactions(transactionsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this budget?')) {
      return;
    }

    try {
      const response = await fetch(`/api/budgets/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete budget');
      }

      toast({
        title: 'Budget deleted',
        description: 'The budget has been deleted successfully.',
      });

      // Remove the deleted budget from the state
      setBudgets(budgets.filter(b => b._id !== id));
    } catch (error) {
      console.error('Error deleting budget:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete budget. Please try again.',
      });
    }
  }

  function handleEdit(budget: IBudget) {
    setSelectedBudget(budget);
    setIsEditDialogOpen(true);
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }

  // Generate month options (current month and 11 previous months)
  const getMonthOptions = () => {
    const options = [];
    const now = new Date();
    
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const value = format(date, 'yyyy-MM');
      const label = format(date, 'MMMM yyyy');
      options.push({ value, label });
    }
    
    return options;
  };

  const monthOptions = getMonthOptions();

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-palette-amber-dark/20">
      <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block text-xl">
                Personal Finance Visualizer
              </span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="/dashboard"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Dashboard
              </Link>
              <Link
                href="/transactions"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Transactions
              </Link>
              <Link
                href="/budgets"
                className="text-sm font-medium transition-colors text-primary"
              >
                Budgets
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-palette-amber-medium hover:bg-palette-amber-dark text-white"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Budget
            </Button>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-palette-amber-dark dark:text-palette-amber-light">Budgets</h1>
            <Link href="/dashboard">
              <Button variant="outline" className="border-palette-amber-medium/50 text-palette-amber-dark dark:text-palette-amber-light">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-palette-amber-light/20 dark:bg-palette-amber-medium/10 border border-palette-amber-medium/20">
            <Calendar className="h-4 w-4 text-palette-amber-medium" />
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[180px] border-palette-amber-medium/30 focus:ring-palette-amber-medium/30">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {monthOptions.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-palette-amber-light/30 h-12 w-12"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-palette-amber-light/30 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-palette-amber-light/30 rounded"></div>
                  <div className="h-4 bg-palette-amber-light/30 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center py-8 text-palette-velvet-medium">
            <p className="bg-palette-velvet-light/20 px-4 py-2 rounded-md">{error}</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 mb-6">
              <div className="p-4 rounded-lg border border-palette-amber-medium/20 bg-card text-card-foreground shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-palette-amber-dark dark:text-palette-amber-light">Budget vs. Actual</h3>
                <BudgetComparisonChart 
                  transactions={transactions} 
                  budgets={budgets} 
                  month={selectedMonth} 
                />
              </div>
              <div className="p-4 rounded-lg border border-palette-velvet-medium/20 bg-card text-card-foreground shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-palette-velvet-dark dark:text-palette-velvet-light">Spending Insights</h3>
                <SpendingInsights 
                  transactions={transactions} 
                  budgets={budgets} 
                  month={selectedMonth} 
                />
              </div>
            </div>

            <Card className="border-palette-amber-medium/20 bg-card text-card-foreground shadow-sm">
              <CardHeader className="bg-palette-amber-light/5 dark:bg-palette-amber-medium/10 rounded-t-lg border-b border-palette-amber-medium/10">
                <CardTitle className="text-palette-amber-dark dark:text-palette-amber-light">Budget Settings</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {budgets.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="mb-4 text-muted-foreground">No budgets found for {format(new Date(selectedMonth + '-01'), 'MMMM yyyy')}</p>
                    <Button 
                      onClick={() => setIsAddDialogOpen(true)}
                      className="bg-palette-amber-medium hover:bg-palette-amber-dark text-white"
                    >
                      Set up your first budget
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-palette-amber-light/5 dark:bg-palette-amber-medium/10 hover:bg-palette-amber-light/10 dark:hover:bg-palette-amber-medium/20">
                          <TableHead>Category</TableHead>
                          <TableHead className="text-right">Budget Amount</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {budgets.map((budget) => (
                          <TableRow 
                            key={budget._id}
                            className="hover:bg-palette-amber-light/5 dark:hover:bg-palette-amber-medium/10 transition-colors"
                          >
                            <TableCell>
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-palette-amber-light/20 text-palette-amber-dark dark:bg-palette-amber-medium/20 dark:text-palette-amber-light">
                                {budget.category}
                              </span>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {formatCurrency(budget.amount)}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEdit(budget)}
                                  className="hover:bg-palette-amber-light/20 hover:text-palette-amber-dark dark:hover:text-palette-amber-light"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDelete(budget._id!)}
                                  className="hover:bg-palette-velvet-light/20 hover:text-palette-velvet-medium"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </main>

      {/* Add Budget Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-card border-palette-amber-medium/20">
          <DialogHeader className="border-b pb-4 mb-4 border-palette-amber-medium/10">
            <DialogTitle className="text-palette-amber-dark dark:text-palette-amber-light">Add Budget</DialogTitle>
          </DialogHeader>
          <BudgetForm
            currentMonth={selectedMonth}
            onSuccess={() => {
              setIsAddDialogOpen(false);
              fetchData();
            }}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Budget Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-card border-palette-amber-medium/20">
          <DialogHeader className="border-b pb-4 mb-4 border-palette-amber-medium/10">
            <DialogTitle className="text-palette-amber-dark dark:text-palette-amber-light">Edit Budget</DialogTitle>
          </DialogHeader>
          {selectedBudget && (
            <BudgetForm
              budget={selectedBudget}
              onSuccess={() => {
                setIsEditDialogOpen(false);
                fetchData();
              }}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
      
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