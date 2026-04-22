'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Users, Calendar } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { mockChallenges } from '@/lib/mock-data'
import { CHALLENGE_STATUS_LABELS, CHALLENGE_STATUS_COLORS } from '@/lib/constants'
import { formatDate } from '@/lib/formatters'
import type { ChallengeStatus } from '@/lib/types'

const STATUS_TABS: { value: 'all' | ChallengeStatus; label: string }[] = [
  { value: 'all', label: 'Tất cả' },
  { value: 'active', label: 'Đang diễn ra' },
  { value: 'upcoming', label: 'Sắp diễn ra' },
  { value: 'completed', label: 'Đã kết thúc' },
]

const TYPE_LABELS: Record<string, string> = {
  steps: 'Số bước', distance: 'Quãng đường', calories: 'Calo', duration: 'Thời gian', team_steps: 'Đội nhóm',
}

export default function ChallengesPage() {
  const [status, setStatus] = useState<'all' | ChallengeStatus>('all')
  const [teamOnly, setTeamOnly] = useState(false)

  const filtered = mockChallenges.filter((c) => {
    if (status !== 'all' && c.status !== status) return false
    if (teamOnly && !c.isTeamChallenge) return false
    return true
  })

  return (
    <div className="min-h-screen">
      <TopBar title="Thử thách" />

      <div className="px-4 pt-4 pb-6 space-y-4">
        {/* Status filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
          {STATUS_TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setStatus(t.value)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${status === t.value ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Team filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setTeamOnly(false)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${!teamOnly ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground'}`}
          >Cá nhân & Nhóm</button>
          <button
            onClick={() => setTeamOnly(true)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${teamOnly ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground'}`}
          >Chỉ đội nhóm</button>
        </div>

        {/* Challenge grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((c) => (
            <Link key={c.id} href={`/challenges/${c.id}`}>
              <div className="rounded-2xl border bg-card overflow-hidden hover:shadow-md transition-shadow">
                {/* Cover */}
                <div className={`h-28 bg-gradient-to-br ${c.coverGradient} p-4 flex items-end relative`}>
                  <Badge className={`text-xs font-semibold ${CHALLENGE_STATUS_COLORS[c.status]} border-0`}>
                    {CHALLENGE_STATUS_LABELS[c.status]}
                  </Badge>
                  {c.isTeamChallenge && (
                    <Badge className="ml-2 text-xs bg-white/20 text-white border-0">Đội nhóm</Badge>
                  )}
                </div>
                {/* Content */}
                <div className="p-4 space-y-2.5">
                  <div>
                    <span className="text-xs text-muted-foreground">{TYPE_LABELS[c.type]}</span>
                    <h3 className="font-semibold text-foreground text-sm leading-snug">{c.title}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(c.startDate)}</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />{c.participantCount.toLocaleString('vi-VN')} người</span>
                  </div>
                  {c.status === 'active' && (
                    <div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Tiến độ</span><span>34%</span>
                      </div>
                      <Progress value={34} className="h-1.5" />
                    </div>
                  )}
                  <Button size="sm" variant={c.status === 'active' ? 'default' : c.status === 'upcoming' ? 'outline' : 'secondary'} className="w-full text-xs">
                    {c.status === 'active' ? 'Xem chi tiết' : c.status === 'upcoming' ? 'Đăng ký trước' : 'Xem kết quả'}
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-medium">Không có thử thách nào</p>
            <p className="text-sm mt-1">Thử chọn bộ lọc khác</p>
          </div>
        )}
      </div>
    </div>
  )
}
