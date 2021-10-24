import React, { createContext, useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
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
  user: null
};

const reducer = (state, action) => {
  if (action.type === 'INITIALISE') {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
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

  useEffect(
    () =>
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const response = await axios.get('/api/v1/user/profile');
            const { success, user: userData } = response.data;
            if (success) {
              setProfile(userData);

              console.log('init');
              console.log({ payload: { isAuthenticated: true, user: userData } });
              dispatch({
                type: 'INITIALISE',
                payload: { isAuthenticated: true, user: userData }
              });

              return true;
            }
          } catch (error) {
            console.log(' error auth ');
            signOut(auth);
          }
        }
        console.log(' por aquí no ');
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

    console.log(' == aqui == ');
    console.log(user);

    const { role } = user.user;
    if (!role) {
      try {
        await register();
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
    return user;
  };

  const loginWithFaceBook = async (signIn = true) => {
    const provider = new FacebookAuthProvider();
    const user = await signInWithPopup(auth, provider);
    const { role } = user;
    if (!role) {
      try {
        await register();
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
    return user;
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
      console.log(' aqui ');
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
    await sendPasswordResetEmail(auth, email);
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
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
