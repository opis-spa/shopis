import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  balance: 0,
  balances: []
};

const slice = createSlice({
  name: 'wallet',
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

    // GET POSTS
    getBalanceSuccess(state, action) {
      state.isLoading = false;
      state.balance = action.payload;
    },

    // GET POST INFINITE
    getBalanceInitial(state, action) {
      state.isLoading = false;
      state.balance = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getBalance() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/user/wallet/balance');
      const { result } = response.data;
      dispatch(slice.actions.getBalanceSuccess(result.balance));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
