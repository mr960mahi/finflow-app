import React from 'react';
import { Menu, X, Bell, Search, Plus } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../utils/formatters';

interface HeaderProps {
  toggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleMobileMenu, isMobileMenuOpen }) => {
  const { accounts } = useFinance();
  
  // Calculate total balance across all accounts
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 shadow-sm z-20 transition-colors duration-200">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left section - Logo and Menu Toggle */}
        <div className="flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="mr-4 p-1 rounded-md lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="flex items-center">
            <span className="text-primary-600 dark:text-primary-400 font-bold text-xl">FinFlow</span>
          </div>
        </div>

        {/* Middle section - Search */}
        <div className="hidden md:flex items-center max-w-md flex-1 mx-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10 py-1.5 text-sm"
              placeholder="Search transactions, budgets..."
            />
          </div>
        </div>

        {/* Right section - Balance and Actions */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:block">
            <div className="text-xs text-gray-500 dark:text-gray-400">Total Balance</div>
            <div className="font-semibold">{formatCurrency(totalBalance)}</div>
          </div>
          
          <button className="btn btn-primary py-1.5 px-3">
            <Plus size={18} className="mr-1" />
            <span className="hidden sm:inline">Add</span>
          </button>
          
          <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 bg-primary-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;