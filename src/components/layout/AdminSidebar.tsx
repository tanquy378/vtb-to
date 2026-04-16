'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Trophy, Users, Bell, BarChart2, ChevronLeft, Building2 } from 'lucide-react'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Tổng quan' },
  { href: '/admin/challenges', icon: Trophy, label: 'Thử thách' },
  { href: '/admin/teams', icon: Users, label: 'Đội nhóm' },
  { href: '/admin/announcements', icon: Bell, label: 'Thông báo' },
  { href: '/admin/reports', icon: BarChart2, label: 'Báo cáo' },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-60 border-r border-border bg-background z-30">
      <div className="flex items-center gap-3 h-16 px-4 border-b border-border flex-shrink-0">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary flex-shrink-0">
          <Building2 className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-sm truncate">FPT Software</span>
          <span className="text-xs text-muted-foreground truncate">Quản trị HR</span>
        </div>
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

      <div className="flex flex-col gap-2 p-4 border-t border-border flex-shrink-0">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Về trang người dùng</span>
        </Link>
        <ThemeToggle />
      </div>
    </aside>
  )
}
