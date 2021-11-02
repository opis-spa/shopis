import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import jammenu from '@iconify/icons-jam/menu';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Stack, Drawer, Link } from '@mui/material';
// router
import { PATH_SHOP } from '../../routes/paths';
// components
import LogoShopis from '../../components/LogoShopis';
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

  if (!isHome) {
    return (
      <LinkStyle
        component={RouterLink}
        to={`${PATH_SHOP.home}${path}`}
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
  isOffset: PropTypes.bool
};

export default function MenuMobile({ isOffset }) {
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
          ...(!isOffset && { color: 'common.white' }),
          ...(isOffset && { color: 'secondary.main' })
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
            <LogoShopis sx={{ mx: PADDING, my: 3 }} />
          </Link>

          <Stack direction="column" spacing={2} sx={{ ml: 4 }}>
            {menuConfig.map((link) => (
              <MenuMobileItem
                key={link.title}
                item={link}
                isOpen={open}
                onOpen={handleOpen}
                isActive={pathname === link.path}
              />
            ))}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
