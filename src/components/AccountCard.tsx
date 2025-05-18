import React from 'react';
import { CreditCard, ArrowUpRight } from 'lucide-react';
import { Account } from '../types';
import { formatCurrency } from '../utils/formatters';

interface AccountCardProps {
  account: Account;
}

const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
  const { name, type, balance, currency } = account;
  
  // Determine card background and text color based on account type
  const getCardStyles = () => {
    switch (type) {
      case 'checking':
        return 'bg-primary-500 text-white';
      case 'savings':
        return 'bg-success-500 text-white';
      case 'credit':
        return 'bg-warning-500 text-white';
      case 'investment':
        return 'bg-gray-800 text-white';
      default:
        return 'bg-primary-500 text-white';
    }
  };

  return (
    <div className={`rounded-xl overflow-hidden shadow-card ${getCardStyles()}`}>
      <div className="p-4">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center">
            <CreditCard size={20} className="mr-2" />
            <span className="font-medium">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          </div>
          <ArrowUpRight size={16} />
        </div>
        
        <div className="mb-3">
          <div className="text-sm opacity-80">Balance</div>
          <div className="text-2xl font-bold">
            {formatCurrency(balance, currency)}
          </div>
        </div>
        
        <div className="text-sm font-medium mt-4">
          {name}
        </div>
      </div>
    </div>
  );
};

export default AccountCard;