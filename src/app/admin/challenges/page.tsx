'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Users, Calendar } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockChallenges } from '@/lib/mock-data'
import { CHALLENGE_STATUS_LABELS, CHALLENGE_STATUS_COLORS } from '@/lib/constants'
import { formatDate } from '@/lib/formatters'
import type { ChallengeStatus } from '@/lib/types'

const STATUS_TABS: { value: 'all' | ChallengeStatus; label: string }[] = [
  { value: 'all', label: 'Tất cả' },
  { value: 'active', label: 'Đang diễn ra' },
  { value: 'upcoming', label: 'Sắp diễn ra' },
  { value: 'completed', label: 'Đã kết thúc' },
  { value: 'draft', label: 'Bản nháp' },
]

const TYPE_LABELS: Record<string, string> = {
  steps: 'Số bước', distance: 'Quãng đường', calories: 'Calo', duration: 'Thời gian', team_steps: 'Đội nhóm',
}

export default function AdminChallengesPage() {
  const [status, setStatus] = useState<'all' | ChallengeStatus>('all')

  const filtered = mockChallenges.filter((c) => status === 'all' || c.status === status)

  return (
    <div className="min-h-screen">
      <TopBar
        title="Quản lý thử thách"
        actions={
          <Link href="/admin/challenges/new">
            <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" />Tạo mới</Button>
          </Link>
        }
      />

      <div className="px-4 pt-4 pb-6 space-y-4">
        {/* Status tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
          {STATUS_TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setStatus(t.value)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${status === t.value ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Desktop table / Mobile cards */}
        <div className="hidden md:block rounded-2xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {['Thử thách', 'Loại', 'Thời gian', 'Tham gia', 'Trạng thái', 'Hành động'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={c.id} className={`border-t ${i % 2 === 0 ? '' : 'bg-muted/20'}`}>
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{c.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{c.description}</p>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary" className="text-xs">{TYPE_LABELS[c.type]}</Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {formatDate(c.startDate)}<br />{formatDate(c.endDate)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {c.participantCount.toLocaleString('vi-VN')}{c.maxParticipants ? `/${c.maxParticipants}` : ''}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={`text-xs ${CHALLENGE_STATUS_COLORS[c.status]} border-0`}>
                      {CHALLENGE_STATUS_LABELS[c.status]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0"><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {filtered.map((c) => (
            <div key={c.id} className="rounded-2xl border bg-card p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="font-semibold text-sm text-foreground">{c.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{c.description}</p>
                </div>
                <Badge className={`text-xs ${CHALLENGE_STATUS_COLORS[c.status]} border-0 flex-shrink-0`}>
                  {CHALLENGE_STATUS_LABELS[c.status]}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(c.startDate)}</span>
                <span className="flex items-center gap-1"><Users className="h-3 w-3" />{c.participantCount.toLocaleString('vi-VN')}</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 gap-1.5 text-xs h-9"><Pencil className="h-3 w-3" />Sửa</Button>
                <Button size="sm" variant="outline" className="flex-1 gap-1.5 text-xs h-9 text-destructive border-destructive/30"><Trash2 className="h-3 w-3" />Xóa</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
