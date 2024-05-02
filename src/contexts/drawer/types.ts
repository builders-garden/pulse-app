export interface DrawerContextModel {
  state: DrawerState;
  show: () => void;
  hide: () => void;
}

export interface DrawerState {
  visible: boolean;
}

export interface ShowAction {
  type: 'SHOW';
}
export interface HideAction {
  type: 'HIDE';
}

export type DrawerAction = ShowAction | HideAction;
