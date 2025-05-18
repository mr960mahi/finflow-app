import React from 'react';
import { Calendar } from 'lucide-react';
import { Subscription } from '../types';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency, getRelativeTime } from '../utils/formatters';
import * as LucideIcons from 'lucide-react';

interface SubscriptionCardProps {
  subscription: Subscription;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ subscription }) => {
  const { getCategoryById } = useFinance();
  const { name, amount, billingCycle, nextBillingDate, category } = subscription;
  
  const categoryDetails = getCategoryById(category);
  const relativeDate = getRelativeTime(nextBillingDate);
  
  const IconComponent = categoryDetails?.icon ? LucideIcons[categoryDetails.icon as keyof typeof LucideIcons] : null;
  
  // Determine if the billing date is coming soon (within 3 days)
  const isComingSoon = () => {
    const nextBilling = new Date(nextBillingDate);
    const now = new Date();
    const diffTime = nextBilling.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
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
          <span className="font-medium">{name}</span>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">{billingCycle}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">
          {formatCurrency(amount)}
        </div>
        
        <div className="flex items-center">
          <Calendar size={16} className="mr-1 text-gray-500" />
          <span className={`text-sm ${isComingSoon() ? 'text-warning-600 dark:text-warning-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
            {relativeDate}
          </span>
        </div>
      </div>
      
      {isComingSoon() && (
        <div className="mt-3">
          <span className="badge badge-warning">Due Soon</span>
        </div>
      )}
    </div>
  );
};

export default SubscriptionCard;