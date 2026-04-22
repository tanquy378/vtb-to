'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ACTIVITY_TYPES } from '@/lib/constants'

type ActivityValue = typeof ACTIVITY_TYPES[number]['value']

function calcPoints(type: ActivityValue, duration: number, steps?: number, distance?: number): number {
  let pts = Math.floor(duration * 2)
  if (steps) pts += Math.floor(steps / 100)
  if (distance) pts += Math.floor(distance * 10)
  return pts
}

export default function LogActivityPage() {
  const [selectedType, setSelectedType] = useState<ActivityValue | null>(null)
  const [duration, setDuration] = useState(30)
  const [steps, setSteps] = useState('')
  const [distance, setDistance] = useState('')
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState(false)

  const actInfo = ACTIVITY_TYPES.find((t) => t.value === selectedType)
  const pts = selectedType ? calcPoints(selectedType, duration, steps ? parseInt(steps) : undefined, distance ? parseFloat(distance) : undefined) : 0

  if (saved) {
    return (
      <div className="min-h-screen">
        <TopBar title="Ghi hoạt động" />
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <CheckCircle className="h-16 w-16 text-primary mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">Đã lưu thành công!</h2>
          <p className="text-muted-foreground text-sm mb-2">Bạn nhận được</p>
          <p className="text-4xl font-bold text-primary mb-1">+{pts}</p>
          <p className="text-muted-foreground text-sm mb-8">điểm</p>
          <Button onClick={() => { setSelectedType(null); setSaved(false); setSteps(''); setDistance(''); setNotes('') }}>
            Ghi thêm hoạt động
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <TopBar title="Ghi hoạt động" />

      <div className="px-4 pt-4 pb-6 space-y-5">
        {!selectedType ? (
          <>
            <div>
              <h2 className="text-base font-semibold text-foreground mb-1">Chọn loại hoạt động</h2>
              <p className="text-sm text-muted-foreground">Bạn vừa làm gì?</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {ACTIVITY_TYPES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setSelectedType(t.value)}
                  className={`rounded-2xl border bg-card p-4 flex flex-col items-center gap-2 hover:shadow-md active:scale-95 transition-all ${t.color}`}
                >
                  <span className="text-3xl">{t.icon}</span>
                  <span className="text-xs font-medium">{t.label}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <button onClick={() => setSelectedType(null)} className="text-sm text-primary hover:underline">← Đổi loại</button>
              <div className={`rounded-xl px-3 py-1.5 text-sm font-medium flex items-center gap-1.5 ${actInfo?.color}`}>
                <span>{actInfo?.icon}</span>
                <span>{actInfo?.label}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Ngày</Label>
                  <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="space-y-1.5">
                  <Label>Thời gian (phút)</Label>
                  <Input type="number" min={1} max={480} value={duration} onChange={(e) => setDuration(parseInt(e.target.value) || 0)} />
                </div>
              </div>

              {(selectedType === 'walking' || selectedType === 'running') && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>Số bước</Label>
                    <Input type="number" placeholder="8000" value={steps} onChange={(e) => setSteps(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Quãng đường (km)</Label>
                    <Input type="number" step="0.1" placeholder="5.0" value={distance} onChange={(e) => setDistance(e.target.value)} />
                  </div>
                </div>
              )}
              {selectedType === 'cycling' && (
                <div className="space-y-1.5">
                  <Label>Quãng đường (km)</Label>
                  <Input type="number" step="0.1" placeholder="20.0" value={distance} onChange={(e) => setDistance(e.target.value)} />
                </div>
              )}
              {selectedType === 'swimming' && (
                <div className="space-y-1.5">
                  <Label>Số vòng bơi</Label>
                  <Input type="number" placeholder="20" />
                </div>
              )}
              {(selectedType === 'badminton' || selectedType === 'football' || selectedType === 'basketball') && (
                <div className="space-y-1.5">
                  <Label>Số hiệp / buổi</Label>
                  <Input type="number" placeholder="3" />
                </div>
              )}

              <div className="space-y-1.5">
                <Label>Ghi chú (tuỳ chọn)</Label>
                <Textarea placeholder="Cảm giác hôm nay thật tuyệt..." rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>

              {/* Points preview */}
              <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Điểm sẽ nhận được</p>
                  <p className="text-xs text-muted-foreground">Dựa trên thời gian và quãng đường</p>
                </div>
                <p className="text-2xl font-bold text-primary">+{pts}</p>
              </div>

              <Button className="w-full" size="lg" onClick={() => setSaved(true)}>
                Lưu hoạt động
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
