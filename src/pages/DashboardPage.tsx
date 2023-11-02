// DashboardPage.tsx
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Content from '../components/Content'

const DashboardPage: React.FC = () => {
  return (
    <div>
      <Header />
      {/* Your dashboard content goes here */}
      <Content />
      <Footer />
    </div>
  )
}

export default DashboardPage
