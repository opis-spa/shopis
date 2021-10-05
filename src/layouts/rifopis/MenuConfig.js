import React from 'react';
import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-eva/home-fill';
import roundGrain from '@iconify/icons-ic/round-grain';
import bookOpenFill from '@iconify/icons-eva/book-open-fill';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22
};

const menuConfig = [
  {
    title: 'Sorteos',
    icon: <Icon icon={roundGrain} {...ICON_SIZE} />,
    path: '#sorteos'
  },
  {
    title: '¿Como funciona?',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
    path: '#como-funciona'
  },
  {
    title: 'Ganadores',
    icon: <Icon icon={bookOpenFill} {...ICON_SIZE} />,
    path: '#ganadores'
  }
];

export default menuConfig;
