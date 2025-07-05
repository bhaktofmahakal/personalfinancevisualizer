# Personal Finance Visualizer

A web application for tracking and visualizing personal finances. This application allows users to manage transactions, categorize expenses, set budgets, and gain insights into their spending habits through interactive charts and visualizations.

![Personal Finance Visualizer](https://via.placeholder.com/800x400?text=Personal+Finance+Visualizer)

## Features

### Stage 1: Basic Transaction Tracking
- Add, edit, and delete transactions (amount, date, description)
- Transaction list view with sorting and filtering
- Monthly expenses bar chart
- Form validation for transaction inputs

### Stage 2: Categories
- Predefined categories for transactions
- Category-wise pie chart
- Dashboard with summary cards:
  - Total expenses
  - Category breakdown
  - Most recent transactions

### Stage 3: Budgeting
- Set monthly category budgets
- Budget vs actual comparison chart
- Spending insights and recommendations
- Monthly budget tracking

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TailwindCSS, shadcn/ui
- **Charts**: Recharts
- **Backend**: Next.js API routes
- **Database**: MongoDB
- **Form Handling**: React Hook Form, Zod
- **Styling**: TailwindCSS, shadcn/ui components

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- MongoDB instance (local or MongoDB Atlas)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/personal-finance-visualizer.git
cd personal-finance-visualizer
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
/src
  /app                 # Next.js App Router pages
    /api               # API routes
    /dashboard         # Dashboard page
    /transactions      # Transactions page
    /budgets           # Budgets page
  /components          # React components
    /ui                # UI components from shadcn/ui
    /charts            # Chart components
    /dashboard         # Dashboard-specific components
    /budget            # Budget-specific components
  /lib                 # Utility functions and shared code
    /models            # MongoDB models
```

## Deployment

This project can be easily deployed on Vercel:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

## License

MIT