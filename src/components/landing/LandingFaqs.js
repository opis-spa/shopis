import React from 'react';
import { Element } from 'react-scroll';
// material
import { styled, useTheme } from '@mui/material/styles';
import { Box, Grid, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
//
import { varFadeIn, MotionInView, varFadeInDown } from '../animate';

// ----------------------------------------------------------------------

const FAQS = [
  {
    id: 'faq-a',
    heading: '¿Como recibiré mis pagos?',
    detail:
      'Todas las compras que hagan tus clientes se verán reflejado en tu saldo, el cual puedes retirar en el momento que quieras.'
  },
  {
    id: 'faq-b',
    heading: '¿Como retiro mi dinero acumulado?',
    detail:
      'Desde la opción de retiro, desde tu balance. Puedes solicitarlo en el momento que lo desees, nos tardaremos máximo 24hrs en transferirlo a la cuenta que tengas registrada'
  },
  {
    id: 'faq-c',
    heading: '¿Necesito tener inicio de actividades?',
    detail:
      'No necesitas tener inicio de actividades, puedes registrarte con tú RUT como persona natural o como empresa.'
  }
];

// ----------------------------------------------------------------------

function FaqsList() {
  return (
    <>
      {FAQS.map((accordion) => (
        <Grid key={accordion.id} item xs={12} sm={6} md={4}>
          <MotionInView
            variants={varFadeIn}
            sx={{
              height: '100%'
            }}
          >
            <Accordion
              expanded
              sx={{
                padding: (theme) => theme.spacing(2),
                height: '100%'
              }}
            >
              <AccordionSummary>
                <Typography variant="subtitle1" sx={{ color: '#3C568E', fontWeight: 900, fontSize: 18 }}>
                  {accordion.heading}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: '#3C568E', fontSize: 16 }}>{accordion.detail}</Typography>
              </AccordionDetails>
            </Accordion>
          </MotionInView>
        </Grid>
      ))}
    </>
  );
}

const RootStyle = styled(Element)(({ theme }) => ({
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  overflow: 'hidden'
}));

const TypographyTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary
}));

// ----------------------------------------------------------------------

export default function LandingFaqs() {
  const theme = useTheme();

  return (
    <RootStyle name="faqs">
      <Container maxWidth="lg">
        <Box sx={{ mb: 5 }}>
          <MotionInView variants={varFadeInDown}>
            <TypographyTitle
              variant="h3"
              sx={{
                fontWeight: 900,
                color: 'secondary.main',
                mb: 5,
                [theme.breakpoints.up('sm')]: {
                  fontSize: 40,
                  textAlign: 'center'
                },
                [theme.breakpoints.up('md')]: {
                  textAlign: 'left',
                  fontSize: 48
                }
              }}
            >
              Preguntas Frecuentes
            </TypographyTitle>
          </MotionInView>
        </Box>

        <MotionInView variants={varFadeIn}>
          <Grid container spacing={3} justifyContent="stretch">
            <FaqsList />
          </Grid>
        </MotionInView>
      </Container>
    </RootStyle>
  );
}
