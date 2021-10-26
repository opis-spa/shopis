import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Grid,
  Radio,
  Collapse,
  Typography,
  RadioGroup,
  CardHeader,
  CardContent,
  FormHelperText,
  FormControlLabel
} from '@mui/material';
// redux
import { useSelector } from '../../../redux/store';
// components
import PayPal from './payment/methods/PayPal';
import { MHidden } from '../../@material-extend';

// ----------------------------------------------------------------------

const OptionStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2.5),
  justifyContent: 'space-between',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.grey['500_32']}`
}));

const CardStyle = styled(Card)(() => ({
  boxShadow: '-2px -2px 14px rgba(255, 194, 36, 0.2)',
  border: '1px solid #936DB9',
  boxSizing: 'border-box',
  alignItems: 'center',
  textAlign: 'left'
}));

// ----------------------------------------------------------------------

CheckoutPaymentMethods.propTypes = {
  formik: PropTypes.object,
  paymentOptions: PropTypes.array
};

export default function CheckoutPaymentMethods({ paymentOptions, formik, ...other }) {
  const { total } = useSelector((state) => state.product.checkout);
  const { errors, touched, values, getFieldProps } = formik;

  return (
    <CardStyle sx={{ my: 3 }} {...other}>
      <CardHeader title="Selecciona un medio de pago" />
      <CardContent>
        <RadioGroup row {...getFieldProps('payment')}>
          <Grid container spacing={2}>
            {paymentOptions.map((method) => {
              const { type, name, icons, description } = method;
              const hasChildren = type === 'paypal';

              return (
                <Grid key={name} item xs={12}>
                  <OptionStyle
                    sx={{
                      ...(values.payment === type && {
                        boxShadow: (theme) => theme.customShadows.z8
                      }),
                      ...(hasChildren && { flexWrap: 'wrap' })
                    }}
                  >
                    <FormControlLabel
                      value={type}
                      control={<Radio checkedIcon={<Icon icon={checkmarkCircle2Fill} />} />}
                      label={
                        <Box sx={{ ml: 1 }}>
                          <Typography variant="subtitle2">{name}</Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {description}
                          </Typography>
                        </Box>
                      }
                      sx={{ flexGrow: 1, py: 3 }}
                    />
                    <MHidden width="smDown">
                      <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                        {icons.map((icon, index) => (
                          <Box
                            key={icon}
                            component="img"
                            alt="logo card"
                            src={icon}
                            sx={{
                              ...(index === 0 && { mr: 1 }),
                              maxWidth: { xs: 30, md: 50 }
                            }}
                          />
                        ))}
                      </Box>
                    </MHidden>

                    {hasChildren && (
                      <Collapse in={values.payment === 'paypal'} sx={{ width: '100%' }}>
                        {values.payment === 'paypal' && <PayPal amount={parseFloat((total / 730).toFixed(2))} />}
                      </Collapse>
                    )}
                  </OptionStyle>
                </Grid>
              );
            })}
          </Grid>
        </RadioGroup>

        {errors.payment && (
          <FormHelperText error>
            <Box component="span" sx={{ px: 2 }}>
              {touched.payment && errors.payment}
            </Box>
          </FormHelperText>
        )}
      </CardContent>
    </CardStyle>
  );
}
