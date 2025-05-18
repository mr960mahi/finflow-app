import React from 'react';
import { Budget } from '../types';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency, calculatePercentage } from '../utils/formatters';
import * as LucideIcons from 'lucide-react';

interface BudgetCardProps {
  budget: Budget;
}

const BudgetCard: React.FC<BudgetCardProps> = ({ budget }) => {
  const { getCategoryById } = useFinance();
  const { category, amount, spent, period } = budget;
  
  const categoryDetails = getCategoryById(category);
  const spentPercentage = calculatePercentage(spent, amount);
  const remaining = amount - spent;
  
  const IconComponent = categoryDetails?.icon ? LucideIcons[categoryDetails.icon as keyof typeof LucideIcons] : null;
  
  // Determine progress bar color based on percentage
  const getProgressColor = () => {
    if (spentPercentage < 50) return 'bg-success-500';
    if (spentPercentage < 85) return 'bg-warning-500';
    return 'bg-warning-600';
  };
  
  return (
    <div className="card hover:scale-[1.01] transition-transform">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center mr-2"
            style={{ backgroundColor: categoryDetails?.color || '#6B7280' }}
          >
            {IconComponent && (
              <IconComponent size={16} className="text-white" />
            )}
          </div>
          <span className="font-medium">{categoryDetails?.name || category}</span>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">{period}</span>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {formatCurrency(spent)} of {formatCurrency(amount)}
          </span>
          <span className="text-sm font-medium">
            {spentPercentage}%
          </span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all ${getProgressColor()}`}
            style={{ width: `${Math.min(spentPercentage, 100)}%` }}
          ></div>
        </div>
      </div>
      
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <span className="font-medium text-gray-800 dark:text-gray-200">{formatCurrency(remaining)}</span> remaining
      </div>
    </div>
  );
};

export default BudgetCard;