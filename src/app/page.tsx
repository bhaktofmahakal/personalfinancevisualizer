import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, LineChart, DollarSign } from 'lucide-react'
import { Header } from '@/components/header'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
        <div className="z-10 max-w-5xl w-full items-center justify-center text-sm flex flex-col">
          <h1 className="text-4xl font-bold mb-4 text-center">Personal Finance Visualizer</h1>
          <p className="text-xl mb-8 text-center">Track and visualize your personal finances</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            <Card className="border-palette-sapphire-medium/20 hover:border-palette-sapphire-medium/50 transition-colors">
              <CardHeader className="bg-palette-noir-light/5 dark:bg-palette-noir-medium/10 rounded-t-lg">
                <CardTitle className="flex items-center text-palette-sapphire-dark dark:text-palette-sapphire-light">
                  <BarChart3 className="mr-2 h-5 w-5 text-chart-sapphire" />
                  Dashboard
                </CardTitle>
                <CardDescription>
                  View your financial overview
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Get insights into your spending patterns with summary cards and visualizations.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/dashboard" className="w-full">
                  <Button className="w-full bg-palette-sapphire-medium hover:bg-palette-sapphire-dark text-white">
                    Go to Dashboard
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="border-palette-pine-medium/20 hover:border-palette-pine-medium/50 transition-colors">
              <CardHeader className="bg-palette-pine-light/10 dark:bg-palette-pine-medium/10 rounded-t-lg">
                <CardTitle className="flex items-center text-palette-pine-dark dark:text-palette-pine-light">
                  <LineChart className="mr-2 h-5 w-5 text-palette-pine-medium" />
                  Transactions
                </CardTitle>
                <CardDescription>
                  Manage your transactions
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Add, edit, and delete transactions. View your transaction history and monthly expenses.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/transactions" className="w-full">
                  <Button className="w-full bg-palette-pine-medium hover:bg-palette-pine-dark text-white">
                    View Transactions
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="border-palette-amber-medium/20 hover:border-palette-amber-medium/50 transition-colors">
              <CardHeader className="bg-palette-amber-light/10 dark:bg-palette-amber-medium/10 rounded-t-lg">
                <CardTitle className="flex items-center text-palette-amber-dark dark:text-palette-amber-light">
                  <DollarSign className="mr-2 h-5 w-5 text-chart-amber" />
                  Budgets
                </CardTitle>
                <CardDescription>
                  Set and track your budgets
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Create monthly budgets for different categories and track your spending against them.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/budgets" className="w-full">
                  <Button className="w-full bg-palette-amber-medium hover:bg-palette-amber-dark text-white">
                    Manage Budgets
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <footer className="py-6 border-t bg-muted/40">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Personal Finance Visualizer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}