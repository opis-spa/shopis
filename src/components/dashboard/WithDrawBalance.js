import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// material
import {
  Button,
  Dialog,
  DialogTitle,
  Typography,
  DialogActions,
  DialogContent,
  Stack,
  Input,
  Slider as MuiSlider
} from '@mui/material';
// redux
import { useSelector } from '../../redux/store';
// utils
import { fCurrency } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

const MIN_AMOUNT = 1000;
const STEP = 100;

InputAmount.propTypes = {
  amount: PropTypes.number,
  max: PropTypes.number,
  autoWidth: PropTypes.number,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  sx: PropTypes.object
};

function InputAmount({ autoWidth, amount, onBlur, max, onChange, sx, ...other }) {
  return (
    <Stack direction="row" justifyContent="center" spacing={1} sx={sx}>
      <Typography variant="h5">$</Typography>
      <Input
        disableUnderline
        size="small"
        value={amount}
        onChange={onChange}
        onBlur={onBlur}
        inputProps={{ step: STEP, min: MIN_AMOUNT, max, type: 'number' }}
        sx={{
          typography: 'h3',
          '& input': {
            p: 0,
            textAlign: 'center',
            width: autoWidth
          }
        }}
        {...other}
      />
    </Stack>
  );
}

const propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
};

const defaultProps = {
  open: false,
  onClose: () => {}
};

function WithDrawBalance(props) {
  const { open, onClose } = props;
  const { balance } = useSelector((state) => state.wallet);
  const [autoWidth, setAutoWidth] = useState(24);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (amount) {
      handleAutoWidth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  const handleAutoWidth = () => {
    const getNumberLength = amount.toString().length;
    setAutoWidth(getNumberLength * 22);
  };

  const handleWidthDraw = () => {
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const handleBlur = () => {
    if (amount < 0) {
      setAmount(0);
    } else if (amount > balance) {
      setAmount(balance);
    }
  };

  const handleSliderChange = (event, newValue) => {
    setAmount(newValue);
  };

  const handleInputChange = (event) => {
    setAmount(event.target.value === '' ? '' : Number(event.target.value));
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Retiro de saldo</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              Ingresa monto a retirar
            </Typography>

            <InputAmount
              onBlur={handleBlur}
              onChange={handleInputChange}
              autoWidth={autoWidth}
              amount={amount}
              max={balance}
            />

            <MuiSlider
              disabled={balance.amount === 0}
              value={typeof amount === 'number' ? amount : 0}
              valueLabelDisplay="auto"
              step={STEP}
              marks
              min={MIN_AMOUNT}
              max={balance.amount < MIN_AMOUNT ? MIN_AMOUNT : balance.amount}
              onChange={handleSliderChange}
            />

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Tu balance
              </Typography>
              <Typography variant="subtitle1">{fCurrency(balance.amount)}</Typography>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Volver</Button>
          <Button variant="contained" size="large" disabled={amount === 0} onClick={handleWidthDraw}>
            Solicitar Retiro
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

WithDrawBalance.propTypes = propTypes;
WithDrawBalance.defaultProps = defaultProps;

export default WithDrawBalance;
