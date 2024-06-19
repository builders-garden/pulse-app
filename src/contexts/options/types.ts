import {Channel} from '../../api/channel/types';
import {Profile} from '../../api/profile/types';

export interface OptionsContextModel {
  state: OptionsState;
  show: (data: ShowActionPayload) => void;
  hide: () => void;
}

export interface OptionsState {
  hash: string;
  analytics?: {
    author: Profile;
    channel?: Channel;
    upvotes: number;
    recasts: number;
    replies: number;
  };
}

export interface ShowAction {
  type: 'SHOW';
  payload: ShowActionPayload;
}
export interface HideAction {
  type: 'HIDE';
}
export type ShowActionPayload = OptionsState;

export type OptionsAction = ShowAction | HideAction;
