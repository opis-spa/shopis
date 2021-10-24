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
    error: false
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

      if (isEmptyCart) {
        state.checkout.cart = [...state.checkout.cart, product];
      } else {
        state.checkout.cart = map(state.checkout.cart, (_product) => {
          const isExisted = _product.id === product.id;
          if (isExisted) {
            return {
              ..._product,
              quantity: _product.quantity + 1
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

    clearCart(state) {
      state.checkout = initialState.checkout;
    },

    getCart(state, action) {
      const cart = action.payload;

      const promoAdd = (quantity) => {
        const isPrimo = quantity % 3 === 0 ? 1 : 0;
        console.log(' promo cal ');
        console.log(quantity - isPrimo);
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
    createInformation(state, action) {
      state.checkout.data = action.payload;
    },
    increaseQuantity(state, action) {
      const productId = action.payload;
      console.log('product actions payload');
      console.log(action.payload);
      const updateCart = map(state.checkout.cart, (product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1
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
          return {
            ...product,
            quantity: product.quantity - 1
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
      console.log('errror');
      console.log(error);
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

export const createProduct = (body) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axios.post('/api/v1/products/create', body);
    dispatch(slice.actions.addProduct(response.data.product));
  } catch (error) {
    console.error(error);
    dispatch(slice.actions.hasError(error));
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
    console.log('hola');
    throw error;
  } catch (error) {
    console.log(error);
    dispatch(slice.actions.hasError(error));
    throw error;
  }
};
