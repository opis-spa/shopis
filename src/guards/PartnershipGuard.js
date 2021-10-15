import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Navigate, useParams } from 'react-router-dom';
// hooks
import usePartnership from '../hooks/usePartnership';
import useSettings from '../hooks/useSettings';
import useIsMountedRef from '../hooks/useIsMountedRef';
// routes
import { PATH_PAGE } from '../routes/paths';
// actions
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const propTypes = {
  children: PropTypes.node,
  init: PropTypes.string
};

function PartnershipGuard({ init, children }) {
  const { isExists, isInitialized, initialize } = usePartnership();
  const isMountedRef = useIsMountedRef();
  const { onChangeColor } = useSettings();
  const params = useParams();
  const { id } = params;

  useMemo(async () => {
    const handleInit = async (uri) => {
      if (!isInitialized && uri) {
        await initialize(uri);
      }
    };
    if (isMountedRef.current) {
      await handleInit(init || id);
      onChangeColor({ target: { value: init || id } });
      // onChangeMode({ target: { value: 'dark' } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init, isInitialized, id]);

  if (isInitialized && !isExists) {
    return <Navigate to={PATH_PAGE.notexists} />;
  }

  return isExists ? <>{children}</> : <LoadingScreen />;
}

PartnershipGuard.propTypes = propTypes;

export default PartnershipGuard;
