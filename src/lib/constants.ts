export const ACTIVITY_TYPES = [
  { value: 'walking', label: 'Đi bộ', icon: '🚶', color: 'bg-blue-100 text-blue-700' },
  { value: 'running', label: 'Chạy bộ', icon: '🏃', color: 'bg-green-100 text-green-700' },
  { value: 'cycling', label: 'Đạp xe', icon: '🚴', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'swimming', label: 'Bơi lội', icon: '🏊', color: 'bg-cyan-100 text-cyan-700' },
  { value: 'yoga', label: 'Yoga', icon: '🧘', color: 'bg-purple-100 text-purple-700' },
  { value: 'gym', label: 'Gym', icon: '💪', color: 'bg-orange-100 text-orange-700' },
  { value: 'badminton', label: 'Cầu lông', icon: '🏸', color: 'bg-pink-100 text-pink-700' },
  { value: 'football', label: 'Bóng đá', icon: '⚽', color: 'bg-emerald-100 text-emerald-700' },
  { value: 'basketball', label: 'Bóng rổ', icon: '🏀', color: 'bg-red-100 text-red-700' },
  { value: 'other', label: 'Khác', icon: '🏋️', color: 'bg-gray-100 text-gray-700' },
] as const

export const CHALLENGE_STATUS_LABELS: Record<string, string> = {
  active: 'Đang diễn ra',
  upcoming: 'Sắp diễn ra',
  completed: 'Đã kết thúc',
  draft: 'Bản nháp',
}

export const CHALLENGE_STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  upcoming: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  completed: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  draft: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
}

export const PLAN_LABELS: Record<string, string> = {
  starter: 'Starter',
  growth: 'Growth',
  enterprise: 'Enterprise',
}

export const PLAN_COLORS: Record<string, string> = {
  starter: 'bg-gray-100 text-gray-700',
  growth: 'bg-blue-100 text-blue-700',
  enterprise: 'bg-purple-100 text-purple-700',
}

export const NAV_ITEMS_USER = [
  { href: '/dashboard', label: 'Trang chủ', icon: 'Home' },
  { href: '/challenges', label: 'Thử thách', icon: 'Trophy' },
  { href: '/log-activity', label: 'Ghi hoạt động', icon: 'Plus' },
  { href: '/leaderboard', label: 'Bảng xếp hạng', icon: 'BarChart2' },
  { href: '/profile', label: 'Hồ sơ', icon: 'User' },
] as const

export const NAV_ITEMS_ADMIN = [
  { href: '/admin/dashboard', label: 'Tổng quan', icon: 'LayoutDashboard' },
  { href: '/admin/challenges', label: 'Thử thách', icon: 'Trophy' },
  { href: '/admin/teams', label: 'Đội nhóm', icon: 'Users' },
  { href: '/admin/announcements', label: 'Thông báo', icon: 'Bell' },
  { href: '/admin/reports', label: 'Báo cáo', icon: 'BarChart2' },
] as const

export const NAV_ITEMS_PLATFORM = [
  { href: '/platform/organizations', label: 'Tổ chức', icon: 'Building2' },
  { href: '/platform/metrics', label: 'Số liệu', icon: 'TrendingUp' },
] as const
