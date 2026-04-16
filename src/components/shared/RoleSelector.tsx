'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, User, ShieldCheck, Building2 } from 'lucide-react'
import { useRole } from '@/providers/RoleProvider'
import { cn } from '@/lib/utils'

type DemoRole = 'user' | 'admin' | 'platform'

const ROLE_OPTIONS: { value: DemoRole; label: string; icon: React.ComponentType<{ className?: string }>; href: string }[] = [
  { value: 'user', label: 'Nhân viên', icon: User, href: '/dashboard' },
  { value: 'admin', label: 'Quản trị HR', icon: ShieldCheck, href: '/admin/dashboard' },
  { value: 'platform', label: 'Quản trị Platform', icon: Building2, href: '/platform/organizations' },
]

export function RoleSelector() {
  const { role, setRole } = useRole()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentOption = ROLE_OPTIONS.find((o) => o.value === role) ?? ROLE_OPTIONS[0]
  const CurrentIcon = currentOption.icon

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  function handleSelect(option: typeof ROLE_OPTIONS[number]) {
    setRole(option.value)
    setOpen(false)
    router.push(option.href)
  }

  return (
    <div ref={containerRef} className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 h-10 px-4 py-2 rounded-full bg-background border border-border shadow-lg text-sm font-medium transition-colors hover:bg-muted"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <CurrentIcon className="h-4 w-4 flex-shrink-0" />
        <span>{currentOption.label}</span>
        <ChevronDown className={cn('h-4 w-4 flex-shrink-0 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div
          className="absolute top-12 right-0 w-52 rounded-xl bg-background border border-border shadow-lg overflow-hidden"
          role="listbox"
        >
          {ROLE_OPTIONS.map((option) => {
            const Icon = option.icon
            const isSelected = option.value === role

            return (
              <button
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-left transition-colors hover:bg-muted',
                  isSelected && 'text-primary bg-primary/5'
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span>{option.label}</span>
                {isSelected && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-primary" />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
