# Personal Finance Visualizer

A comprehensive web application for tracking and visualizing personal finances. This application allows users to manage transactions, categorize expenses, set budgets, and gain insights into their spending habits through interactive charts and visualizations.

## Screenshots

### Dashboard
![Dashboard](https://i.imgur.com/XYZ123.png)
*Dashboard with summary cards, recent transactions, and spending overview*

### Transactions
![Transactions](https://i.imgur.com/ABC456.png)
*Transaction management with filtering and sorting options*

### Budgets
![Budgets](https://i.imgur.com/DEF789.png)
*Budget tracking with comparison charts and insights*

> Note: Replace the placeholder image URLs with actual screenshots of your application

## Features

### Stage 1: Basic Transaction Tracking ✅
- Add, edit, and delete transactions with amount, date, description
- Transaction list view with sorting and filtering capabilities
- Monthly expenses bar chart for visual tracking
- Form validation for transaction inputs with error handling

### Stage 2: Categories ✅
- Predefined categories for organizing transactions
- Interactive category-wise pie chart
- Comprehensive dashboard with summary cards:
  - Total income and expenses
  - Category breakdown with percentage analysis
  - Most recent transactions with quick actions

### Stage 3: Budgeting ✅
- Set and manage monthly category budgets
- Budget vs actual comparison chart with variance analysis
- Personalized spending insights and recommendations
- Monthly budget tracking with progress indicators
- Budget alerts for overspending categories

## Tech Stack

- **Frontend**: 
  - Next.js 14 with App Router for server components and routing
  - React 18 for UI components and hooks
  - TypeScript for type safety and better developer experience
  - TailwindCSS for utility-first styling
  - shadcn/ui for accessible and customizable UI components

- **Data Visualization**:
  - Recharts for responsive and interactive charts
  - Custom chart components for specialized visualizations

- **Backend**:
  - Next.js API routes for serverless API endpoints
  - MongoDB for database storage
  - Mongoose for data modeling and validation

- **State Management & Form Handling**:
  - React Context API for theme management
  - React Query for server state management
  - React Hook Form for form handling
  - Zod for schema validation

- **Styling & Design**:
  - Custom color palette with light/dark mode support
  - Responsive design for mobile, tablet, and desktop
  - Accessibility features following WCAG guidelines

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- MongoDB instance (local or MongoDB Atlas)
- Git for version control

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

3. Create a `.env.local` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Testing Data

To populate the application with sample data for testing:

1. Use the application UI to create transactions and budgets
2. Or use the provided API endpoints:
   - POST `/api/transactions` to create transactions
   - POST `/api/budgets` to create budgets

## Project Structure

```
/src
  /app                 # Next.js App Router pages
    /api               # API routes
      /transactions    # Transaction API endpoints
      /budgets         # Budget API endpoints
    /dashboard         # Dashboard page
    /transactions      # Transactions page
    /budgets           # Budgets page
  /components          # React components
    /ui                # UI components from shadcn/ui
    /charts            # Chart components
      /BudgetComparisonChart.tsx  # Budget vs actual chart
      /CategoryPieChart.tsx       # Category distribution chart
      /MonthlyExpensesChart.tsx   # Monthly expenses chart
    /dashboard         # Dashboard-specific components
    /transactions      # Transaction-specific components
    /budgets           # Budget-specific components
    /theme-provider.tsx # Theme context provider
    /theme-toggle.tsx   # Theme toggle component
  /lib                 # Utility functions and shared code
    /models            # MongoDB models
      /Transaction.ts  # Transaction model
      /Budget.ts       # Budget model
    /utils.ts          # Utility functions
    /db.ts             # Database connection
```

## Deployment

This project can be easily deployed on Vercel:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard:
   - `MONGODB_URI`: Your MongoDB connection string
4. Deploy!

## Features Implemented

- ✅ **Transaction Management**
  - Create, read, update, delete transactions
  - Filter by date range, category, and amount
  - Sort by date, amount, or category
  - Pagination for large transaction lists

- ✅ **Budget Management**
  - Create and manage category-specific budgets
  - Monthly budget tracking
  - Budget vs actual comparison
  - Overspending alerts

- ✅ **Dashboard & Analytics**
  - Summary cards with key financial metrics
  - Interactive charts for expense analysis
  - Recent transaction list
  - Spending trends and patterns

- ✅ **UI/UX**
  - Responsive design for all device sizes
  - Dark/light theme toggle
  - Consistent color palette
  - Loading states and error handling
  - Accessible components

## Future Enhancements

- Income vs expense tracking
- Recurring transaction support
- Export data to CSV/PDF
- Financial goal setting
- Investment portfolio tracking

## License

MIT