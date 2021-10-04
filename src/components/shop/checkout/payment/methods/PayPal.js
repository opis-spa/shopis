import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const RootStyle = styled(Box)(() => ({
  display: 'flex',
  position: 'inherit',
  width: 400
}));

const propTypes = {
  amount: PropTypes.number.isRequired
};

function PayPal({ amount }) {
  console.log('amount');
  console.log((amount / 730).toFixed(2));
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) =>
          actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                description: 'Cool looking table',
                amount: {
                  currency_code: 'USD',
                  value: 100
                }
              }
            ]
          }),
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
        },
        onError: (err) => {
          console.log(err);
        }
      })
      .render(paypal.current);
  }, []);

  return <RootStyle ref={paypal} />;
}

PayPal.propTypes = propTypes;

export default PayPal;
