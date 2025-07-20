import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';
import AuthForm from './components/Auth/AuthForm';
import Navigation from './components/Layout/Navigation';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Goals from './pages/Goals';
import Assistant from './pages/Assistant';
import Admin from './pages/Admin';
import InstallPrompt from './components/PWA/InstallPrompt';
import OfflineIndicator from './components/PWA/OfflineIndicator';
import NotificationSetup from './components/PWA/NotificationSetup';

// Placeholder components for missing pages
const Budgets = () => (
  <div className="p-4 lg:p-6 lg:ml-64 pb-20 lg:pb-6">
    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
      Budgets
    </h1>
    <p className="text-gray-600 dark:text-gray-400">
      Budget management coming soon...
    </p>
  </div>
);

const Analytics = () => (
  <div className="p-4 lg:p-6 lg:ml-64 pb-20 lg:pb-6">
    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
      Analytics
    </h1>
    <p className="text-gray-600 dark:text-gray-400">
      Advanced analytics coming soon...
    </p>
  </div>
);

function App() {
  const { user, loading } = useAuth();
  const { theme } = useTheme();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading Budge...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <Router>
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${theme}`}>
        <Navigation />
        <Header />
        
        <main className="transition-colors duration-200">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/assistant" element={<Assistant />} />
            {user.isAdmin && <Route path="/admin" element={<Admin />} />}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
        
        {/* PWA Components */}
        <InstallPrompt />
        <OfflineIndicator />
        <NotificationSetup />
      </div>
    </Router>
  );
}

export default App;