import React from 'react';
import { AlertTriangle, TrendingUp, Users, Activity } from 'lucide-react';
import ActivityHeatmap from './ActivityHeatmap';
import ActivityCharts from './ActivityCharts';
import TeamMemberCard from './TeamMemberCard';
import { mockTeamMembers, mockTeamStats, mockBlockers } from '../../utils/mockData';

const Dashboard: React.FC = () => {
  const stats = mockTeamStats;
  const members = mockTeamMembers;
  const activeBlockers = mockBlockers.filter(b => !b.resolved);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Team Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Track your team's pulse and collaboration health
        </p>
      </div>

      {/* Alert Banner */}
      {activeBlockers.length > 0 && (
        <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">
                ⚠️ {activeBlockers.length} active blocker{activeBlockers.length !== 1 ? 's' : ''} detected today
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                Your team has reported some blockers that may need attention.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Team Members</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalMembers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Days</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeDaysThisWeek}/7</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Peak Day</p>
              <p className="text-lg font-bold text-gray-900">{stats.peakActivityDay}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Blockers</p>
              <p className="text-2xl font-bold text-gray-900">{activeBlockers.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Heatmap */}
      <div className="mb-8">
        <ActivityHeatmap />
      </div>

      {/* Activity Charts */}
      <div className="mb-8">
        <ActivityCharts />
      </div>

      {/* Team Members Overview */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Team Member Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {members.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;