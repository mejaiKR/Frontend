import React from 'react'
import { ModeToggle } from '@/app/mode-toggle'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="flex flex-row justify-center"></div>
      {children}
    </>
  )
}
