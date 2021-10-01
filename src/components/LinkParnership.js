import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouteLink } from 'react-router-dom';
// material
import Link from '@mui/material/Link';
// hooks
import usePartnership from '../hooks/usePartnership';
// path
import { PATH_SHOP } from '../routes/paths';

const propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node
};

function LinkParnership(props) {
  const { to, children } = props;
  const { partnership } = usePartnership();
  const { nickname } = partnership || { nickname: '' };
  return (
    <Link to={`${PATH_SHOP.root}/${nickname}${to}`} component={RouteLink}>
      {children}
    </Link>
  );
}

LinkParnership.propTypes = propTypes;

export default LinkParnership;
