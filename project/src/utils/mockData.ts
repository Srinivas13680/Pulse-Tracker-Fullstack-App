import { TeamMember, ActivityData, TeamStats, Blocker, Mood } from '../types';

export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Chen',
    email: 'alex@company.com',
    avatar: '',
    weeklyCommits: 23,
    weeklyMessages: 45,
    participationScore: 95,
    activityData: {
      commits: 23,
      messages: 45,
      prs: 8,
      reviews: 12
    },
    lastActive: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    avatar: '',
    weeklyCommits: 18,
    weeklyMessages: 32,
    participationScore: 88,
    activityData: {
      commits: 18,
      messages: 32,
      prs: 6,
      reviews: 15
    },
    lastActive: '2024-01-15T09:15:00Z'
  },
  {
    id: '3',
    name: 'Mike Rodriguez',
    email: 'mike@company.com',
    avatar: '',
    weeklyCommits: 31,
    weeklyMessages: 28,
    participationScore: 92,
    activityData: {
      commits: 31,
      messages: 28,
      prs: 12,
      reviews: 8
    },
    lastActive: '2024-01-15T11:45:00Z'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@company.com',
    avatar: '',
    weeklyCommits: 15,
    weeklyMessages: 38,
    participationScore: 85,
    activityData: {
      commits: 15,
      messages: 38,
      prs: 4,
      reviews: 18
    },
    lastActive: '2024-01-15T08:30:00Z'
  }
];

export const mockActivityData: ActivityData[] = [
  { date: '2024-01-09', commits: 12, messages: 28, prs: 3, reviews: 8, memberId: '1', memberName: 'Alex Chen' },
  { date: '2024-01-10', commits: 15, messages: 35, prs: 5, reviews: 12, memberId: '1', memberName: 'Alex Chen' },
  { date: '2024-01-11', commits: 18, messages: 42, prs: 7, reviews: 15, memberId: '1', memberName: 'Alex Chen' },
  { date: '2024-01-12', commits: 22, messages: 38, prs: 9, reviews: 18, memberId: '1', memberName: 'Alex Chen' },
  { date: '2024-01-13', commits: 19, messages: 45, prs: 6, reviews: 22, memberId: '1', memberName: 'Alex Chen' },
  { date: '2024-01-14', commits: 16, messages: 32, prs: 8, reviews: 14, memberId: '1', memberName: 'Alex Chen' },
  { date: '2024-01-15', commits: 21, messages: 40, prs: 10, reviews: 16, memberId: '1', memberName: 'Alex Chen' }
];

export const mockHeatmapData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const members = mockTeamMembers.map(m => m.name);
  
  return members.map(member => ({
    member,
    data: days.map(day => ({
      day,
      value: Math.floor(Math.random() * 20) + 5,
      commits: Math.floor(Math.random() * 10) + 1,
      messages: Math.floor(Math.random() * 15) + 5
    }))
  }));
};

export const mockTeamStats: TeamStats = {
  totalMembers: 4,
  activeDaysThisWeek: 7,
  peakActivityDay: 'Wednesday',
  mostActiveMember: 'Mike Rodriguez',
  totalCommits: 87,
  totalMessages: 143,
  blockersCount: 3
};

export const mockBlockers: Blocker[] = [
  {
    id: '1',
    description: 'API rate limiting issues affecting user login',
    tag: 'backend',
    userId: '1',
    createdAt: '2024-01-15T09:00:00Z',
    resolved: false
  },
  {
    id: '2',
    description: 'Mobile UI responsiveness on checkout page',
    tag: 'frontend',
    userId: '2',
    createdAt: '2024-01-15T10:30:00Z',
    resolved: false
  },
  {
    id: '3',
    description: 'Database migration failing on staging',
    tag: 'devops',
    userId: '3',
    createdAt: '2024-01-15T11:15:00Z',
    resolved: true
  }
];

export const mockMoods: Mood[] = [
  { id: '1', emoji: '😊', label: 'Happy', userId: '1', date: '2024-01-15' },
  { id: '2', emoji: '😐', label: 'Neutral', userId: '2', date: '2024-01-15' },
  { id: '3', emoji: '😴', label: 'Tired', userId: '3', date: '2024-01-15' },
  { id: '4', emoji: '🚀', label: 'Productive', userId: '4', date: '2024-01-15' }
];