import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// material
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getProductByID } from '../../../../redux/slices/product';
// routes
import { PATH_APP } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import ProductNewForm from '../../../../components/store/ProductNewForm';

// ----------------------------------------------------------------------

export default function ProductCreate() {
  const [error, setError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product } = useSelector((state) => state.product);
  const isEdit = Boolean(id);
  const currentProduct = isEdit && product && !error ? product : null;

  const getProd = async () => {
    try {
      if (isEdit && id) {
        await dispatch(getProductByID(id));
      }
    } catch (error) {
      setError(true);
      enqueueSnackbar('Error al cargar producto', { variant: 'error' });
    }
  };

  useEffect(() => {
    getProd();
  }, [dispatch]);

  return (
    <Page title={!isEdit ? 'Nuevo producto | Shopis' : 'Editar producto | Shopis'}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Nuevo producto' : 'Editar producto'}
          links={[
            { name: 'Shopis', href: PATH_APP.root },
            {
              name: 'Productos',
              href: PATH_APP.business.products
            },
            { name: !isEdit ? 'Nuevo producto' : currentProduct?.name || '' }
          ]}
        />

        <ProductNewForm isEdit={isEdit} currentProduct={currentProduct} />
      </Container>
    </Page>
  );
}
