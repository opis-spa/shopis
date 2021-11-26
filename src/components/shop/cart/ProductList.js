import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import minusFill from '@iconify/icons-eva/minus-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
  Stack
} from '@mui/material';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------

const ButtonDelete = styled(Button)(({ theme }) => ({
  padding: theme.spacing(0.05),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey['500_32'],
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none'
  }
}));

const IncrementerStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(0.5, 0.75),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey['500_32']}`
}));

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadiusSm
}));

const TableHeadStyle = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  color: theme.palette.text.primary
}));

// ----------------------------------------------------------------------

Incrementer.propTypes = {
  available: PropTypes.number,
  quantity: PropTypes.number,
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func
};

function Incrementer({ available, quantity, onIncrease, onDecrease }) {
  return (
    <Box sx={{ width: 96, textAlign: 'right' }}>
      <IncrementerStyle>
        <MIconButton size="small" color="inherit" onClick={onDecrease} disabled={quantity <= 1}>
          <Icon icon={minusFill} width={16} height={16} />
        </MIconButton>
        {quantity}
        <MIconButton
          size="small"
          color="inherit"
          onClick={onIncrease}
          disabled={available >= 0 && quantity >= available}
        >
          <Icon icon={plusFill} width={16} height={16} />
        </MIconButton>
      </IncrementerStyle>
    </Box>
  );
}

ProductList.propTypes = {
  formik: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func
};

export default function ProductList({ formik, onDelete, onIncreaseQuantity, onDecreaseQuantity }) {
  const { products } = formik.values;

  return (
    <TableContainer sx={{ minWidth: 720 }}>
      <Table>
        <TableHeadStyle>
          <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell align="left">Precio</TableCell>
            <TableCell align="left">Cantidad</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHeadStyle>

        <TableBody>
          {products.map((product) => {
            const { id, name, amount, photo, photos, promo, quantity, stock, discountPartnership } = product;
            const image = photos || [photo];
            const isPromo = promo === '3x2';
            const isDiscountXPromo = isPromo && quantity % 3 === 0;
            return (
              <TableRow key={id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ThumbImgStyle alt="product image" src={image[0]} />
                    <Box>
                      <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240, mb: 0.5 }}>
                        {name}
                      </Typography>

                      <ButtonDelete size="small" variant="contained" onClick={() => onDelete(id)}>
                        <Icon icon={trash2Fill} width={16} height={16} />
                      </ButtonDelete>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell align="left">
                  <Stack direction="row" spacing={2}>
                    <Typography>{fCurrency(amount - discountPartnership)}</Typography>
                    {discountPartnership > 0 && (
                      <Typography sx={{ textDecoration: 'line-through', color: 'text.disabled' }}>
                        {fCurrency(amount)}
                      </Typography>
                    )}
                  </Stack>
                </TableCell>

                <TableCell align="left">
                  <Incrementer
                    quantity={quantity}
                    available={stock}
                    onDecrease={() => onDecreaseQuantity(id)}
                    onIncrease={() => onIncreaseQuantity(id)}
                  />
                </TableCell>

                <TableCell align="right" sx={{ textAlign: 'right' }}>
                  <Stack>
                    {isDiscountXPromo && (
                      <Typography sx={{ textDecoration: 'line-through', color: 'text.disabled', fontSize: 12 }}>
                        {fCurrency((amount - discountPartnership) * quantity)}
                      </Typography>
                    )}
                    <Typography>
                      {fCurrency((amount - discountPartnership) * (quantity - (isDiscountXPromo ? 1 : 0)))}
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
