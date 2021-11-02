import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
// hooks
import useIsMountedRef from '../../../../../hooks/useIsMountedRef';

const propTypes = {
  uri: PropTypes.string,
  token: PropTypes.string
};

const Webpay = (props) => {
  const { uri, token } = props;
  const ref = useRef();
  const IsMountedRef = useIsMountedRef();

  useEffect(() => {
    if (IsMountedRef.current && ref && uri && token) {
      // aqui
      ref.current.submit();
    }
  }, [IsMountedRef, uri, token]);

  return (
    <form action={uri} method="GET" ref={ref}>
      <input type="hidden" name="TBK_TOKEN" value={token} />
    </form>
  );
};

Webpay.propTypes = propTypes;

export default Webpay;
