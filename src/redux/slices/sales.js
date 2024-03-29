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
    getSaleSuccess(state, action) {
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
    dispatch(slice.actions.getSalesSuccess(response.data.sales));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const getSale = (orderId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axios.get(`/api/v1/sales/order/${orderId}`);
    dispatch(slice.actions.getSaleSuccess(response.data.order));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const getMySales = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axios.get(`/api/v1/sales/me`);
    dispatch(slice.actions.getSalesSuccess(response.data.orders));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

// -----------------------------------------------------------------------

export const setOrderAccept = (orderID) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axios.post('/api/v1/sales/accept', { orderID });
    console.log(response);
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    throw error;
  }
};

export const setOrderDelivery = (orderID) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axios.post('/api/v1/sales/distpached', { orderID });
    console.log(response);
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    throw error;
  }
};

export const setOrderReject = (orderID) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axios.post('/api/v1/sales/reject', { orderID });
    console.log(response);
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    throw error;
  }
};
