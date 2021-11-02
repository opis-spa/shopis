import React from 'react';
// materials
import { styled } from '@mui/material/styles';
import { Card, Container, Typography, Stack } from '@mui/material';
// components
import Page from '../../components/Page';

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(3),
  marginTop: theme.spacing(15)
}));

const CardStyle = styled(Card)(() => ({
  boxShadow: '-2px -2px 14px rgba(255, 194, 36, 0.2)',
  border: '1px solid #936DB9',
  boxSizing: 'border-box',
  alignItems: 'center'
}));

const ContentStyle = styled(Stack)(({ theme }) => ({
  justifyContent: 'flex-start',
  paddingLeft: theme.spacing(10),
  paddingRight: theme.spacing(10),
  paddingBottom: theme.spacing(5),
  textAlign: 'left'
}));

const Payment = () => (
  <RootStyle title="Orden procesada" sx={{ backgroundColor: '#1A0033' }}>
    <Container maxWidth="md">
      <CardStyle>
        <Stack direction="column" spacing={3}>
          <ContentStyle spacing={2}>
            <Stack direction="column" spacing={2}>
              <Typography variant="h4" sx={{ color: 'primary.light', mt: 4, fontWeight: 900 }}>
                Términos y condiciones de Rifopis
              </Typography>
            </Stack>

            <Typography variant="h5" sx={{ fontWight: 400 }}>
              Sección 1: funcionamiento de los sorteos
            </Typography>

            <Typography variant="body" sx={{ fontWight: 400 }}>
              En esta sesión hablamos sobre las bases y terminos de las condiciones
            </Typography>
          </ContentStyle>
        </Stack>
      </CardStyle>
    </Container>
  </RootStyle>
);

export default Payment;
