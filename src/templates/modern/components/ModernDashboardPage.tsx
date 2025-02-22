// DashboardPage.tsx
import React from 'react';
import Footer from './Footer';
import { Header } from './Header/Header';
interface PrivateProps {
  children: React.ReactNode;
}

const ModernDashboardPage = ({ children }: PrivateProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <Header />
      {/* Your dashboard content goes here */}
      {children}
      <Footer />
    </div>
  );
};

export { ModernDashboardPage };
