import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  analytics: {
    productSales: {
      amount: 0,
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    totalOrdes: {
      amount: 0,
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    totalSales: {
      amount: 0,
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    salesYear: []
  }
};

const slice = createSlice({
  name: 'dashboard',
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
      state.analytics = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { deleteProduct } = slice.actions;

// ----------------------------------------------------------------------

export function getAnaliticys() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/partnerships/analytics`);
      dispatch(slice.actions.getSalesSuccess(response.data.analytics));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getProduct(name) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/partnerships/product', {
        params: { name }
      });
      dispatch(slice.actions.getProductSuccess(response.data.product));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
