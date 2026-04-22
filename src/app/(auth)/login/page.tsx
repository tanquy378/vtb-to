'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useRole } from '@/providers/RoleProvider'

export default function LoginPage() {
  const router = useRouter()
  const { setRole } = useRole()
  const [showPw, setShowPw] = useState(false)

  function demoLogin(role: 'user' | 'admin' | 'platform') {
    setRole(role)
    if (role === 'user') router.push('/dashboard')
    else if (role === 'admin') router.push('/admin/dashboard')
    else router.push('/platform/organizations')
  }

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">WR</div>
          <h1 className="text-2xl font-bold text-foreground">WellnessRace</h1>
          <p className="text-muted-foreground text-sm mt-1">Đăng nhập vào tài khoản của bạn</p>
        </div>

        <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Địa chỉ email</Label>
            <Input id="email" type="email" placeholder="ban@congty.com" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative">
              <Input id="password" type={showPw ? 'text' : 'password'} placeholder="••••••••" className="pr-11" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Toggle password visibility">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <Button className="w-full" onClick={() => demoLogin('user')}>Đăng nhập</Button>

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">hoặc demo nhanh</span>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground text-center">Chọn vai trò để xem demo</p>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" className="text-xs flex-col h-14 gap-1" onClick={() => demoLogin('user')}>
                <span className="text-base">👤</span>
                Nhân viên
              </Button>
              <Button variant="outline" size="sm" className="text-xs flex-col h-14 gap-1 border-primary text-primary hover:bg-primary/5" onClick={() => demoLogin('admin')}>
                <span className="text-base">🛡️</span>
                Quản trị HR
              </Button>
              <Button variant="outline" size="sm" className="text-xs flex-col h-14 gap-1 border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950" onClick={() => demoLogin('platform')}>
                <span className="text-base">🏢</span>
                Platform
              </Button>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Chưa có tài khoản?{' '}
          <Link href="/signup" className="text-primary font-medium hover:underline">Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  )
}
