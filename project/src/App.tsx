import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navigation from './components/layout/Navigation';
import LoginSignup from './components/auth/LoginSignup';
import Onboarding from './components/onboarding/Onboarding';
import Dashboard from './components/dashboard/Dashboard';
import BlockerMoodLogging from './components/blockers/BlockerMoodLogging';
import TeamSummary from './components/team/TeamSummary';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/auth" element={<LoginSignup />} />
            <Route 
              path="/onboarding" 
              element={
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requireTeam>
                  <Navigation />
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/blockers" 
              element={
                <ProtectedRoute requireTeam>
                  <Navigation />
                  <BlockerMoodLogging />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/team" 
              element={
                <ProtectedRoute requireTeam>
                  <Navigation />
                  <TeamSummary />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/auth\" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;