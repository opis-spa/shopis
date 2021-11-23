import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { paramCase } from 'change-case';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { useSnackbar } from 'notistack';
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Card,
  Box,
  Typography,
  Button
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_APP } from '../../../routes/paths';

// ----------------------------------------------------------------------

ProductMoreMenu.propTypes = {
  onDelete: PropTypes.func,
  productID: PropTypes.string
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  maxWidth: 'calc(100vw - 40px)'
};

export default function ProductMoreMenu({ onDelete, productID }) {
  const ref = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(() => true);
      await onDelete();
      setIsLoading(() => false);
      setOpenModal(() => false);
      enqueueSnackbar('Producto eliminado satisfactoriamente', { variant: 'success' });
    } catch (error) {
      console.log(error);
      setIsLoading(() => false);
      setOpenModal(() => false);
      enqueueSnackbar('Error al eliminar producto', { variant: 'error' });
    }
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem component={RouterLink} to={`${PATH_APP.root}/product/${productID}`} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Editar" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          onClick={() => {
            setOpenModal(() => true);
          }}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Eliminar" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <Modal
          open={openModal}
          onClose={() => {
            setOpenModal(() => false);
          }}
        >
          <Box sx={modalStyle}>
            <Card sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <ErrorOutlineIcon color="error" sx={{ fontSize: 100, mb: 2 }} />
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  ¿Seguro que quieres eliminar este producto?
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
                      setOpenModal(() => false);
                    }}
                  >
                    Cancelar
                  </Button>
                  <LoadingButton loading={isLoading} color="error" variant="contained" onClick={handleDelete}>
                    Sí, elimínalo
                  </LoadingButton>
                </Box>
              </Box>
            </Card>
          </Box>
        </Modal>
      </Menu>
    </>
  );
}
