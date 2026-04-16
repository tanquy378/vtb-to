import type { Announcement } from '@/lib/types'

export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Khởi động Thử thách Tháng 4 — Triệu Bước Chân!',
    content: `Kính gửi toàn thể nhân viên FPT Software,

Chúng tôi vui mừng thông báo thử thách sức khỏe lớn nhất tháng 4 đã chính thức bắt đầu: **Triệu Bước Chân**!

🎯 **Mục tiêu:** Đi bộ 1.000.000 bước trong tháng 4
📅 **Thời gian:** 01/04/2026 - 30/04/2026
🎁 **Giải thưởng:** Top 10 nhận thẻ quà tặng VinMart 500.000đ

Hãy cùng nhau xây dựng thói quen vận động lành mạnh! Đăng ký tham gia ngay tại ứng dụng WellnessRace.

Chúc mừng tất cả mọi người tham gia!`,
    organizationId: 'org-1',
    createdBy: 'user-2',
    createdAt: '2026-03-28T09:00:00.000Z',
    publishedAt: '2026-04-01T07:00:00.000Z',
    status: 'published',
    targetAudience: 'all',
    challengeId: 'challenge-1',
    viewCount: 1823,
  },
  {
    id: 'ann-2',
    title: 'Kết quả Thử thách Tháng 3 — Chúc mừng Top 3!',
    content: `Thân gửi các chiến binh sức khỏe,

Thử thách "Đại Chiến Bước Chân" tháng 3 đã chính thức kết thúc với kết quả ngoài mong đợi!

🥇 **Vô địch:** Trần Văn Hùng — 312.480 bước
🥈 **Á quân:** Hoàng Thị Hoa — 289.030 bước
🥉 **Hạng 3:** Nguyễn Thị Lan — 284.750 bước

📊 **Thống kê tổng:** 568 người tham gia, tổng cộng ghi nhận 187.432.000 bước — tương đương đi quanh Trái Đất 4,5 lần!

Xin chúc mừng tất cả những người đã tham gia và hoàn thành thử thách. Phần thưởng sẽ được trao vào cuộc họp toàn công ty ngày 05/04/2026.

Hẹn gặp lại ở thử thách tháng 4!`,
    organizationId: 'org-1',
    createdBy: 'user-2',
    createdAt: '2026-04-01T10:00:00.000Z',
    publishedAt: '2026-04-01T10:00:00.000Z',
    status: 'published',
    targetAudience: 'challenge_participants',
    challengeId: 'challenge-5',
    viewCount: 634,
  },
  {
    id: 'ann-3',
    title: 'Thử thách Đồng Đội "Chinh Phục 100km" — Đội của bạn đã sẵn sàng?',
    content: `Xin chào những người yêu thể thao,

Thử thách đồng đội mới nhất của tháng 4 đã mở đăng ký: **Chinh Phục 100km**!

👥 **Quy mô đội:** 5 người
📏 **Mục tiêu:** Tổng 100km trong 3 tuần (08/04 - 28/04)
🏆 **Giải thưởng:** Đội vô địch nhận 2.000.000đ + bữa ăn team

Đây là cơ hội tuyệt vời để gắn kết với đồng nghiệp và cùng nhau đạt mục tiêu sức khỏe. Hãy tập hợp đội ngay và đăng ký tham gia!

**Hướng dẫn tạo đội:**
1. Mở ứng dụng WellnessRace
2. Vào "Thử thách" → "Chinh Phục 100km"
3. Nhấn "Tạo đội mới" hoặc "Tham gia đội có sẵn"
4. Mời thành viên bằng email hoặc link

Mọi thắc mắc liên hệ phòng Nhân sự hoặc nhắn tin qua ứng dụng.`,
    organizationId: 'org-1',
    createdBy: 'user-2',
    createdAt: '2026-04-06T08:00:00.000Z',
    publishedAt: '2026-04-07T07:00:00.000Z',
    status: 'published',
    targetAudience: 'all',
    challengeId: 'challenge-2',
    viewCount: 892,
  },
  {
    id: 'ann-4',
    title: 'Kế hoạch Thử thách Hè 2026 — SẮP RA MẮT',
    content: `Kính gửi nhân viên Vingroup,

Phòng Nhân sự đang lên kế hoạch cho chuỗi thử thách mùa hè 2026 với quy mô và giải thưởng lớn nhất từ trước đến nay.

**Những gì chúng tôi đang chuẩn bị:**
- Thử thách marathon ảo 2 tháng
- Giải thưởng tổng trị giá 50.000.000đ
- Hệ thống huy hiệu đặc biệt mùa hè
- Sự kiện gặp gỡ offline toàn công ty

Chúng tôi đang thu thập ý kiến từ nhân viên để thiết kế chương trình phù hợp nhất. Vui lòng điền vào khảo sát nội bộ trước ngày 30/04/2026.

Trân trọng,
Phòng Nhân sự Vingroup`,
    organizationId: 'org-2',
    createdBy: 'user-5',
    createdAt: '2026-04-10T14:00:00.000Z',
    publishedAt: undefined,
    status: 'draft',
    targetAudience: 'all',
    viewCount: 0,
  },
  {
    id: 'ann-5',
    title: 'Tips Sức Khỏe: 5 Cách Tăng Lượng Bước Chân Mỗi Ngày',
    content: `Xin chào cộng đồng WellnessRace,

Trong tháng thử thách bước chân, dưới đây là 5 mẹo hữu ích để bạn tăng số bước mỗi ngày mà không cần dành thêm thời gian tập luyện:

**1. Đi cầu thang bộ thay vì thang máy**
Thêm 300-500 bước mỗi ngày chỉ với thói quen đơn giản này.

**2. Đỗ xe xa hơn một chút**
Đỗ xe cách văn phòng 5-10 phút đi bộ — thêm 1.000-2.000 bước mỗi ngày!

**3. Họp đứng hoặc đi bộ**
Các cuộc họp 1-1 có thể thực hiện khi đi bộ quanh văn phòng.

**4. Đặt nhắc nhở đứng dậy mỗi giờ**
Đứng dậy và đi bộ 2-3 phút sau mỗi giờ ngồi máy tính.

**5. Đi bộ sau bữa ăn trưa**
10-15 phút đi bộ sau ăn không chỉ tăng bước chân mà còn tốt cho tiêu hóa!

Hãy áp dụng và chia sẻ kết quả với chúng tôi!

Team WellnessRace`,
    organizationId: 'org-1',
    createdBy: 'user-2',
    createdAt: '2026-04-08T11:00:00.000Z',
    publishedAt: '2026-04-08T12:00:00.000Z',
    status: 'published',
    targetAudience: 'challenge_participants',
    challengeId: 'challenge-1',
    viewCount: 1247,
  },
]
