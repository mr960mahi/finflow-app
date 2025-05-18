export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: Category;
  date: string;
  type: 'income' | 'expense';
  isRecurring?: boolean;
}

export interface Budget {
  id: string;
  category: Category;
  amount: number;
  spent: number;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
  isAutoSave: boolean;
  autoSaveAmount?: number;
  autoSaveFrequency?: 'daily' | 'weekly' | 'monthly';
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  billingCycle: 'weekly' | 'monthly' | 'yearly';
  nextBillingDate: string;
  category: Category;
}

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  currency: string;
}

export interface FinancialHealthScore {
  overall: number;
  savings: number;
  spending: number;
  debt: number;
  investment: number;
  improvementTips: string[];
}

export type Category = 
  | 'housing'
  | 'transportation'
  | 'food'
  | 'utilities'
  | 'healthcare'
  | 'personal'
  | 'entertainment'
  | 'education'
  | 'savings'
  | 'debt'
  | 'income'
  | 'other';

export interface CategoryDetail {
  id: Category;
  name: string;
  icon: string;
  color: string;
}

export interface DateRange {
  start: string;
  end: string;
  label: string;
}

export interface AppTheme {
  mode: 'light' | 'dark' | 'system';
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isGuest: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Modal {
  isOpen: boolean;
  type: 'transaction' | 'budget' | 'goal' | 'subscription' | null;
  data?: any;
}