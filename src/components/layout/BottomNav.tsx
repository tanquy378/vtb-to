'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Trophy, Plus, BarChart2, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/dashboard', icon: Home, label: 'Trang chủ' },
  { href: '/challenges', icon: Trophy, label: 'Thử thách' },
  { href: '/log-activity', icon: Plus, label: 'Ghi lại', special: true },
  { href: '/leaderboard', icon: BarChart2, label: 'Xếp hạng' },
  { href: '/profile', icon: User, label: 'Hồ sơ' },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/80 backdrop-blur border-t border-border" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex items-center h-16">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          if (item.special) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex-1 flex flex-col items-center justify-center gap-1 min-h-[44px]"
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-primary -mt-6 shadow-lg">
                  <Icon className="h-6 w-6 text-white" />
                </span>
              </Link>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex-1 flex flex-col items-center justify-center gap-1 min-h-[44px] transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
