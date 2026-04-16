import { type ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

type ColorVariant = 'green' | 'blue' | 'yellow' | 'purple'

interface StatCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: ReactNode
  color?: ColorVariant
}

const COLOR_MAP: Record<ColorVariant, string> = {
  green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
  purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
}

export function StatCard({ title, value, change, changeLabel, icon, color = 'green' }: StatCardProps) {
  const isPositive = change !== undefined && change >= 0
  const isNegative = change !== undefined && change < 0

  return (
    <div className="rounded-2xl border border-border bg-card p-4 flex items-start justify-between gap-3">
      <div className="flex flex-col gap-1 min-w-0">
        <p className="text-sm text-muted-foreground font-medium truncate">{title}</p>
        <p className="text-2xl font-bold text-foreground tracking-tight">{value}</p>

        {change !== undefined && (
          <div className="flex items-center gap-1 mt-0.5">
            {isPositive ? (
              <TrendingUp className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 text-red-500 flex-shrink-0" />
            )}
            <span
              className={cn(
                'text-xs font-medium',
                isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              )}
            >
              {isPositive ? '+' : ''}{change}%
            </span>
            {changeLabel && (
              <span className="text-xs text-muted-foreground">{changeLabel}</span>
            )}
          </div>
        )}
      </div>

      {icon && (
        <div className={cn('flex items-center justify-center w-12 h-12 rounded-2xl flex-shrink-0', COLOR_MAP[color])}>
          {icon}
        </div>
      )}
    </div>
  )
}
