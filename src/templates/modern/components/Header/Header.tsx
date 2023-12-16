import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const headerItems = [
    { href: '/', label: 'Mua bán' },
    { href: '/cho-thue', label: 'Cho thuê' },
    { href: '/blog', label: 'Blog' },
    { href: '/dang-tin', label: 'Đăng tin' },
    { href: '/signup', label: 'Đăng ký' },
    { href: '/signin', label: 'Đăng nhập' },
    { href: '/profile', label: 'Hồ sơ'}
  ];

  return (
    <AppBar position="static" className={styles.appBar}>
      <Toolbar>
        {headerItems.map((item) => (
          <Button key={item.href} component={Link} to={item.href} color="inherit">
            {item.label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export { Header };
