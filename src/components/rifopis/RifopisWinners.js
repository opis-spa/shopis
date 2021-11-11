import React from 'react';
import { Element } from 'react-scroll';
// material
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Box, Typography, Stack, Container, Grid } from '@mui/material';
//
import { varFadeInUp, MotionInView } from '../animate';

// ----------------------------------------------------------------------

const RootStyle = styled(Element)(({ theme }) => ({
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(5)
}));

// ----------------------------------------------------------------------

export default function RifopisWinners() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle name="ganadores">
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
                  color: 'primary.light',
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
            <Stack alignItems="center">
              <Box sx={{ m: 5, p: 4, px: 10, borderRadius: 8, backgroundColor: 'secondary.dark' }}>
                <Typography sx={{ color: 'text.primary', textAlign: 'center', fontWeight: 400 }}>
                  Próximamente
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
