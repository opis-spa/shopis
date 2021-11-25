import { useState } from 'react';
import { useSnackbar } from 'notistack';
// material
import { Box, Grid, Card, Button, Typography, Paper, Modal } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { LoadingButton } from '@mui/lab';
// iconify
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import { setBankAccounts } from '../../redux/slices/store';
// components
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

const ACCOUNT_TYPE = [
  { value: 'corriente', display: 'Cuenta corriente' },
  { value: 'ahorro', display: 'Cuenta de ahorro' },
  { value: 'vista', display: 'Cuenta vista' }
];

export default function AccountBilling() {
  const { data: banks } = useSelector((state) => state.bank);
  const { accounts: userAccounts } = useSelector((state) => state.store.data);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [isNewAccount, setIsNewAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getAccountTypeName = (accountTypeId) => {
    const accountTypeFilter = ACCOUNT_TYPE.filter((type) => type.value === accountTypeId);
    return accountTypeFilter.length > 0 ? accountTypeFilter[0].display : '';
  };

  const getBankName = (bankId) => {
    const bankFilter = banks.filter((bank) => bank._id === bankId);
    return bankFilter.length > 0 ? bankFilter[0].name : '';
  };

  const handleDeleteAccount = async () => {
    setIsLoading(() => true);
    try {
      const newAccounts = userAccounts.filter(
        (item) =>
          !(
            item.bankId === modalInfo.bankId &&
            item.accountType === modalInfo.accountType &&
            item.accountNumber === modalInfo.accountNumber
          )
      );
      await dispatch(setBankAccounts(newAccounts));
      setIsLoading(() => false);
      setOpenDeleteModal(() => false);
      enqueueSnackbar('Cuenta eliminada satisfactoriamente', { variant: 'success' });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setOpenDeleteModal(() => false);
      enqueueSnackbar('Error al eliminar cuenta', { variant: 'error' });
    }
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Card sx={{ p: 3 }}>
          <Grid container spacing={2}>
            {userAccounts.map((account, idx) => (
              <Grid item xs={12} md={6} key={idx}>
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
                        setModalInfo(() => account);
                        setOpenDeleteModal(() => true);
                      }}
                      sx={{ mr: 1 }}
                    >
                      Borrar
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
                      Editar
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
                  prevBanks={userAccounts}
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
                        disabled={isLoading}
                        sx={{ mr: 1 }}
                        onClick={() => {
                          setOpenDeleteModal(() => false);
                        }}
                      >
                        Cancelar
                      </Button>
                      <LoadingButton
                        loading={isLoading}
                        color="error"
                        variant="contained"
                        onClick={handleDeleteAccount}
                      >
                        Sí, elimínalo
                      </LoadingButton>
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
