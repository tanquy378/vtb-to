'use client'

import { type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Menu } from 'lucide-react'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { cn } from '@/lib/utils'

interface TopBarProps {
  title: string
  showBack?: boolean
  actions?: ReactNode
  className?: string
}

export function TopBar({ title, showBack = false, actions, className }: TopBarProps) {
  const router = useRouter()

  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex items-center h-14 px-4 bg-background/80 backdrop-blur-md border-b border-border',
        className
      )}
    >
      <div className="flex items-center justify-between w-full gap-2">
        <div className="flex items-center">
          {showBack ? (
            <button
              onClick={() => router.back()}
              className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors -ml-2"
              aria-label="Go back"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          ) : (
            <button
              className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors -ml-2 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
        </div>

        <h1 className="flex-1 text-center font-semibold text-base truncate px-2">
          {title}
        </h1>

        <div className="flex items-center">
          {actions ?? <ThemeToggle />}
        </div>
      </div>
    </header>
  )
}
