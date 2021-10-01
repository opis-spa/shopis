import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import shopisReducer from './slices/shopis';
import dashboardReducer from './slices/dashboard';
import categoryReducer from './slices/category';
import paymentReducer from './slices/payment';
import deliveryReducer from './slices/delivery';
import bankReducer from './slices/bank';
import walletReducer from './slices/wallet';
import userReducer from './slices/user';
import notificationReducer from './slices/notification';
import productReducer from './slices/product';
import storeReducer from './slices/store';
import salesReducer from './slices/sales';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout']
};

const rootReducer = combineReducers({
  shopis: shopisReducer,
  dashboard: dashboardReducer,
  wallet: walletReducer,
  user: userReducer,
  notification: notificationReducer,
  store: storeReducer,
  sale: salesReducer,
  bank: bankReducer,
  product: persistReducer(productPersistConfig, productReducer),
  category: categoryReducer,
  payment: paymentReducer,
  delivery: deliveryReducer
});

export { rootPersistConfig, rootReducer };
