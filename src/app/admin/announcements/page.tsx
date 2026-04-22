'use client'

import { useState } from 'react'
import { Plus, Eye, Archive } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { mockAnnouncements } from '@/lib/mock-data'
import { formatRelativeDate } from '@/lib/formatters'

const STATUS_COLORS: Record<string, string> = {
  published: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  draft: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  archived: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
}
const STATUS_LABELS: Record<string, string> = { published: 'Đã đăng', draft: 'Bản nháp', archived: 'Đã lưu trữ' }

export default function AnnouncementsPage() {
  const [composerOpen, setComposerOpen] = useState(false)
  const [targetAudience, setTargetAudience] = useState('all')

  return (
    <div className="min-h-screen">
      <TopBar
        title="Thông báo"
        actions={
          <Button size="sm" className="gap-1.5" onClick={() => setComposerOpen(true)}>
            <Plus className="h-4 w-4" />Tạo thông báo
          </Button>
        }
      />

      <div className="px-4 pt-4 pb-6 space-y-3">
        {mockAnnouncements.map((ann) => (
          <div key={ann.id} className="rounded-2xl border bg-card p-4 space-y-2.5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-sm text-foreground flex-1">{ann.title}</h3>
              <Badge className={`text-xs border-0 flex-shrink-0 ${STATUS_COLORS[ann.status]}`}>
                {STATUS_LABELS[ann.status]}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{ann.content}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-xs">
                  {ann.targetAudience === 'all' ? 'Tất cả nhân viên' : 'Người tham gia'}
                </Badge>
                {ann.viewCount > 0 && (
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />{ann.viewCount.toLocaleString('vi-VN')} lượt xem
                  </span>
                )}
              </div>
              <span>{ann.publishedAt ? formatRelativeDate(ann.publishedAt) : formatRelativeDate(ann.createdAt)}</span>
            </div>
            <div className="flex gap-2 pt-1">
              <Button size="sm" variant="outline" className="flex-1 text-xs h-8">Chỉnh sửa</Button>
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                <Archive className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Composer sheet */}
      <Sheet open={composerOpen} onOpenChange={setComposerOpen}>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Tạo thông báo mới</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <div className="space-y-1.5">
              <Label>Tiêu đề</Label>
              <Input placeholder="Thông báo quan trọng..." />
            </div>
            <div className="space-y-1.5">
              <Label>Nội dung</Label>
              <Textarea placeholder="Viết nội dung thông báo..." rows={4} />
            </div>
            <div className="space-y-1.5">
              <Label>Đối tượng nhận</Label>
              <Select value={targetAudience} onValueChange={setTargetAudience}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả nhân viên</SelectItem>
                  <SelectItem value="challenge_participants">Người tham gia thử thách</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3 pt-1">
              <Button variant="outline" className="flex-1" onClick={() => setComposerOpen(false)}>Lưu nháp</Button>
              <Button className="flex-1" onClick={() => setComposerOpen(false)}>Xuất bản ngay</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
