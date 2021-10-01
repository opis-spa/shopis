import React from 'react';
import PropTypes from 'prop-types';
// material
import createAvatar from '../utils/createAvatar';
import { MAvatar } from './@material-extend';
import usePartnership from '../hooks/usePartnership';

// ----------------------------------------------------------------------

const propTypes = {
  sx: PropTypes.object
};

const defaultProps = {
  sx: {}
};

function Logo({ sx }) {
  const { partnership } = usePartnership();
  const { name, photo } = partnership || { name: '', photo: '' };

  return (
    <MAvatar src={photo} alt={name} color={photo ? 'default' : createAvatar(name).color} sx={sx}>
      {createAvatar(name).name}
    </MAvatar>
  );
}

Logo.propTypes = propTypes;
Logo.defaultProps = defaultProps;

export default Logo;
