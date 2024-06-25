import React, {PropsWithChildren, useMemo, useReducer} from 'react';
import OptionsBottomSheet from '../../components/optionsBottomSheet/OptionsBottomSheet';
import {OptionsContext} from './Options.context';
import {OptionsAction, OptionsState, ShowActionPayload} from './types';

function optionsReducer(
  state: OptionsState,
  action: OptionsAction,
): OptionsState {
  switch (action.type) {
    case 'SHOW':
      return {
        hash: action.payload.hash,
        analytics: action.payload.analytics,
        showMint: action.payload.showMint,
      };
    case 'HIDE':
      return {
        hash: '',
        analytics: undefined,
        showMint: undefined,
      };
  }
}

function OptionsProvider({children}: PropsWithChildren) {
  const [optionsState, dispatch] = useReducer(optionsReducer, {
    hash: '',
    analytics: undefined,
    showMint: undefined,
  });

  const optionsContext = useMemo(
    () => ({
      state: optionsState,
      show: (data: ShowActionPayload) => {
        dispatch({
          type: 'SHOW',
          payload: {
            hash: data.hash,
            analytics: data.analytics,
            showMint: data.showMint,
          },
        });
      },
      hide: () => {
        dispatch({type: 'HIDE'});
      },
    }),
    [optionsState],
  );

  return (
    <OptionsContext.Provider value={optionsContext}>
      {children}
      <OptionsBottomSheet
        hash={optionsContext.state.hash}
        analytics={optionsContext.state.analytics}
        showMint={optionsContext.state.showMint}
        onInteract={() => {
          console.log('onInteract');
          optionsContext.hide();
        }}
      />
    </OptionsContext.Provider>
  );
}

export default OptionsProvider;
