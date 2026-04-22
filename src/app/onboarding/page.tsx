'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const DEPARTMENTS = ['Kỹ thuật', 'Marketing', 'Kinh doanh', 'Nhân sự', 'Tài chính', 'Vận hành', 'Khác']

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-bold mx-auto mb-3">WR</div>
          <p className="text-sm text-muted-foreground">Bước {step} / 3</p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${s <= step ? 'bg-primary' : 'bg-muted'}`} />
          ))}
        </div>

        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-foreground">Hoàn thiện hồ sơ</h2>
                <p className="text-sm text-muted-foreground mt-1">Cho chúng tôi biết thêm về bạn</p>
              </div>
              {/* Avatar placeholder */}
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                  <Camera className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Ngày sinh</Label>
                <Input type="date" defaultValue="1995-06-15" />
              </div>
              <div className="space-y-1.5">
                <Label>Bộ phận</Label>
                <Select defaultValue="Kỹ thuật">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn bộ phận" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Mục tiêu sức khỏe</Label>
                <Textarea placeholder="Ví dụ: Tôi muốn đi bộ 10,000 bước mỗi ngày và giảm 5kg trong 3 tháng..." rows={3} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-foreground">Kết nối Strava</h2>
                <p className="text-sm text-muted-foreground mt-1">Tự động đồng bộ dữ liệu tập luyện</p>
              </div>
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-2xl bg-orange-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">S</div>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground space-y-2">
                <p>✅ Tự động ghi nhận chạy bộ và đạp xe</p>
                <p>✅ Đồng bộ GPS route và heart rate</p>
                <p>✅ Cập nhật điểm số tức thì</p>
              </div>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white" onClick={() => setStep(3)}>
                Kết nối Strava
              </Button>
              <button className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2" onClick={() => setStep(3)}>
                Bỏ qua bước này →
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 text-center">
              <CheckCircle className="h-16 w-16 text-primary mx-auto" />
              <div>
                <h2 className="text-xl font-bold text-foreground">Sẵn sàng rồi! 🎉</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Chào mừng đến với WellnessRace! Hồ sơ của bạn đã được thiết lập thành công.
                </p>
              </div>
              <div className="bg-primary/5 rounded-xl p-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Bước tiếp theo:</p>
                <p>Khám phá các thử thách đang diễn ra và bắt đầu hành trình sức khỏe của bạn!</p>
              </div>
              <Button className="w-full" onClick={() => router.push('/dashboard')}>
                Bắt đầu thử thách đầu tiên →
              </Button>
            </div>
          )}

          {step < 3 && (
            <div className="flex gap-3 mt-6">
              {step > 1 && (
                <Button variant="outline" className="flex-1" onClick={() => setStep(step - 1)}>Quay lại</Button>
              )}
              <Button className="flex-1" onClick={() => setStep(step + 1)}>Tiếp theo</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
