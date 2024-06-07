import axios from 'axios';
import React, {PropsWithChildren, useMemo, useReducer} from 'react';
import {Profile, ProfileResponse} from '../../api/profile/types';
import {ENDPOINT_PROFILE} from '../../variables';
import {AuthContext} from './Auth.context';
import {
  AuthAction,
  SignInPayload,
  SignUpPayload,
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
        token: action.payload.token,
        fid: action.payload.fid,
        profile: action.payload.profile,
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
      signIn: async (data: SignInPayload) => {
        let profile: Profile | undefined;
        try {
          profile = await fetchProfile(data.token, data.fid);
        } catch (err) {
          console.error(err);
        }

        dispatch({
          type: 'SIGN_IN',
          payload: {
            token: data.token,
            fid: data.fid.toString(),
            profile,
          },
        });
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async (_data: SignUpPayload) => {
        // dispatch({type: 'SIGN_IN', payload: data.token});
      },
    }),
    [authState],
  );

  async function fetchProfile(token: string, fid: string) {
    try {
      const finalUrl = ENDPOINT_PROFILE + '/' + fid;
      const res = await axios.get<ProfileResponse>(finalUrl, {
        headers: {Authorization: `Bearer ${token}`},
      });
      return res.data.result;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
