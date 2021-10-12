import React from 'react';
import { Outlet } from 'react-router-dom';
// material
import { Box } from '@mui/material';
//
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';

export default function MainLayout() {
  return (
    <Box sx={{ backgroundColor: 'background.default' }}>
      <MainNavbar />
      <div>
        <Outlet />
      </div>

      <MainFooter />
    </Box>
  );
}
