import React from 'react';
import styles from '../assets/css/Header.module.css';




const Header: React.FC = () => {
  const headerItems = [
    { href: '/', label: 'Mua bán' },
    { href: '/cho-thue', label: 'Cho thuê' },
    { href: '/blog', label: 'Blog' },
    { href: '/dang-tin', label: 'Đăng tin' },
    { href: '/quan-ly-tin', label: 'Quản lý tin' },
    { href: '/dang-ky', label: 'Đăng ký' },
    { href: '/dang-nhap', label: 'Đăng nhập' },
  ];

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {headerItems.map((item) => (
          <a key={item.href} href={item.href} className={styles.headerItem}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
};

export  {Header};
