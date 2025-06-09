import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Users, Plus, Key, ArrowRight } from 'lucide-react';

const Onboarding: React.FC = () => {
  const [step, setStep] = useState<'choose' | 'create' | 'join'>('choose');
  const [teamName, setTeamName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Mock API call - in real app, this would be a POST to /api/team/create
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user with team info (in real app, this would come from the API response)
      const updatedUser = { ...user!, teamId: 'team-' + Date.now() };
      localStorage.setItem('pulsecheck_user', JSON.stringify(updatedUser));
      
      // Redirect to dashboard after successful team creation
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create team. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Mock API call - in real app, this would be a POST to /api/team/join
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user with team info (in real app, this would come from the API response)
      const updatedUser = { ...user!, teamId: 'team-' + inviteCode };
      localStorage.setItem('pulsecheck_user', JSON.stringify(updatedUser));
      
      // Redirect to dashboard after successful team join
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid invite code. Please check and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Users className="h-12 w-12 text-blue-600 mx-auto" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Let's set up your team
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome, {user?.name}! Choose how you'd like to get started with PulseCheck.
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-lg rounded-xl border border-gray-100">
          {step === 'choose' && (
            <div className="space-y-4">
              <button
                onClick={() => setStep('create')}
                className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Plus className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900">Create a new team</h3>
                    <p className="text-sm text-gray-600">Start fresh with your own team</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </button>

              <button
                onClick={() => setStep('join')}
                className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <Key className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900">Join an existing team</h3>
                    <p className="text-sm text-gray-600">Use an invite code from your team</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </button>
            </div>
          )}

          {step === 'create' && (
            <div>
              <div className="mb-6">
                <button
                  onClick={() => setStep('choose')}
                  className="text-sm text-blue-600 hover:text-blue-500 flex items-center space-x-1"
                >
                  <span>← Back to options</span>
                </button>
              </div>
              
              <form onSubmit={handleCreateTeam} className="space-y-4">
                <div>
                  <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-2">
                    Team Name
                  </label>
                  <input
                    id="teamName"
                    type="text"
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your team name"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !teamName.trim()}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    'Create Team'
                  )}
                </button>
              </form>
            </div>
          )}

          {step === 'join' && (
            <div>
              <div className="mb-6">
                <button
                  onClick={() => setStep('choose')}
                  className="text-sm text-blue-600 hover:text-blue-500 flex items-center space-x-1"
                >
                  <span>← Back to options</span>
                </button>
              </div>
              
              <form onSubmit={handleJoinTeam} className="space-y-4">
                <div>
                  <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-700 mb-2">
                    Invite Code
                  </label>
                  <input
                    id="inviteCode"
                    type="text"
                    required
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your team's invite code"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !inviteCode.trim()}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    'Join Team'
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;