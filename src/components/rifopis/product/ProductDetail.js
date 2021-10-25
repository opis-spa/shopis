import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// materils
import { styled, alpha } from '@mui/material/styles';
import { AccordionSummary, AccordionDetails, Box, Button, DialogContent, Grid, Stack, Typography } from '@mui/material';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
// redux
import { useSelector, useDispatch } from '../../../redux/store';
import { getProduct } from '../../../redux/slices/product';
// components
import RaffleProgress from '../raffles/RaffleProgress';
import RafflePrice from '../raffles/RafflePrice';
import ProductAdd from './ProductAdd';
import Scrollbar from '../../Scrollbar';
import RifopisPolaroid from '../RifopisPolaroid';
import { DialogAnimate } from '../../animate';

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

Prize.propTypes = {
  name: PropTypes.string,
  prize: PropTypes.string,
  description: PropTypes.string,
  photo: PropTypes.arrayOf(PropTypes.string)
};

function Prize({ name, prize, description, photo }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={5} sx={{ maxWidth: 350 }}>
        <RifopisPolaroid small title={prize} subtitle={name} photo={photo} sx={{ transform: `rotate(-1.5deg)` }} />
      </Grid>
      <Grid item sx={12} md={7}>
        <Stack spacing={2}>
          <Typography variant="h4">Descripción</Typography>
          <Typography>{description}</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}

const propTypes = {
  product: PropTypes.shape({
    photo: PropTypes.arrayOf(PropTypes.string),
    photos: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    description: PropTypes.string,
    amount: PropTypes.number,
    stock: PropTypes.number,
    discountPartnership: PropTypes.number
  })
};

function ProductDetail({ product }) {
  const { name, description, photos, amount, discountPartnership: discount, stock } = product;

  const ITINERARY = [
    {
      value: 'itinerary-1',
      heading: 'Día 1',
      image: '',
      detail:
        'Será agregados a una cuenta creada en Opis, Explicación, condiciones y otras cosas que escriban en este lugar'
    },
    { value: 'itinerary-2', heading: 'Día 2', image: '', detail: '' },
    { value: 'itinerary-3', heading: 'Día 3', image: '', detail: '' },
    { value: 'itinerary-4', heading: 'Día 4', image: '', detail: '' }
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Scrollbar>
          <Prize name={name} prize="Primer Lugar" photo={photos[1]} description={description} />

          <Typography variant="h4" sx={{ mt: 3, textTransform: 'uppercase' }}>
            Itinerario
          </Typography>

          <Stack spacing={1} sx={{ mt: 2, mb: 5 }}>
            {ITINERARY.map((accordion) => (
              <StyledAccordion key={accordion.value}>
                <AccordionSummary expandIcon={<Icon icon={arrowIosDownwardFill} width={20} height={20} />}>
                  <Typography variant="subtitle1">{accordion.heading}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{accordion.detail}</Typography>
                </AccordionDetails>
              </StyledAccordion>
            ))}
          </Stack>

          <Stack spacing={2}>
            <Prize name={name} prize="Segundo Lugar" photo={photos[1]} description={description} />
            <Prize name={name} prize="Tercer Lugar" photo={photos[1]} description={description} />
          </Stack>

          <Stack spacing={1} sx={{ py: 5 }}>
            <Typography variant="h5" sx={{ textTransform: 'uppercase', fontWeight: 900 }}>
              Consideraciones generales sobre el sorteo
            </Typography>
            <Typography>Consideraciones generales sobre el sorteo</Typography>
          </Stack>
        </Scrollbar>
      </Grid>

      <Grid item xs={12} md={4}>
        <RafflePrice price={amount - (discount || 0)} />
        <RaffleProgress stock={stock} quantity={1333} sx={{ my: 2 }} />
        <ProductAdd tooltip title="Comprar token" product={product} />

        <Box sx={{ textAlign: 'center' }}>
          <Button color="inherit" variant="outlined" sx={{ mt: 2, textTransform: 'uppercase' }}>
            Ver bases del sorteo
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

ProductDetail.propTypes = propTypes;

function DialogoProduct() {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);

  const handleClose = () => {
    dispatch(getProduct({ name: '' }));
  };

  const open = useMemo(() => {
    if (product) {
      return true;
    }
    return false;
  }, [product]);

  return (
    <DialogAnimate fullWidth open={open} maxWidth="lg" scroll="paper" onClose={handleClose}>
      <DialogContent>{product && <ProductDetail product={product} />}</DialogContent>
    </DialogAnimate>
  );
}

export default DialogoProduct;
