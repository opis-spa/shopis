import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
// material
import { styled } from '@mui/material/styles';
import { Box, Grid, Step, Stepper, Container, StepLabel } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getCart, createBilling, onGotoStep, getProductStore, createInformation } from '../../redux/slices/product';
import { getDeliveries } from '../../redux/slices/delivery';
import { getPayments } from '../../redux/slices/payment';
// hooks
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import useSettings from '../../hooks/useSettings';
import usePartnership from '../../hooks/usePartnership';
// components
import Page from '../../components/Page';
import {
  CheckoutInformation,
  CheckoutDelivery,
  CheckoutPayment,
  CheckoutOrderComplete
} from '../../components/shop/checkout';
// utils
import track from '../../utils/analytics';

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool
};

function QontoStepIcon({ active, completed }) {
  return (
    <Box
      sx={{
        zIndex: 9,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? 'secondary.main' : 'divider',
        bgcolor: 'background.default'
      }}
    >
      {completed ? (
        <Box
          component={Icon}
          icon={checkmarkFill}
          sx={{
            zIndex: 1,
            width: 20,
            height: 20,
            color: 'primary.light'
          }}
        />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor'
          }}
        />
      )}
    </Box>
  );
}

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const MainStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24
  }
}));

export default function EcommerceCheckout() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useAuth();
  const { partnership } = usePartnership();
  const { nickname } = partnership;
  const isMountedRef = useIsMountedRef();
  const { checkout } = useSelector((state) => state.product);
  const { cart, activeStep, isDelivery } = checkout;
  const STEPS = ['Carrito', 'Ingresar datos'];
  if (isDelivery) {
    STEPS.push('Despacho');
  }
  STEPS.push('Completar pago');
  const isComplete = activeStep === STEPS.length;

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(createInformation(user));
      dispatch(onGotoStep(2));
    }
  }, [dispatch, isAuthenticated, user]);

  useEffect(() => {
    if (isMountedRef.current) {
      dispatch(getProductStore(nickname));
      dispatch(getCart(cart));
      dispatch(getDeliveries());
      dispatch(getPayments());
    }
  }, [dispatch, isMountedRef, cart, nickname]);

  useEffect(() => {
    if (activeStep === 1) {
      track.event('InitiateCheckout');
      dispatch(createBilling(null));
    }
    if (activeStep === 2) {
      track.event('CompleteRegistration');
    }
  }, [dispatch, activeStep]);

  return (
    <MainStyle title={`${STEPS[activeStep]} - Pantalla de pago`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8} sx={{ mb: 5, justifyContent: 'center' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {STEPS.map((label) => (
                <Step key={label} sx={{ '& .MuiSvgIcon-root': { color: 'secondary.light' } }}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>

        {!isComplete ? (
          <>
            {activeStep === 1 && <CheckoutInformation />}
            {isDelivery && activeStep === 2 && <CheckoutDelivery />}
            {activeStep === 2 + (isDelivery ? 1 : 0) && <CheckoutPayment />}
          </>
        ) : (
          <CheckoutOrderComplete open={isComplete} />
        )}
      </Container>
    </MainStyle>
  );
}
