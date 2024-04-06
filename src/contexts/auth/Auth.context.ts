import {createContext} from 'react';
import {AuthContextModel, UserStatus} from './Auth.model';

export const AuthContext = createContext<AuthContextModel>({
  state: {
    status: UserStatus.NOT_LOGGED,
  },
  signIn: () => {},
  signOut: () => {},
  signUp: () => {},
});
