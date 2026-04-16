import { AdminSidebar } from '@/components/layout/AdminSidebar'
import { RoleSelector } from '@/components/shared/RoleSelector'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="lg:pl-60 min-h-screen">
        {children}
      </main>
      <RoleSelector />
    </div>
  )
}
