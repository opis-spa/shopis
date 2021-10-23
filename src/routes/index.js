import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main'; // this layout to management panel
import LandingLayout from '../layouts/landing';
import ShopLayout from '../layouts/shop';
import RifopisLayout from '../layouts/rifopis';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import LogoOnlyLayoutRifopis from '../layouts/rifopis/LogoOnlyLayout';
// guards
import PartnershipGuard from '../guards/PartnershipGuard';
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from '../components/LoadingScreen';

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  const DOMAIN_HOST = window.location.host;

  const routes = [
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          )
        },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> }
      ]
    }
  ];

  if (DOMAIN_HOST.indexOf('rifopis.cl') >= 0) {
    routes.push(
      {
        path: '',
        element: (
          <PartnershipGuard init="rifopis">
            <LogoOnlyLayoutRifopis />
          </PartnershipGuard>
        ),
        children: [
          { path: '', element: <RifopisComingSoon /> },
          { path: 'payment/result', element: <RifopisPaymentResult /> }
        ]
      },
      {
        path: 'website',
        element: (
          <PartnershipGuard init="rifopis">
            <RifopisLayout />
          </PartnershipGuard>
        ),
        children: [
          { path: '', element: <RifopisHome /> },
          { path: 'cart', element: <RifopisCart /> },
          { path: 'store', element: <RifopisStore /> },
          { path: 'product/:name', element: <RifopisProduct /> }
        ]
      },
      {
        path: 'website',
        element: (
          <PartnershipGuard init="rifopis">
            <LogoOnlyLayoutRifopis />
          </PartnershipGuard>
        ),
        children: [
          { path: 'checkout', element: <RifopisCheckout /> },
          { path: 'payment', element: <Payment /> }
        ]
      },
      {
        path: 'app',
        element: (
          <PartnershipGuard init="rifopis">
            <AuthGuard>
              <RifopisLayout />
            </AuthGuard>
          </PartnershipGuard>
        ),
        children: [
          { path: '', element: <Navigate to="/app/user/profile" replace /> },
          { path: 'user/profile', element: <RifopisProfile /> }
        ]
      }
    );
  } else {
    routes.push(
      // Dashboard Routes
      {
        path: 'app',
        element: (
          <AuthGuard>
            <MainLayout />
          </AuthGuard>
        ),
        children: [
          { path: '', element: <Navigate to="/app/dashboard" replace /> },
          { path: 'dashboard', element: <DashboardBusiness /> },
          { path: 'store', element: <Store /> },
          { path: 'products', element: <Products /> },
          { path: 'product/new', element: <ProductCreate /> },
          { path: 'product/:name/edit', element: <ProductCreate /> },
          { path: 'products', element: <Products /> },
          { path: 'orders', element: <Orders /> },
          { path: 'order/:id', element: <Order /> },
          { path: 'coupons', element: <Coupons /> }
        ]
      },
      // Landing (comingSoon active)
      {
        path: '/',
        children: [
          {
            element: <LogoOnlyLayout />,
            children: [
              { path: '', element: <ComingSoon /> },
              { path: 'not-exists', element: <NotFound /> }
            ]
          },
          {
            path: 'website',
            element: <LandingLayout />,
            children: [{ path: '', element: <LandingPage /> }]
          }
        ]
      },
      // Shop
      {
        path: 'shop/:id',
        element: (
          <PartnershipGuard>
            <ShopLayout />
          </PartnershipGuard>
        ),
        children: [
          { path: '', element: <ShopHome /> },
          { path: 'cart', element: <ShopCart /> },
          { path: 'store', element: <ShopStore /> },
          { path: 'product/:name', element: <ShopProduct /> }
        ]
      },
      {
        path: 'shop',
        element: (
          <PartnershipGuard>
            <LogoOnlyLayout />
          </PartnershipGuard>
        ),
        children: [
          { path: ':id/checkout', element: <Checkout /> },
          { path: 'payment', element: <Payment /> },
          { path: 'payment/result', element: <PaymentResult /> }
        ]
      }
    );
  }

  routes.push(
    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    }
  );

  return useRoutes(routes);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/app/authentication/Login')));
const Register = Loadable(lazy(() => import('../pages/app/authentication/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/app/authentication/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/app/authentication/VerifyCode')));
// App
const DashboardBusiness = Loadable(lazy(() => import('../pages/app/dashboard/Business')));
const Store = Loadable(lazy(() => import('../pages/app/store/Store')));
const Products = Loadable(lazy(() => import('../pages/app/store/product/ProductList')));
const ProductCreate = Loadable(lazy(() => import('../pages/app/store/product/ProductCreate')));
const Orders = Loadable(lazy(() => import('../pages/app/store/Orders')));
const Order = Loadable(lazy(() => import('../pages/app/store/Order')));
const Coupons = Loadable(lazy(() => import('../pages/app/store/Coupons')));
// Shop
const ShopHome = Loadable(lazy(() => import('../pages/shop/Home')));
const ShopCart = Loadable(lazy(() => import('../pages/shop/Cart')));
const ShopProduct = Loadable(lazy(() => import('../pages/shop/Product')));
const ShopStore = Loadable(lazy(() => import('../pages/shop/Store')));
const Checkout = Loadable(lazy(() => import('../pages/shop/Checkout')));
const Payment = Loadable(lazy(() => import('../pages/shop/Payment')));
const PaymentResult = Loadable(lazy(() => import('../pages/shop/PaymentResult')));
// Rifopis
const RifopisHome = Loadable(lazy(() => import('../pages/rifopis/Home')));
const RifopisCart = Loadable(lazy(() => import('../pages/rifopis/Cart')));
const RifopisProduct = Loadable(lazy(() => import('../pages/rifopis/Product')));
const RifopisStore = Loadable(lazy(() => import('../pages/rifopis/Store')));
const RifopisCheckout = Loadable(lazy(() => import('../pages/rifopis/Checkout')));
const RifopisPaymentResult = Loadable(lazy(() => import('../pages/rifopis/PaymentResult')));
const RifopisProfile = Loadable(lazy(() => import('../pages/rifopis/Profile')));
// Main
const LandingPage = Loadable(lazy(() => import('../pages/landing/Home')));
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const RifopisComingSoon = Loadable(lazy(() => import('../pages/rifopis/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));
const NotFound = Loadable(lazy(() => import('../pages/shop/NotFound')));
