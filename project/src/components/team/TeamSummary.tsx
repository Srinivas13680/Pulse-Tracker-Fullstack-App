import React from 'react';
import { Users, Calendar, TrendingUp, Award, GitCommit, MessageSquare, AlertTriangle } from 'lucide-react';
import { mockTeamStats, mockTeamMembers } from '../../utils/mockData';

const TeamSummary: React.FC = () => {
  const stats = mockTeamStats;
  const members = mockTeamMembers;

  const topPerformer = members.reduce((prev, current) => 
    prev.participationScore > current.participationScore ? prev : current
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Team Summary</h1>
        <p className="mt-2 text-gray-600">
          Overview of your team's collaboration and activity metrics
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalMembers}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-gray-600">
              <span>Active team size</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Days</p>
              <p className="text-3xl font-bold text-gray-900">{stats.activeDaysThisWeek}</p>
              <p className="text-sm text-gray-500">out of 7 days</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(stats.activeDaysThisWeek / 7) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Peak Activity</p>
              <p className="text-2xl font-bold text-gray-900">{stats.peakActivityDay}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-gray-600">
              <span>Most productive day</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Top Performer</p>
              <p className="text-lg font-bold text-gray-900">{topPerformer.name}</p>
              <p className="text-sm text-gray-500">{topPerformer.participationScore}% score</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Award className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Activity Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity Totals</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <GitCommit className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Total Commits</p>
                  <p className="text-sm text-gray-600">Code contributions</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{stats.totalCommits}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-6 w-6 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900">Total Messages</p>
                  <p className="text-sm text-gray-600">Team communications</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-600">{stats.totalMessages}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <div>
                  <p className="font-medium text-gray-900">Active Blockers</p>
                  <p className="text-sm text-gray-600">Issues requiring attention</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-red-600">{stats.blockersCount}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Health Indicators</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Participation</span>
                <span className="text-sm font-bold text-gray-900">
                  {Math.round(members.reduce((acc, member) => acc + member.participationScore, 0) / members.length)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${Math.round(members.reduce((acc, member) => acc + member.participationScore, 0) / members.length)}%` 
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Communication Level</span>
                <span className="text-sm font-bold text-gray-900">High</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full w-4/5 transition-all duration-300"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Code Quality</span>
                <span className="text-sm font-bold text-gray-900">Excellent</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full w-5/6 transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Member Quick Stats */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Team Member Quick Stats</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Member</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Commits</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Messages</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">PRs</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Reviews</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Score</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => (
                <tr key={member.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-900">{member.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-900">{member.activityData.commits}</td>
                  <td className="py-3 px-4 text-gray-900">{member.activityData.messages}</td>
                  <td className="py-3 px-4 text-gray-900">{member.activityData.prs}</td>
                  <td className="py-3 px-4 text-gray-900">{member.activityData.reviews}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      member.participationScore >= 90 
                        ? 'bg-green-100 text-green-800'
                        : member.participationScore >= 80
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {member.participationScore}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamSummary;