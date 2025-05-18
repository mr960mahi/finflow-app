import React, { useState } from 'react';
import { Receipt, Plus, Filter, Search, Download } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import TransactionItem from '../components/TransactionItem';
import { Transaction, Category } from '../types';

const Transactions: React.FC = () => {
  const { transactions, categories } = useFinance();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'income' | 'expense'>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  
  // Filter transactions based on search, type, and category
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || transaction.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || transaction.category === selectedCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  });
  
  return (
    <div className="animated-enter">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Receipt size={24} className="mr-2 text-primary-500" />
          Transactions
        </h1>
        
        <button className="btn btn-primary">
          <Plus size={18} className="mr-2" />
          Add Transaction
        </button>
      </div>
      
      {/* Filters and Search */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-3">
            <div className="relative">
              <select
                className="input appearance-none pr-8"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as 'all' | 'income' | 'expense')}
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <Filter size={16} className="text-gray-400" />
              </div>
            </div>
            
            <div className="relative">
              <select
                className="input appearance-none pr-8"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Category | 'all')}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <Filter size={16} className="text-gray-400" />
              </div>
            </div>
            
            <button className="btn btn-secondary">
              <Download size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Transactions List */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Description</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction: Transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-3 text-sm">{transaction.description}</td>
                  <td className="px-4 py-3 text-sm">
                    {categories.find(c => c.id === transaction.category)?.name || transaction.category}
                  </td>
                  <td className="px-4 py-3 text-sm">{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className={`px-4 py-3 text-sm text-right font-medium ${
                    transaction.type === 'income' 
                      ? 'text-success-600 dark:text-success-400' 
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(transaction.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredTransactions.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">No transactions found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;