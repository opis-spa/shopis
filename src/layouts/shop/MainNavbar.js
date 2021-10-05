import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
// components
import { MHidden } from '../../components/@material-extend';
import Logo from '../../components/Logo';
import CartPopover from './CartPopover';
import AccountPopover from './AccountPopover';
import Searchbar from './Searchbar';
import LinkPartnership from '../../components/LinkPartnership';

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72)
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

const propTypes = {
  onOpenSidebar: PropTypes.func
};

const defaultProps = {
  onOpenSidebar: () => {}
};

function DashboardNavbar({ onOpenSidebar }) {
  return (
    <RootStyle>
      <ToolbarStyle>
        <MHidden width="lgUp">
          <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden>

        <Box
          sx={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'flex-start' }
          }}
        >
          <LinkPartnership to="/">
            <Logo />
          </LinkPartnership>
        </Box>

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <CartPopover />
          <MHidden width="mdDown">
            <AccountPopover />
            <Searchbar />
          </MHidden>
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}

DashboardNavbar.propTypes = propTypes;
DashboardNavbar.defaultProps = defaultProps;

export default DashboardNavbar;
