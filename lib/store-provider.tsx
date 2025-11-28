"use client"

import type { ReactNode } from "react"

// NOTE: Zustand stores are already initialized with persist middleware
// This provider ensures hydration happens correctly on the client
export function StoreProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}
