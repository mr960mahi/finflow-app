import React, { useState } from 'react';
import { LayoutDashboard, PlusCircle, Calendar, ChevronDown, TrendingUp, TrendingDown, CreditCard } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../utils/formatters';
import AccountCard from '../components/AccountCard';
import TransactionItem from '../components/TransactionItem';
import BudgetCard from '../components/BudgetCard';
import SubscriptionCard from '../components/SubscriptionCard';
import FinancialHealthCard from '../components/FinancialHealthCard';
import { PieChart, SpendingTrend } from '../components/Charts';
import { getCategorySpending, getTransactionSummary } from '../utils/mockData';

// Mock data for spending trend chart
const trendData = [
  { name: 'Jan', income: 2500, expense: 1800 },
  { name: 'Feb', income: 2300, expense: 2100 },
  { name: 'Mar', income: 2800, expense: 1950 },
  { name: 'Apr', income: 2600, expense: 2200 },
  { name: 'May', income: 3100, expense: 2300 },
  { name: 'Jun', income: 2900, expense: 2500 },
];

const Dashboard: React.FC = () => {
  const { 
    transactions, 
    budgets, 
    subscriptions, 
    accounts, 
    financialHealth,
    dateRange,
    setDateRange
  } = useFinance();
  
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  
  // Get recent transactions (limited to 5)
  const recentTransactions = transactions.slice(0, 5);
  
  // Get category spending data for chart
  const categorySpending = getCategorySpending();
  
  // Get financial summary
  const { income, expenses, balance } = getTransactionSummary();
  
  // Toggle date range dropdown
  const toggleDateDropdown = () => {
    setShowDateDropdown(!showDateDropdown);
  };
  
  return (
    <div className="animated-enter">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <LayoutDashboard size={24} className="mr-2 text-primary-500" />
          Dashboard
        </h1>
        
        <div className="relative">
          <button
            onClick={toggleDateDropdown}
            className="btn btn-secondary flex items-center text-sm"
          >
            <Calendar size={16} className="mr-2" />
            {dateRange.label}
            <ChevronDown size={16} className="ml-2" />
          </button>
          
          {showDateDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 py-1">
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  setDateRange({
                    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
                    end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString(),
                    label: 'This Month',
                  });
                  setShowDateDropdown(false);
                }}
              >
                This Month
              </button>
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  setDateRange({
                    start: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toISOString(),
                    end: new Date(new Date().getFullYear(), new Date().getMonth(), 0).toISOString(),
                    label: 'Last Month',
                  });
                  setShowDateDropdown(false);
                }}
              >
                Last Month
              </button>
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  setDateRange({
                    start: new Date(new Date().getFullYear(), new Date().getMonth() - 3, 1).toISOString(),
                    end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString(),
                    label: 'Last 3 Months',
                  });
                  setShowDateDropdown(false);
                }}
              >
                Last 3 Months
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20 border border-primary-100 dark:border-primary-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center mr-3">
                <TrendingUp size={20} className="text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Income</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(income)}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card bg-warning-50 dark:bg-warning-900 dark:bg-opacity-20 border border-warning-100 dark:border-warning-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-warning-100 dark:bg-warning-800 flex items-center justify-center mr-3">
                <TrendingDown size={20} className="text-warning-600 dark:text-warning-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Expenses</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(expenses)}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card bg-success-50 dark:bg-success-900 dark:bg-opacity-20 border border-success-100 dark:border-success-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-success-100 dark:bg-success-800 flex items-center justify-center mr-3">
                <CreditCard size={20} className="text-success-600 dark:text-success-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Balance</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(balance)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Spending Overview */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Spending Overview</h3>
            </div>
            <SpendingTrend data={trendData} />
          </div>
          
          {/* Recent Transactions */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recent Transactions</h3>
              <button className="btn btn-secondary text-sm">View All</button>
            </div>
            <div className="space-y-1">
              {recentTransactions.map(transaction => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
              
              <button className="w-full mt-3 flex items-center justify-center text-primary-500 hover:text-primary-600 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <PlusCircle size={16} className="mr-1" />
                <span className="text-sm font-medium">Add Transaction</span>
              </button>
            </div>
          </div>
          
          {/* Accounts */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">My Accounts</h3>
              <button className="btn btn-secondary text-sm">View All</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {accounts.map(account => (
                <AccountCard key={account.id} account={account} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Financial Health */}
          <FinancialHealthCard financialHealth={financialHealth} />
          
          {/* Spending by Category */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Spending by Category</h3>
            </div>
            <PieChart data={categorySpending} />
            <div className="mt-2 space-y-2">
              {categorySpending.slice(0, 3).map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Budget */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Budget</h3>
              <button className="btn btn-secondary text-sm">View All</button>
            </div>
            <div className="space-y-4">
              {budgets.slice(0, 3).map(budget => (
                <BudgetCard key={budget.id} budget={budget} />
              ))}
            </div>
          </div>
          
          {/* Upcoming Subscriptions */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upcoming Subscriptions</h3>
              <button className="btn btn-secondary text-sm">View All</button>
            </div>
            <div className="space-y-4">
              {subscriptions.slice(0, 2).map(subscription => (
                <SubscriptionCard key={subscription.id} subscription={subscription} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;