import React from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
// components
import LogoRifopis from '../../components/LogoRifopis';
import { MHidden } from '../../components/@material-extend';
//
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72)
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  [theme.breakpoints.up('md')]: {
    height: APP_BAR_DESKTOP
  }
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: 'calc(100% - 48px)',
  boxShadow: theme.customShadows.z8
}));

// ----------------------------------------------------------------------

export default function MainNavbar() {
  const isOffset = useOffSetTop(100);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <RootStyle>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            height: { md: APP_BAR_DESKTOP - 16 }
          })
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <RouterLink to="">
            <LogoRifopis diapo={!isOffset} />
          </RouterLink>
          <Box sx={{ flexGrow: 1 }} />

          <MHidden width="mdDown">
            <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={navConfig} />
          </MHidden>

          <MHidden width="mdDown">
            <Button
              component={RouterLink}
              variant="text"
              target="_blank"
              to={PATH_AUTH.register}
              sx={{
                fontWeight: 900,
                textTransform: 'uppercase',
                color: 'secondary.main'
              }}
            >
              Ingresar
            </Button>
          </MHidden>

          <MHidden width="mdUp">
            <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={navConfig} />
          </MHidden>
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </RootStyle>
  );
}
