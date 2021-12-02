import React from 'react';
import PropTypes from 'prop-types';
// materials
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Stack, Divider, Typography } from '@mui/material';
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
  minWidth: 250,
  width: '100%'
}));

const propTypes = {
  raffle: PropTypes.shape({
    _id: PropTypes.string,
    photo: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.string),
    stock: PropTypes.string,
    tickets: PropTypes.arrayOf(PropTypes.shape({})),
    name: PropTypes.string,
    goal: PropTypes.number
  }).isRequired
};

function Raffles(props) {
  const { raffle } = props;
  const { stock, tickets, name, photos, goal } = raffle;

  return (
    <Stack direction={{ xs: 'column', md: 'row' }}>
      <RifopisPolaroid
        small
        title="Primer lugar"
        subtitle={name}
        photo={photos[1]}
        sx={{ transform: `rotate(-1.5deg)`, mr: -3, zIndex: 10 }}
      />

      <StyledCard>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="flex-start">
          <Box sx={{ flex: 1, width: '100%' }}>
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
                {tickets.map((tickets, index) => (
                  <Typography
                    key={index}
                    variant="title"
                    sx={{ textAlign: 'left', color: 'primary.light', fontWeight: 400, textTransform: 'uppercase' }}
                  >
                    {`#${tickets}`}
                  </Typography>
                ))}
              </Stack>
            </Scrollbar>
          </StyledBox>
        </Stack>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ mt: (theme) => theme.spacing(2) }}
        >
          <Box sx={{ flex: 1, width: '100%', ml: (theme) => theme.spacing(4), mr: (theme) => theme.spacing(2) }}>
            <RaffleProgress stock={stock} quantity={goal} />
          </Box>
          <Box sx={{ flex: 1, maxWidth: 250 }}>
            <ButtonTicket title="Comprar más" sx={{ width: 250 }} />
          </Box>
        </Stack>
      </StyledCard>
    </Stack>
  );
}

Raffles.propTypes = propTypes;

export default Raffles;
