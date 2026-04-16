'use client'

import { useCountdown } from '@/hooks/use-countdown'
import { cn } from '@/lib/utils'

interface CountdownTimerProps {
  targetDate: string
  label?: string
  className?: string
}

const TIME_UNITS = [
  { key: 'days' as const, label: 'ngày' },
  { key: 'hours' as const, label: 'giờ' },
  { key: 'minutes' as const, label: 'phút' },
  { key: 'seconds' as const, label: 'giây' },
]

export function CountdownTimer({ targetDate, label, className }: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate)

  if (isExpired) {
    return (
      <div className={cn('flex flex-col items-center gap-2', className)}>
        {label && <p className="text-sm text-muted-foreground">{label}</p>}
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-medium">
          Đã kết thúc
        </span>
      </div>
    )
  }

  const values = { days, hours, minutes, seconds }

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
      <div className="flex items-center gap-2">
        {TIME_UNITS.map((unit, index) => (
          <div key={unit.key} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1 min-w-[52px]">
              <div className="flex items-center justify-center w-full rounded-xl bg-muted px-3 py-2">
                <span className="text-2xl font-bold text-foreground tabular-nums leading-none">
                  {String(values[unit.key]).padStart(2, '0')}
                </span>
              </div>
              <span className="text-xs text-muted-foreground font-medium">{unit.label}</span>
            </div>
            {index < TIME_UNITS.length - 1 && (
              <span className="text-xl font-bold text-muted-foreground -mt-4 select-none">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
