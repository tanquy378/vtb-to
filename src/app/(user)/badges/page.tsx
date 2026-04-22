'use client'

import { useState } from 'react'
import { Lock } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { Progress } from '@/components/ui/progress'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { mockBadges } from '@/lib/mock-data'
import { formatDate } from '@/lib/formatters'
import type { Badge as BadgeType, BadgeCategory } from '@/lib/types'

const CATEGORY_TABS: { value: 'all' | BadgeCategory; label: string }[] = [
  { value: 'all', label: 'Tất cả' },
  { value: 'distance', label: 'Quãng đường' },
  { value: 'streak', label: 'Streak' },
  { value: 'social', label: 'Xã hội' },
  { value: 'challenge', label: 'Thử thách' },
  { value: 'special', label: 'Đặc biệt' },
]

export default function BadgesPage() {
  const [category, setCategory] = useState<'all' | BadgeCategory>('all')
  const [selected, setSelected] = useState<BadgeType | null>(null)

  const earned = mockBadges.filter((b) => b.earnedAt)
  const filtered = mockBadges.filter((b) => category === 'all' || b.category === category)

  return (
    <div className="min-h-screen">
      <TopBar title="Huy hiệu" />

      <div className="px-4 pt-4 pb-6 space-y-4">
        {/* Stats */}
        <div className="rounded-2xl border bg-card p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-foreground">{earned.length}/{mockBadges.length} huy hiệu đã đạt được</span>
            <span className="text-muted-foreground">{Math.round((earned.length / mockBadges.length) * 100)}%</span>
          </div>
          <Progress value={(earned.length / mockBadges.length) * 100} className="h-2" />
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
          {CATEGORY_TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setCategory(t.value)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === t.value ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Badge grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filtered.map((badge) => {
            const isEarned = !!badge.earnedAt
            return (
              <button
                key={badge.id}
                onClick={() => setSelected(badge)}
                className={`rounded-2xl border p-3 flex flex-col items-center gap-1.5 transition-all hover:shadow-md active:scale-95 ${isEarned ? 'bg-card border-border' : 'bg-muted/30 border-dashed opacity-60'}`}
              >
                <div className="relative">
                  <span className={`text-3xl ${!isEarned ? 'grayscale' : ''}`}>{badge.icon}</span>
                  {!isEarned && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-muted border flex items-center justify-center">
                      <Lock className="h-2.5 w-2.5 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <p className="text-xs font-medium text-center leading-tight line-clamp-2">{badge.name}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Badge detail sheet */}
      <Sheet open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null) }}>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-3">
              <span className="text-4xl">{selected?.icon}</span>
              <div className="text-left">
                <p>{selected?.name}</p>
                <Badge variant="secondary" className="text-xs mt-0.5">{selected?.points} điểm</Badge>
              </div>
            </SheetTitle>
          </SheetHeader>
          {selected && (
            <div className="mt-4 space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">{selected.description}</p>
              <div className="rounded-xl bg-muted/50 p-3 text-sm">
                <p className="text-xs text-muted-foreground mb-0.5">Điều kiện</p>
                <p className="font-medium text-foreground">{selected.requirement}</p>
              </div>
              {selected.earnedAt ? (
                <div className="rounded-xl bg-primary/5 border border-primary/20 p-3 text-sm">
                  <p className="text-xs text-muted-foreground mb-0.5">Đã đạt được</p>
                  <p className="font-medium text-primary">{formatDate(selected.earnedAt)}</p>
                </div>
              ) : (
                <div className="rounded-xl bg-muted/50 border-dashed border p-3 text-sm text-muted-foreground text-center">
                  Chưa đạt được — hãy tiếp tục cố gắng!
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
