import React, {PropsWithChildren, useMemo, useReducer} from 'react';
import ImageView from 'react-native-image-viewing';
import {LightboxContext} from './Lightbox.context';
import {LightboxAction, LightboxState, ShowActionPayload} from './types';

function lightboxReducer(
  state: LightboxState,
  action: LightboxAction,
): LightboxState {
  switch (action.type) {
    case 'SHOW':
      return {
        visible: true,
        urls: action.payload.urls,
        imageIndex: action.payload.imageIndex || 0,
      };
    case 'HIDE':
      return {
        visible: false,
        urls: [],
        imageIndex: 0,
      };
  }
}

function LightboxProvider({children}: PropsWithChildren) {
  // const isDarkMode = useColorScheme() === 'dark';

  const [lightboxState, dispatch] = useReducer(lightboxReducer, {
    visible: false,
    urls: [],
    imageIndex: 0,
  });

  const lightboxContext = useMemo(
    () => ({
      state: lightboxState,
      show: (data: ShowActionPayload) => {
        dispatch({
          type: 'SHOW',
          payload: {urls: data.urls, imageIndex: data.imageIndex},
        });
      },
      hide: () => dispatch({type: 'HIDE'}),
    }),
    [lightboxState],
  );

  const urlsFormatted = lightboxContext.state.urls.map(url => ({uri: url}));

  return (
    <LightboxContext.Provider value={lightboxContext}>
      {children}
      <ImageView
        images={urlsFormatted}
        imageIndex={lightboxContext.state.imageIndex}
        visible={lightboxContext.state.visible}
        onRequestClose={() => lightboxContext.hide()}
      />
    </LightboxContext.Provider>
  );
}

export default LightboxProvider;
