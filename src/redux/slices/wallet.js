import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  balance: 0,
  balances: [],
  quotation: null,
  tokenQuotation: null,
  expirateDate: null
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

    getBalancesSuccess(state, action) {
      state.isLoading = false;
      state.balances = action.payload;
    },

    getQuotationSuccess(state, action) {
      state.isLoading = false;
      state.quotation = action.payload.quotation;
      state.tokenQuotation = action.payload.token;
      state.expirateDate = action.payload.date;
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
      dispatch(slice.actions.getBalanceSuccess(result));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getBalances() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/user/wallet/balance/list');
      const { result } = response.data;
      dispatch(slice.actions.getBalancesSuccess(result));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

/*
 * Get quotation the two currencies
 *  @parms body {
      originCurrency string
      destinationCurrency string
      amount: [amount number, quoteCurrency string],
    }
  };
 */
export function getQuotation(body) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/v1/user/balance/exchange/calculate', body);
      const { result } = response.data;
      dispatch(slice.actions.getQuotationSuccess(result));
      return result;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return error;
    }
  };
}
