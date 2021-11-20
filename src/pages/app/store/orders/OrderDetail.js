import React, { useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';
// material
import {
  Box,
  Card,
  Grid,
  Button,
  Table,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  TableHead,
  Container,
  TableContainer,
  TablePagination,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
// iconify
import { Icon } from '@iconify/react';
import backIcon from '@iconify/icons-jam/arrow-circle-left-f';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getSale } from '../../../../redux/slices/sales';
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
  const { themeStretch } = useSettings();
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { sale } = useSelector((state) => state.sale);

  useEffect(() => {
    dispatch(getSale(id));
  }, dispatch);

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
                <Label variant="ghost" color="success" sx={{ textTransform: 'uppercase', mb: 1 }}>
                  Pagado
                </Label>
                <Typography variant="h6">{sale?._id}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ mb: 5 }}>
              {/* <Box sx={{ p: 3, borderRadius: 2, boxShadow: 'inset 3px 3px 8px .5px rgba(0,0,0,.10)' }}> */}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                    Datos personales
                  </Typography>
                  <Typography variant="body2">
                    <strong>RUT:</strong> {sale?.partnershipId?.identityCode}
                  </Typography>
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
                <Grid item xs={12} sm={6} md={4}>
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
                    <strong>Estado de pago:</strong> {sale?.status}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Forma de pago:</strong> {sale?.paymentMethod?.type}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography paragraph variant="overline" sx={{ color: 'primary.main' }}>
                    Datos de envío
                  </Typography>
                  <Grid container columnSpacing={3}>
                    <Grid item xs={12} sm={6} md={12}>
                      <Typography variant="body2">
                        <Typography component="span" variant="body2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                          Despacho:{' '}
                        </Typography>
                        asdsad@asdasd.com
                      </Typography>
                      <Typography variant="body2">
                        <Typography component="span" variant="body2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                          Dirección:{' '}
                        </Typography>
                        {sale?.address?.address}
                      </Typography>
                      <Typography variant="body2">
                        <Typography component="span" variant="body2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                          País:{' '}
                        </Typography>
                        Chile
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={12}>
                      <Typography variant="body2">
                        <Typography component="span" variant="body2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                          Región:{' '}
                        </Typography>
                        {sale?.address?.state}
                      </Typography>
                      <Typography variant="body2">
                        <Typography component="span" variant="body2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                          Comuna:{' '}
                        </Typography>
                        {sale?.address?.city}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* </Box> */}
            </Grid>
          </Grid>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 960 }}>
              <Table>
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell width={40}>#</TableCell>
                    <TableCell align="left">Producto</TableCell>
                    <TableCell align="left">Cantidad</TableCell>
                    <TableCell align="center">Precio Unitario</TableCell>
                    <TableCell align="center">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sale?.details?.map((product, idx) => {
                    const {
                      _id,
                      quantity,
                      subtotal,
                      product: { amount, name }
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
                        <TableCell align="center">{`$${subtotal.toFixed(2)}`}</TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow className={classes.rowResult}>
                    <TableCell colSpan={3} />
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
                    <TableCell colSpan={3} />
                    <TableCell align="right">
                      <Typography variant="body1">Comisión</Typography>
                    </TableCell>
                    <TableCell align="center" width={120}>
                      <Typography sx={{ color: 'error.main' }} variant="body1">
                        -$3.50
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.rowResult}>
                    <TableCell colSpan={3} />
                    <TableCell align="right">
                      <Typography variant="h6">Total</Typography>
                    </TableCell>
                    <TableCell align="center" width={140}>
                      <Typography variant="h6">{`$${(sale?.amountTotal - 3.5).toFixed(2)}`}</Typography>
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
