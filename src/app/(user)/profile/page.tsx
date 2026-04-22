'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { StreakBadge } from '@/components/shared/StreakBadge'
import { currentUser, mockActivities } from '@/lib/mock-data'
import { ACTIVITY_TYPES } from '@/lib/constants'
import { formatRelativeDate, formatDuration, formatKm, formatSteps } from '@/lib/formatters'

const STATS = [
  { label: 'Tổng bước', value: (currentUser.totalSteps / 1000000).toFixed(1) + 'M' },
  { label: 'Tổng km', value: currentUser.totalKm.toLocaleString('vi-VN') + ' km' },
  { label: 'Huy hiệu', value: String(currentUser.badgeCount) },
  { label: 'Xếp hạng', value: '#' + currentUser.rank },
]

const WEEK_DATA = [
  { day: 'T2', km: 3.2 }, { day: 'T3', km: 5.1 }, { day: 'T4', km: 0 },
  { day: 'T5', km: 4.3 }, { day: 'T6', km: 6.8 }, { day: 'T7', km: 2.1 }, { day: 'CN', km: 7.5 },
]
const maxKm = Math.max(...WEEK_DATA.map((d) => d.km))

export default function ProfilePage() {
  const router = useRouter()
  const [notifChallenge, setNotifChallenge] = useState(true)
  const [notifLeaderboard, setNotifLeaderboard] = useState(true)
  const [notifWeekly, setNotifWeekly] = useState(false)

  return (
    <div className="min-h-screen pb-6">
      {/* Header banner */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-primary to-emerald-500" />
        <div className="px-4 pb-4">
          <div className="flex items-end gap-4 -mt-10">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-2xl ring-4 ring-background shadow-lg flex-shrink-0"
            />
            <div className="pb-1">
              <h1 className="text-xl font-bold text-foreground">{currentUser.name}</h1>
              <p className="text-sm text-muted-foreground">{currentUser.department}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="text-xs">{currentUser.organizationId === 'org-1' ? 'FPT Software' : 'Company'}</Badge>
            <StreakBadge streak={currentUser.currentStreak} />
            <Badge variant="outline" className="text-xs">{currentUser.totalPoints.toLocaleString('vi-VN')} điểm</Badge>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-0 border-y mx-0">
        {STATS.map((s, i) => (
          <div key={s.label} className={`py-4 text-center ${i < 3 ? 'border-r' : ''}`}>
            <p className="text-base font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="px-4 pt-4">
        <Tabs defaultValue="activity">
          <TabsList className="w-full">
            <TabsTrigger value="activity" className="flex-1">Hoạt động</TabsTrigger>
            <TabsTrigger value="stats" className="flex-1">Thống kê</TabsTrigger>
            <TabsTrigger value="settings" className="flex-1">Cài đặt</TabsTrigger>
          </TabsList>

          {/* Activity tab */}
          <TabsContent value="activity" className="mt-4 space-y-2">
            {mockActivities.map((activity) => {
              const actType = ACTIVITY_TYPES.find((t) => t.value === activity.type)
              return (
                <div key={activity.id} className="flex items-center gap-3 rounded-xl border bg-card p-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl ${actType?.color ?? 'bg-muted'}`}>
                    {actType?.icon ?? '🏃'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{actType?.label ?? activity.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatRelativeDate(activity.date)} · {formatDuration(activity.duration)}
                      {activity.distance ? ` · ${formatKm(activity.distance)}` : ''}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs flex-shrink-0">+{activity.points}</Badge>
                </div>
              )
            })}
          </TabsContent>

          {/* Stats tab */}
          <TabsContent value="stats" className="mt-4 space-y-5">
            <div>
              <h3 className="font-semibold text-sm text-foreground mb-3">Quãng đường 7 ngày (km)</h3>
              <div className="flex items-end gap-2 h-32">
                {WEEK_DATA.map((d) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full rounded-t-sm bg-primary/20 relative" style={{ height: maxKm > 0 ? `${(d.km / maxKm) * 96}px` : '4px' }}>
                      <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-sm" style={{ height: d.km > 0 ? '100%' : '0' }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-sm text-foreground mb-3">Loại hoạt động</h3>
              <div className="space-y-2.5">
                {[
                  { label: 'Đi bộ', pct: 38, color: 'bg-blue-500' },
                  { label: 'Chạy bộ', pct: 28, color: 'bg-green-500' },
                  { label: 'Đạp xe', pct: 18, color: 'bg-yellow-500' },
                  { label: 'Khác', pct: 16, color: 'bg-purple-500' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 text-sm">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${item.color}`} />
                    <span className="flex-1 text-foreground">{item.label}</span>
                    <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                    </div>
                    <span className="text-muted-foreground w-8 text-right">{item.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Settings tab */}
          <TabsContent value="settings" className="mt-4 space-y-5">
            <div>
              <h3 className="font-semibold text-sm text-foreground mb-3">Thông báo</h3>
              <div className="space-y-4 rounded-2xl border bg-card p-4">
                {[
                  { id: 'challenge', label: 'Thông báo thử thách', desc: 'Cập nhật về thử thách bạn tham gia', value: notifChallenge, set: setNotifChallenge },
                  { id: 'leaderboard', label: 'Thay đổi bảng xếp hạng', desc: 'Khi hạng của bạn thay đổi', value: notifLeaderboard, set: setNotifLeaderboard },
                  { id: 'weekly', label: 'Tóm tắt tuần', desc: 'Báo cáo hoạt động hàng tuần', value: notifWeekly, set: setNotifWeekly },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3">
                    <div>
                      <Label htmlFor={item.id} className="font-medium">{item.label}</Label>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch id={item.id} checked={item.value} onCheckedChange={item.set} />
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <Button variant="destructive" className="w-full gap-2" onClick={() => router.push('/login')}>
              <LogOut className="h-4 w-4" /> Đăng xuất
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
