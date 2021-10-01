import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import homeFill from '@iconify/icons-eva/home-fill';
import personOutline from '@iconify/icons-eva/person-outline';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
// routes
import { PATH_APP } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// components
import LinkParnership from '../../components/LinkParnership';
import { MIconButton } from '../../components/@material-extend';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Inicio',
    icon: homeFill,
    linkTo: '/'
  },
  {
    label: 'Perfil',
    icon: personOutline,
    linkTo: PATH_APP.user.profile
  },
  {
    label: 'Configuración',
    icon: settings2Fill,
    linkTo: PATH_APP.user.account
  }
];

// ----------------------------------------------------------------------

const AccountPopover = () => {
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <LinkParnership to="/auth/login">
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44
        }}
      >
        <Icon icon={personOutline} width={20} height={20} />
      </MIconButton>
    </LinkParnership>
  );
};

AccountPopover.displayName = 'AccountPopover';

export default AccountPopover;
