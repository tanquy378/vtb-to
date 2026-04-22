'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignupPage() {
  const router = useRouter()
  const [showPw, setShowPw] = useState(false)

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">WR</div>
          <h1 className="text-2xl font-bold text-foreground">Tạo tài khoản</h1>
          <p className="text-muted-foreground text-sm mt-1">Bắt đầu hành trình sức khỏe của bạn</p>
        </div>

        <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Họ và tên</Label>
            <Input id="name" placeholder="Nguyễn Văn An" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Địa chỉ email công ty</Label>
            <Input id="email" type="email" placeholder="ban@congty.com" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="company">Tên công ty</Label>
            <Input id="company" placeholder="FPT Software" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative">
              <Input id="password" type={showPw ? 'text' : 'password'} placeholder="Tối thiểu 8 ký tự" className="pr-11" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Toggle password">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirm">Xác nhận mật khẩu</Label>
            <Input id="confirm" type="password" placeholder="Nhập lại mật khẩu" />
          </div>
          <Button className="w-full" onClick={() => router.push('/onboarding')}>Đăng ký</Button>
          <p className="text-xs text-muted-foreground text-center">
            Bằng cách đăng ký, bạn đồng ý với{' '}
            <a href="#" className="text-primary hover:underline">Điều khoản dịch vụ</a>
          </p>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Đã có tài khoản?{' '}
          <Link href="/login" className="text-primary font-medium hover:underline">Đăng nhập</Link>
        </p>
      </div>
    </div>
  )
}
