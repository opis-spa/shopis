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
    heading: '¿Que es RIFOPIS?',
    detail: 'Información sobre rifopis.'
  },
  {
    id: 'faq-b',
    heading: '¿Que es un token?',
    detail: 'Información sobre que es un token'
  },
  {
    id: 'faq-c',
    heading: '¿Tipo de premios?',
    detail: 'Cuales son los tipos de premios.'
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
