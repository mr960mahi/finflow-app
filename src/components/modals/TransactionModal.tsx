import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { useModal } from '../../context/ModalContext';

const TransactionModal: React.FC = () => {
  const { categories, addTransaction } = useFinance();
  const { closeModal } = useModal();
  
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    description: '',
    category: 'other',
    date: new Date().toISOString().split('T')[0],
    isRecurring: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addTransaction({
      amount: parseFloat(formData.amount),
      description: formData.description,
      category: formData.category,
      date: formData.date,
      type: formData.type as 'income' | 'expense',
      isRecurring: formData.isRecurring,
    });
    
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Transaction</h2>
          <button onClick={closeModal} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              className="input"
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              className="input"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              required
              min="0"
              step="0.01"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <input
              type="text"
              className="input"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              className="input"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              className="input"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              required
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isRecurring"
              className="mr-2"
              checked={formData.isRecurring}
              onChange={(e) => setFormData(prev => ({ ...prev, isRecurring: e.target.checked }))}
            />
            <label htmlFor="isRecurring" className="text-sm">Recurring Transaction</label>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;