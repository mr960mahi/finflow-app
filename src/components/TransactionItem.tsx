import React from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { Transaction } from '../types';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import * as LucideIcons from 'lucide-react';

interface TransactionItemProps {
  transaction: Transaction;
  showCategory?: boolean;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ 
  transaction, 
  showCategory = true 
}) => {
  const { getCategoryById } = useFinance();
  const { amount, description, category, date, type, isRecurring } = transaction;
  
  const categoryDetails = getCategoryById(category);
  
  const IconComponent = categoryDetails?.icon ? LucideIcons[categoryDetails.icon as keyof typeof LucideIcons] : null;
  
  return (
    <div className="flex items-center py-3 hover:bg-gray-50 dark:hover:bg-gray-800 px-2 rounded-lg transition-colors cursor-pointer">
      {/* Icon */}
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
        style={{ backgroundColor: categoryDetails?.color || '#6B7280' }}
      >
        {IconComponent ? (
          <IconComponent size={18} className="text-white" />
        ) : type === 'income' ? (
          <ArrowDownLeft size={18} className="text-white" />
        ) : (
          <ArrowUpRight size={18} className="text-white" />
        )}
      </div>
      
      {/* Description */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center">
          <p className="font-medium text-gray-900 dark:text-white truncate">
            {description}
          </p>
          {isRecurring && (
            <span className="ml-2 badge badge-success">Recurring</span>
          )}
        </div>
        
        {showCategory && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {categoryDetails?.name || category}
          </p>
        )}
      </div>
      
      {/* Amount and Date */}
      <div className="text-right pl-2">
        <p className={`font-medium ${
          type === 'income' ? 'text-success-600 dark:text-success-400' : 'text-gray-900 dark:text-white'
        }`}>
          {type === 'income' ? '+' : '-'}{formatCurrency(amount)}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(date)}</p>
      </div>
    </div>
  );
};

export default TransactionItem;