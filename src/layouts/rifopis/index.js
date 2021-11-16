import React from 'react';
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
//
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';

const MainStyle = styled('div')(() => ({
  flexGrow: 1
}));

export default function MainLayout() {
  return (
    <Box>
      <MainNavbar />
      <MainStyle>
        <Outlet />
      </MainStyle>

      <MainFooter />
    </Box>
  );
}
