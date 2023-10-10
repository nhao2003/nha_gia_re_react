// Footer.tsx
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <AppBar position="static" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <Typography variant="body1" color="inherit">
          © {new Date().getFullYear()} Your Company Name
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
