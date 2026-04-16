import Image from 'next/image'
import { cn } from '@/lib/utils'

interface AvatarUser {
  id: string
  name: string
  avatar: string
}

interface AvatarGroupProps {
  users: AvatarUser[]
  max?: number
  className?: string
}

export function AvatarGroup({ users, max = 5, className }: AvatarGroupProps) {
  const visible = users.slice(0, max)
  const overflow = users.length - max

  return (
    <div className={cn('flex items-center', className)}>
      {visible.map((user, index) => (
        <div
          key={user.id}
          className="relative flex-shrink-0"
          style={{ marginLeft: index === 0 ? 0 : '-8px', zIndex: visible.length - index }}
          title={user.name}
        >
          <div className="h-8 w-8 rounded-full ring-2 ring-background overflow-hidden bg-muted flex items-center justify-center">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xs font-semibold text-muted-foreground uppercase">
                {user.name.charAt(0)}
              </span>
            )}
          </div>
        </div>
      ))}

      {overflow > 0 && (
        <div
          className="relative flex-shrink-0"
          style={{ marginLeft: '-8px', zIndex: 0 }}
        >
          <div className="h-8 w-8 rounded-full ring-2 ring-background bg-muted flex items-center justify-center">
            <span className="text-xs font-semibold text-muted-foreground">+{overflow}</span>
          </div>
        </div>
      )}
    </div>
  )
}
