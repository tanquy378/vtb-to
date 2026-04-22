'use client'

import { Download } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { TopBar } from '@/components/layout/TopBar'
import { StatCard } from '@/components/shared/StatCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { adminAnalytics } from '@/lib/mock-data'
import { formatKm, formatSteps } from '@/lib/formatters'

const DEPARTMENTS = [
  { name: 'Kỹ thuật', employees: 1800, active: 1512, rate: 84 },
  { name: 'Marketing', employees: 450, active: 342, rate: 76 },
  { name: 'Kinh doanh', employees: 620, active: 434, rate: 70 },
  { name: 'Nhân sự', employees: 180, active: 162, rate: 90 },
  { name: 'Tài chính', employees: 230, active: 161, rate: 70 },
  { name: 'Vận hành', employees: 340, active: 272, rate: 80 },
]

export default function AdminReportsPage() {
  const a = adminAnalytics

  return (
    <div className="min-h-screen">
      <TopBar
        title="Báo cáo"
        actions={
          <Button size="sm" variant="outline" className="gap-1.5">
            <Download className="h-4 w-4" />Xuất
          </Button>
        }
      />

      <div className="px-4 pt-4 pb-6 space-y-5">
        {/* Date range */}
        <div className="flex gap-3">
          <div className="flex-1 space-y-1">
            <Label className="text-xs">Từ ngày</Label>
            <Input type="date" defaultValue="2026-04-01" />
          </div>
          <div className="flex-1 space-y-1">
            <Label className="text-xs">Đến ngày</Label>
            <Input type="date" defaultValue="2026-04-30" />
          </div>
        </div>

        {/* KPI summary */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard title="Tỷ lệ tham gia" value={`${a.participationRate}%`} change={8} changeLabel="vs tháng trước" color="green" />
          <StatCard title="Tổng hoạt động" value={a.totalActivities.toLocaleString('vi-VN')} change={15} changeLabel="vs tháng trước" color="blue" />
          <StatCard title="Tổng bước" value={formatSteps(a.totalSteps)} change={12} changeLabel="vs tháng trước" color="purple" />
          <StatCard title="Tổng km" value={formatKm(a.totalKm)} change={9} changeLabel="vs tháng trước" color="yellow" />
        </div>

        {/* Trend chart */}
        <Card className="rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Xu hướng tham gia</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={a.weeklyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#008C44" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#008C44" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="participants" stroke="#008C44" fill="url(#grad2)" strokeWidth={2} name="Người tham gia" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Activity type chart */}
        <Card className="rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Phân loại hoạt động</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={a.activityBreakdown.slice(0, 5)} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="label" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#008C44" radius={[4, 4, 0, 0]} name="Số hoạt động" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top 10 performers */}
        <Card className="rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Top 10 nhân viên xuất sắc</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    {['#', 'Nhân viên', 'Bước', 'Km', 'Điểm'].map((h) => (
                      <th key={h} className="text-left py-2 pr-3 text-xs font-semibold text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {a.topPerformers.map((p) => (
                    <tr key={p.userId} className="border-b last:border-0">
                      <td className="py-2 pr-3 text-muted-foreground font-medium">{p.rank}</td>
                      <td className="py-2 pr-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarImage src={p.avatar} alt={p.name} />
                            <AvatarFallback className="text-xs">{p.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="truncate max-w-24">{p.name}</span>
                        </div>
                      </td>
                      <td className="py-2 pr-3 text-xs">{formatSteps(p.totalSteps)}</td>
                      <td className="py-2 pr-3 text-xs">{formatKm(p.totalKm)}</td>
                      <td className="py-2 font-semibold text-primary">{p.totalPoints.toLocaleString('vi-VN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Department breakdown */}
        <Card className="rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Tham gia theo bộ phận</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {DEPARTMENTS.map((d) => (
              <div key={d.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">{d.name}</span>
                  <span className="text-muted-foreground">{d.active}/{d.employees} ({d.rate}%)</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${d.rate}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
