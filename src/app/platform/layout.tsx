import { PlatformSidebar } from '@/components/layout/PlatformSidebar'
import { RoleSelector } from '@/components/shared/RoleSelector'

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <PlatformSidebar />
      <main className="lg:pl-60 min-h-screen">
        {children}
      </main>
      <RoleSelector />
    </div>
  )
}
