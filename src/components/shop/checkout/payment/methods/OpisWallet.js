import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
// material
import { styled } from '@mui/material/styles';
import { Box, TextField, Typography, Stack, Skeleton } from '@mui/material';
// redux
import { useSelector, useDispatch } from '../../../../../redux/store';
import { getQuotation } from '../../../../../redux/slices/wallet';
// utils
import { fNumber, fCurrency } from '../../../../../utils/formatNumber';

const RootStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  position: 'inherit',
  paddingBottom: theme.spacing(2)
}));

const QuotationPropTypes = {
  loading: PropTypes.bool,
  quotation: PropTypes.shape({
    quote_amount: PropTypes.arrayOf(),
    rate: PropTypes.arrayOf()
  })
};

const Quotation = (props) => {
  const { loading, quotation } = props;
  const { quote_amount: quoteAmount, rate } = quotation || {};

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flex: 1, py: 1, justifyContent: 'flex-end', height: '100%' }}>
        <Skeleton
          component={Box}
          variant="rectangular"
          sx={{ width: '100%', height: '100%', borderRadius: 2, mx: 2 }}
        />
      </Box>
    );
  }

  if (quotation === null) {
    return <></>;
  }

  return (
    <Box sx={{ display: 'flex', flex: 1, py: 1, justifyContent: 'flex-end' }}>
      <Stack direction="column" alignItems="flex-end">
        <Stack direction="row" spacing={1}>
          <Typography>{fNumber(quoteAmount[0])}</Typography>
          <Typography>{quoteAmount[1]}</Typography>
        </Stack>
        <Stack direction="row" alignItems="flex-end" spacing={1}>
          <Typography variant="caption" sx={{ fontSize: 12 }}>
            1
          </Typography>
          <Typography variant="caption" sx={{ fontSize: 12 }}>
            {quoteAmount[1]}
          </Typography>
          <Typography variant="caption" sx={{ fontSize: 12 }}>
            ~ {fCurrency(rate[0])}
          </Typography>
          <Typography variant="caption" sx={{ fontSize: 12 }}>
            {rate[1]}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

Quotation.propTypes = QuotationPropTypes;

const propTypes = {
  amount: PropTypes.number.isRequired,
  onSelectToken: PropTypes.func
};

function OpisWallet({ amount, onSelectToken }) {
  const dispatch = useDispatch();
  const [quotationBase, setQuotationBase] = useState({
    quote_amount: [amount, 'DCLP'],
    rate: [1, 'CLP']
  });
  const { balances, quotation } = useSelector((state) => state.wallet);

  const formik = useFormik({
    initialValues: {
      balances,
      originCurrency: 'DCLP',
      destinationCurrency: 'DCLP',
      amount: [amount, 'DCLP'],
      rate: 1
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      if (values.originCurrency !== values.destinationCurrency) {
        await dispatch(getQuotation(values));
        onSelectToken(values.originCurrency);
      } else {
        setQuotationBase({
          quote_amount: values.amount,
          rate: [1, 'CLP']
        });
      }
      setSubmitting(false);
    }
  });

  const { values, setFieldValue, touched, errors, isSubmitting } = formik;

  const handleChangeState = (e) => {
    const { value } = e.target;
    setFieldValue('originCurrency', value);
    formik.submitForm();
  };

  useMemo(() => {
    setFieldValue('balances', balances);
  }, [balances, setFieldValue]);

  return (
    <RootStyle>
      <Stack direction={{ xs: 'column', md: 'row' }} sx={{ flex: 1 }}>
        <TextField
          select
          fullWidth
          label="Moneda"
          placeholder="Moneda"
          onChange={handleChangeState}
          color="primary"
          disabled={isSubmitting}
          defaultValue={values.originCurrency}
          value={values.originCurrency}
          SelectProps={{ native: true }}
          error={Boolean(touched.originCurrency && errors.originCurrency)}
          helperText={touched.originCurrency && errors.originCurrency}
          sx={{ flex: 1 }}
        >
          <option value="" />
          {values.balances.map((option) => (
            <option key={option.currency} value={option.currency}>
              {option.currency}
            </option>
          ))}
        </TextField>

        {values.originCurrency !== values.destinationCurrency ? (
          <Quotation loading={isSubmitting} quotation={quotation} />
        ) : (
          <Quotation loading={isSubmitting} quotation={quotationBase} />
        )}
      </Stack>
    </RootStyle>
  );
}

OpisWallet.propTypes = propTypes;

export default OpisWallet;
