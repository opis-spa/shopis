import React from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
// components
import LogoShopis from '../components/LogoShopis';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0)
  }
}));

// ----------------------------------------------------------------------

const LinkStyle = styled(Link)(() => ({
  '&:hover': {
    textDecoration: 'none'
  }
}));

// ----------------------------------------------------------------------

export default function LogoOnlyLayout() {
  return (
    <>
      <HeaderStyle>
        <LinkStyle component={RouterLink} to="/">
          <LogoShopis />
        </LinkStyle>
      </HeaderStyle>
      <Outlet />
    </>
  );
}
