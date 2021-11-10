import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import shareFill from '@iconify/icons-eva/share-fill';
import roundBanks from '@iconify/icons-ant-design/bank-outlined';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import deliveryParcel from '@iconify/icons-carbon/delivery-parcel';
import outlinePayment from '@iconify/icons-ic/outline-payment';
// material
import { Container, Tab, Box, Tabs, Stack } from '@mui/material';
// redux
import { useDispatch } from 'react-redux';
import { getStore } from '../../../redux/slices/store';
import { getBanks } from '../../../redux/slices/bank';
import { getDeliveries } from '../../../redux/slices/delivery';
import { getPayments } from '../../../redux/slices/payment';
// routes
import { PATH_APP } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {
  AccountGeneral,
  AccountBilling,
  AccountSocialLinks,
  AccountPaymentMethod,
  AccountDeliveryMethod
} from '../../../components/store';

// ----------------------------------------------------------------------

export default function Store() {
  const { themeStretch } = useSettings();
  const [currentTab, setCurrentTab] = useState('general');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStore());
    dispatch(getBanks());
    dispatch(getDeliveries());
    dispatch(getPayments());
  }, [dispatch]);

  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <AccountGeneral />
    },
    {
      value: 'cuenta_bancaria',
      icon: <Icon icon={roundBanks} width={20} height={20} />,
      component: <AccountBilling />
    },
    {
      value: 'formas_de_entrega',
      icon: <Icon icon={deliveryParcel} width={20} height={20} />,
      component: <AccountDeliveryMethod />
    },
    {
      value: 'metodos_de_pago',
      icon: <Icon icon={outlinePayment} width={20} height={20} />,
      component: <AccountPaymentMethod />
    },
    {
      value: 'redes_de_contacto',
      icon: <Icon icon={shareFill} width={20} height={20} />,
      component: <AccountSocialLinks />
    }
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Page title="Tienda | shopis">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="Tienda" links={[{ name: 'Shopis', href: PATH_APP.root }, { name: 'Tienda' }]} />

        <Stack spacing={5}>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={handleChangeTab}
          >
            {ACCOUNT_TABS.map((tab) => (
              <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value} />
            ))}
          </Tabs>

          {ACCOUNT_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Stack>
      </Container>
    </Page>
  );
}
