'use client'

import Link from 'next/link'
import { Check, BarChart2, Users, Smartphone, Trophy, Award, Zap, ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { RoleSelector } from '@/components/shared/RoleSelector'

const features = [
  { icon: '🏆', title: 'Thử thách đa dạng', desc: 'Đi bộ, chạy bộ, đạp xe, yoga và 7 loại vận động khác' },
  { icon: '📊', title: 'Báo cáo chi tiết', desc: 'HR theo dõi tham gia và hiệu suất theo thời gian thực' },
  { icon: '👥', title: 'Tinh thần đội nhóm', desc: 'Thử thách nhóm tăng cường gắn kết đồng nghiệp' },
  { icon: '🎖️', title: 'Hệ thống huy hiệu', desc: '18+ huy hiệu khích lệ nhân viên duy trì thói quen tốt' },
  { icon: '📱', title: 'Mobile-first', desc: 'Ghi nhận hoạt động mọi lúc mọi nơi từ điện thoại' },
  { icon: '🔗', title: 'Kết nối Strava', desc: 'Tự động đồng bộ dữ liệu tập luyện từ Strava' },
]

const steps = [
  { num: '01', title: 'Doanh nghiệp đăng ký', desc: 'HR tạo tài khoản, thiết lập thử thách và mời nhân viên tham gia trong vài phút.' },
  { num: '02', title: 'Nhân viên vận động', desc: 'Ghi nhận hoạt động hàng ngày, theo dõi tiến độ và cạnh tranh lành mạnh cùng đồng nghiệp.' },
  { num: '03', title: 'Theo dõi & Khen thưởng', desc: 'HR xem báo cáo chi tiết, trao phần thưởng cho người xuất sắc và giữ lửa động lực.' },
]

const testimonials = [
  { name: 'Nguyễn Văn An', title: 'HR Director, FPT Software', quote: 'WellnessRace giúp tỷ lệ tham gia hoạt động thể chất của nhân viên tăng từ 30% lên 78% chỉ trong 3 tháng!', avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+An&background=008C44&color=fff&size=64' },
  { name: 'Trần Thị Hoa', title: 'CHRO, Vingroup', quote: 'Nền tảng dễ dùng, báo cáo chi tiết và team support tận tâm. Đây là investment tốt nhất cho employee wellness.', avatar: 'https://ui-avatars.com/api/?name=Tran+Thi+Hoa&background=1A73E8&color=fff&size=64' },
  { name: 'Lê Minh Tuấn', title: 'CEO, Masan Group', quote: 'Nhân viên chúng tôi hào hứng tham gia, tinh thần đội nhóm được cải thiện rõ rệt. Rất đáng giá!', avatar: 'https://ui-avatars.com/api/?name=Le+Minh+Tuan&background=FF6600&color=fff&size=64' },
]

const plans = [
  {
    name: 'Starter',
    price: '0đ',
    period: '/tháng',
    desc: 'Phù hợp cho doanh nghiệp nhỏ',
    features: ['Tối đa 100 nhân viên', '3 thử thách đồng thời', 'Báo cáo cơ bản', 'Hỗ trợ email'],
    cta: 'Bắt đầu miễn phí',
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '2.000.000 ₫',
    period: '/tháng',
    desc: 'Dành cho doanh nghiệp đang phát triển',
    features: ['Tối đa 500 nhân viên', 'Thử thách không giới hạn', 'Báo cáo nâng cao', 'Kết nối Strava', 'Hỗ trợ ưu tiên'],
    cta: 'Dùng thử 14 ngày',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Liên hệ',
    period: '',
    desc: 'Giải pháp tùy chỉnh cho tập đoàn',
    features: ['Nhân viên không giới hạn', 'Tùy chỉnh thương hiệu', 'Tích hợp HR system', 'SLA cam kết', 'Dedicated support'],
    cta: 'Liên hệ tư vấn',
    highlighted: false,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">WR</div>
            <span className="font-bold text-foreground">WellnessRace</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">Đăng nhập</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Bắt đầu</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 pt-16 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-0 hover:bg-primary/20">
            🎉 Phiên bản mới — Kết nối Strava tự động
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight mb-6">
            Thử thách sức khỏe<br />
            <span className="text-primary">cho doanh nghiệp</span> Việt Nam
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Kết nối đội nhóm, tạo động lực vận động và nâng cao sức khỏe toàn diện với nền tảng thử thách B2B hàng đầu.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-8">
                Bắt đầu miễn phí <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8">
                Xem demo ngay
              </Button>
            </Link>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[['500+', 'Doanh nghiệp'], ['50,000+', 'Nhân viên'], ['2M+', 'Hoạt động'], ['98%', 'Hài lòng']].map(([v, l]) => (
              <div key={l} className="text-center">
                <p className="text-2xl font-bold text-primary">{v}</p>
                <p className="text-sm text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Demo preview card */}
        <div className="mt-16 max-w-sm mx-auto">
          <div className="rounded-3xl bg-gradient-to-br from-green-400 to-emerald-600 p-5 text-white shadow-2xl rotate-1">
            <p className="text-xs font-medium opacity-80 uppercase tracking-wide mb-1">Đang diễn ra</p>
            <h3 className="text-lg font-bold mb-3">Tháng 4 — Triệu Bước Chân</h3>
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="opacity-80">Tiến độ</span>
                <span className="font-semibold">342,000 / 1,000,000 bước</span>
              </div>
              <div className="h-2 rounded-full bg-white/30"><div className="h-full rounded-full bg-white w-[34%]" /></div>
            </div>
            <div className="flex items-center gap-1.5">
              {['N', 'T', 'H', 'P'].map((i) => (
                <div key={i} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">{i}</div>
              ))}
              <span className="text-xs opacity-80 ml-1">+1,244 người</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">Tại sao chọn WellnessRace?</h2>
            <p className="text-muted-foreground text-lg">Tất cả những gì bạn cần để xây dựng văn hoá sức khỏe</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border bg-card p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">Hoạt động như thế nào?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={s.num} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary font-bold text-xl flex items-center justify-center mx-auto mb-4">{s.num}</div>
                <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                {i < 2 && <div className="hidden md:block absolute translate-x-full translate-y-8" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">Khách hàng nói gì?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border bg-card p-6">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map((s) => <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-semibold text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">Gói dịch vụ</h2>
            <p className="text-muted-foreground">Linh hoạt cho mọi quy mô doanh nghiệp</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div key={p.name} className={`rounded-2xl border bg-card p-6 relative ${p.highlighted ? 'border-primary shadow-lg shadow-primary/10 ring-2 ring-primary/20' : ''}`}>
                {p.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">Phổ biến nhất</Badge>
                )}
                <h3 className="font-bold text-lg text-foreground mb-1">{p.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-bold text-foreground">{p.price}</span>
                  <span className="text-muted-foreground text-sm">{p.period}</span>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup">
                  <Button variant={p.highlighted ? 'default' : 'outline'} className="w-full">{p.cta}</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-primary flex items-center justify-center text-white font-bold text-xs">WR</div>
            <span className="font-semibold text-foreground">WellnessRace</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 WellnessRace. Bảo lưu mọi quyền.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Giới thiệu</a>
            <a href="#" className="hover:text-foreground transition-colors">Liên hệ</a>
            <a href="#" className="hover:text-foreground transition-colors">Chính sách</a>
          </div>
        </div>
      </footer>

      <RoleSelector />
    </div>
  )
}
