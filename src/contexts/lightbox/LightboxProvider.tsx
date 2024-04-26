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
      };
    case 'HIDE':
      return {
        visible: false,
        urls: [],
      };
  }
}

function LightboxProvider({children}: PropsWithChildren) {
  // const isDarkMode = useColorScheme() === 'dark';

  const [lightboxState, dispatch] = useReducer(lightboxReducer, {
    visible: false,
    urls: [],
  });

  const lightboxContext = useMemo(
    () => ({
      state: lightboxState,
      show: (data: ShowActionPayload) => {
        console.log(data);
        dispatch({type: 'SHOW', payload: {urls: data.urls}});
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
        imageIndex={0}
        visible={lightboxContext.state.visible}
        onRequestClose={() => lightboxContext.hide()}
      />
    </LightboxContext.Provider>
  );
}

export default LightboxProvider;
