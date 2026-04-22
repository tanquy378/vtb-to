'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, X } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

const GRADIENTS = [
  { label: 'Xanh lá', value: 'from-green-400 to-emerald-600' },
  { label: 'Xanh dương', value: 'from-blue-400 to-indigo-600' },
  { label: 'Cam', value: 'from-orange-400 to-rose-600' },
  { label: 'Tím', value: 'from-purple-400 to-violet-600' },
  { label: 'Vàng', value: 'from-yellow-400 to-orange-500' },
]

const CHALLENGE_TYPES = [
  { value: 'steps', label: 'Số bước', unit: 'bước' },
  { value: 'distance', label: 'Quãng đường (km)', unit: 'km' },
  { value: 'calories', label: 'Calo', unit: 'kcal' },
  { value: 'duration', label: 'Thời gian', unit: 'phút' },
  { value: 'team_steps', label: 'Số bước nhóm', unit: 'bước' },
]

export default function NewChallengePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'steps',
    gradient: 'from-green-400 to-emerald-600',
    target: '',
    startDate: '',
    endDate: '',
    maxParticipants: '',
    isTeam: false,
    teamSize: '',
    rules: [''],
    prize: '',
  })

  const setField = (key: keyof typeof form, value: unknown) => setForm((f) => ({ ...f, [key]: value }))
  const typeInfo = CHALLENGE_TYPES.find((t) => t.value === form.type)

  const addRule = () => setField('rules', [...form.rules, ''])
  const removeRule = (i: number) => setField('rules', form.rules.filter((_, idx) => idx !== i))
  const setRule = (i: number, v: string) => setField('rules', form.rules.map((r, idx) => idx === i ? v : r))

  return (
    <div className="min-h-screen">
      <TopBar title="Tạo thử thách mới" showBack />

      <div className="px-4 pt-4 pb-6 space-y-5">
        {/* Step indicator */}
        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Bước {step} / 4</span>
            <span>{['Thông tin', 'Cài đặt', 'Quy tắc', 'Xem trước'][step - 1]}</span>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? 'bg-primary' : 'bg-muted'}`} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {/* Step 1: Basic info */}
          {step === 1 && (
            <>
              <div className="space-y-1.5">
                <Label>Tên thử thách</Label>
                <Input placeholder="Tháng 5 — Triệu Bước Chân" value={form.title} onChange={(e) => setField('title', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Mô tả</Label>
                <Textarea placeholder="Mô tả thử thách..." rows={3} value={form.description} onChange={(e) => setField('description', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Loại thử thách</Label>
                <Select value={form.type} onValueChange={(v) => setField('type', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CHALLENGE_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Màu bìa</Label>
                <div className="flex gap-2">
                  {GRADIENTS.map((g) => (
                    <button
                      key={g.value}
                      onClick={() => setField('gradient', g.value)}
                      className={`flex-1 h-10 rounded-xl bg-gradient-to-br ${g.value} transition-all ${form.gradient === g.value ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                      title={g.label}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 2: Settings */}
          {step === 2 && (
            <>
              <div className="space-y-1.5">
                <Label>Mục tiêu ({typeInfo?.unit})</Label>
                <Input type="number" placeholder="1000000" value={form.target} onChange={(e) => setField('target', e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Ngày bắt đầu</Label>
                  <Input type="date" value={form.startDate} onChange={(e) => setField('startDate', e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Ngày kết thúc</Label>
                  <Input type="date" value={form.endDate} onChange={(e) => setField('endDate', e.target.value)} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Số người tham gia tối đa (tuỳ chọn)</Label>
                <Input type="number" placeholder="Không giới hạn" value={form.maxParticipants} onChange={(e) => setField('maxParticipants', e.target.value)} />
              </div>
              <div className="flex items-center justify-between rounded-xl border bg-card p-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Thử thách nhóm</p>
                  <p className="text-xs text-muted-foreground">Thi đấu theo đội nhóm</p>
                </div>
                <Switch checked={form.isTeam} onCheckedChange={(v) => setField('isTeam', v)} />
              </div>
              {form.isTeam && (
                <div className="space-y-1.5">
                  <Label>Số thành viên mỗi nhóm</Label>
                  <Input type="number" placeholder="5" value={form.teamSize} onChange={(e) => setField('teamSize', e.target.value)} />
                </div>
              )}
            </>
          )}

          {/* Step 3: Rules & Prize */}
          {step === 3 && (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Quy tắc tham gia</Label>
                  <Button type="button" size="sm" variant="ghost" onClick={addRule} className="h-7 text-xs gap-1">
                    <Plus className="h-3.5 w-3.5" />Thêm
                  </Button>
                </div>
                {form.rules.map((rule, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      placeholder={`Quy tắc ${i + 1}`}
                      value={rule}
                      onChange={(e) => setRule(i, e.target.value)}
                    />
                    {form.rules.length > 1 && (
                      <Button type="button" size="sm" variant="ghost" onClick={() => removeRule(i)} className="h-11 w-11 p-0 flex-shrink-0">
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <div className="space-y-1.5">
                <Label>Mô tả phần thưởng (tuỳ chọn)</Label>
                <Textarea placeholder="Top 10 nhận thẻ quà tặng 500.000đ..." rows={3} value={form.prize} onChange={(e) => setField('prize', e.target.value)} />
              </div>
            </>
          )}

          {/* Step 4: Preview */}
          {step === 4 && (
            <div className="space-y-4">
              <p className="text-sm font-semibold text-foreground">Xem trước thử thách</p>
              <div className={`rounded-2xl bg-gradient-to-br ${form.gradient} p-5 text-white`}>
                <p className="text-xs font-medium opacity-80 uppercase tracking-wide mb-1">{typeInfo?.label}</p>
                <h2 className="text-lg font-bold">{form.title || 'Tên thử thách'}</h2>
                <p className="text-sm opacity-80 mt-1">{form.description || 'Mô tả thử thách'}</p>
                {form.target && (
                  <p className="text-sm font-semibold mt-3">Mục tiêu: {parseInt(form.target).toLocaleString('vi-VN')} {typeInfo?.unit}</p>
                )}
              </div>
              {form.prize && (
                <div className="rounded-xl border bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900 p-3 text-sm">
                  🏆 <span className="font-medium">{form.prize}</span>
                </div>
              )}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => router.push('/admin/challenges')}>Lưu nháp</Button>
                <Button className="flex-1" onClick={() => router.push('/admin/challenges')}>Xuất bản</Button>
              </div>
            </div>
          )}
        </div>

        {step < 4 && (
          <div className="flex gap-3 pt-2">
            {step > 1 && (
              <Button variant="outline" className="flex-1" onClick={() => setStep(step - 1)}>Quay lại</Button>
            )}
            <Button className="flex-1" onClick={() => setStep(step + 1)}>Tiếp theo</Button>
          </div>
        )}
      </div>
    </div>
  )
}
