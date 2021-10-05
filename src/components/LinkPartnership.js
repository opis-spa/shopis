import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useLocation, Link as RouteLink } from 'react-router-dom';
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

function LinkPartnership(props) {
  const { to, children } = props;
  const { partnership } = usePartnership();
  const { pathname } = useLocation();
  const { nickname } = partnership || { nickname: '' };

  const link = useMemo(() => {
    const urlPartnership = `${PATH_SHOP.root}/${nickname}`;
    const validation = pathname.indexOf(urlPartnership) >= 0;

    if (validation) {
      return `${urlPartnership}${to}`;
    }
    return `${to}`;
  }, [nickname, pathname, to]);

  return (
    <Link to={link} component={RouteLink}>
      {children}
    </Link>
  );
}

LinkPartnership.propTypes = propTypes;

export default LinkPartnership;
