import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// materils
import { styled, alpha } from '@mui/material/styles';
import {
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
// redux
import { useSelector, useDispatch } from '../../../redux/store';
import { getProduct, setOpenCart } from '../../../redux/slices/product';
// components
import RaffleProgress from '../raffles/RaffleProgress';
import RafflePrice from '../raffles/RafflePrice';
import ProductAdd from './ProductAdd';
import RifopisPolaroid from '../RifopisPolaroid';
import { DialogAnimate } from '../../animate';
import { positionString } from '../../../utils/positionString';
import { MIconButton } from '../../@material-extend';
import ButtonTicket from '../ButtonTicket';

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

function Prize({ name, prize, description, photo, ...other }) {
  return (
    <Grid container spacing={2} {...other}>
      <Grid item xs={12} md={6} sx={{ maxWidth: 350 }}>
        <RifopisPolaroid small title={prize} subtitle={name} photo={photo} sx={{ transform: `rotate(-1.5deg)` }} />
      </Grid>
      <Grid item sx={12} md={6}>
        <Stack spacing={2}>
          <Typography variant="h4">{prize}</Typography>
          <Typography>{description}</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}

const propTypes = {
  onBuy: PropTypes.func,
  product: PropTypes.shape({
    id: PropTypes.arrayOf(PropTypes.string),
    photo: PropTypes.arrayOf(PropTypes.string),
    photos: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    description: PropTypes.string,
    amount: PropTypes.number,
    stock: PropTypes.number,
    discountPartnership: PropTypes.number,
    prizes: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        photos: PropTypes.arrayOf(PropTypes.string)
      })
    ),
    expireAt: PropTypes.string,
    extra: PropTypes.arrayOf(PropTypes.shape({})),
    goal: PropTypes.number
  })
};

function ProductDetail({ onBuy, product }) {
  const {
    extra,
    expireAt,
    goal,
    name,
    description,
    photos,
    amount,
    discountPartnership: discount,
    stock,
    prizes
  } = product;
  const { cart } = useSelector((state) => state.product.checkout);

  const productCart = useMemo(() => {
    const cartNew = cart.find((item) => item.id === product.id);
    if (cartNew) {
      return cartNew;
    }
    return product;
  }, [cart, product]);

  return (
    <Grid container spacing={2} sx={{ mt: 0 }}>
      <Grid item xs={12} md={8}>
        <Box sx={{ overflow: 'scroll' }}>
          <Prize name={name} prize="Primer Lugar" photo={photos[1]} description={description} />

          {extra && (
            <>
              <Typography variant="h4" sx={{ mt: 3, textTransform: 'uppercase' }}>
                Itinerario
              </Typography>

              <Stack spacing={1} sx={{ mt: 2, mb: 5 }}>
                {extra.map((accordion) => (
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
            </>
          )}

          {prizes &&
            prizes.map((prize, index) => {
              const { photos, name, description, cant } = prize;
              return (
                <>
                  <Prize
                    name={name}
                    cant={cant}
                    prize={`${positionString(index + 2)} Lugar`}
                    photo={photos[1]}
                    description={description}
                    sx={{ mb: 2 }}
                  />
                </>
              );
            })}

          <Stack spacing={1} sx={{ py: 5 }}>
            <Typography variant="h5" sx={{ textTransform: 'uppercase', fontWeight: 900 }}>
              Consideraciones generales sobre el sorteo
            </Typography>
            <Typography>Consideraciones generales sobre el sorteo</Typography>
          </Stack>
        </Box>
      </Grid>

      <Grid item xs={12} md={4}>
        <RafflePrice price={amount - (discount || 0)} expireAt={expireAt} />
        <RaffleProgress stock={stock} quantity={goal} sx={{ my: 2 }} />
        <ProductAdd tooltip title="Participar" product={productCart} />

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          {productCart && productCart?.quantity > 0 && <ButtonTicket title="Comprar tokens" onClick={onBuy} />}
          <Button color="inherit" sx={{ mt: 2, textTransform: 'uppercase', backgroundColor: 'secondary.light' }}>
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

  const handleBuy = async () => {
    dispatch(setOpenCart(true));
    handleClose();
  };

  const open = useMemo(() => {
    if (product) {
      return true;
    }
    return false;
  }, [product]);

  return (
    <DialogAnimate fullWidth open={open} maxWidth="lg" scroll="paper" onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'right', m: 0, p: 2 }}>
        <MIconButton onClick={handleClose}>
          <Icon icon={closeFill} width={20} height={20} />
        </MIconButton>
      </DialogTitle>
      <DialogContent>{product && <ProductDetail product={product} onBuy={handleBuy} />}</DialogContent>
    </DialogAnimate>
  );
}

export default DialogoProduct;
