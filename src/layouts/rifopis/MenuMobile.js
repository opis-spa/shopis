import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import jammenu from '@iconify/icons-eva/menu-2-fill';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Drawer, Link, Stack } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
// route
import { PATH_AUTH, PATH_APP, PATH_RIFOPIS } from '../../routes/paths';
// components
import LogoRifopis from '../../components/LogoRifopis';
import Scrollbar from '../../components/Scrollbar';
import { MIconButton } from '../../components/@material-extend';
//
import menuConfig from './MenuConfig';

// ----------------------------------------------------------------------

const PADDING = 2.5;

const LinkStyle = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  textTransform: 'uppercase',
  color: theme.palette.common.white,
  marginRight: theme.spacing(5),
  cursor: 'pointer',
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shortest
  }),
  '&:hover': {
    opacity: 0.48,
    textDecoration: 'none'
  }
}));

// ----------------------------------------------------------------------

MenuMobileItem.propTypes = {
  item: PropTypes.object,
  isHome: PropTypes.bool
};

function MenuMobileItem({ item, isHome }) {
  const { title, path } = item;
  const handleScroller = () => {
    // Somewhere else, even another file
    scroller.scrollTo(path.replace('#', ''), {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: 50 // Scrolls to element + 50 pixels down the page
    });
  };

  if (!isHome) {
    return (
      <LinkStyle
        component={RouterLink}
        to={`${PATH_RIFOPIS.home}${path}`}
        sx={{
          fontWeight: 900,
          color: 'text.primary'
        }}
      >
        {title}
      </LinkStyle>
    );
  }

  return (
    <LinkStyle
      to={path}
      onClick={handleScroller}
      sx={{
        fontWeight: 900,
        color: 'text.primary'
      }}
    >
      {title}
    </LinkStyle>
  );
}

MenuMobile.propTypes = {
  isHome: PropTypes.bool
};

export default function MenuMobile({ isHome }) {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      handleDrawerClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleDrawerOpen = () => {
    setMobileOpen(true);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <MIconButton
        onClick={handleDrawerOpen}
        sx={{
          ml: 1,
          color: 'primary.lighter'
        }}
      >
        <Icon hFlip icon={jammenu} style={{ fontSize: 30 }} />
      </MIconButton>

      <Drawer
        open={mobileOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { pb: 5, width: 260 } }}
      >
        <Scrollbar>
          <Link component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
            <LogoRifopis sx={{ mx: PADDING, my: 3 }} />
          </Link>

          <Stack direction="column" spacing={2} sx={{ ml: 4 }}>
            {menuConfig.map((link) => (
              <MenuMobileItem
                key={link.title}
                item={link}
                isOpen={open}
                onOpen={handleOpen}
                isActive={pathname === link.path}
                isHome={isHome}
              />
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              {isAuthenticated ? (
                <Button
                  component={RouterLink}
                  variant="text"
                  to={PATH_APP.user.profile}
                  sx={{
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    color: 'primary.lighter',
                    padding: 0
                  }}
                >
                  Mis Sorteos
                </Button>
              ) : (
                <Button
                  component={RouterLink}
                  variant="text"
                  to={PATH_AUTH.register}
                  sx={{
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    color: 'primary.lighter',
                    padding: 0
                  }}
                >
                  Registrar
                </Button>
              )}
            </Box>
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
