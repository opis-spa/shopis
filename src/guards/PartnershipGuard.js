import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Navigate, useParams } from 'react-router-dom';
// hooks
import usePartnership from '../hooks/usePartnership';
// routes
import { PATH_PAGE } from '../routes/paths';
// actions
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const propTypes = {
  children: PropTypes.node
};

function PartnershipGuard({ children }) {
  const { isExists, isInitialized, getPartnership, partnership } = usePartnership();
  const params = useParams();
  const { id } = params;

  const validation = useMemo(() => {
    try {
      const { nickname } = partnership || { nickname: '' };
      return nickname !== id;
    } catch (error) {
      return false;
    }
  }, [partnership, id]);

  useMemo(() => {
    console.log('memo validation', validation, id);
    if (validation) {
      getPartnership(id);
    }
  }, [id, validation]);

  if (isInitialized && !isExists) {
    return <Navigate to={PATH_PAGE.notexists} />;
  }

  return isExists ? <>{children}</> : <LoadingScreen />;
}

PartnershipGuard.propTypes = propTypes;

export default PartnershipGuard;
