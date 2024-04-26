export interface LightboxContextModel {
  state: LightboxState;
  show: (data: ShowActionPayload) => void;
  hide: () => void;
}

export interface LightboxState {
  visible: boolean;
  urls: string[];
}

export interface ShowAction {
  type: 'SHOW';
  payload: ShowActionPayload;
}
export interface HideAction {
  type: 'HIDE';
}
export interface ShowActionPayload {
  urls: string[];
}

export type LightboxAction = ShowAction | HideAction;
