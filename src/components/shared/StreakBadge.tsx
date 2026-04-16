import { cn } from '@/lib/utils'

interface StreakBadgeProps {
  streak: number
  size?: 'sm' | 'md'
  className?: string
}

export function StreakBadge({ streak, size = 'md', className }: StreakBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-semibold text-white',
        'bg-gradient-to-r from-orange-400 to-red-500',
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1',
        className
      )}
    >
      <span role="img" aria-label="fire">🔥</span>
      <span>{streak}</span>
    </span>
  )
}
