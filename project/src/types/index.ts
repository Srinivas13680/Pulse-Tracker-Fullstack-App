export interface User {
  id: string;
  email: string;
  name: string;
  teamId: string;
  avatar?: string;
}

export interface Team {
  id: string;
  name: string;
  inviteCode: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  weeklyCommits: number;
  weeklyMessages: number;
  participationScore: number;
  activityData: {
    commits: number;
    messages: number;
    prs: number;
    reviews: number;
  };
  lastActive: string;
}

export interface ActivityData {
  date: string;
  commits: number;
  messages: number;
  prs: number;
  reviews: number;
  memberId: string;
  memberName: string;
}

export interface Blocker {
  id: string;
  description: string;
  tag: string;
  userId: string;
  createdAt: string;
  resolved: boolean;
}

export interface Mood {
  id: string;
  emoji: string;
  label: string;
  userId: string;
  date: string;
}

export interface TeamStats {
  totalMembers: number;
  activeDaysThisWeek: number;
  peakActivityDay: string;
  mostActiveMember: string;
  totalCommits: number;
  totalMessages: number;
  blockersCount: number;
}