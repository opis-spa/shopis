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
  const paypal = useRef();
  console.log(amount);
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          const order = actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                description: 'Cool looking table',
                amount: {
                  currency_code: 'USD',
                  value: amount
                }
              }
            ]
          });
          const { e } = order;
          console.log(order);
          if (e) {
            console.log(' order ', e.value);
          }
          // here is important asociate this number
          return order;
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(' return paypal');
          console.log(order);
        },
        onError: (err) => {
          console.log(err);
        }
      })
      .render(paypal.current);
  }, [amount]);

  return <RootStyle ref={paypal} />;
}

PayPal.propTypes = propTypes;

export default PayPal;
