import { Transaction, Budget, Goal, Subscription, Account, FinancialHealthScore, CategoryDetail } from '../types';

// Category data with icons from lucide-react
export const categories: CategoryDetail[] = [
  { id: 'housing', name: 'Housing', icon: 'home', color: '#3B7DFF' },
  { id: 'transportation', name: 'Transportation', icon: 'car', color: '#FF725C' },
  { id: 'food', name: 'Food & Dining', icon: 'utensils', color: '#36D9B0' },
  { id: 'utilities', name: 'Utilities', icon: 'plug', color: '#6B7280' },
  { id: 'healthcare', name: 'Healthcare', icon: 'heart-pulse', color: '#F43F5E' },
  { id: 'personal', name: 'Personal', icon: 'user', color: '#8B5CF6' },
  { id: 'entertainment', name: 'Entertainment', icon: 'film', color: '#EC4899' },
  { id: 'education', name: 'Education', icon: 'book-open', color: '#14B8A6' },
  { id: 'savings', name: 'Savings', icon: 'piggy-bank', color: '#22C55E' },
  { id: 'debt', name: 'Debt', icon: 'credit-card', color: '#EF4444' },
  { id: 'income', name: 'Income', icon: 'trending-up', color: '#22C55E' },
  { id: 'other', name: 'Other', icon: 'more-horizontal', color: '#6B7280' },
];

// Mock transactions
export const transactions: Transaction[] = [
  {
    id: '1',
    amount: 2200,
    description: 'Monthly Salary',
    category: 'income',
    date: '2025-03-01',
    type: 'income',
    isRecurring: true,
  },
  {
    id: '2',
    amount: 800,
    description: 'Rent Payment',
    category: 'housing',
    date: '2025-03-02',
    type: 'expense',
    isRecurring: true,
  },
  {
    id: '3',
    amount: 120,
    description: 'Grocery Shopping',
    category: 'food',
    date: '2025-03-03',
    type: 'expense',
  },
  {
    id: '4',
    amount: 45,
    description: 'Gas Station',
    category: 'transportation',
    date: '2025-03-04',
    type: 'expense',
  },
  {
    id: '5',
    amount: 15,
    description: 'Coffee Shop',
    category: 'food',
    date: '2025-03-05',
    type: 'expense',
  },
  {
    id: '6',
    amount: 50,
    description: 'Phone Bill',
    category: 'utilities',
    date: '2025-03-07',
    type: 'expense',
    isRecurring: true,
  },
  {
    id: '7',
    amount: 200,
    description: 'Savings Transfer',
    category: 'savings',
    date: '2025-03-10',
    type: 'expense',
    isRecurring: true,
  },
  {
    id: '8',
    amount: 60,
    description: 'Dinner with Friends',
    category: 'food',
    date: '2025-03-12',
    type: 'expense',
  },
  {
    id: '9',
    amount: 35,
    description: 'Movie Tickets',
    category: 'entertainment',
    date: '2025-03-15',
    type: 'expense',
  },
  {
    id: '10',
    amount: 300,
    description: 'Freelance Project',
    category: 'income',
    date: '2025-03-20',
    type: 'income',
  },
];

// Mock budgets
export const budgets: Budget[] = [
  { id: '1', category: 'housing', amount: 1000, spent: 800, period: 'monthly' },
  { id: '2', category: 'food', amount: 400, spent: 195, period: 'monthly' },
  { id: '3', category: 'transportation', amount: 200, spent: 45, period: 'monthly' },
  { id: '4', category: 'utilities', amount: 150, spent: 50, period: 'monthly' },
  { id: '5', category: 'entertainment', amount: 200, spent: 35, period: 'monthly' },
  { id: '6', category: 'savings', amount: 500, spent: 200, period: 'monthly' },
];

// Mock goals
export const goals: Goal[] = [
  {
    id: '1',
    name: 'Emergency Fund',
    targetAmount: 5000,
    currentAmount: 1200,
    targetDate: '2025-12-31',
    category: 'savings',
    isAutoSave: true,
    autoSaveAmount: 200,
    autoSaveFrequency: 'monthly',
  },
  {
    id: '2',
    name: 'Vacation',
    targetAmount: 2000,
    currentAmount: 500,
    targetDate: '2025-08-15',
    category: 'entertainment',
    isAutoSave: true,
    autoSaveAmount: 100,
    autoSaveFrequency: 'monthly',
  },
  {
    id: '3',
    name: 'New Laptop',
    targetAmount: 1500,
    currentAmount: 300,
    targetDate: '2025-09-30',
    category: 'personal',
    isAutoSave: false,
  },
];

// Mock subscriptions
export const subscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    amount: 15.99,
    billingCycle: 'monthly',
    nextBillingDate: '2025-04-15',
    category: 'entertainment',
  },
  {
    id: '2',
    name: 'Spotify',
    amount: 9.99,
    billingCycle: 'monthly',
    nextBillingDate: '2025-04-20',
    category: 'entertainment',
  },
  {
    id: '3',
    name: 'Gym Membership',
    amount: 50,
    billingCycle: 'monthly',
    nextBillingDate: '2025-04-01',
    category: 'healthcare',
  },
];

// Mock accounts
export const accounts: Account[] = [
  {
    id: '1',
    name: 'Main Checking',
    type: 'checking',
    balance: 2500,
    currency: 'USD',
  },
  {
    id: '2',
    name: 'Savings',
    type: 'savings',
    balance: 5000,
    currency: 'USD',
  },
  {
    id: '3',
    name: 'Credit Card',
    type: 'credit',
    balance: -450,
    currency: 'USD',
  },
];

// Mock financial health score
export const financialHealth: FinancialHealthScore = {
  overall: 72,
  savings: 65,
  spending: 80,
  debt: 85,
  investment: 58,
  improvementTips: [
    'Increase your emergency fund by $400 to reach 3 months of expenses',
    'Reduce spending on dining out by 15% to improve monthly cash flow',
    'Consider investing 5% more of your income to improve long-term growth',
  ],
};

// Get transaction summary for the current month
export const getTransactionSummary = () => {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  return {
    income,
    expenses,
    balance: income - expenses,
  };
};

// Get category spending data for charts
export const getCategorySpending = () => {
  const categorySpending = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const { category, amount } = transaction;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    }, {} as Record<string, number>);

  return Object.entries(categorySpending).map(([categoryId, value]) => {
    const category = categories.find(c => c.id === categoryId);
    return {
      name: category?.name || categoryId,
      value,
      color: category?.color,
    };
  });
};