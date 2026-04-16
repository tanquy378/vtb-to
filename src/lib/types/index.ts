// User roles
export type UserRole = "employee" | "hr_admin" | "platform_admin";
export type DemoRole = "user" | "admin" | "platform";

// User
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string; // ui-avatars.com URL
  role: UserRole;
  organizationId: string;
  department: string;
  joinedAt: string; // ISO date
  totalSteps: number;
  totalKm: number;
  currentStreak: number;
  longestStreak: number;
  totalPoints: number;
  rank: number;
  badgeCount: number;
  teamId?: string;
}

// Organization
export interface Organization {
  id: string;
  name: string;
  logo: string;
  plan: "starter" | "growth" | "enterprise";
  employeeCount: number;
  activeEmployees: number;
  status: "active" | "inactive" | "trial";
  joinedAt: string;
  activeChallenges: number;
  totalChallengesCompleted: number;
  monthlyFee: number; // VND
}

// Challenge
export type ChallengeType =
  | "steps"
  | "distance"
  | "calories"
  | "duration"
  | "team_steps";
export type ChallengeStatus = "active" | "upcoming" | "completed" | "draft";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: ChallengeType;
  status: ChallengeStatus;
  startDate: string;
  endDate: string;
  target: number;
  unit: string; // 'bước', 'km', 'kcal', 'phút'
  organizationId: string;
  participantCount: number;
  maxParticipants?: number;
  prizeDescription?: string;
  rules: string[];
  isTeamChallenge: boolean;
  teamSize?: number;
  createdBy: string; // userId
  coverGradient: string; // Tailwind gradient classes
}

// Activity Log
export type ActivityType =
  | "walking"
  | "running"
  | "cycling"
  | "swimming"
  | "yoga"
  | "gym"
  | "badminton"
  | "football"
  | "basketball"
  | "other";

export interface ActivityLog {
  id: string;
  userId: string;
  challengeId?: string;
  type: ActivityType;
  date: string;
  duration: number; // minutes
  distance?: number; // km
  steps?: number;
  calories?: number;
  notes?: string;
  points: number;
  createdAt: string;
}

// Leaderboard
export interface LeaderboardEntry {
  rank: number;
  previousRank: number;
  userId: string;
  name: string;
  avatar: string;
  organizationId?: string;
  teamId?: string;
  teamName?: string;
  totalPoints: number;
  totalSteps: number;
  totalKm: number;
  activeDays: number;
  delta: number; // rank change (positive = improved)
}

// Team
export interface Team {
  id: string;
  name: string;
  organizationId: string;
  members: string[]; // userIds
  captainId: string;
  totalPoints: number;
  rank: number;
  previousRank: number;
  avatarColor: string; // hex or Tailwind color
}

// Badge
export type BadgeCategory =
  | "distance"
  | "streak"
  | "social"
  | "challenge"
  | "special";

export interface Badge {
  id: string;
  name: string;
  description: string;
  category: BadgeCategory;
  icon: string; // emoji or lucide icon name
  color: string; // Tailwind color class
  earnedAt?: string; // ISO date — undefined if not earned
  requirement: string; // human-readable requirement
  points: number;
}

// Announcement
export interface Announcement {
  id: string;
  title: string;
  content: string;
  organizationId: string;
  createdBy: string; // userId
  createdAt: string;
  publishedAt?: string;
  status: "draft" | "published" | "archived";
  targetAudience: "all" | "challenge_participants";
  challengeId?: string;
  viewCount: number;
}

// Admin Analytics
export interface WeeklyParticipation {
  week: string; // 'Tuần 1', etc.
  participants: number;
  activities: number;
  totalKm: number;
}

export interface ActivityBreakdown {
  type: ActivityType;
  label: string;
  count: number;
  percentage: number;
  color: string;
}

export interface AdminAnalytics {
  organizationId: string;
  totalEmployees: number;
  activeParticipants: number;
  participationRate: number; // percentage
  totalActivities: number;
  totalKm: number;
  totalSteps: number;
  avgDailyActivities: number;
  weeklyData: WeeklyParticipation[];
  activityBreakdown: ActivityBreakdown[];
  topPerformers: LeaderboardEntry[];
}

// Platform Metrics
export interface PlatformMetrics {
  totalOrganizations: number;
  activeOrganizations: number;
  totalUsers: number;
  activeUsers: number;
  totalChallenges: number;
  activeChallenges: number;
  totalActivities: number;
  monthlyRevenue: number; // VND
  mrr: number; // Monthly Recurring Revenue VND
  churnRate: number; // percentage
  nps: number;
  orgGrowth: { month: string; count: number }[];
  revenueGrowth: { month: string; revenue: number }[];
}
