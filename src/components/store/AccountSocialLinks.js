import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import contentDeliveryNetwork from '@iconify/icons-carbon/content-delivery-network';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import whatsappOutline from '@iconify/icons-ant-design/whats-app-outlined';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
// Form
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
// material
import { Stack, Card, TextField, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/styles';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import { setSocialNetwork } from '../../redux/slices/store';
// utils
import { facebookRegex, instagramRegex, websiteRegex, isNumberRegex } from '../../utils/regexValidation';

// ----------------------------------------------------------------------

const SOCIAL_LINKS_OPTIONS = [
  {
    value: 'whatsappLink',
    icon: <Icon icon={whatsappOutline} height={24} />,
    placeholder: '6541 1245',
    label: 'Whatsapp'
  },
  {
    value: 'facebookLink',
    icon: <Icon icon={facebookFill} height={24} />,
    placeholder: 'https://www.facebook.com/mi-tienda',
    label: 'Facebook'
  },
  {
    value: 'instagramLink',
    icon: <Icon icon={instagramFilled} height={24} />,
    placeholder: 'https://www.instagram.com/mi-tienda',
    label: 'Instagram'
  },
  {
    value: 'webpageLink',
    icon: <Icon icon={contentDeliveryNetwork} height={24} />,
    placeholder: 'https://www.mi-tienda.cl',
    label: 'Página Web'
  }
];

// ----------------------------------------------------------------------

const LinkTextField = styled(TextField)(() => ({
  '& .MuiInputBase-input': {
    paddingLeft: 46.68
  },
  '& .MuiInputBase-root': {
    position: 'relative'
  },
  '& .MuiInputBase-root::before': {
    content: '"+56 9"',
    display: 'block',
    position: 'absolute',
    left: 46,
    top: 16.5
  }
}));

// -------------------------------------------------------------------------

export default function AccountSocialLinks() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { data: client } = useSelector((state) => state.store);

  const parseDataProfile = () => {
    const { socialNetwork } = client;
    const profile = {
      facebook: '',
      instagram: '',
      whatsapp: '',
      webpage: ''
    };
    if (socialNetwork && socialNetwork.length > 0) {
      socialNetwork.forEach((item) => {
        profile[item.name] = item.name === 'whatsapp' ? item.detail : item.uri;
      });
    }
    return profile;
  };
  const profile = parseDataProfile();

  const formatNumber = (text) => {
    const n = text[4] || '';
    const newValue = `${text.substr(0, 4)} ${n}${text.substr(5)}`;
    const limitedValue = newValue.substr(0, 9);
    return limitedValue;
  };

  const socialLinksSchema = Yup.object().shape({
    facebookLink: Yup.string()
      .matches(websiteRegex, '*URL inválida.')
      .matches(facebookRegex, '*La URL debe ser un perfil de Facebook.')
      .required('*Campo requerido.'),
    instagramLink: Yup.string()
      .matches(websiteRegex, '*URL inválida.')
      .matches(instagramRegex, '*La URL debe ser un perfil de Instagram.')
      .required('*Campo requerido.'),
    webpageLink: Yup.string().matches(websiteRegex, '*URL inválida.').required('*Campo requerido.'),
    whatsappLink: Yup.string()
      .matches(isNumberRegex, '*Número inválido.')
      .length(9, '*El número debe tener 8 dígitos.')
      .required('*Campo requerido.')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      facebookLink: profile.facebook,
      instagramLink: profile.instagram,
      webpageLink: profile.webpage,
      whatsappLink: formatNumber(profile.whatsapp?.replace(' ', ''))
    },
    validationSchema: socialLinksSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(setSocialNetwork(values));
        setSubmitting(false);
        enqueueSnackbar('Save success', { variant: 'success' });
      } catch (error) {
        console.log(error);
      }
    }
  });

  const { handleSubmit, isSubmitting, getFieldProps, errors, touched, setFieldValue } = formik;

  const handleChangeWhatsApp = (e) => {
    const { value } = e.target;
    const parseValue = value.replace(' ', '');
    if (value.length >= 5) {
      const newValue = formatNumber(parseValue);
      setFieldValue('whatsappLink', newValue);
    } else {
      setFieldValue('whatsappLink', parseValue);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            {SOCIAL_LINKS_OPTIONS.map((link) =>
              link.value !== 'whatsappLink' ? (
                <TextField
                  key={link.value}
                  placeholder={link.placeholder}
                  fullWidth
                  {...getFieldProps(link.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{link.icon}</InputAdornment>
                  }}
                  label={link.label}
                  error={Boolean(errors[link.value] && touched[link.value])}
                  helperText={touched[link.value] && errors[link.value]}
                  disabled={isSubmitting}
                />
              ) : (
                <LinkTextField
                  key={link.value}
                  placeholder={link.placeholder}
                  fullWidth
                  {...getFieldProps(link.value)}
                  onChange={handleChangeWhatsApp}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{link.icon}</InputAdornment>
                  }}
                  label={link.label}
                  error={Boolean(errors[link.value] && touched[link.value])}
                  helperText={touched[link.value] && errors[link.value]}
                  disabled={isSubmitting}
                />
              )
            )}
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Guardar
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
