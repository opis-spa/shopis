import React from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, Button, AppBar, Toolbar, Container } from '@mui/material';
// routes
import { PATH_AUTH, PATH_APP, PATH_RIFOPIS } from '../../routes/paths';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useAuth from '../../hooks/useAuth';
// components
import LogoRifopis from '../../components/LogoRifopis';
import { MHidden } from '../../components/@material-extend';
//
import CartPopover from './CartPopover';
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

// ----------------------------------------------------------------------

export default function MainNavbar() {
  const isOffset = useOffSetTop(100);
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const isHome = pathname === PATH_RIFOPIS.root;

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
          <MHidden width="mdUp">
            <MenuMobile isOffset={false} isHome={isHome} navConfig={navConfig} />
          </MHidden>
          <RouterLink to={PATH_RIFOPIS.root}>
            <LogoRifopis diapo={!isOffset} />
          </RouterLink>
          <Box sx={{ flexGrow: 1 }} />

          <MHidden width="mdDown">
            <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={navConfig} />
          </MHidden>

          <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
            <MHidden width="mdDown">
              {isAuthenticated ? (
                <Button
                  component={RouterLink}
                  variant="text"
                  to={PATH_APP.user.profile}
                  sx={{
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    color: 'primary.lighter'
                  }}
                >
                  Mis Sorteos
                </Button>
              ) : (
                <Button
                  component={RouterLink}
                  variant="text"
                  to={PATH_AUTH.login}
                  sx={{
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    color: 'primary.lighter'
                  }}
                >
                  Ingresar
                </Button>
              )}
            </MHidden>
            <CartPopover />
          </Stack>
        </Container>
      </ToolbarStyle>
    </RootStyle>
  );
}
