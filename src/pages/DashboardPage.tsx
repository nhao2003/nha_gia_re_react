// DashboardPage.tsx
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const DashboardPage: React.FC = () => {
  return (
    <div>
      <Header />
      {/* Your dashboard content goes here */}
      <div style={{ padding: '16px' }}>
        <h1>Welcome to the Dashboard</h1>
        {/* Add your dashboard components and content */}
      </div>
      <Footer />
    </div>
  )
}

export default DashboardPage
