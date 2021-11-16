import React from 'react';
import { Element } from 'react-scroll';
// material
import { styled, useTheme, alpha } from '@mui/material/styles';
import { Box, Grid, Container, Typography, AccordionSummary, AccordionDetails } from '@mui/material';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
//
import { varFadeIn, MotionInView, varFadeInDown } from '../animate';

// ----------------------------------------------------------------------

const FAQS = [
  {
    id: 'faq-a',
    heading: '¿Cómo funciona RIFOPIS?',
    detail:
      'Entras a www.rifopis.cl, identificas el sorteo que más te gusta y le das clic en "participar" o "comprar” Tokens. Primero vas a elegir la cantidad de Tokens que quieres, luego ir al carrito de compra en la esquina superior derecha,  introduces los datos de usuario, seleccionas tu método de pago favorito, confirmas tu compra y obtienes tu ticket o boleto ganador.'
  },
  {
    id: 'faq-b',
    heading: '¿Que es un token?',
    detail:
      'Un token es como un ticket o boleto digital, basado en la tecnología blockchain, que te garantiza participar en los sorteos que realizaremos.'
  },
  {
    id: 'faq-c',
    heading: '¿Tipo de premios?',
    detail: 'Expediciones, tours y viajes. Activos digitales como Bitcoin. Tecnologías sustentables y recicladas.'
  }
];

const StyledAccordion = styled((props) => <Accordion disableGutters elevation={0} square {...props} />)(
  ({ theme }) => ({
    borderRadius: 6,
    backgroundColor: alpha(theme.palette.common.white, 0.05),
    border: `transparent`,
    [`& .${accordionClasses.expanded}`]: {
      boxShadow: 'none'
    },
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    }
  })
);

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
            <StyledAccordion
              defaultExpanded
              sx={{
                padding: (theme) => theme.spacing(2),
                height: '100%'
              }}
            >
              <AccordionSummary>
                <Typography variant="subtitle1" sx={{ fontWeight: 900, fontSize: 18 }}>
                  {accordion.heading}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: 16 }}>{accordion.detail}</Typography>
              </AccordionDetails>
            </StyledAccordion>
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
                textTransformation: 'uppercase',
                fontWeight: 900,
                color: 'primary.light',
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
