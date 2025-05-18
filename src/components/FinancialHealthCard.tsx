import React from 'react';
import { ActivitySquare } from 'lucide-react';
import { FinancialHealthScore } from '../types';

interface FinancialHealthCardProps {
  financialHealth: FinancialHealthScore;
}

const FinancialHealthCard: React.FC<FinancialHealthCardProps> = ({ financialHealth }) => {
  const { overall, savings, spending, debt, investment, improvementTips } = financialHealth;
  
  // Get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success-500';
    if (score >= 60) return 'text-warning-500';
    return 'text-warning-600';
  };
  
  // Format score display
  const formatScore = (score: number) => {
    return (
      <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
        {score}
      </div>
    );
  };
  
  return (
    <div className="card">
      <div className="flex items-center mb-4">
        <ActivitySquare size={24} className="text-primary-500 mr-2" />
        <h3 className="text-lg font-semibold">Financial Health</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">Overall Score</div>
          {formatScore(overall)}
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="text-center">
            <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Savings</div>
            <div className={`text-lg font-semibold ${getScoreColor(savings)}`}>{savings}</div>
          </div>
          <div className="text-center">
            <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Spending</div>
            <div className={`text-lg font-semibold ${getScoreColor(spending)}`}>{spending}</div>
          </div>
          <div className="text-center">
            <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Debt</div>
            <div className={`text-lg font-semibold ${getScoreColor(debt)}`}>{debt}</div>
          </div>
          <div className="text-center">
            <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Investment</div>
            <div className={`text-lg font-semibold ${getScoreColor(investment)}`}>{investment}</div>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Improvement Tips</h4>
        <ul className="space-y-2">
          {improvementTips.map((tip, index) => (
            <li key={index} className="text-sm flex">
              <span className="text-primary-500 mr-2">•</span>
              <span className="text-gray-700 dark:text-gray-300">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FinancialHealthCard;