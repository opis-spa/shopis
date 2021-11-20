import { sum, map, filter, uniqBy, reject } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { paramCase } from 'change-case';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  products: [],
  product: null,
  sortBy: null,
  filters: {
    gender: [],
    category: [],
    colors: [],
    priceRange: '',
    rating: ''
  },
  checkout: {
    isLoading: false,
    open: false,
    data: {},
    activeStep: 1,
    cart: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
    delivery: null,
    billing: null,
    isDelivery: false,
    error: false,
    payment: null
  },
  checkoutResult: {}
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    startLoadingCheckout(state) {
      state.checkout.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    hasErrorCheckout(state, action) {
      state.checkout.isLoading = false;
      state.checkout.error = action.payload;
    },

    addCart(state, action) {
      const product = action.payload;
      const isEmptyCart = state.checkout.cart.length === 0;

      const { quantity, promo, amount } = product;
      const isPromo = promo === '3x2';
      const discount = Math.trunc(quantity / 3);
      const quantityPromo = isPromo ? quantity - discount : quantity;

      if (isEmptyCart) {
        state.checkout.cart = [
          ...state.checkout.cart,
          {
            ...product,
            subtotal: quantityPromo * amount
          }
        ];
      } else {
        state.checkout.cart = map(state.checkout.cart, (_product) => {
          const isExisted = _product.id === product.id;
          if (isExisted) {
            return {
              ..._product,
              quantity: _product.quantity + 1,
              subtotal: _product.amount * quantityPromo
            };
          }
          return _product;
        });
      }
      state.checkout.cart = uniqBy([...state.checkout.cart, product], 'id');
    },

    setOpenCart(state, action) {
      state.checkout.open = action.payload;
    },

    setPayment(state, action) {
      state.checkout.payment = action.payload;
    },

    clearCart(state) {
      state.checkout = initialState.checkout;
    },

    getCart(state, action) {
      const cart = action.payload;

      const promoAdd = (quantity) => {
        const isPrimo = Math.trunc(quantity / 3);
        return quantity - isPrimo;
      };

      let isDelivery = false;

      const subtotal = sum(
        cart.map((product) => {
          isDelivery = isDelivery || product.delivery;
          return (
            (product.amount - product.discountPartnership) *
            (product.promo === '3x2' ? promoAdd(product.quantity) : product.quantity)
          );
        })
      );
      const discount = cart.length === 0 ? 0 : state.checkout.discount;
      const shipping = cart.length === 0 ? 0 : state.checkout.shipping;
      const billing = cart.length === 0 ? null : state.checkout.billing;

      state.checkout.cart = cart;
      state.checkout.isDelivery = isDelivery;
      state.checkout.discount = discount;
      state.checkout.shipping = shipping;
      state.checkout.billing = billing;
      state.checkout.subtotal = subtotal;
      state.checkout.total = subtotal - discount;
    },

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },

    getProduct(state, action) {
      const { name } = action.payload;
      state.product = state.products.find((product) => paramCase(product.name) === name);
    },

    clearFilterProducts(state) {
      state.filters = initialState.filters;
    },

    filterProducts(state, action) {
      state.filters.gender = action.payload.gender;
      state.filters.category = action.payload.category;
      state.filters.colors = action.payload.colors;
      state.filters.priceRange = action.payload.priceRange;
      state.filters.rating = action.payload.rating;
    },

    // Delete a product cart
    deleteCart(state, action) {
      const updateCart = filter(state.checkout.cart, (item) => item.id !== action.payload);

      state.checkout.cart = updateCart;
    },

    // DELETE PRODUCT
    deleteProduct(state, action) {
      state.products = reject(state.products, { id: action.payload });
    },

    //  SORT & FILTER PRODUCTS
    sortByProducts(state, action) {
      state.sortBy = action.payload;
    },

    onGotoStep(state, action) {
      const goToStep = action.payload;
      state.checkout.activeStep = goToStep;
    },
    onBackStep(state) {
      state.checkout.activeStep -= 1;
    },
    onNextStep(state) {
      state.checkout.activeStep += 1;
    },
    createBilling(state, action) {
      state.checkout.billing = action.payload;
    },
    createDelivery(state, action) {
      state.checkout.delivery = action.payload;
    },
    createInformation(state, action) {
      state.checkout.data = action.payload;
    },
    increaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = map(state.checkout.cart, (product) => {
        if (product.id === productId) {
          const { quantity, promo, amount } = product;
          const newQuantity = quantity + 1;
          const isPromo = promo === '3x2';
          const discount = Math.trunc(newQuantity / 3);
          const quantityPromo = isPromo ? newQuantity - discount : newQuantity;
          return {
            ...product,
            quantity: newQuantity,
            subtotal: amount * quantityPromo
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    decreaseQuantity(state, action) {
      const productId = action.payload;
      let isDelete = false;
      let updateCart = map(state.checkout.cart, (product) => {
        if (product.id === productId) {
          isDelete = product.quantity - 1 === 0;
          const { quantity, promo, amount } = product;
          const newQuantity = quantity - 1;
          const isPromo = promo === '3x2';
          const discount = Math.trunc(newQuantity / 3);
          const quantityPromo = isPromo ? newQuantity - discount : newQuantity;
          return {
            ...product,
            quantity: newQuantity,
            subtotal: amount * quantityPromo
          };
        }
        return product;
      });

      if (isDelete) {
        updateCart = filter(state.checkout.cart, (item) => item.id !== productId);
      }

      state.checkout.cart = updateCart;
    },
    applyDiscount(state, action) {
      const discount = action.payload;
      state.checkout.discount = discount;
      state.checkout.total = state.checkout.subtotal - discount;
    },
    clearCouponAction(state) {
      state.checkout.discount = 0;
      state.checkout.total = state.checkout.subtotal;
    },
    applyShipping(state, action) {
      const shipping = action.payload;
      state.checkout.shipping = shipping;
      state.checkout.total = state.checkout.subtotal - state.checkout.discount + shipping;
    },
    addProduct(state, action) {
      const shipping = action.payload;
      state.checkout.shipping = shipping;
      state.checkout.total = state.checkout.subtotal - state.checkout.discount + shipping;
    },
    addStoreProduct(state, action) {
      state.products = [...state.products, action.payload];
    },
    editStoreProduct(state, action) {
      state.products = state.products.map((prod) => (prod.id === action.payload.id ? action.payload : prod));
    },
    getCheckoutSuccess(state, action) {
      // state.checkout = initialState.checkout; // this is commment for not cart reload
      state.checkoutResult = {
        success: true,
        ...action.payload
      };
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {
  setOpenCart,
  clearCart,
  getCart,
  addCart,
  setPayment,
  getProduct,
  filterProducts,
  clearFilterProducts,
  increaseQuantity,
  decreaseQuantity,
  sortByProducts,
  applyDiscount,
  deleteProduct,
  deleteCart,
  onGotoStep,
  onNextStep,
  onBackStep,
  createBilling,
  createDelivery,
  createInformation,
  applyShipping
} = slice.actions;

// ----------------------------------------------------------------------

export function getProducts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/partnerships/products`);
      dispatch(slice.actions.getProductsSuccess(response.data.products));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getProductStore(nickname) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/partnerships/${nickname}/product`);
      dispatch(slice.actions.getProductsSuccess(response.data.products));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export const aplicateCoupon = (body) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axios.post('/api/v1/coupons/validate', body);
    dispatch(slice.actions.applyDiscount(response.data.coupons));
  } catch (error) {
    console.error(error);
    dispatch(slice.actions.hasError(error));
  }
};

// ----------------------------------------------------------------------

export const createProduct = (body, photos) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    delete body.photos;
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
    if (photos) {
      photos.forEach((image) => {
        data.append('photos[]', image);
      });
    }

    const response = await axios({
      method: 'post',
      url: '/api/v1/products/create',
      data,
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    dispatch(slice.actions.addStoreProduct(response.data.product));
  } catch (error) {
    console.error(error);
    dispatch(slice.actions.hasError(error));
    throw error;
  }
};

export const editProduct = (body, photos, id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    delete body.photos;
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
    if (photos) {
      photos.forEach((image) => {
        data.append('photos[]', image);
      });
    }

    const response = await axios({
      method: 'put',
      url: `/api/v1/products/${id}`,
      data,
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    dispatch(slice.actions.editStoreProduct(response.data.product));
  } catch (error) {
    console.error(error);
    dispatch(slice.actions.hasError(error));
    throw error;
  }
};

export const deleteStoreProduct = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axios.delete(`/api/v1/products/${id}`);
    console.log(response);
  } catch (error) {
    console.error(error);
    dispatch(slice.actions.hasError(error));
    throw error;
  }
};

// ----------------------------------------------------------------------

export const proccessCheckout = (payload) => async (dispatch) => {
  dispatch(slice.actions.startLoadingCheckout());
  try {
    const response = await axios.post('/api/v1/sales/order', payload);
    const { success, message, order } = response.data;
    if (success === true) {
      dispatch(slice.actions.getCheckoutSuccess(order));
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
    dispatch(slice.actions.hasError(error));
    throw error;
  }
};
