import React from 'react';
import { PieChart as PieChartIcon, Plus, Download } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import BudgetCard from '../components/BudgetCard';
import { PieChart, ExpenseBarChart } from '../components/Charts';
import { getCategorySpending } from '../utils/mockData';
import { formatCurrency, calculatePercentage } from '../utils/formatters';

const Budget: React.FC = () => {
  const { budgets } = useFinance();
  
  // Get spending data for charts
  const categorySpending = getCategorySpending();
  
  // Calculate budget summary
  const totalBudgeted = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const remainingBudget = totalBudgeted - totalSpent;
  const spentPercentage = calculatePercentage(totalSpent, totalBudgeted);
  
  return (
    <div className="animated-enter">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <PieChartIcon size={24} className="mr-2 text-primary-500" />
          Budget
        </h1>
        
        <div className="flex space-x-3">
          <button className="btn btn-secondary">
            <Download size={18} className="mr-2" />
            Export
          </button>
          <button className="btn btn-primary">
            <Plus size={18} className="mr-2" />
            Create Budget
          </button>
        </div>
      </div>
      
      {/* Budget Summary */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Budget Overview</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatCurrency(totalSpent)} of {formatCurrency(totalBudgeted)}
                  </span>
                  <span className="text-sm font-medium">
                    {spentPercentage}%
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      spentPercentage < 75 
                        ? 'bg-primary-500' 
                        : spentPercentage < 90 
                          ? 'bg-warning-500' 
                          : 'bg-warning-600'
                    }`}
                    style={{ width: `${Math.min(spentPercentage, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Total Budgeted</div>
                  <div className="text-xl font-bold">{formatCurrency(totalBudgeted)}</div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Remaining</div>
                  <div className="text-xl font-bold">{formatCurrency(remainingBudget)}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
            <PieChart data={categorySpending} />
          </div>
        </div>
      </div>
      
      {/* Category Spending */}
      <div className="card mb-6">
        <h3 className="text-lg font-semibold mb-4">Category Spending</h3>
        <ExpenseBarChart data={categorySpending} />
      </div>
      
      {/* Budget Categories */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Budget Categories</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgets.map(budget => (
            <BudgetCard key={budget.id} budget={budget} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Budget;