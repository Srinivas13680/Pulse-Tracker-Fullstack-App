import React from 'react';
import { mockHeatmapData } from '../../utils/mockData';

const ActivityHeatmap: React.FC = () => {
  const heatmapData = mockHeatmapData();
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getIntensityColor = (value: number) => {
    if (value < 5) return 'bg-gray-100';
    if (value < 10) return 'bg-blue-200';
    if (value < 15) return 'bg-blue-400';
    if (value < 20) return 'bg-blue-600';
    return 'bg-blue-800';
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">🔥 Weekly Activity Heatmap</h3>
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span>Less</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-sm bg-gray-100"></div>
            <div className="w-3 h-3 rounded-sm bg-blue-200"></div>
            <div className="w-3 h-3 rounded-sm bg-blue-400"></div>
            <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
            <div className="w-3 h-3 rounded-sm bg-blue-800"></div>
          </div>
          <span>More</span>
        </div>
      </div>

      <div className="space-y-4">
        {heatmapData.map((memberData, memberIndex) => (
          <div key={memberIndex} className="flex items-center space-x-3">
            <div className="w-24 text-sm font-medium text-gray-700 truncate">
              {memberData.member}
            </div>
            <div className="flex space-x-1">
              {memberData.data.map((dayData, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`w-4 h-4 rounded-sm ${getIntensityColor(dayData.value)} hover:ring-2 hover:ring-blue-300 transition-all cursor-pointer`}
                  title={`${memberData.member} - ${dayData.day}: ${dayData.commits} commits, ${dayData.messages} messages`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Hover over squares to see details</span>
          <span>Activity includes commits, messages, PRs, and reviews</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityHeatmap;