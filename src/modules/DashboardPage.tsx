// DashboardPage.tsx
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Content from '../components/Content'


interface PrivateProps {
  children: React.ReactNode
}

const DashboardPage = ({ children }: PrivateProps) => {
  return (
    <div>
      <Header />
      {/* Your dashboard content goes here */}
      {children}
      <Footer />
    </div>
  )
}

export default DashboardPage
