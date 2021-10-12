import React, { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
// redux
import { useSelector } from '../../redux/store';
// router
import { PATH_PAGE } from '../../routes/paths';

const Payment = () => {
  const IsMountedRef = useIsMountedRef();
  const { checkoutResult } = useSelector((state) => state.product);
  const { url, token } = checkoutResult;
  const ref = useRef();
  useEffect(() => {
    if (IsMountedRef.current && ref) {
      // aqui
      ref.current.submit();
    }
  }, [IsMountedRef]);

  if (!(url && token)) {
    return <Navigate to={`/${PATH_PAGE.page500}`} />;
  }

  return (
    <form action={url} method="GET" ref={ref}>
      <input type="hidden" name="TBK_TOKEN" value={token} />
    </form>
  );
};

export default Payment;
