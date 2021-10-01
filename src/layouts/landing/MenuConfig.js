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
    title: '¿Qué te ofrecemos?',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
    path: '#que-ofrecemos'
  },
  {
    title: 'Precios',
    icon: <Icon icon={roundGrain} {...ICON_SIZE} />,
    path: '#precios'
  },
  {
    title: 'Preguntas Frecuentes',
    icon: <Icon icon={bookOpenFill} {...ICON_SIZE} />,
    path: '#faqs'
  },
  {
    title: 'Contacto',
    icon: <Icon icon={bookOpenFill} {...ICON_SIZE} />,
    path: '#contacto'
  }
];

export default menuConfig;
