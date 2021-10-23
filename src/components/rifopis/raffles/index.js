import React from 'react';
import PropTypes from 'prop-types';
// materials
import { alpha, styled } from '@mui/material/styles';
import { Box, Button, Card, Stack, Divider, Typography } from '@mui/material';
// components
import RaffleProgress from './RaffleProgress';
import RafflePrizes from './RafflePrizes';
import ButtonTicket from '../ButtonTicket';
import Scrollbar from '../../Scrollbar';
import RifopisPolaroid from '../RifopisPolaroid';

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: '-2px -2px 14px rgba(255, 194, 36, 0.2)',
  border: '1px solid #936DB9',
  boxSizing: 'border-box',
  alignItems: 'center',
  textAlign: 'center',
  width: '100%',
  padding: theme.spacing(5)
}));

const StyledBox = styled(Box)(({ theme }) => ({
  borderRadius: 10,
  backgroundColor: alpha(theme.palette.common.white, 0.05),
  padding: theme.spacing(1),
  minWidth: 250
}));

const propTypes = {
  raffle: PropTypes.shape({
    _id: PropTypes.string,
    photo: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.string),
    stock: PropTypes.string,
    quantity: PropTypes.number,
    name: PropTypes.string
  }).isRequired
};

function Raffles(props) {
  const { raffle } = props;
  const { stock, quantity, name, photos } = raffle;

  return (
    <Stack direction="row">
      <RifopisPolaroid
        small
        title="Primer lugar"
        subtitle={name}
        photo={photos[1]}
        sx={{ transform: `rotate(-1.5deg)`, mr: -3, zIndex: 10 }}
      />

      <StyledCard>
        <Stack direction="row" spacing={3} alignItems="flex-start">
          <Box sx={{ flex: 1 }}>
            <Stack spacing={2}>
              <RafflePrizes
                photo="/static/icons/ic-bitcoin.png"
                quantity={2}
                prize="$50.000 pesos en Bitcoin"
                position="Segundo"
              />

              <Divider variant="middle" sx={{ background: 'primary.lighter' }} />

              <RafflePrizes
                photo="/static/icons/ic-stellar.png"
                quantity={10}
                prize="$25.000 pesos en Stellar"
                position="Tercer"
              />
            </Stack>
          </Box>

          <Button color="inherit" variant="outlined">
            Detalle
          </Button>

          <StyledBox>
            <Typography
              variant="caption"
              sx={{
                textAlign: 'left',
                color: 'primary.light',
                minWidth: 400,
                fontWeight: 900,
                textTransform: 'uppercase'
              }}
            >
              Tus números de tokens
            </Typography>
            <Scrollbar sx={{ maxHeight: 100, my: 1 }}>
              <Stack>
                {[...Array(quantity)].map((tickets, index) => (
                  <Typography
                    key={index}
                    variant="title"
                    sx={{ textAlign: 'left', color: 'primary.light', fontWeight: 400, textTransform: 'uppercase' }}
                  >
                    {`Nº 00000${index + 1}`}
                  </Typography>
                ))}
              </Stack>
            </Scrollbar>
          </StyledBox>
        </Stack>

        <Stack direction="row" justifyContent="space-between" sx={{ mt: (theme) => theme.spacing(2) }}>
          <Box sx={{ flex: 1, ml: (theme) => theme.spacing(4), mr: (theme) => theme.spacing(2) }}>
            <RaffleProgress stock={stock} quantity={1333} />
          </Box>
          <ButtonTicket title="Comprar más tickets" sx={{ width: 250 }} />
        </Stack>
      </StyledCard>
    </Stack>
  );
}

Raffles.propTypes = propTypes;

export default Raffles;
