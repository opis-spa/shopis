import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import contentDeliveryNetwork from '@iconify/icons-carbon/content-delivery-network';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import whatsappOutline from '@iconify/icons-ant-design/whats-app-outlined';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
// material
import { Stack, Card, TextField, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// redux
import { useSelector } from '../../redux/store';

// ----------------------------------------------------------------------

const SOCIAL_LINKS_OPTIONS = [
  {
    value: 'whatsappLink',
    icon: <Icon icon={whatsappOutline} height={24} />
  },
  {
    value: 'facebookLink',
    icon: <Icon icon={facebookFill} height={24} />
  },
  {
    value: 'instagramLink',
    icon: <Icon icon={instagramFilled} height={24} />
  },
  {
    value: 'webpageLink',
    icon: <Icon icon={contentDeliveryNetwork} height={24} />
  }
];

// ----------------------------------------------------------------------

export default function AccountSocialLinks() {
  const { enqueueSnackbar } = useSnackbar();
  const { data: client } = useSelector((state) => state.store);

  const parseDataProfile = () => {
    const { socialNetwork } = client;
    const profile = {
      facebook: '',
      instagram: '',
      linkedin: '',
      twitter: '',
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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      facebookLink: profile.facebook,
      instagramLink: profile.instagram,
      linkedinLink: profile.linkedin,
      twitterLink: profile.twitter,
      whatsappLink: profile.whatsapp
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
      enqueueSnackbar('Save success', { variant: 'success' });
    }
  });

  const { handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            {SOCIAL_LINKS_OPTIONS.map((link) => (
              <TextField
                key={link.value}
                fullWidth
                {...getFieldProps(link.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">{link.icon}</InputAdornment>
                }}
              />
            ))}

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Save Changes
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
