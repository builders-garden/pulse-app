import {createContext} from 'react';
import {OptionsContextModel} from './types';

export const OptionsContext = createContext<OptionsContextModel>({
  state: {
    hash: '',
    analytics: undefined,
  },
  show: () => {},
  hide: () => {},
});
