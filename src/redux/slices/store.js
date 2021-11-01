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

export const setSocialNetwork = (socialNetworks) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const { facebookLink, instagramLink, webpageLink, whatsappLink } = socialNetworks;
    const data = [
      { name: 'facebook', uri: facebookLink, detail: '' },
      { name: 'instagram', uri: instagramLink, detail: '' },
      { name: 'webpage', uri: webpageLink, detail: '' },
      {
        name: 'whatsapp',
        uri: whatsappLink ? `https://wa.me/${whatsappLink.replace('+', '')}` : '',
        detail: whatsappLink
      }
    ];
    const response = await axios.post('/api/v1/partnerships/socialNetworks', {
      socialNetworks: data
    });
    dispatch(slice.actions.getStoreSuccess(response.data.partnership));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const setPaymentMethods = (paymentMethods) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axios.post('/api/v1/partnerships/paymentMethod', {
      paymentMethods
    });
    dispatch(slice.actions.getStoreSuccess(response.data.partnership));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};
