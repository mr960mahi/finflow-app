import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Receipt,
  PieChart,
  Target,
  CreditCard,
  Settings,
  LogOut,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  closeMobileMenu: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeMobileMenu }) => {
  // Navigation items with icons
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Transactions', path: '/transactions', icon: <Receipt size={20} /> },
    { name: 'Budget', path: '/budget', icon: <PieChart size={20} /> },
    { name: 'Goals', path: '/goals', icon: <Target size={20} /> },
    { name: 'Accounts', path: '/accounts', icon: <CreditCard size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  // Determine sidebar classes based on mobile menu state
  const sidebarClasses = `
    fixed lg:static inset-y-0 left-0 z-10
    w-64 h-full bg-white dark:bg-gray-800 shadow-md
    transition-transform duration-300 ease-in-out
    lg:translate-x-0 lg:transition-none
    pt-16 lg:pt-16 pb-4
    flex flex-col
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
  `;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}

      <aside className={sidebarClasses}>
        {/* Close button for mobile */}
        <button
          onClick={closeMobileMenu}
          className="absolute top-4 right-4 p-1 rounded-md lg:hidden"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `flex items-center px-3 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-600 dark:bg-gray-700 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="px-4 mt-auto">
          <button className="flex items-center w-full px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <LogOut size={20} className="mr-3" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;