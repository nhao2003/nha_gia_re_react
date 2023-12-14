// DashboardPage.tsx
import React from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header/Header'
interface PrivateProps {
  children: React.ReactNode
}

const ModernDashboardPage = ({ children }: PrivateProps) => {
  return (
    <div>
      <Header  />
      {/* Your dashboard content goes here */}
      {children}
      <Footer />
    </div>
  )
}

export {ModernDashboardPage}
