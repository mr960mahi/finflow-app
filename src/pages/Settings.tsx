import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Lock, CreditCard, User, Moon, Sun, Smartphone } from 'lucide-react';

const Settings: React.FC = () => {
  // State for various settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState<'light' | 'dark' | 'system'>('system');
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('en');
  
  return (
    <div className="animated-enter">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <SettingsIcon size={24} className="mr-2 text-primary-500" />
          Settings
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Sidebar - Setting Categories */}
        <div className="md:col-span-1">
          <div className="card">
            <nav className="space-y-1">
              {[
                { name: 'Profile', icon: <User size={20} /> },
                { name: 'Notifications', icon: <Bell size={20} /> },
                { name: 'Appearance', icon: <Moon size={20} /> },
                { name: 'Security', icon: <Lock size={20} /> },
                { name: 'Payment Methods', icon: <CreditCard size={20} /> },
                { name: 'Mobile App', icon: <Smartphone size={20} /> },
              ].map((item, index) => (
                <button
                  key={index}
                  className={`flex items-center w-full px-3 py-3 text-left rounded-lg transition-colors ${
                    index === 0 
                      ? 'bg-primary-50 text-primary-600 dark:bg-gray-700 dark:text-primary-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Right Content - Settings Section */}
        <div className="md:col-span-2 space-y-6">
          {/* Profile Section */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            
            <div className="flex items-start">
              <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center mr-4">
                <User size={32} className="text-gray-600 dark:text-gray-400" />
              </div>
              
              <div className="flex-1">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        First Name
                      </label>
                      <input type="text" className="input" defaultValue="Alex" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Last Name
                      </label>
                      <input type="text" className="input" defaultValue="Morgan" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input type="email" className="input" defaultValue="alex@example.com" />
                  </div>
                </div>
                
                <div className="mt-4">
                  <button className="btn btn-primary">Save Changes</button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Notification Settings */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Enable Notifications</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive alerts about your finances</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={notificationsEnabled}
                    onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                </label>
              </div>
              
              {notificationsEnabled && (
                <>
                  <div className="flex items-center justify-between pl-4">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={emailNotifications}
                        onChange={() => setEmailNotifications(!emailNotifications)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between pl-4">
                    <div>
                      <h3 className="font-medium">Push Notifications</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive alerts on your device</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={pushNotifications}
                        onChange={() => setPushNotifications(!pushNotifications)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Appearance Settings */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Appearance</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Theme</h3>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    className={`p-3 border rounded-lg flex flex-col items-center transition-colors ${
                      darkMode === 'light' 
                        ? 'bg-primary-50 border-primary-500 dark:bg-primary-900 dark:border-primary-500' 
                        : 'border-gray-300 dark:border-gray-700'
                    }`}
                    onClick={() => setDarkMode('light')}
                  >
                    <Sun size={24} className="mb-2" />
                    <span className="text-sm">Light</span>
                  </button>
                  
                  <button
                    className={`p-3 border rounded-lg flex flex-col items-center transition-colors ${
                      darkMode === 'dark' 
                        ? 'bg-primary-50 border-primary-500 dark:bg-primary-900 dark:border-primary-500' 
                        : 'border-gray-300 dark:border-gray-700'
                    }`}
                    onClick={() => setDarkMode('dark')}
                  >
                    <Moon size={24} className="mb-2" />
                    <span className="text-sm">Dark</span>
                  </button>
                  
                  <button
                    className={`p-3 border rounded-lg flex flex-col items-center transition-colors ${
                      darkMode === 'system' 
                        ? 'bg-primary-50 border-primary-500 dark:bg-primary-900 dark:border-primary-500' 
                        : 'border-gray-300 dark:border-gray-700'
                    }`}
                    onClick={() => setDarkMode('system')}
                  >
                    <div className="flex mb-2">
                      <Sun size={20} className="mr-1" />
                      <Moon size={20} />
                    </div>
                    <span className="text-sm">System</span>
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Currency</h3>
                <select 
                  className="input"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Language</h3>
                <select 
                  className="input"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;