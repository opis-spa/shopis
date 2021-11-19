import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
import { useNavigate } from 'react-router';
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
  Link,
  Typography,
  Divider
} from '@mui/material';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
// redux
import { useSelector, useDispatch } from '../../../redux/store';
import { getProduct } from '../../../redux/slices/product';
// routes
import { PATH_RIFOPIS } from '../../../routes/paths';
// components
import RaffleProgress from '../raffles/RaffleProgress';
import RafflePrice from '../raffles/RafflePrice';
import ProductAdd from './ProductAdd';
import RifopisPolaroid from '../RifopisPolaroid';
import { DialogAnimate } from '../../animate';
import { positionString } from '../../../utils/positionString';
import { MIconButton } from '../../@material-extend';
import ButtonTicket from '../ButtonTicket';
import Scrollbar from '../../Scrollbar';

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
  photo: PropTypes.arrayOf(PropTypes.string),
  cant: PropTypes.number
};

function Prize({ name, prize, description, photo, cant, ...other }) {
  return (
    <Grid container spacing={2} {...other}>
      <Grid item xs={12} md={6} sx={{ maxWidth: 350 }}>
        <Box component="img" src={photo} sx={{ height: 215 }} />
      </Grid>
      <Grid item sx={12} md={6}>
        <Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography color="primary" variant="h5" sx={{ color: 'primary.light' }}>
              {prize}
            </Typography>
            <Typography variant="caption" sx={{ color: 'primary.light' }}>{`- ${cant} premios`}</Typography>
          </Stack>
          <Typography variant="h4" sx={{ color: 'primary.light', mb: 1 }}>
            {name}
          </Typography>
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
        <Scrollbar>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={12} sx={{ width: 350 }}>
              <RifopisPolaroid
                small
                title="Primer Lugar"
                subtitle={name}
                photo={photos[1]}
                sx={{ mt: 1, transform: `rotate(-1.5deg)` }}
              />
            </Grid>
            <Grid item sx={12} md={12}>
              <Stack spacing={2}>
                <Typography variant="h4">Primer Lugar</Typography>
                <Stack direction="column">
                  {description.split('\\n').reduce(
                    (a, b) => (
                      <>
                        {a}
                        <Typography variant="span">
                          {b}
                          <br />
                        </Typography>
                      </>
                    ),
                    null
                  )}
                </Stack>
              </Stack>
            </Grid>
          </Grid>

          {extra && (
            <>
              <Typography variant="h4" sx={{ textTransform: 'uppercase' }}>
                Itinerario
              </Typography>

              <Stack spacing={1} sx={{ mt: 2, mb: 5 }}>
                {extra.map((accordion) => (
                  <StyledAccordion key={accordion.value}>
                    <AccordionSummary expandIcon={<Icon icon={arrowIosDownwardFill} width={20} height={20} />}>
                      <Typography variant="subtitle1">{accordion.heading}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{accordion.description}</Typography>
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
                <Box key={name}>
                  <Divider />
                  <Prize
                    name={name}
                    cant={cant}
                    prize={`${positionString(index + 2)} Lugar`}
                    photo={photos[1]}
                    description={description}
                    sx={{ my: 2 }}
                  />
                </Box>
              );
            })}

          <Stack spacing={1} sx={{ py: 1 }} />
        </Scrollbar>
      </Grid>

      <Grid item xs={12} md={4}>
        <RafflePrice price={amount - (discount || 0)} expireAt={expireAt} />
        <RaffleProgress stock={stock} quantity={goal} sx={{ my: 2 }} />
        <ProductAdd tooltip title="Participar" product={productCart} />

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          {productCart && productCart?.quantity > 0 && <ButtonTicket title="Comprar tokens" onClick={onBuy} />}
          <Button
            target="_blank"
            href="https://firebasestorage.googleapis.com/v0/b/dreampay-73a3a.appspot.com/o/base%2Fbases-legales-rifopis-11-2021.pdf?alt=media&token=80ebab83-9aef-486d-b9a3-360b358897fb"
            component={Link}
            color="inherit"
            sx={{
              color: 'common.white',
              textDecoration: 'none',
              mt: 2,
              textTransform: 'uppercase',
              backgroundColor: 'secondary.light'
            }}
          >
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
  const navigate = useNavigate();
  const { product } = useSelector((state) => state.product);

  const handleClose = () => {
    dispatch(getProduct({ name: '' }));
    navigate(PATH_RIFOPIS.home);
  };

  const handleBuy = async () => {
    handleClose();
    navigate(PATH_RIFOPIS.checkout);
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
