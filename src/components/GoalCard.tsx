import React from 'react';
import { Target } from 'lucide-react';
import { Goal } from '../types';
import { formatCurrency, formatDate, calculatePercentage } from '../utils/formatters';

interface GoalCardProps {
  goal: Goal;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const { name, targetAmount, currentAmount, targetDate, isAutoSave, autoSaveAmount, autoSaveFrequency } = goal;
  
  const progressPercentage = calculatePercentage(currentAmount, targetAmount);
  const remaining = targetAmount - currentAmount;
  
  // Format auto-save information if enabled
  const getAutoSaveInfo = () => {
    if (!isAutoSave || !autoSaveAmount || !autoSaveFrequency) return null;
    
    return (
      <div className="mt-3 flex items-center text-sm">
        <div className="badge badge-success mr-2">Auto-Save</div>
        <span className="text-gray-600 dark:text-gray-300">
          {formatCurrency(autoSaveAmount)} {autoSaveFrequency}
        </span>
      </div>
    );
  };
  
  return (
    <div className="card hover:scale-[1.01] transition-transform">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center mr-2">
            <Target size={16} className="text-white" />
          </div>
          <span className="font-medium">{name}</span>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">Target: {formatDate(targetDate)}</span>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {formatCurrency(currentAmount)} of {formatCurrency(targetAmount)}
          </span>
          <span className="text-sm font-medium">
            {progressPercentage}%
          </span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-primary-500 rounded-full transition-all"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <span className="font-medium text-gray-800 dark:text-gray-200">{formatCurrency(remaining)}</span> to go
      </div>
      
      {getAutoSaveInfo()}
    </div>
  );
};

export default GoalCard;