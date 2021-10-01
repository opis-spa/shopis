import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  data: []
};

const slice = createSlice({
  name: 'payment',
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

    // GET Payments
    getPaymentsSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getPayments() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/payment-method`);
      dispatch(slice.actions.getCategoriesSuccess(response.data.paymentMethods));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
