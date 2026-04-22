'use client'

import { useParams } from 'next/navigation'
import { Users, Calendar, Target, Trophy, CheckCircle } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { CountdownTimer } from '@/components/shared/CountdownTimer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { mockChallenges, individualLeaderboard } from '@/lib/mock-data'
import { CHALLENGE_STATUS_LABELS, CHALLENGE_STATUS_COLORS } from '@/lib/constants'
import { formatDate, formatSteps, formatKm } from '@/lib/formatters'

const TYPE_LABELS: Record<string, string> = {
  steps: 'Số bước', distance: 'Quãng đường km', calories: 'Calo', duration: 'Thời gian (phút)', team_steps: 'Bước nhóm',
}

export default function ChallengeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const challenge = mockChallenges.find((c) => c.id === id)

  if (!challenge) {
    return (
      <div className="min-h-screen">
        <TopBar title="Không tìm thấy" showBack />
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <p className="text-5xl mb-3">😕</p>
          <p className="font-medium">Thử thách không tồn tại</p>
        </div>
      </div>
    )
  }

  const top5 = individualLeaderboard.slice(0, 5)

  return (
    <div className="min-h-screen">
      <TopBar title={challenge.title} showBack />

      {/* Hero banner */}
      <div className={`bg-gradient-to-br ${challenge.coverGradient} px-5 py-8 text-white`}>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1">
            <Badge className={`text-xs font-semibold ${CHALLENGE_STATUS_COLORS[challenge.status]} border-0 mb-2`}>
              {CHALLENGE_STATUS_LABELS[challenge.status]}
            </Badge>
            <h1 className="text-xl font-bold leading-tight">{challenge.title}</h1>
            <p className="text-sm opacity-80 mt-1 leading-relaxed">{challenge.description}</p>
          </div>
        </div>
        {(challenge.status === 'active' || challenge.status === 'upcoming') && (
          <CountdownTimer targetDate={challenge.endDate} />
        )}
      </div>

      <div className="px-4 pt-5 pb-6 space-y-5">
        {/* Info row */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Calendar, label: 'Bắt đầu', value: formatDate(challenge.startDate) },
            { icon: Calendar, label: 'Kết thúc', value: formatDate(challenge.endDate) },
            { icon: Target, label: 'Mục tiêu', value: `${challenge.target.toLocaleString('vi-VN')} ${challenge.unit}` },
            { icon: Users, label: 'Tham gia', value: `${challenge.participantCount.toLocaleString('vi-VN')} người` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-xl border bg-card p-3">
              <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                <Icon className="h-3.5 w-3.5" />
                <span className="text-xs">{label}</span>
              </div>
              <p className="text-sm font-semibold text-foreground">{value}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        {challenge.status === 'active' && (
          <Button className="w-full" size="lg">Tham gia thử thách</Button>
        )}
        {challenge.status === 'upcoming' && (
          <Button className="w-full" size="lg" variant="outline">Đăng ký trước</Button>
        )}

        {/* Rules */}
        <Card className="rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" /> Quy tắc tham gia
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {challenge.rules.map((rule, i) => (
              <div key={i} className="flex gap-2.5 text-sm">
                <span className="text-muted-foreground flex-shrink-0">{i + 1}.</span>
                <span className="text-foreground">{rule}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Prize */}
        {challenge.prizeDescription && (
          <Card className="rounded-2xl border-yellow-200 dark:border-yellow-900 bg-yellow-50/50 dark:bg-yellow-950/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-500" /> Phần thưởng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground">{challenge.prizeDescription}</p>
            </CardContent>
          </Card>
        )}

        {/* Leaderboard preview */}
        <Card className="rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Top 5 bảng xếp hạng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {top5.map((entry) => (
              <div key={entry.userId} className="flex items-center gap-3">
                <span className={`w-6 text-center text-sm font-bold ${entry.rank <= 3 ? 'text-yellow-500' : 'text-muted-foreground'}`}>
                  {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : entry.rank}
                </span>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={entry.avatar} alt={entry.name} />
                  <AvatarFallback>{entry.name[0]}</AvatarFallback>
                </Avatar>
                <span className="flex-1 text-sm font-medium truncate">{entry.name}</span>
                <span className="text-sm font-semibold text-primary">{entry.totalPoints.toLocaleString('vi-VN')} điểm</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
