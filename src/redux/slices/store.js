import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  data: {
    identity: '',
    identityCode: '',
    name: '',
    legalName: '',
    image: '',
    web: '',
    user: '',
    socialNetwork: [],
    location: {},
    products: [],
    deliveryMethods: []
  }
};

const slice = createSlice({
  name: 'store',
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
    getStoreSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const getStore = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axios.get('/api/v1/partnerships');
    dispatch(slice.actions.getStoreSuccess(response.data.partnership));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};
