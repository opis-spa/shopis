import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// iconify
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import documentIcon from '@iconify/icons-jam/document';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// routes
import { PATH_APP } from '../../../routes/paths';

// ----------------------------------------------------------------------

OrderMoreMenu.propTypes = {
  onDelete: PropTypes.func,
  id: PropTypes.string
};

export default function OrderMoreMenu({ onDelete, id }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

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
        <MenuItem component={RouterLink} to={`${PATH_APP.business.orders}/${id}`} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={documentIcon} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Detalle" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem onClick={onDelete} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Eliminar" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
