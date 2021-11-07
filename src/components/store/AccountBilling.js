import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
// material
import { Box, Grid, Card, Button, Typography, Stack, Paper, Modal } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// iconify
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
// redux
import { useSelector } from '../../redux/store';
//
import AccountBillingAddressBook from './AccountBillingAddressBook';
import AccountBillingPaymentMethod from './AccountBillingPaymentMethod';
import AccountBillingInvoiceHistory from './AccountBillingInvoiceHistory';
import AccountBillingForm from './AccountBillingForm';

// ----------------------------------------------------------------------

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  maxWidth: 'calc(100vw - 40px)'
};

const accountBook = [
  {
    bankId: 'bank1',
    accountType: 'vista',
    accountNumber: '123456789'
  },
  {
    bankId: 'bank2',
    accountType: 'ahorro',
    accountNumber: '123456789'
  },
  {
    bankId: 'bank3',
    accountType: 'corriente',
    accountNumber: '123456789'
  }
];

const ACCOUNT_TYPE = [
  { value: 'corriente', display: 'Cuenta corriente' },
  { value: 'ahorro', display: 'Cuenta de ahorro' },
  { value: 'vista', display: 'Cuenta vista' }
];

export default function AccountBilling({ banks }) {
  const { cards, invoices, addressBook } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [isNewAccount, setIsNewAccount] = useState(false);
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const NewCardSchema = Yup.object().shape({
    cardName: Yup.string().required('Name is required'),
    cardNumber: Yup.string().required('Card number is required'),
    cardExpired: Yup.string().required('Card expired is required'),
    cardCvv: Yup.string().required('Cvv is required')
  });

  const formik = useFormik({
    initialValues: {
      cardName: '',
      cardNumber: '',
      cardExpired: '',
      cardCvv: ''
    },
    validationSchema: NewCardSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      handleCancel();
      resetForm();
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
      enqueueSnackbar('Add card success', { variant: 'success' });
    }
  });

  const handleOpenAddCard = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleCancel = () => {
    setOpen(false);
    formik.resetForm();
  };

  const getAccountTypeName = (accountTypeId) => {
    const accountTypeFilter = ACCOUNT_TYPE.filter((type) => type.value === accountTypeId);
    return accountTypeFilter.length > 0 ? accountTypeFilter[0].display : '';
  };

  const getBankName = (bankId) => {
    const bankFilter = banks.filter((bank) => bank._id === bankId);
    return bankFilter.length > 0 ? bankFilter[0].name : '';
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Card sx={{ p: 3 }}>
          <Grid container spacing={2}>
            {accountBook.map((account) => (
              <Grid item xs={12} md={6} key={account.bankId}>
                <Paper
                  sx={{
                    p: 3,
                    width: 1,
                    bgcolor: 'background.neutral'
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom>
                    {getBankName(account.bankId)}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
                      Tipo de Cuenta: &nbsp;
                    </Typography>
                    {getAccountTypeName(account.accountType)}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
                      Número de Cuenta: &nbsp;
                    </Typography>
                    {account.accountNumber}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Button
                      color="error"
                      size="small"
                      startIcon={<Icon icon={trash2Fill} />}
                      onClick={() => {
                        setOpenDeleteModal(() => true);
                      }}
                      sx={{ mr: 1 }}
                    >
                      Delete
                    </Button>
                    <Button
                      size="small"
                      startIcon={<Icon icon={editFill} />}
                      onClick={() => {
                        setIsNewAccount(() => false);
                        setModalInfo(() => account);
                        setOpenModal(() => true);
                      }}
                    >
                      Edit
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                size="small"
                startIcon={<Icon icon={plusFill} />}
                onClick={() => {
                  setIsNewAccount(() => true);
                  setModalInfo(() => ({}));
                  setOpenModal(() => true);
                }}
              >
                Añadir cuenta
              </Button>
            </Grid>
            <Modal
              open={openModal}
              onClose={() => {
                setOpenModal(() => false);
              }}
            >
              <>
                <AccountBillingForm
                  accountInfo={modalInfo}
                  banks={banks}
                  accountTypes={ACCOUNT_TYPE}
                  isNew={isNewAccount}
                  onClose={() => {
                    setOpenModal(() => false);
                  }}
                />
              </>
            </Modal>
            <Modal
              open={openDeleteModal}
              onClose={() => {
                setOpenDeleteModal(() => false);
              }}
            >
              <Box sx={modalStyle}>
                <Card sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <ErrorOutlineIcon color="error" sx={{ fontSize: 100, mb: 2 }} />
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                      ¿Seguro que quieres eliminar esta cuenta?
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      Esta acción no se puede deshacer.
                    </Typography>
                    <Box>
                      <Button
                        color="secondary"
                        variant="outlined"
                        sx={{ mr: 1 }}
                        onClick={() => {
                          setOpenDeleteModal(() => false);
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button color="error" variant="contained">
                        Sí, elimínalo
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Modal>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}
