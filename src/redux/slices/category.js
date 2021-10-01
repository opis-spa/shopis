import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  data: [],
  product: null,
  sortBy: null
};

const slice = createSlice({
  name: 'category',
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

    // GET Categories
    getCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getCategories(nickname) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/partnerships/${nickname}/categories`);
      dispatch(slice.actions.getCategoriesSuccess(response.data.categories));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
