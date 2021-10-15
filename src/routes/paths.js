// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_APP = '/app';
const ROOT_SHOP = '/shop';
const ROOT_RIFOPIS = '/website';

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  notexists: '/not-exists',
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  page404: '/404',
  page500: '/500'
};

export const PATH_APP = {
  root: ROOTS_APP,
  business: {
    dashboard: path(ROOTS_APP, '/dashboard'),
    store: path(ROOTS_APP, '/store'),
    products: path(ROOTS_APP, '/products'),
    newProduct: path(ROOTS_APP, '/product/new'),
    editProduct: path(ROOTS_APP, '/product/edit'),
    orders: path(ROOTS_APP, '/orders'),
    coupons: path(ROOTS_APP, '/coupons')
  },
  user: {
    root: path(ROOTS_APP, '/user'),
    profile: path(ROOTS_APP, '/user/profile'),
    cards: path(ROOTS_APP, '/user/cards'),
    list: path(ROOTS_APP, '/user/list'),
    newUser: path(ROOTS_APP, '/user/new'),
    editById: path(ROOTS_APP, `/user/reece-chung/edit`),
    account: path(ROOTS_APP, '/user/account')
  }
};

export const PATH_SHOP = {
  root: ROOT_SHOP
};

export const PATH_RIFOPIS = {
  root: ROOT_RIFOPIS,
  cart: path(ROOT_RIFOPIS, '/cart'),
  checkout: path(ROOT_RIFOPIS, '/checkout'),
  product: path(ROOT_RIFOPIS, '/product'),
  payment: path(ROOT_RIFOPIS, '/payment')
};
