import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouteLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Element } from 'react-scroll';
import checkmarkFill from '@iconify/icons-ic/baseline-circle';
// material
import { useTheme, styled, alpha } from '@mui/material/styles';
import { Box, Grid, Card, Stack, Button, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import { varFadeInUp, MotionInView, varFadeInDown } from '../animate';
// utils
import { fCurrency } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

const PLANS = [
  {
    id: 'prices-plan',
    price: 9990,
    commons: [
      'Panel de control',
      'Productos y pedidos ilimitados',
      'Recibe pagos con WebPay (3% comisión)',
      'Enlaza tus redes sociales'
    ],
    options: [],
    icon: '/static/icons/ic_rocket.svg'
  }
];

const RootStyle = styled(Element)(({ theme }) => ({
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(5),
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(10)
  }
}));

const StackPriceStyle = styled(Stack)(({ theme }) => ({
  color: theme.palette.text.secondary,
  justifyContent: 'center',
  alignItems: 'flex-end'
}));

// ----------------------------------------------------------------------

const propTypes = {
  cardIndex: PropTypes.number,
  plan: PropTypes.shape({
    price: PropTypes.number,
    license: PropTypes.any,
    commons: PropTypes.arrayOf(PropTypes.string),
    icons: PropTypes.arrayOf(PropTypes.string),
    options: PropTypes.arrayOf(PropTypes.string),
    icon: PropTypes.string
  })
};

function PlanCard({ plan, cardIndex }) {
  const theme = useTheme();
  const { price, commons, options, icon } = plan;

  const isLight = theme.palette.mode === 'light';

  return (
    <Card
      sx={{
        p: 5,
        boxShadow: (theme) => `0px 0 16px ${alpha(isLight ? 'rgb(41,63,161)' : theme.palette.common.black, 0.15)}`,
        ...(cardIndex === 1 && {
          boxShadow: (theme) => `0px 0 16px ${alpha(isLight ? 'rgb(41,63,161)' : theme.palette.common.black, 0.15)}`
        })
      }}
    >
      <Stack spacing={5}>
        <Box
          component="img"
          src={icon}
          sx={{
            margin: 'auto',
            width: 100,
            height: 100
          }}
        />

        <StackPriceStyle direction="row">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              color: '#3C568E',
              fontSize: 36,
              [theme.breakpoints.up('sm')]: { fontSize: 40 },
              [theme.breakpoints.up('md')]: { fontSize: 48 }
            }}
          >
            {fCurrency(price)}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: 16,
              position: 'relative',
              bottom: 6,
              left: 8,
              [theme.breakpoints.up('sm')]: { fontSize: 18 }
            }}
          >
            al mes
          </Typography>
        </StackPriceStyle>

        <Stack spacing={2.5}>
          {commons.map((option) => (
            <Stack key={option} spacing={1.5} direction="row" alignItems="center">
              <Box component={Icon} icon={checkmarkFill} sx={{ color: '#3C568E', width: 7, height: 7 }} />
              <Typography
                variant="body2"
                sx={{ color: '#3C568E', fontSize: 16, [theme.breakpoints.up('sm')]: { fontSize: 18 } }}
              >
                {option}
              </Typography>
            </Stack>
          ))}

          {options.map((option, optionIndex) => {
            const disabledLine =
              (cardIndex === 0 && optionIndex === 1) ||
              (cardIndex === 0 && optionIndex === 2) ||
              (cardIndex === 0 && optionIndex === 3) ||
              (cardIndex === 1 && optionIndex === 3);

            return (
              <Stack
                spacing={1.5}
                direction="row"
                alignItems="center"
                sx={{
                  ...(disabledLine && { color: 'text.disabled' })
                }}
                key={option}
              >
                <Box
                  component={Icon}
                  icon={checkmarkFill}
                  sx={{
                    width: 20,
                    height: 20,
                    color: 'text.main',
                    ...(disabledLine && { color: 'text.disabled' })
                  }}
                />
                <Typography variant="body2">{option}</Typography>
              </Stack>
            );
          })}
        </Stack>

        <Button
          component={RouteLink}
          size="large"
          fullWidth
          variant="contained"
          to={PATH_AUTH.register}
          sx={{
            fontWeight: 900,
            textTransform: 'uppercase'
          }}
        >
          Iniciar prueba Gratis
        </Button>
      </Stack>
    </Card>
  );
}

PlanCard.propTypes = propTypes;

export default function LandingPricingPlans() {
  const theme = useTheme();

  return (
    <RootStyle name="precios">
      <Container maxWidth="lg">
        <Box sx={{ mb: 5, textAlign: 'center' }}>
          <MotionInView variants={varFadeInDown}>
            <Typography
              variant="h2"
              sx={{
                color: 'secondary.main',
                fontWeight: 900,
                mb: 2,
                [theme.breakpoints.up('sm')]: { fontSize: 40 },
                [theme.breakpoints.up('md')]: { fontSize: 48 }
              }}
            >
              Pruébalo gratis
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInDown}>
            <Typography
              sx={{
                color: (theme) => (theme.palette.mode === 'light' ? 'primary.main' : 'text.primary'),
                fontSize: 16,
                [theme.breakpoints.up('sm')]: { fontSize: 20 },
                [theme.breakpoints.up('md')]: { fontSize: 24 }
              }}
            >
              Si te gusta, paga solo mientras lo uses.
            </Typography>
          </MotionInView>
        </Box>

        <Grid container spacing={5} justifyContent="center">
          {PLANS.map((plan, index) => (
            <Grid key={plan.id} item xs={12} sx={{ maxWidth: 490 }}>
              <MotionInView variants={index === 1 ? varFadeInDown : varFadeInUp}>
                <PlanCard plan={plan} cardIndex={index} />
              </MotionInView>
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
