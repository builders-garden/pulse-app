import {Profile} from '../../api/profile/types';

export interface AuthContextModel {
  state: User;
  signIn: (data: SignInPayload) => Promise<void>;
  signOut: () => void;
  signUp: (data: SignUpPayload) => void;
}

export enum UserStatus {
  LOGGED = 'logged',
  NOT_LOGGED = 'not_logged',
  FETCHING = 'fetching',
}

export interface User {
  status: UserStatus;
  token?: string;
  fid?: string;
  profile?: Profile;
}

export interface SignInAction {
  type: 'SIGN_IN';
  payload: {
    token: string;
    fid: string;
    profile?: Profile;
  };
}
export interface SignOutAction {
  type: 'SIGN_OUT';
}
export interface RestoreTokenAction {
  type: 'RESTORE_TOKEN';
  payload: string;
}

export type AuthAction = SignInAction | SignOutAction | RestoreTokenAction;

export interface SignInPayload {
  token: string;
  fid: string;
}
export interface SignUpPayload {
  token: string;
}
