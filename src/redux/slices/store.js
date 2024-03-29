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

export const createStore =
  (body, photo = null) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      delete body.photo;
      const data = new FormData();
      Object.keys(body).forEach((item) => {
        if (typeof body[item] === 'object') {
          const file = body[item];
          data.append(item, file);
        } else {
          const value = body[item] || '';
          if (value) {
            data.append(item, value);
          }
        }
      });
      if (photo) {
        data.append('photo', photo);
      }

      const response = await axios({
        method: 'post',
        url: '/api/v1/partnerships/create',
        data,
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      dispatch(slice.actions.getStoreSuccess(response.data.partnership));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };

export const updateStore = (data) => async (dispatch, getState) => {
  const state = getState();
  const { _id: partnershipId } = state.store.data;
  dispatch(slice.actions.startLoading());
  try {
    const response = await axios.put(`/api/v1/partnerships/${partnershipId}`, data);
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
        uri: whatsappLink ? `https://wa.me/569${whatsappLink.replace(' ', '')}` : '',
        detail: whatsappLink?.replace(' ', '')
      }
    ];
    const response = await axios.post('/api/v1/partnerships/socialNetworks', {
      socialNetworks: data
    });
    dispatch(slice.actions.getStoreSuccess(response.data.partnership));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    throw error;
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
    throw error;
  }
};

export const setDeliveryMethods = (deliveryOptions) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const { deliveryMethods, deliveryCost, amountDeliveryFree } = deliveryOptions;
    const response = await axios.post('/api/v1/partnerships/deliveryMethod', {
      deliveryMethods,
      deliveryOptions: { deliveryCost, amountDeliveryFree }
    });
    dispatch(slice.actions.getStoreSuccess(response.data.partnership));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    throw error;
  }
};

export const setBankAccounts = (accounts) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axios.post('/api/v1/partnerships/bank', {
      banks: accounts
    });
    dispatch(slice.actions.getStoreSuccess(response.data.partnership));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    throw error;
  }
};

export const setNickname = (nickname) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axios.post('/api/v1/partnerships/nickname', { nickname });
    dispatch(slice.actions.getStoreSuccess(response.data.result));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};
