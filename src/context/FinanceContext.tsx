import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Transaction,
  Budget,
  Goal,
  Subscription,
  Account,
  FinancialHealthScore,
  Category,
  DateRange
} from '../types';
import {
  transactions as mockTransactions,
  budgets as mockBudgets,
  goals as mockGoals,
  subscriptions as mockSubscriptions,
  accounts as mockAccounts,
  financialHealth as mockFinancialHealth,
  categories as mockCategories
} from '../utils/mockData';

interface FinanceContextType {
  transactions: Transaction[];
  budgets: Budget[];
  goals: Goal[];
  subscriptions: Subscription[];
  accounts: Account[];
  categories: typeof mockCategories;
  financialHealth: FinancialHealthScore;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  updateBudget: (id: string, budget: Partial<Budget>) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, goal: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  addSubscription: (subscription: Omit<Subscription, 'id'>) => void;
  updateSubscription: (id: string, subscription: Partial<Subscription>) => void;
  deleteSubscription: (id: string) => void;
  getCategoryById: (id: Category) => typeof mockCategories[0] | undefined;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

// Preset date ranges
const dateRanges = {
  thisMonth: {
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
    end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString(),
    label: 'This Month',
  },
  lastMonth: {
    start: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toISOString(),
    end: new Date(new Date().getFullYear(), new Date().getMonth(), 0).toISOString(),
    label: 'Last Month',
  },
  threeMonths: {
    start: new Date(new Date().getFullYear(), new Date().getMonth() - 3, 1).toISOString(),
    end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString(),
    label: 'Last 3 Months',
  },
};

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(mockSubscriptions);
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [financialHealth, setFinancialHealth] = useState<FinancialHealthScore>(mockFinancialHealth);
  const [dateRange, setDateRange] = useState<DateRange>(dateRanges.thisMonth);
  
  // Add a new transaction
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    
    // Update budget spent amount
    if (transaction.type === 'expense') {
      setBudgets(prev => 
        prev.map(budget => 
          budget.category === transaction.category
            ? { ...budget, spent: budget.spent + transaction.amount }
            : budget
        )
      );
    }
  };
  
  // Update an existing transaction
  const updateTransaction = (id: string, transaction: Partial<Transaction>) => {
    setTransactions(prev => 
      prev.map(t => 
        t.id === id ? { ...t, ...transaction } : t
      )
    );
  };
  
  // Delete a transaction
  const deleteTransaction = (id: string) => {
    const transaction = transactions.find(t => t.id === id);
    
    if (transaction && transaction.type === 'expense') {
      // Update budget spent amount when deleting an expense
      setBudgets(prev => 
        prev.map(budget => 
          budget.category === transaction.category
            ? { ...budget, spent: Math.max(0, budget.spent - transaction.amount) }
            : budget
        )
      );
    }
    
    setTransactions(prev => prev.filter(t => t.id !== id));
  };
  
  // Update a budget
  const updateBudget = (id: string, budget: Partial<Budget>) => {
    setBudgets(prev => 
      prev.map(b => 
        b.id === id ? { ...b, ...budget } : b
      )
    );
  };
  
  // Add a new goal
  const addGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString(),
    };
    
    setGoals(prev => [...prev, newGoal]);
  };
  
  // Update an existing goal
  const updateGoal = (id: string, goal: Partial<Goal>) => {
    setGoals(prev => 
      prev.map(g => 
        g.id === id ? { ...g, ...goal } : g
      )
    );
  };
  
  // Delete a goal
  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };
  
  // Add a new subscription
  const addSubscription = (subscription: Omit<Subscription, 'id'>) => {
    const newSubscription = {
      ...subscription,
      id: Date.now().toString(),
    };
    
    setSubscriptions(prev => [...prev, newSubscription]);
  };
  
  // Update an existing subscription
  const updateSubscription = (id: string, subscription: Partial<Subscription>) => {
    setSubscriptions(prev => 
      prev.map(s => 
        s.id === id ? { ...s, ...subscription } : s
      )
    );
  };
  
  // Delete a subscription
  const deleteSubscription = (id: string) => {
    setSubscriptions(prev => prev.filter(s => s.id !== id));
  };
  
  // Get category details by ID
  const getCategoryById = (id: Category) => {
    return mockCategories.find(category => category.id === id);
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        budgets,
        goals,
        subscriptions,
        accounts,
        categories: mockCategories,
        financialHealth,
        dateRange,
        setDateRange,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        updateBudget,
        addGoal,
        updateGoal,
        deleteGoal,
        addSubscription,
        updateSubscription,
        deleteSubscription,
        getCategoryById,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};