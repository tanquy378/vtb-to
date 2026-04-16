import { format } from "date-fns";
import { vi } from "date-fns/locale";

export function formatVND(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export function formatDate(date: string): string {
  return format(new Date(date), "dd 'tháng' MM, yyyy", { locale: vi });
}

export function formatDateShort(date: string): string {
  return format(new Date(date), "dd/MM/yyyy");
}

export function formatKm(km: number): string {
  return `${km.toLocaleString("vi-VN", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} km`;
}

export function formatSteps(steps: number): string {
  if (steps >= 1000)
    return `${(steps / 1000).toLocaleString("vi-VN", {
      maximumFractionDigits: 1,
    })}k`;
  return steps.toLocaleString("vi-VN");
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} phút`;
  if (m === 0) return `${h} giờ`;
  return `${h} giờ ${m} phút`;
}

export function formatCalories(kcal: number): string {
  return `${kcal.toLocaleString("vi-VN")} kcal`;
}

export function formatRelativeDate(date: string): string {
  const now = new Date();
  const d = new Date(date);
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Hôm nay";
  if (diffDays === 1) return "Hôm qua";
  if (diffDays < 7) return `${diffDays} ngày trước`;
  return formatDateShort(date);
}
