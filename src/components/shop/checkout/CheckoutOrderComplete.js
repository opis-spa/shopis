import React from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import filePdfFilled from '@iconify/icons-ant-design/file-pdf-filled';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Divider, Typography, Stack } from '@mui/material';
// redux
import { useDispatch } from '../../../redux/store';
import { deleteCart } from '../../../redux/slices/product';
//
import { DialogAnimate } from '../../animate';
import { OrderCompleteIllustration } from '../../../assets';
import LinkParnership from '../../LinkParnership';

// ----------------------------------------------------------------------

const DialogStyle = styled(DialogAnimate)(({ theme }) => ({
  '& .MuiDialog-paper': {
    margin: 0,
    [theme.breakpoints.up('md')]: {
      maxWidth: 'calc(100% - 48px)',
      maxHeight: 'calc(100% - 48px)'
    }
  }
}));

// ----------------------------------------------------------------------

export default function CheckoutOrderComplete({ ...other }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleResetStep = () => {
    dispatch(deleteCart());
    navigate('');
  };

  return (
    <DialogStyle fullScreen {...other}>
      <Box sx={{ p: 4, maxWidth: 480, margin: 'auto' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" paragraph>
            Gracias por tu compra!
          </Typography>

          <OrderCompleteIllustration sx={{ height: 260, my: 10 }} />

          <Typography align="left" paragraph>
            Su número de orden es el siguiente: &nbsp;
            <Link href="#">01dc1370-3df6-11eb-b378-0242ac130002</Link>
          </Typography>

          <Typography align="left">
            Te enviaremos una notificación con más información.
            <br /> <br /> Si tienes alguna pregunta o consulta puedes contacte con nosotros. <br /> <br /> All the best,
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Stack direction={{ xs: 'column-reverse', sm: 'row' }} justifyContent="space-between" spacing={2}>
          <Button color="inherit" startIcon={<Icon icon={arrowIosBackFill} />}>
            <LinkParnership to="">Continuar Comprando</LinkParnership>
          </Button>
          <Button variant="contained" startIcon={<Icon icon={filePdfFilled} />} onClick={handleResetStep}>
            Download as PDF
          </Button>
        </Stack>
      </Box>
    </DialogStyle>
  );
}
