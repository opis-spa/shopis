import React from 'react';
// material
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  Typography,
  TableContainer
} from '@mui/material';
// redux
import { useSelector } from '../../redux/store';
// utils
import { fCurrency } from '../../utils/formatNumber';
//
import Label from '../Label';
import Scrollbar from '../Scrollbar';

// ----------------------------------------------------------------------

export default function EcommerceBestSalesman() {
  const theme = useTheme();
  const { sales } = useSelector((state) => state.sale);

  return (
    <Card sx={{ pb: 3 }}>
      <CardHeader title="Últimas ordenes" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Comprador</TableCell>
                <TableCell>Entrega </TableCell>
                <TableCell>Pago</TableCell>
                <TableCell>Total</TableCell>
                <TableCell align="right">Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sales.map((row) => {
                const { orderCode, customer, paymentMethod, status, amountTotal } = row;
                return (
                  <TableRow key={orderCode}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar alt={customer.name} src={customer.photo} />
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="subtitle2"> {customer.name}</Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {customer.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{paymentMethod.type}</TableCell>
                    <TableCell>{fCurrency(amountTotal)}</TableCell>
                    <TableCell align="right">
                      <Label variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'} color="success">
                        {status}
                      </Label>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
}
