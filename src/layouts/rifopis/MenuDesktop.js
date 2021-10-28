import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { scroller } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Stack } from '@mui/material';
// route
import { PATH_RIFOPIS } from '../../routes/paths';

// ----------------------------------------------------------------------

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

IconBullet.propTypes = {
  type: PropTypes.oneOf(['subheader', 'item'])
};

function IconBullet({ type = 'item' }) {
  return (
    <Box sx={{ width: 24, height: 16, display: 'flex', alignItems: 'center' }}>
      <Box
        component="span"
        sx={{
          ml: '2px',
          width: 4,
          height: 4,
          borderRadius: '50%',
          bgcolor: 'currentColor',
          ...(type !== 'item' && { ml: 0, width: 8, height: 2, borderRadius: 2 })
        }}
      />
    </Box>
  );
}

MenuDesktopItem.propTypes = {
  isHome: PropTypes.bool,
  item: PropTypes.object
};

function MenuDesktopItem({ isHome, item }) {
  const { title, path } = item;
  console.log('isHome');
  console.log(isHome);
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
        to={`/${PATH_RIFOPIS.home}`}
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

MenuDesktop.propTypes = {
  isOffset: PropTypes.bool,
  isHome: PropTypes.bool,
  navConfig: PropTypes.array
};

export default function MenuDesktop({ isOffset, isHome, navConfig }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  console.log('isHome2');
  console.log(isHome);

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack direction="row">
      {navConfig.map((link) => (
        <MenuDesktopItem
          key={link.title}
          item={link}
          pathname={pathname}
          isOpen={open}
          onOpen={handleOpen}
          onClose={handleClose}
          isOffset={isOffset}
          isHome={isHome}
        />
      ))}
    </Stack>
  );
}
