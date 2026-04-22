'use client'

import { Building2, Users, Trophy, TrendingUp } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { TopBar } from '@/components/layout/TopBar'
import { StatCard } from '@/components/shared/StatCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { platformMetrics, mockOrganizations } from '@/lib/mock-data'
import { formatVND } from '@/lib/formatters'

const planCounts = {
  starter: mockOrganizations.filter((o) => o.plan === 'starter').length,
  growth: mockOrganizations.filter((o) => o.plan === 'growth').length,
  enterprise: mockOrganizations.filter((o) => o.plan === 'enterprise').length,
}

function formatMVND(v: number) {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M ₫`
  if (v >= 1_000) return `${(v / 1_000).toFixed(0)}K ₫`
  return `${v} ₫`
}

export default function PlatformMetricsPage() {
  const m = platformMetrics

  return (
    <div className="min-h-screen">
      <TopBar title="Số liệu nền tảng" />

      <div className="px-4 pt-4 pb-6 space-y-5">
        {/* KPI row */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard title="Tổng tổ chức" value={m.totalOrganizations} icon={<Building2 className="h-5 w-5" />} color="blue" change={12} changeLabel="QoQ" />
          <StatCard title="Người dùng hoạt động" value={m.activeUsers.toLocaleString('vi-VN')} icon={<Users className="h-5 w-5" />} color="green" change={18} changeLabel="vs tháng trước" />
          <StatCard title="Thử thách đang chạy" value={m.activeChallenges} icon={<Trophy className="h-5 w-5" />} color="purple" />
          <StatCard title="MRR" value={formatVND(m.mrr)} icon={<TrendingUp className="h-5 w-5" />} color="yellow" change={7} changeLabel="MoM" />
        </div>

        {/* NPS */}
        <div className="rounded-2xl border bg-card p-5 flex items-center gap-5">
          <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-primary/10 flex-shrink-0">
            <p className="text-2xl font-bold text-primary">{m.nps}</p>
            <p className="text-xs text-muted-foreground">NPS</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Net Promoter Score</p>
            <p className="text-sm text-muted-foreground mt-1">Mức độ hài lòng và sẵn sàng giới thiệu của khách hàng. Điểm &gt;50 là xuất sắc.</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="h-2 w-32 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${m.nps}%` }} />
              </div>
              <span className="text-xs text-primary font-semibold">Xuất sắc</span>
            </div>
          </div>
        </div>

        {/* Org growth chart */}
        <Card className="rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Tăng trưởng tổ chức (6 tháng)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={m.orgGrowth} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="orgGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#008C44" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#008C44" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#008C44" fill="url(#orgGrad)" strokeWidth={2} name="Tổ chức" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue chart */}
        <Card className="rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Doanh thu (6 tháng)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={m.revenueGrowth} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={formatMVND} />
                <Tooltip formatter={(v) => formatVND(v as number)} />
                <Bar dataKey="revenue" fill="#008C44" radius={[4, 4, 0, 0]} name="Doanh thu" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Plan distribution */}
        <Card className="rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Phân phối gói dịch vụ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: 'Starter', count: planCounts.starter, color: 'bg-gray-400' },
              { label: 'Growth', count: planCounts.growth, color: 'bg-blue-500' },
              { label: 'Enterprise', count: planCounts.enterprise, color: 'bg-purple-600' },
            ].map((p) => (
              <div key={p.label} className="flex items-center gap-3 text-sm">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${p.color}`} />
                <span className="flex-1 text-foreground">{p.label}</span>
                <span className="font-semibold text-foreground">{p.count} tổ chức</span>
                <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full ${p.color}`} style={{ width: `${(p.count / m.totalOrganizations) * 100}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Churn & retention */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border bg-card p-4 text-center">
            <p className="text-3xl font-bold text-destructive">{m.churnRate}%</p>
            <p className="text-sm text-muted-foreground mt-1">Tỷ lệ rời bỏ</p>
          </div>
          <div className="rounded-2xl border bg-card p-4 text-center">
            <p className="text-3xl font-bold text-primary">{(100 - m.churnRate).toFixed(1)}%</p>
            <p className="text-sm text-muted-foreground mt-1">Tỷ lệ giữ chân</p>
          </div>
        </div>
      </div>
    </div>
  )
}
