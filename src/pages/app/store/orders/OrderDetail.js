import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';
import { useSnackbar } from 'notistack';
// material
import {
  Box,
  Card,
  Grid,
  Button,
  IconButton,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Container,
  TableContainer,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
// iconify
import { Icon } from '@iconify/react';
import backIcon from '@iconify/icons-jam/arrow-circle-left-f';
import editFill from '@iconify/icons-eva/edit-fill';
import closeFill from '@iconify/icons-carbon/close-filled';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getSale, setOrderAccept, setOrderDelivery, setOrderReject } from '../../../../redux/slices/sales';
// routes
import { PATH_APP } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import LogoShopis from '../../../../components/LogoShopis';
import Label from '../../../../components/Label';
import Scrollbar from '../../../../components/Scrollbar';

const useStyles = makeStyles((theme) => ({
  root: {},
  tableHead: {
    borderBottom: `solid 1px ${theme.palette.divider}`,
    '& th': {
      backgroundColor: 'transparent'
    }
  },
  row: {
    borderBottom: `solid 1px ${theme.palette.divider}`
  },
  rowResult: {
    '& td': {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    }
  }
}));

const OrderDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingState, setIsEditingState] = useState(false);
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { sale } = useSelector((state) => state.sale);

  useEffect(() => {
    dispatch(getSale(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleUpdateOrder = async () => {
    setIsLoading(true);
    try {
      if (sale?.state === 1) {
        await dispatch(setOrderAccept(sale._id));
        setIsLoading(false);
        enqueueSnackbar('Estado de orden actualizado satisfactoriamente', { variant: 'success' });
      } else if (sale?.state === 2) {
        await dispatch(setOrderDelivery(sale._id));
        setIsLoading(false);
        enqueueSnackbar('Estado de orden actualizado satisfactoriamente', { variant: 'success' });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      enqueueSnackbar('Error al actualizar estado de orden', { variant: 'error' });
    }
  };

  const handleRejectOrder = async () => {
    setIsLoading(true);
    try {
      await dispatch(setOrderReject(sale._id));
      setIsLoading(false);
      enqueueSnackbar(sale?.state === 1 ? 'Orden rechazada satisfactoriamente' : 'Orden anulada satisfactoriamente', {
        variant: 'success'
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      enqueueSnackbar(sale?.state === 1 ? 'Error al rechazar orden' : 'Error al anular orden', { variant: 'error' });
    }
  };

  return (
    <Page title="Detalle Orden | shopis">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Detalle"
          links={[
            { name: 'Shopis', href: PATH_APP.root },
            { name: 'Ordenes', href: PATH_APP.business.orders },
            { name: 'Detalle' }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_APP.business.orders}
              startIcon={<Icon icon={backIcon} />}
            >
              Volver
            </Button>
          }
        />
        <Card sx={{ py: 5, px: 5 }}>
          <Grid container>
            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <LogoShopis />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Box sx={{ textAlign: { sm: 'right' } }}>
                {isEditingState ? (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 1,
                      justifyContent: 'flex-end',
                      flexDirection: { xs: 'row-reverse', sm: 'row' }
                    }}
                  >
                    <IconButton
                      disabled={isLoading}
                      color="primary"
                      sx={{ marginRight: { xs: 0, sm: 1 } }}
                      onClick={() => setIsEditingState(false)}
                    >
                      <Icon icon={closeFill} />
                    </IconButton>
                    <Box>
                      <Button
                        disabled={isLoading}
                        variant="contained"
                        color="primary"
                        onClick={handleUpdateOrder}
                        sx={{ mr: 1 }}
                      >
                        {sale?.state === 1 ? 'Confirmar' : 'Despachar'}
                      </Button>
                      <Button disabled={isLoading} variant="contained" onClick={handleRejectOrder} color="error">
                        {sale?.state === 1 ? 'Rechazar' : 'Anular'}
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 1,
                      justifyContent: 'flex-end',
                      flexDirection: { xs: 'row-reverse', sm: 'row' }
                    }}
                  >
                    {(sale?.state === 1 || sale?.state === 2) && (
                      <IconButton
                        size="small"
                        color="primary"
                        sx={{ marginRight: { xs: 0, sm: 1 } }}
                        onClick={() => setIsEditingState(true)}
                      >
                        <Icon icon={editFill} />
                      </IconButton>
                    )}
                    <Label
                      variant="ghost"
                      color={
                        (sale?.state === 1 && 'warning') ||
                        (sale?.state === 0 && 'error') ||
                        (sale?.state === 2 && 'success') ||
                        (sale?.state === 3 && 'success') ||
                        'default'
                      }
                      sx={{ textTransform: 'uppercase', fontSize: 14, height: 28, padding: '0 10px' }}
                    >
                      {(sale?.state === 1 && 'Por Confirmar') ||
                        (sale?.state === 0 && 'Rechazado') ||
                        (sale?.state === 2 && 'Confirmado') ||
                        (sale?.state === 3 && 'Despachado')}
                    </Label>
                  </Box>
                )}
                <Typography variant="h6">{sale?._id}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ mb: 5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={sale?.address ? 4 : 6}>
                  <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                    Datos personales
                  </Typography>
                  {sale?.customer?.identityCode && (
                    <Typography variant="body2">
                      <strong>RUT:</strong> {sale?.customer?.identityCode}
                    </Typography>
                  )}
                  <Typography variant="body2">
                    <strong>Nombre:</strong> {sale?.customer?.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Email:</strong> {sale?.customer?.email}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Teléfono:</strong> {sale?.customer?.phone}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={sale?.address ? 4 : 6}>
                  <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                    Datos de orden
                  </Typography>
                  <Typography variant="body2">
                    <strong>Número de orden:</strong> {sale?.orderCode}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Creado:</strong> {moment().to(sale?.createdAt)}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Estado de pago: </strong>
                    <Label variant="ghost" color="success" sx={{ textTransform: 'uppercase' }}>
                      Pagado
                    </Label>
                  </Typography>
                  <Typography variant="body2">
                    <strong>Forma de pago:</strong> {sale?.paymentMethod?.type}
                  </Typography>
                </Grid>
                {sale?.address && (
                  <Grid item xs={12} md={4}>
                    <Typography paragraph variant="overline" sx={{ color: 'primary.main' }}>
                      Datos de envío
                    </Typography>
                    <Grid container columnSpacing={3}>
                      <Grid item xs={12} sm={6} md={12}>
                        <Typography variant="body2">
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: 'primary.main', fontWeight: 'bold' }}
                          >
                            Despacho:{' '}
                          </Typography>
                          asdsad@asdasd.com
                        </Typography>
                        <Typography variant="body2">
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: 'primary.main', fontWeight: 'bold' }}
                          >
                            Dirección:{' '}
                          </Typography>
                          {sale?.address?.address}
                        </Typography>
                        <Typography variant="body2">
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: 'primary.main', fontWeight: 'bold' }}
                          >
                            País:{' '}
                          </Typography>
                          Chile
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={12}>
                        <Typography variant="body2">
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: 'primary.main', fontWeight: 'bold' }}
                          >
                            Región:{' '}
                          </Typography>
                          {sale?.address?.state}
                        </Typography>
                        <Typography variant="body2">
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: 'primary.main', fontWeight: 'bold' }}
                          >
                            Comuna:{' '}
                          </Typography>
                          {sale?.address?.city}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 960 }}>
              <Table>
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell width={40}>#</TableCell>
                    <TableCell align="left">Producto</TableCell>
                    <TableCell align="center">Cantidad</TableCell>
                    <TableCell align="center">Precio Unitario</TableCell>
                    <TableCell align="center">Descuento</TableCell>
                    <TableCell align="center">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sale?.details?.map((product, idx) => {
                    const {
                      _id,
                      quantity,
                      subtotal,
                      product: { amount, name, discountPartnership }
                    } = product;
                    return (
                      <TableRow className={classes.row} key={_id}>
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell align="left">
                          <Box sx={{ maxWidth: 560 }}>
                            <Typography variant="body2">{name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">{quantity}</TableCell>
                        <TableCell align="center">{`$${amount.toFixed(2)}`}</TableCell>
                        <TableCell align="center">{`$${discountPartnership.toFixed(2)}`}</TableCell>
                        <TableCell align="center">{`$${subtotal.toFixed(2)}`}</TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow className={classes.rowResult}>
                    <TableCell colSpan={4} />
                    <TableCell align="right">
                      <Box sx={{ mt: 2 }} />
                      <Typography variant="body1">Subtotal</Typography>
                    </TableCell>
                    <TableCell align="center" width={120}>
                      <Box sx={{ mt: 2 }} />
                      <Typography variant="body1">{`$${sale?.amountTotal.toFixed(2)}`}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.rowResult}>
                    <TableCell colSpan={4} />
                    <TableCell align="right">
                      <Typography variant="body1">Comisión</Typography>
                    </TableCell>
                    <TableCell align="center" width={120}>
                      <Typography sx={{ color: 'error.main' }} variant="body1">
                        {`-$${sale?.amountDream?.toFixed(2) || ''}`}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  {sale?.deliveryCost && (
                    <TableRow className={classes.rowResult}>
                      <TableCell colSpan={4} />
                      <TableCell align="right">
                        <Typography variant="body1">Costo delivery</Typography>
                      </TableCell>
                      <TableCell align="center" width={120}>
                        <Typography variant="body1">{`$${sale?.deliveryCost?.toFixed(2) || ''}`}</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow className={classes.rowResult}>
                    <TableCell colSpan={4} />
                    <TableCell align="right">
                      <Typography variant="h6">Total</Typography>
                    </TableCell>
                    <TableCell align="center" width={140}>
                      <Typography variant="h6">{`$${sale?.amountPartnership?.toFixed(2) || ''}`}</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
};

export default OrderDetail;
