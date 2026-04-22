'use client'

import { useState } from 'react'
import { Plus, Users } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AvatarGroup } from '@/components/shared/AvatarGroup'
import { mockTeams, mockUsers } from '@/lib/mock-data'
import type { Team } from '@/lib/types'

export default function AdminTeamsPage() {
  const [selected, setSelected] = useState<Team | null>(null)

  const getUser = (id: string) => mockUsers.find((u) => u.id === id)

  return (
    <div className="min-h-screen">
      <TopBar
        title="Đội nhóm"
        actions={
          <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" />Tạo đội</Button>
        }
      />

      <div className="px-4 pt-4 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockTeams.map((team) => {
            const captain = getUser(team.captainId)
            const memberAvatars = team.members
              .slice(0, 4)
              .map((id) => getUser(id))
              .filter(Boolean)
              .map((u) => ({ id: u!.id, name: u!.name, avatar: u!.avatar }))

            return (
              <div key={team.id} className="rounded-2xl border bg-card p-4 space-y-3">
                {/* Team header */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                    style={{ backgroundColor: team.avatarColor }}
                  >
                    {team.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{team.name}</p>
                    <p className="text-xs text-muted-foreground">{team.members.length} thành viên</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">{team.totalPoints.toLocaleString('vi-VN')}</p>
                    <p className="text-xs text-muted-foreground">Hạng #{team.rank}</p>
                  </div>
                </div>

                {/* Captain */}
                {captain && (
                  <div className="flex items-center gap-2 text-sm">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={captain.avatar} alt={captain.name} />
                      <AvatarFallback className="text-xs">{captain.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-muted-foreground text-xs">Đội trưởng:</span>
                    <span className="text-sm font-medium text-foreground truncate">{captain.name}</span>
                  </div>
                )}

                {/* Member avatars */}
                <AvatarGroup users={memberAvatars} max={4} />

                <Button size="sm" variant="outline" className="w-full" onClick={() => setSelected(team)}>
                  Quản lý đội
                </Button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Team detail sheet */}
      <Sheet open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null) }}>
        <SheetContent side="right">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: selected.avatarColor }}>
                    {selected.name[0]}
                  </div>
                  {selected.name}
                </SheetTitle>
              </SheetHeader>
              <div className="mt-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-muted/50 p-3 text-center">
                    <p className="text-lg font-bold text-primary">{selected.totalPoints.toLocaleString('vi-VN')}</p>
                    <p className="text-xs text-muted-foreground">Tổng điểm</p>
                  </div>
                  <div className="rounded-xl bg-muted/50 p-3 text-center">
                    <p className="text-lg font-bold text-foreground">#{selected.rank}</p>
                    <p className="text-xs text-muted-foreground">Xếp hạng</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">Thành viên ({selected.members.length})</p>
                  <div className="space-y-2">
                    {selected.members.map((id) => {
                      const u = getUser(id)
                      if (!u) return null
                      return (
                        <div key={id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={u.avatar} alt={u.name} />
                            <AvatarFallback className="text-xs">{u.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{u.name}</p>
                            <p className="text-xs text-muted-foreground">{u.department}</p>
                          </div>
                          {id === selected.captainId && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Đội trưởng</span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="pt-2 space-y-2">
                  <Button variant="outline" className="w-full gap-2"><Users className="h-4 w-4" />Thêm thành viên</Button>
                  <Button variant="destructive" className="w-full">Giải tán đội</Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
