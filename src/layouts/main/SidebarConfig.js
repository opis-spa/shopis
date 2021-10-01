import React from 'react';
// routes
import { PATH_APP } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Tienda',
    roles: ['business'],
    items: [
      {
        title: 'panel',
        path: PATH_APP.business.dashboard,
        icon: ICONS.dashboard,
        roles: ['business']
      },
      { title: 'tienda', roles: ['business'], path: PATH_APP.business.store, icon: ICONS.ecommerce },
      { title: 'productos', roles: ['business'], path: PATH_APP.business.products, icon: ICONS.banking },
      { title: 'ordenes', roles: ['business'], path: PATH_APP.business.orders, icon: ICONS.booking }
    ]
  }
];

export default sidebarConfig;
