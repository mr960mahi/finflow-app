import React from 'react';
import { Target, Plus, Trash2, Edit } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import GoalCard from '../components/GoalCard';
import { formatCurrency } from '../utils/formatters';

const Goals: React.FC = () => {
  const { goals } = useFinance();
  
  // Calculate total goal amount and current progress
  const totalGoalAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalCurrentAmount = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalProgress = (totalCurrentAmount / totalGoalAmount) * 100;
  
  return (
    <div className="animated-enter">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Target size={24} className="mr-2 text-primary-500" />
          Goals
        </h1>
        
        <button className="btn btn-primary">
          <Plus size={18} className="mr-2" />
          Add Goal
        </button>
      </div>
      
      {/* Goals Summary */}
      <div className="card mb-6">
        <h3 className="text-lg font-semibold mb-4">Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Goal Amount</div>
            <div className="text-xl font-bold">{formatCurrency(totalGoalAmount)}</div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Current Progress</div>
            <div className="text-xl font-bold">{formatCurrency(totalCurrentAmount)}</div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Remaining</div>
            <div className="text-xl font-bold">{formatCurrency(totalGoalAmount - totalCurrentAmount)}</div>
          </div>
        </div>
        
        <div className="mb-2">
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Overall Progress
            </span>
            <span className="text-sm font-medium">
              {Math.round(totalProgress)}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-primary-500 rounded-full transition-all"
              style={{ width: `${totalProgress}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Goals List */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Your Goals</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map(goal => (
            <div key={goal.id} className="relative group">
              <GoalCard goal={goal} />
              
              {/* Hover Actions */}
              <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Edit size={14} />
                </button>
                <button className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          
          {/* Add Goal Card */}
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex items-center justify-center p-6 cursor-pointer hover:border-primary-500 dark:hover:border-primary-500 transition-colors">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-2">
                <Plus size={24} className="text-gray-500 dark:text-gray-400" />
              </div>
              <p className="font-medium text-gray-900 dark:text-white">Add New Goal</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track your progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;