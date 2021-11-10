import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_APP } from '../routes/paths';
import usePartnership from '../hooks/usePartnership';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default function GuestGuard({ children }) {
  const { isAuthenticated, user } = useAuth();
  const { partnership } = usePartnership();
  const { nickname } = partnership || { nickname: '' };
  const { role } = user || { role: '' };
  console.log(' == authentication user == ');
  console.log(user);
  if (role === 'business' && isAuthenticated) {
    return <Navigate to={PATH_APP.root} />;
  }

  if (isAuthenticated) {
    return <Navigate to={`/${nickname}`} />;
  }

  return <>{children}</>;
}
