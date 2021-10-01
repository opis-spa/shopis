import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  sales: [],
  sale: null
};

const slice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getSalesSuccess(state, action) {
      state.isLoading = false;
      state.sales = action.payload;
    },

    // GET PRODUCTS
    getSale(state, action) {
      state.isLoading = false;
      state.sale = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
// export const { } = slice.actions;

// ----------------------------------------------------------------------

export const getSales = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axios.get(`/api/v1/sales/partnership`);
    dispatch(slice.actions.getStoreSuccess(response.data.sales));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const getSale = (orderId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axios.get(`/api/v1/sales/order/${orderId}`);
    dispatch(slice.actions.getStoreSuccess(response.data.order));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

// -----------------------------------------------------------------------

export const createOrder = (partnershipID, paymentMethod, address, products, coupon) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  let payload = {};
  if (coupon) {
    payload = {
      products,
      partnershipID,
      paymentMethod,
      address,
      coupon
    };
  } else {
    payload = {
      products,
      partnershipID,
      paymentMethod,
      address
    };
  }
  try {
    const response = await axios.post('/api/v1/sales/order', { ...payload });
    const { success, message, order } = response;
    if (success === true) {
      return order;
    }
    if (
      message === 'Monto total de la compra es superior a tu saldo' ||
      message === 'Insufficient balance' ||
      message === 'Error: not enough found' ||
      message === 'you dont have wallet whit this currency'
    ) {
      const error = new Error(message);
      error.code = 'order/insufficient_funds';
      throw error;
    }
    if (message === 'Insufficient Stock') {
      const error = new Error(message);
      error.code = 'order/insufficient_stock';
      throw error;
    }
    const error = new Error(message);
    error.code = 'order/error';
    throw error;
  } catch (error) {
    return error;
  }
};
