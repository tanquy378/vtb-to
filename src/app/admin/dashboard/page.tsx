'use client'

import { Users, TrendingUp, Activity, Map } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { TopBar } from '@/components/layout/TopBar'
import { StatCard } from '@/components/shared/StatCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { adminAnalytics } from '@/lib/mock-data'
import { formatKm, formatSteps } from '@/lib/formatters'

export default function AdminDashboardPage() {
  const a = adminAnalytics

  return (
    <div className="min-h-screen">
      <TopBar title="Tổng quan" />

      <div className="px-4 pt-4 pb-6 space-y-5">
        {/* KPI cards */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard title="Tổng nhân viên" value={a.totalEmployees.toLocaleString('vi-VN')} icon={<Users className="h-5 w-5" />} color="blue" />
          <StatCard title="Đang tham gia" value={`${a.activeParticipants.toLocaleString('vi-VN')} (${a.participationRate}%)`} icon={<TrendingUp className="h-5 w-5" />} color="green" change={8} changeLabel="so với tháng trước" />
          <StatCard title="Tổng hoạt động" value={a.totalActivities.toLocaleString('vi-VN')} icon={<Activity className="h-5 w-5" />} color="purple" />
          <StatCard title="Tổng quãng đường" value={formatKm(a.totalKm)} icon={<Map className="h-5 w-5" />} color="yellow" />
        </div>

        {/* Participation chart */}
        <Card className="rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Tham gia theo tuần</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={a.weeklyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#008C44" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#008C44" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="participants" stroke="#008C44" fill="url(#grad)" strokeWidth={2} name="Người tham gia" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Activity breakdown */}
        <Card className="rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Phân loại hoạt động</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {a.activityBreakdown.map((item) => (
              <div key={item.type} className="flex items-center gap-3 text-sm">
                <span className="w-24 text-muted-foreground truncate">{item.label}</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${item.percentage}%`, backgroundColor: item.color }} />
                </div>
                <span className="text-muted-foreground w-8 text-right text-xs">{item.percentage}%</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top performers */}
        <Card className="rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Nhân viên xuất sắc</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {a.topPerformers.slice(0, 5).map((p) => (
              <div key={p.userId} className="flex items-center gap-3">
                <span className="w-5 text-center text-xs font-bold text-muted-foreground">{p.rank}</span>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={p.avatar} alt={p.name} />
                  <AvatarFallback className="text-xs">{p.name[0]}</AvatarFallback>
                </Avatar>
                <span className="flex-1 text-sm font-medium truncate">{p.name}</span>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{p.totalPoints.toLocaleString('vi-VN')}</p>
                  <p className="text-xs text-muted-foreground">{formatSteps(p.totalSteps)}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
