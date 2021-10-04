import React, { useRef } from 'react';
import { Icon } from '@iconify/react';
import personOutline from '@iconify/icons-eva/person-outline';
// components
import LinkParnership from '../../components/LinkParnership';
import { MIconButton } from '../../components/@material-extend';

// ----------------------------------------------------------------------

const AccountPopover = () => {
  const anchorRef = useRef(null);

  return (
    <LinkParnership to="/auth/login">
      <MIconButton
        ref={anchorRef}
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
