import {createContext} from 'react';
import {LightboxContextModel} from './types';

export const LightboxContext = createContext<LightboxContextModel>({
  state: {
    visible: false,
    urls: [],
  },
  show: () => {},
  hide: () => {},
});
