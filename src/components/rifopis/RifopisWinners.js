import React from 'react';
// material
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Typography, Stack, Container, Grid } from '@mui/material';
//
import { varFadeInUp, MotionInView } from '../animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function RifopisWinners() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <MotionInView variants={varFadeInUp}>
              <Typography
                variant="h2"
                paragraph
                sx={{
                  textTransform: 'uppercase',
                  fontWeight: 900,
                  color: 'secondary.main',
                  mb: 5,
                  ...(!isLight && {
                    textShadow: (theme) => `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`
                  })
                }}
              >
                Lista de ganadores
              </Typography>
            </MotionInView>
          </Grid>
          <Grid item xs={12}>
            <Stack>
              <Typography sx={{ color: 'text.primary', textAlign: 'center', fontWeight: 400 }}>Proximamente</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
