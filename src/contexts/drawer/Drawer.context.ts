import {createContext} from 'react';
import {DrawerContextModel} from './types';

export const DrawerContext = createContext<DrawerContextModel>({
  state: {
    visible: false,
  },
  show: () => {},
  hide: () => {},
});
