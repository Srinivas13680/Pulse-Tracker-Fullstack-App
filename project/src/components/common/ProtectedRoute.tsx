import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireTeam?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireTeam = false }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requireTeam && !user.teamId) {
    return <Navigate to="/onboarding\" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;