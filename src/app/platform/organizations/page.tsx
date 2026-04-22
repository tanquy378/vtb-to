'use client'

import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { mockOrganizations, mockChallenges } from '@/lib/mock-data'
import { PLAN_LABELS, PLAN_COLORS } from '@/lib/constants'
import { formatVND, formatDate } from '@/lib/formatters'
import type { Organization } from '@/lib/types'

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  inactive: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  trial: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
}
const STATUS_LABELS: Record<string, string> = { active: 'Hoạt động', inactive: 'Không hoạt động', trial: 'Dùng thử' }

export default function PlatformOrganizationsPage() {
  const [search, setSearch] = useState('')
  const [planFilter, setPlanFilter] = useState<'all' | string>('all')
  const [selected, setSelected] = useState<Organization | null>(null)

  const filtered = mockOrganizations.filter((o) => {
    if (planFilter !== 'all' && o.plan !== planFilter) return false
    if (search && !o.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen">
      <TopBar
        title="Tổ chức"
        actions={<Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" />Thêm</Button>}
      />

      <div className="px-4 pt-4 pb-6 space-y-4">
        {/* Search + filter */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Tìm kiếm tổ chức..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {(['all', 'starter', 'growth', 'enterprise'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPlanFilter(p)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${planFilter === p ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
            >
              {p === 'all' ? 'Tất cả' : PLAN_LABELS[p]}
            </button>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden md:block rounded-2xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {['Tổ chức', 'Gói', 'Nhân viên', 'Thử thách', 'Doanh thu / tháng', 'Trạng thái', ''].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((o, i) => (
                <tr key={o.id} className={`border-t ${i % 2 === 0 ? '' : 'bg-muted/20'} cursor-pointer hover:bg-muted/30`} onClick={() => setSelected(o)}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary font-bold flex items-center justify-center text-sm flex-shrink-0">{o.name[0]}</div>
                      <div>
                        <p className="font-medium text-foreground">{o.name}</p>
                        <p className="text-xs text-muted-foreground">Tham gia {formatDate(o.joinedAt)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={`text-xs border-0 ${PLAN_COLORS[o.plan]}`}>{PLAN_LABELS[o.plan]}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm">{o.activeEmployees.toLocaleString('vi-VN')} / {o.employeeCount.toLocaleString('vi-VN')}</p>
                      <div className="h-1 w-20 rounded-full bg-muted mt-1 overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${(o.activeEmployees / o.employeeCount) * 100}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{o.activeChallenges}</td>
                  <td className="px-4 py-3 font-medium">{formatVND(o.monthlyFee)}</td>
                  <td className="px-4 py-3">
                    <Badge className={`text-xs border-0 ${STATUS_COLORS[o.status]}`}>{STATUS_LABELS[o.status]}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Button size="sm" variant="ghost" className="text-xs h-8">Xem</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {filtered.map((o) => (
            <div key={o.id} className="rounded-2xl border bg-card p-4 space-y-3" onClick={() => setSelected(o)}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold flex items-center justify-center">{o.name[0]}</div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{o.name}</p>
                    <p className="text-xs text-muted-foreground">{o.employeeCount.toLocaleString('vi-VN')} nhân viên</p>
                  </div>
                </div>
                <Badge className={`text-xs border-0 ${PLAN_COLORS[o.plan]}`}>{PLAN_LABELS[o.plan]}</Badge>
              </div>
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Đang hoạt động: {o.activeEmployees.toLocaleString('vi-VN')}</span>
                  <span>{Math.round((o.activeEmployees / o.employeeCount) * 100)}%</span>
                </div>
                <Progress value={(o.activeEmployees / o.employeeCount) * 100} className="h-1.5" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">{formatVND(o.monthlyFee)}<span className="text-xs text-muted-foreground">/tháng</span></span>
                <Badge className={`text-xs border-0 ${STATUS_COLORS[o.status]}`}>{STATUS_LABELS[o.status]}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail sheet */}
      <Sheet open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null) }}>
        <SheetContent side="right">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold flex items-center justify-center">{selected.name[0]}</div>
                  {selected.name}
                </SheetTitle>
              </SheetHeader>
              <div className="mt-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Tổng nhân viên', value: selected.employeeCount.toLocaleString('vi-VN') },
                    { label: 'Đang hoạt động', value: selected.activeEmployees.toLocaleString('vi-VN') },
                    { label: 'Thử thách đã hoàn thành', value: String(selected.totalChallengesCompleted) },
                    { label: 'Doanh thu/tháng', value: formatVND(selected.monthlyFee) },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground mb-0.5">{s.label}</p>
                      <p className="font-bold text-sm text-foreground">{s.value}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">Thử thách đang chạy</p>
                  <div className="space-y-2">
                    {mockChallenges.filter((c) => c.organizationId === selected.id && c.status === 'active').map((c) => (
                      <div key={c.id} className="rounded-lg bg-muted/50 px-3 py-2 text-sm">
                        <p className="font-medium text-foreground">{c.title}</p>
                        <p className="text-xs text-muted-foreground">{c.participantCount} người tham gia</p>
                      </div>
                    ))}
                    {mockChallenges.filter((c) => c.organizationId === selected.id && c.status === 'active').length === 0 && (
                      <p className="text-sm text-muted-foreground">Không có thử thách đang chạy</p>
                    )}
                  </div>
                </div>
                <Button className="w-full">Nâng cấp gói dịch vụ</Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
