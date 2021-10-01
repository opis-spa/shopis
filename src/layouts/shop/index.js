import React from 'react';
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';

//
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';

// ----------------------------------------------------------------------
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24
  }
}));

export default function MainLayout() {
  return (
    <>
      <MainNavbar />
      <MainStyle>
        <Outlet />
      </MainStyle>

      <MainFooter />
    </>
  );
}
