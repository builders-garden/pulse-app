import React, {PropsWithChildren, useMemo, useReducer} from 'react';
import {AuthContext} from './Auth.context';
import {
  AuthAction,
  SignInApiResponse,
  SignUpApiResponse,
  User,
  UserStatus,
} from './types';

function authReducer(state: User, action: AuthAction): User {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        status: UserStatus.LOGGED,
        token: action.payload,
      };
    case 'SIGN_IN':
      return {
        ...state,
        status: UserStatus.LOGGED,
        token: action.payload,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        status: UserStatus.NOT_LOGGED,
        token: undefined,
      };
  }
}

function AuthProvider({children}: PropsWithChildren) {
  // const isDarkMode = useColorScheme() === 'dark';

  const [authState, dispatch] = useReducer(authReducer, {
    status: UserStatus.NOT_LOGGED,
  });

  const authContext = useMemo(
    () => ({
      state: authState,
      signIn: async (data: SignInApiResponse) => {
        console.log(data);
        dispatch({type: 'SIGN_IN', payload: 'example'});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async (data: SignUpApiResponse) => {
        console.log(data);
        dispatch({type: 'SIGN_IN', payload: 'example'});
      },
    }),
    [authState],
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
