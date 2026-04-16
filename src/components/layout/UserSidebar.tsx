'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Trophy, Plus, BarChart2, Award, User } from 'lucide-react'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/dashboard', icon: Home, label: 'Trang chủ' },
  { href: '/challenges', icon: Trophy, label: 'Thử thách' },
  { href: '/log-activity', icon: Plus, label: 'Ghi hoạt động' },
  { href: '/leaderboard', icon: BarChart2, label: 'Bảng xếp hạng' },
  { href: '/badges', icon: Award, label: 'Huy hiệu' },
  { href: '/profile', icon: User, label: 'Hồ sơ' },
]

export function UserSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-60 border-r border-border bg-background z-30">
      <div className="flex items-center gap-3 h-16 px-4 border-b border-border flex-shrink-0">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary flex-shrink-0">
          <span className="text-xs font-bold text-white">WR</span>
        </div>
        <span className="font-semibold text-base truncate">WellnessRace</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 h-11 px-3 rounded-xl text-sm font-medium transition-colors mb-0.5',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground hover:bg-muted'
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="flex items-center justify-center p-4 border-t border-border flex-shrink-0">
        <ThemeToggle />
      </div>
    </aside>
  )
}
