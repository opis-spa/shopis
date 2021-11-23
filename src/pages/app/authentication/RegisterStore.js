import React, { useState } from 'react';
import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import {
  Typography,
  Box,
  Container,
  Button,
  AppBar,
  Toolbar,
  Card,
  Stepper,
  Step,
  StepLabel,
  StepContent
} from '@mui/material';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
// components
import LogoShopis from '../../../components/LogoShopis';
import { CreateStoreForm, FirstProductForm } from '../../../components/authentication/register-store';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  [theme.breakpoints.up('md')]: {
    height: APP_BAR_DESKTOP
  }
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: 'calc(100% - 48px)',
  boxShadow: theme.customShadows.z8
}));

const ToolbarSpacer = styled('div')(({ theme }) => ({
  width: '100%',
  height: APP_BAR_MOBILE,
  [theme.breakpoints.up('md')]: {
    height: APP_BAR_DESKTOP
  }
}));

const RootStyle = styled('div')(({ theme }) => ({
  width: '100%',
  minHeight: '100%',
  background: 'linear-gradient(30deg, #eee1ff, transparent)',
  paddingBottom: theme.spacing(6)
}));

const RegisterStore = ({ setHasPartnership }) => {
  const isOffset = useOffSetTop(100);
  const [activeStep, setActiveStep] = useState(1);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <>
      <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
        <ToolbarStyle
          disableGutters
          sx={{
            bgcolor: 'background.default',
            ...(isOffset && {
              height: { md: APP_BAR_DESKTOP - 16 }
            })
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <LogoShopis />
          </Container>
        </ToolbarStyle>
        <ToolbarShadowStyle />
      </AppBar>
      <RootStyle>
        <ToolbarSpacer />
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" color="primary.main" sx={{ mt: 5 }}>
            ¡Bienvenido a Shopis!
          </Typography>
          <Typography variant="body1" align="center" sx={{ mt: 1 }}>
            Falta unos pequeños pasos para que puedas usar todo el poder de Shopis
          </Typography>
          <Card sx={{ p: 3, mt: 4 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              <Step>
                <StepLabel>
                  <Typography variant="h5" color="primary.main">
                    Crea tu tienda
                  </Typography>
                </StepLabel>
                <StepContent>
                  <CreateStoreForm nextStep={handleNext} />
                </StepContent>
              </Step>
              <Step>
                <StepLabel>
                  <Typography variant="h5" color={activeStep === 0 ? 'text.disabled' : 'primary.main'}>
                    Tu primer producto
                  </Typography>
                </StepLabel>
                <StepContent>
                  <FirstProductForm nextStep={handleNext} />
                </StepContent>
              </Step>
              <Step>
                <StepLabel>
                  <Typography variant="h5" color={activeStep === 0 ? 'text.disabled' : 'primary.main'}>
                    ¡Listo!
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Box
                    sx={{
                      mt: 2,
                      px: 2,
                      py: 5,
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                      boxShadow: 'inset 2px 2px 8px .5px rgba(0,0,0,.1)'
                    }}
                  >
                    <Box
                      component="img"
                      sx={{ width: '90%', maxWidth: 245 }}
                      src="/static/illustrations/illustration-success.svg"
                    />
                    <Typography variant="h4" color="primary.main" sx={{ mt: 2 }} align="center">
                      ¡Proceso completado!
                    </Typography>
                    <Typography variant="body1" align="center">
                      Gracias por completar tus datos
                    </Typography>
                    <Button variant="contained" sx={{ mt: 2 }} onClick={() => setHasPartnership(false)}>
                      Empezar a vender
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            </Stepper>
          </Card>
        </Container>
      </RootStyle>
    </>
  );
};

RegisterStore.propTypes = {
  setHasPartnership: PropTypes.func
};

export default RegisterStore;
