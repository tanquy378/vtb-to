import { UserSidebar } from '@/components/layout/UserSidebar'
import { BottomNav } from '@/components/layout/BottomNav'
import { RoleSelector } from '@/components/shared/RoleSelector'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <UserSidebar />
      <main className="lg:pl-60 pb-20 lg:pb-0 min-h-screen">
        {children}
      </main>
      <BottomNav />
      <RoleSelector />
    </div>
  )
}
