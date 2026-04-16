import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('max-w-sm mx-auto text-center py-12 px-4', className)}>
      {icon && (
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mx-auto mb-4">
          <div className="text-muted-foreground">{icon}</div>
        </div>
      )}

      <h3 className="font-semibold text-foreground text-base mb-2">{title}</h3>

      {description && (
        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{description}</p>
      )}

      {action && (
        <div className="flex justify-center">{action}</div>
      )}
    </div>
  )
}
