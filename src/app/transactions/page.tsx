'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Edit, Trash2, Plus, ArrowLeft } from 'lucide-react';

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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TransactionForm } from '@/components/transaction-form';
import { MonthlyExpensesChart } from '@/components/charts/monthly-expenses-chart';
import { useToast } from '@/components/ui/use-toast';
import { ITransaction } from '@/lib/models/transaction';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/transactions');
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError('Failed to load transactions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this transaction?')) {
      return;
    }

    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete transaction');
      }

      toast({
        title: 'Transaction deleted',
        description: 'The transaction has been deleted successfully.',
      });

      // Remove the deleted transaction from the state
      setTransactions(transactions.filter(t => t._id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete transaction. Please try again.',
      });
    }
  }

  function handleEdit(transaction: ITransaction) {
    setSelectedTransaction(transaction);
    setIsEditDialogOpen(true);
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-palette-pine-dark/30">
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
                className="text-sm font-medium transition-colors text-primary"
              >
                Transactions
              </Link>
              <Link
                href="/budgets"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Budgets
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-palette-pine-medium hover:bg-palette-pine-dark text-white"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Transaction
            </Button>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-palette-pine-dark dark:text-palette-pine-light">Transactions</h1>
          <Link href="/dashboard">
            <Button variant="outline" className="border-palette-pine-medium/50 text-palette-pine-dark dark:text-palette-pine-light">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-palette-pine-light/30 h-12 w-12"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-palette-pine-light/30 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-palette-pine-light/30 rounded"></div>
                  <div className="h-4 bg-palette-pine-light/30 rounded w-5/6"></div>
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
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-palette-pine-medium hover:bg-palette-pine-dark text-white"
            >
              Add your first transaction
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 mb-6">
            <div className="p-4 rounded-lg border border-palette-pine-medium/20 bg-card text-card-foreground shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-palette-pine-dark dark:text-palette-pine-light">Monthly Expenses</h3>
              <MonthlyExpensesChart transactions={transactions} />
            </div>
          </div>
        )}

        <Card className="border-palette-pine-medium/20 bg-card text-card-foreground shadow-sm">
          <CardHeader className="bg-palette-pine-light/5 dark:bg-palette-pine-medium/10 rounded-t-lg border-b border-palette-pine-medium/10">
            <CardTitle className="text-palette-pine-dark dark:text-palette-pine-light">Transaction History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-palette-pine-light/30 h-12 w-12"></div>
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-palette-pine-light/30 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-palette-pine-light/30 rounded"></div>
                      <div className="h-4 bg-palette-pine-light/30 rounded w-5/6"></div>
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
                <Button 
                  onClick={() => setIsAddDialogOpen(true)}
                  className="bg-palette-pine-medium hover:bg-palette-pine-dark text-white"
                >
                  Add your first transaction
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-palette-pine-light/5 dark:bg-palette-pine-medium/10 hover:bg-palette-pine-light/10 dark:hover:bg-palette-pine-medium/20">
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow 
                        key={transaction._id}
                        className="hover:bg-palette-pine-light/5 dark:hover:bg-palette-pine-medium/10 transition-colors"
                      >
                        <TableCell className="font-medium">
                          {format(new Date(transaction.date), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-palette-pine-light/20 text-palette-pine-dark dark:bg-palette-pine-medium/20 dark:text-palette-pine-light">
                            {transaction.category || 'Uncategorized'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(transaction.amount)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(transaction)}
                              className="hover:bg-palette-pine-light/20 hover:text-palette-pine-dark dark:hover:text-palette-pine-light"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(transaction._id!)}
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
      </main>
      
      <footer className="py-6 border-t bg-muted/40">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Personal Finance Visualizer. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Add Transaction Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-card border-palette-pine-medium/20">
          <DialogHeader className="border-b pb-4 mb-4 border-palette-pine-medium/10">
            <DialogTitle className="text-palette-pine-dark dark:text-palette-pine-light">Add Transaction</DialogTitle>
          </DialogHeader>
          <TransactionForm
            onSuccess={() => {
              setIsAddDialogOpen(false);
              fetchTransactions();
            }}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Transaction Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-card border-palette-pine-medium/20">
          <DialogHeader className="border-b pb-4 mb-4 border-palette-pine-medium/10">
            <DialogTitle className="text-palette-pine-dark dark:text-palette-pine-light">Edit Transaction</DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <TransactionForm
              transaction={selectedTransaction}
              onSuccess={() => {
                setIsEditDialogOpen(false);
                fetchTransactions();
              }}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}