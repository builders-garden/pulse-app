export interface AuthContextModel {
  state: User;
  signIn: (data: SignInApiResponse) => void;
  signOut: () => void;
  signUp: (data: SignUpApiResponse) => void;
}

export enum UserStatus {
  LOGGED = 'logged',
  NOT_LOGGED = 'not_logged',
  FETCHING = 'fetching',
}

export interface User {
  status: UserStatus;
  id?: number;
  email?: string;
  token?: string;
}

export interface SignInAction {
  type: 'SIGN_IN';
  payload: string;
}
export interface SignOutAction {
  type: 'SIGN_OUT';
}
export interface RestoreTokenAction {
  type: 'RESTORE_TOKEN';
  payload: string;
}

export type AuthAction = SignInAction | SignOutAction | RestoreTokenAction;

export interface SignInApiResponse {
  token: string;
}
export interface SignUpApiResponse {
  token: string;
}
