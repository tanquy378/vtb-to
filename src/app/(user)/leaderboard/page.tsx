'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { individualLeaderboard, teamLeaderboard, currentUser } from '@/lib/mock-data'
import { formatSteps, formatKm } from '@/lib/formatters'

const TIME_FILTERS = ['Tuần này', 'Tháng này', 'Tất cả thời gian']

function DeltaBadge({ delta }: { delta: number }) {
  if (delta === 0) return <Minus className="h-3.5 w-3.5 text-muted-foreground" />
  if (delta > 0) return (
    <span className="flex items-center gap-0.5 text-xs text-emerald-600 font-medium">
      <TrendingUp className="h-3 w-3" />+{delta}
    </span>
  )
  return (
    <span className="flex items-center gap-0.5 text-xs text-red-500 font-medium">
      <TrendingDown className="h-3 w-3" />{delta}
    </span>
  )
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-xl">🥇</span>
  if (rank === 2) return <span className="text-xl">🥈</span>
  if (rank === 3) return <span className="text-xl">🥉</span>
  return <span className="w-7 text-center text-sm font-bold text-muted-foreground">{rank}</span>
}

export default function LeaderboardPage() {
  const [timeFilter, setTimeFilter] = useState('Tuần này')
  const maxTeamPts = teamLeaderboard[0]?.totalPoints ?? 1

  return (
    <div className="min-h-screen">
      <TopBar title="Bảng xếp hạng" />

      <div className="px-4 pt-4 pb-6 space-y-4">
        {/* Time filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {TIME_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setTimeFilter(f)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${timeFilter === f ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <Tabs defaultValue="individual">
          <TabsList className="w-full">
            <TabsTrigger value="individual" className="flex-1">Cá nhân</TabsTrigger>
            <TabsTrigger value="team" className="flex-1">Đội nhóm</TabsTrigger>
          </TabsList>

          <TabsContent value="individual" className="mt-4 space-y-2">
            {individualLeaderboard.map((entry) => {
              const isCurrentUser = entry.userId === currentUser.id
              return (
                <div
                  key={entry.userId}
                  className={`flex items-center gap-3 rounded-xl border p-3 ${isCurrentUser ? 'bg-primary/5 border-primary/30' : 'bg-card border-border'}`}
                >
                  <div className="w-8 flex justify-center flex-shrink-0">
                    <RankBadge rank={entry.rank} />
                  </div>
                  <Avatar className="h-9 w-9 flex-shrink-0">
                    <AvatarImage src={entry.avatar} alt={entry.name} />
                    <AvatarFallback className="text-xs">{entry.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isCurrentUser ? 'text-primary' : 'text-foreground'}`}>
                      {entry.name} {isCurrentUser && <span className="text-xs font-normal">(Bạn)</span>}
                    </p>
                    <p className="text-xs text-muted-foreground">{formatSteps(entry.totalSteps)} · {formatKm(entry.totalKm)}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-foreground">{entry.totalPoints.toLocaleString('vi-VN')}</p>
                    <DeltaBadge delta={entry.delta} />
                  </div>
                </div>
              )
            })}
          </TabsContent>

          <TabsContent value="team" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {teamLeaderboard.map((team) => (
                <div key={team.teamId} className="rounded-xl border bg-card p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <RankBadge rank={team.rank} />
                      <div>
                        <p className="font-semibold text-sm text-foreground">{team.name}</p>
                        <p className="text-xs text-muted-foreground">{team.teamId}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">{team.totalPoints.toLocaleString('vi-VN')}</p>
                      <DeltaBadge delta={team.delta} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>So với đội đứng đầu</span>
                      <span>{Math.round((team.totalPoints / maxTeamPts) * 100)}%</span>
                    </div>
                    <Progress value={(team.totalPoints / maxTeamPts) * 100} className="h-1.5" />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
