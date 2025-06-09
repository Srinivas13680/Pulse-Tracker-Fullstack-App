import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TeamMember } from '../../types';
import { User, GitCommit, MessageSquare, GitPullRequest, Eye } from 'lucide-react';

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const pieData = [
    { name: 'Commits', value: member.activityData.commits, color: '#3b82f6' },
    { name: 'Messages', value: member.activityData.messages, color: '#8b5cf6' },
    { name: 'PRs', value: member.activityData.prs, color: '#10b981' },
    { name: 'Reviews', value: member.activityData.reviews, color: '#f59e0b' }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {member.avatar ? (
              <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full" />
            ) : (
              getInitials(member.name)
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{member.name}</h3>
            <p className="text-sm text-gray-600">{member.email}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(member.participationScore)}`}>
          {member.participationScore}%
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-blue-600 mb-1">
            <GitCommit className="h-4 w-4" />
            <span className="text-xl font-bold">{member.weeklyCommits}</span>
          </div>
          <p className="text-xs text-gray-600">Weekly Commits</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-purple-600 mb-1">
            <MessageSquare className="h-4 w-4" />
            <span className="text-xl font-bold">{member.weeklyMessages}</span>
          </div>
          <p className="text-xs text-gray-600">Weekly Messages</p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Activity Breakdown</h4>
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={15}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Commits</span>
              </div>
              <span className="font-medium">{member.activityData.commits}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600">Messages</span>
              </div>
              <span className="font-medium">{member.activityData.messages}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">PRs</span>
              </div>
              <span className="font-medium">{member.activityData.prs}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-600">Reviews</span>
              </div>
              <span className="font-medium">{member.activityData.reviews}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          Last active: {new Date(member.lastActive).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
    </div>
  );
};

export default TeamMemberCard;