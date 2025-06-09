import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, ResponsiveContainer } from 'recharts';
import { mockActivityData } from '../../utils/mockData';

const ActivityCharts: React.FC = () => {
  const data = mockActivityData;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Daily Activity Bar Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Daily Activity Overview</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
              fontSize={12}
              stroke="#6b7280"
            />
            <YAxis fontSize={12} stroke="#6b7280" />
            <Tooltip 
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar dataKey="commits" fill="#3b82f6" name="Commits" radius={[2, 2, 0, 0]} />
            <Bar dataKey="messages" fill="#8b5cf6" name="Messages" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Team Pulse Line Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Team Pulse Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
              fontSize={12}
              stroke="#6b7280"
            />
            <YAxis fontSize={12} stroke="#6b7280" />
            <Tooltip 
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="prs" 
              stroke="#10b981" 
              strokeWidth={3}
              name="Pull Requests"
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="reviews" 
              stroke="#f59e0b" 
              strokeWidth={3}
              name="Code Reviews"
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityCharts;