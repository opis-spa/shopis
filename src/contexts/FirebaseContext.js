import React, { createContext, useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  signInWithCustomToken
} from 'firebase/auth';
import axios from '../utils/axios';
import { auth } from '../utils/firebase';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  hasPartnership: false,
  user: null
};

const reducer = (state, action) => {
  if (action.type === 'INITIALISE') {
    const { isAuthenticated, user, hasPartnership } = action.payload;
    return {
      ...state,
      isAuthenticated,
      hasPartnership,
      isInitialized: true,
      user
    };
  }

  if (action.type === 'SET_PARTNERSHIP') {
    return {
      ...state,
      hasPartnership: action.payload
    };
  }

  return state;
};

const AuthContext = createContext({
  ...initialState,
  method: 'firebase',
  user: {},
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  newPassword: () => Promise.resolve(),
  signup: () => Promise.resolve(),
  loginWithGoogle: () => Promise.resolve(),
  loginWithFaceBook: () => Promise.resolve(),
  loginWithTwitter: () => Promise.resolve(),
  logout: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = async () => {
    try {
      const response = await axios.get('/api/v1/user/profile');
      const { success, user: userData } = response.data;

      let hasPartnership = false;
      const DOMAIN_HOST = window.location.host;
      const isRifopis = DOMAIN_HOST.indexOf('rifopis.cl') >= 0;
      if (!isRifopis) {
        try {
          const resPartnership = await axios.get('/api/v1/partnerships');
          console.log(' aqui ');
          console.log(resPartnership.data);
          const { partnership } = resPartnership.data;
          hasPartnership = Boolean(partnership?._id);
        } catch (error) {
          hasPartnership = false;
        }
      } else {
        hasPartnership = true;
      }

      if (success) {
        setProfile(userData);
        dispatch({
          type: 'INITIALISE',
          payload: { isAuthenticated: true, user: userData, hasPartnership }
        });

        return true;
      }
    } catch (error) {
      signOut(auth);
    }
    return false;
  };

  useEffect(
    () =>
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const { claims } = await user.getIdTokenResult();
          const { role } = claims;
          if (role) {
            return init();
          }
        }
        dispatch({
          type: 'INITIALISE',
          payload: { isAuthenticated: false, user: null }
        });
        return false;
      }),
    [dispatch]
  );

  const login = async (email, password) => {
    const response = await axios.post('/api/v1/auth/login', {
      username: email,
      password
    });

    const { success, token, message } = response.data;

    if (success === true) {
      const user = await signInWithCustomToken(auth, token);
      return user;
    }

    return new Error(message);
  };

  const loginWithGoogle = async (signIn = true) => {
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(auth, provider);

    const { role } = user.user;
    if (!role) {
      try {
        await register();
        await init();
      } catch (error) {
        const { message } = error;
        if (message === 'User register with other provider') {
          if (signIn) {
            throw new Error('Parece que te equivocaste en la opción de inicio de sesión');
          }
          throw new Error('El correo electrónico ya está registrado con otra opción de inicio de sesión');
        }
        throw new Error(message);
      }
    }
    return user.user;
  };

  const loginWithFaceBook = async (signIn = true) => {
    const provider = new FacebookAuthProvider();
    const user = await signInWithPopup(auth, provider);
    const { role } = user.user;
    if (!role) {
      try {
        await register();
        await init();
      } catch (error) {
        const { message } = error;
        if (message === 'User register with other provider') {
          if (signIn) {
            throw new Error('Parece que te equivocaste en la opción de inicio de sesión');
          }
          throw new Error('El correo electrónico ya está registrado con otra opción de inicio de sesión');
        }
        throw new Error(message);
      }
    }
    return user.user;
  };

  const register = async (name = '', lastName = '', role = 'business') => {
    const response = await axios.post('/api/v1/user/register', {
      name,
      lastName,
      role
    });
    return response.data;
  };

  const signup = async ({ email, password, name, lastName, phone, role = 'business' }) => {
    try {
      const response = await axios.post('/api/v1/user/create', {
        name,
        lastName,
        email,
        password,
        phone,
        role
      });
      const { success, token, message } = response.data;

      if (success) {
        const user = await signInWithCustomToken(auth, token);
        return user;
      }

      throw new Error(message);
    } catch (error) {
      const { message } = error;
      if (message === 'User already exist') {
        throw new Error('El correo electrónico ya se encuentra registrado');
      }
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email) => {
    try {
      const DOMAIN_HOST = window.location.host;
      const isRifopis = DOMAIN_HOST.indexOf('rifopis.cl') >= 0;
      const response = await axios.get(
        `/api/v1/auth/email/forgot-password/${email}/${isRifopis ? 'rifopis' : 'shopis'}`
      );
      const { success, result, message } = response.data;

      if (success) {
        return result;
      }

      throw new Error(message);
    } catch (error) {
      const { message } = error;
      if (message === 'User not found') {
        throw new Error('El correo electrónico no se encuentra registrado');
      }
      throw error;
    }
  };

  const newPassword = async (token, password, newPassword) => {
    try {
      const body = {
        newPassword: password,
        newPasswordConfirmation: newPassword,
        newPasswordToken: token
      };
      const response = await axios.post(`/api/v1/auth/email/reset-password`, body);
      const { success, result, message } = response.data;

      if (success) {
        return result;
      }

      throw new Error(message);
    } catch (error) {
      const { message } = error;
      if (message === 'User not found') {
        throw new Error('El correo electrónico no se encuentra registrado');
      }
      throw error;
    }
  };

  const setHasPartnership = (value) => {
    dispatch({
      type: 'SET_PARTNERSHIP',
      payload: value
    });
  };

  const user = { ...state.user };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'firebase',
        user: {
          id: user.uid,
          email: user.email,
          photoURL: user.photoURL || profile?.photoURL,
          displayName: user.displayName || profile?.displayName,
          role: user.role || profile?.role,
          phoneNumber: user.phoneNumber || profile?.phoneNumber || '',
          country: profile?.country || '',
          address: profile?.address || '',
          state: profile?.state || '',
          city: profile?.city || '',
          zipCode: profile?.zipCode || '',
          about: profile?.about || '',
          isPublic: profile?.isPublic || false
        },
        login,
        signup,
        register,
        loginWithGoogle,
        loginWithFaceBook,
        logout,
        resetPassword,
        newPassword,
        setHasPartnership
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
