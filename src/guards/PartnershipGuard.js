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
  const { isExists, isInitialized, initialize } = usePartnership();
  const params = useParams();
  const { id } = params;

  useMemo(async () => {
    const handleInit = async (uri) => {
      if (!isInitialized && uri) {
        await initialize(id);
      }
    };

    await handleInit(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, id]);

  if (isInitialized && !isExists) {
    return <Navigate to={PATH_PAGE.notexists} />;
  }

  return isExists ? <>{children}</> : <LoadingScreen />;
}

PartnershipGuard.propTypes = propTypes;

export default PartnershipGuard;
