'use client'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type DemoRole = 'user' | 'admin' | 'platform'

interface RoleContextValue {
  role: DemoRole
  setRole: (role: DemoRole) => void
}

const RoleContext = createContext<RoleContextValue>({ role: 'user', setRole: () => {} })

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<DemoRole>('user')

  useEffect(() => {
    const saved = localStorage.getItem('demo-role') as DemoRole | null
    if (saved) setRoleState(saved)
  }, [])

  function setRole(r: DemoRole) {
    setRoleState(r)
    localStorage.setItem('demo-role', r)
  }

  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>
}

export function useRole() {
  return useContext(RoleContext)
}
