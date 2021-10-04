import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false, // is initial
  isExists: false,
  isLoading: false,
  partnership: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isExists, partnership } = action.payload;
    return {
      ...state,
      isExists,
      isInitialized: true,
      isLoading: false,
      partnership
    };
  },
  INITIALIZENOTLOAD: (state) => ({
    ...state,
    isExists: false,
    isInitialized: true,
    isNotLoading: true,
    partnership: null
  }),
  LOADING: (state, action) => ({
    ...state,
    isLoading: action.value
  }),
  EXISTS: (state, action) => {
    const { partnership } = action.payload;

    return {
      ...state,
      isLoading: false,
      isExists: true,
      partnership
    };
  },
  NOTEXISTS: (state) => ({
    ...state,
    isLoading: false,
    isExists: false,
    partnership: null
  })
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const PartnershipContext = createContext({
  ...initialState,
  getPartnership: () => Promise.resolve(),
  initialize: () => Promise.resolve()
});

const propTypes = {
  children: PropTypes.node
};

function PartnershipProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = async (nickname) => {
    dispatch({
      type: 'LOADING',
      value: true
    });

    try {
      const response = await axios.get(`/api/v1/partnerships/nickname/${nickname}`);
      const { success, partnership } = response.data;

      if (success) {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isExists: true,
            partnership
          }
        });
        return true;
      }
    } catch (error) {
      dispatch({
        type: 'INITIALIZENOTLOAD'
      });
    }

    dispatch({
      type: 'INITIALIZE',
      payload: {
        isExists: false,
        partneship: null
      }
    });

    dispatch({
      type: 'LOADING',
      value: false
    });
    return false;
  };

  const getPartnership = async (uri) => {
    dispatch({
      type: 'LOADING',
      value: true
    });
    try {
      const response = await axios.get(`/api/v1/partnerships/nickname/${uri}`);
      const { partnership, success } = response.data;
      console.log('por aqui');
      if (success && partnership) {
        const { nickname } = partnership;
        window.localStorage.setItem('nickname', nickname);
        dispatch({
          type: 'EXISTS',
          payload: {
            isNotLoading: false,
            partnership
          }
        });
        return partnership;
      }
    } catch (error) {
      console.log(error);
    }
    dispatch({
      type: 'NOTEXISTS'
    });
    return true;
  };

  return (
    <PartnershipContext.Provider
      value={{
        ...state,
        initialize,
        getPartnership
      }}
    >
      {children}
    </PartnershipContext.Provider>
  );
}

PartnershipProvider.propTypes = propTypes;

export { PartnershipContext, PartnershipProvider };
