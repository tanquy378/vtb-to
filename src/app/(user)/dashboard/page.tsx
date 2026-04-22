'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Footprints, Route, Star, Trophy } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { StatCard } from '@/components/shared/StatCard'
import { CountdownTimer } from '@/components/shared/CountdownTimer'
import { StreakBadge } from '@/components/shared/StreakBadge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { currentUser, mockChallenges, mockActivities, teamLeaderboard, mockTeams } from '@/lib/mock-data'
import { ACTIVITY_TYPES } from '@/lib/constants'
import { formatRelativeDate, formatDuration, formatKm, formatSteps } from '@/lib/formatters'

const CHALLENGE_TYPE_LABELS: Record<string, string> = {
  steps: 'Số bước',
  distance: 'Quãng đường',
  calories: 'Calo',
  duration: 'Thời gian',
  team_steps: 'Đội nhóm',
}

export default function DashboardPage() {
  const user = currentUser
  const activeChallenge = mockChallenges.find((c) => c.status === 'active')
  const upcomingChallenges = mockChallenges.filter((c) => c.status === 'upcoming').slice(0, 2)
  const recentActivities = mockActivities.slice(0, 5)

  const userTeam = mockTeams.find((t) => t.id === user.teamId)
  const userTeamRank = teamLeaderboard.find((e) => e.teamId === user.teamId)
  const nextTeamRank = userTeamRank ? teamLeaderboard.find((e) => e.rank === userTeamRank.rank - 1) : null

  // Simulated progress: 342,000 out of 1,000,000 steps
  const challengeProgress = 342000
  const challengeTarget = activeChallenge?.target ?? 1000000
  const progressPct = Math.min(100, Math.round((challengeProgress / challengeTarget) * 100))

  return (
    <div className="min-h-screen">
      <TopBar title="Trang chủ" />

      <div className="pb-6 px-4 space-y-6 pt-4">
        {/* Greeting */}
        <div>
          <p className="text-xl font-semibold text-foreground">Chào buổi sáng, {user.name.split(' ').pop()}! 👋</p>
          <p className="text-sm text-muted-foreground mt-0.5">Hôm nay là ngày tốt để vận động</p>
        </div>

        {/* Active Challenge Card */}
        {activeChallenge && (
          <div className={`rounded-2xl bg-gradient-to-br ${activeChallenge.coverGradient} p-5 text-white shadow-lg`}>
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium opacity-80 uppercase tracking-wide mb-1">
                  {CHALLENGE_TYPE_LABELS[activeChallenge.type] ?? activeChallenge.type}
                </p>
                <h2 className="text-lg font-bold leading-tight">{activeChallenge.title}</h2>
              </div>
              <span className="flex-shrink-0 text-xs bg-white/20 rounded-full px-2.5 py-1 font-medium">
                Đang diễn ra
              </span>
            </div>

            <CountdownTimer
              targetDate={activeChallenge.endDate}
              label="Kết thúc sau"
              className="items-start mb-4 [&>p]:text-white/80 [&_.rounded-xl]:bg-white/20 [&_.rounded-xl_span]:text-white [&_.text-muted-foreground]:text-white/70 [&_.text-xl]:text-white/60"
            />

            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="opacity-80">Tiến độ của bạn</span>
                <span className="font-semibold">{formatSteps(challengeProgress)} / {formatSteps(challengeTarget)} {activeChallenge.unit}</span>
              </div>
              <div className="h-2 rounded-full bg-white/30 overflow-hidden">
                <div
                  className="h-full rounded-full bg-white transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-xs opacity-70 mt-1">{progressPct}% hoàn thành</p>
            </div>

            <Link href={`/challenges/${activeChallenge.id}`}>
              <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0 w-full font-semibold">
                Xem chi tiết
              </Button>
            </Link>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            title="Bước hôm nay"
            value="8,432"
            icon={<Footprints className="h-5 w-5" />}
            color="green"
            change={12}
            changeLabel="so với hôm qua"
          />
          <StatCard
            title="Quãng đường tuần này"
            value={formatKm(12.4)}
            icon={<Route className="h-5 w-5" />}
            color="blue"
            change={8}
            changeLabel="so với tuần trước"
          />
          <div className="rounded-2xl border border-border bg-card p-4 flex flex-col gap-2">
            <p className="text-sm text-muted-foreground font-medium">Streak hiện tại</p>
            <div className="flex items-center gap-2">
              <StreakBadge streak={user.currentStreak} />
              <span className="text-xs text-muted-foreground">ngày liên tiếp</span>
            </div>
            <p className="text-xs text-muted-foreground">Cao nhất: {user.longestStreak} ngày</p>
          </div>
          <StatCard
            title="Điểm tổng"
            value={`${(user.totalPoints / 1000).toFixed(1)}k`}
            icon={<Star className="h-5 w-5" />}
            color="yellow"
            change={5}
            changeLabel="tuần này"
          />
        </div>

        {/* Activity Feed */}
        <div>
          <h2 className="text-base font-semibold text-foreground mb-3">Hoạt động gần đây</h2>
          <div className="space-y-2">
            {recentActivities.map((activity) => {
              const actType = ACTIVITY_TYPES.find((t) => t.value === activity.type)
              return (
                <div key={activity.id} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl ${actType?.color ?? 'bg-muted'}`}>
                    {actType?.icon ?? '🏃'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{actType?.label ?? activity.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatRelativeDate(activity.date)} · {formatDuration(activity.duration)}
                      {activity.distance ? ` · ${formatKm(activity.distance)}` : ''}
                      {activity.steps ? ` · ${formatSteps(activity.steps)} bước` : ''}
                    </p>
                  </div>
                  <Badge variant="secondary" className="flex-shrink-0 text-xs font-semibold">
                    +{activity.points} điểm
                  </Badge>
                </div>
              )
            })}
          </div>
        </div>

        {/* Team Rank Card */}
        {userTeam && userTeamRank && (
          <Card className="rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-500" />
                Xếp hạng đội của bạn
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: userTeam.avatarColor }}
                  >
                    #{userTeamRank.rank}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{userTeam.name}</p>
                    <p className="text-xs text-muted-foreground">{userTeam.members.length} thành viên</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{userTeamRank.totalPoints.toLocaleString('vi-VN')}</p>
                  <p className="text-xs text-muted-foreground">điểm</p>
                </div>
              </div>
              {nextTeamRank && (
                <div className="text-xs text-muted-foreground bg-muted rounded-lg px-3 py-2">
                  Còn <span className="font-semibold text-foreground">{(nextTeamRank.totalPoints - userTeamRank.totalPoints).toLocaleString('vi-VN')} điểm</span> để vượt qua <span className="font-semibold text-foreground">{nextTeamRank.name}</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Upcoming Challenges */}
        {upcomingChallenges.length > 0 && (
          <div>
            <h2 className="text-base font-semibold text-foreground mb-3">Thử thách sắp diễn ra</h2>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
              {upcomingChallenges.map((challenge) => (
                <Link key={challenge.id} href={`/challenges/${challenge.id}`} className="flex-shrink-0 w-64">
                  <div className={`rounded-2xl bg-gradient-to-br ${challenge.coverGradient} p-4 text-white h-full`}>
                    <p className="text-xs font-medium opacity-80 uppercase tracking-wide mb-1">
                      {CHALLENGE_TYPE_LABELS[challenge.type] ?? challenge.type}
                    </p>
                    <h3 className="font-bold text-sm leading-snug mb-2">{challenge.title}</h3>
                    <p className="text-xs opacity-75 line-clamp-2">{challenge.description}</p>
                    <div className="mt-3 flex items-center gap-1.5">
                      <span className="text-xs bg-white/20 rounded-full px-2 py-0.5">
                        {challenge.participantCount.toLocaleString('vi-VN')} người
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
