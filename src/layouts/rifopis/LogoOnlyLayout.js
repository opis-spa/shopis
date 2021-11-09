import React from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Link, Box } from '@mui/material';
// routers
import { PATH_RIFOPIS } from '../../routes/paths';
// components
import LogoRifopis from '../../components/LogoRifopis';
import PowerBy from '../../components/PowerBy';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  display: 'flex',
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  zIndex: 2000,
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0)
  }
}));

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
        <LinkStyle component={RouterLink} to={PATH_RIFOPIS.home}>
          <LogoRifopis />
        </LinkStyle>
      </HeaderStyle>
      <Outlet />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: -5 }}>
        <PowerBy />
      </Box>
    </>
  );
}
