import React, {PropsWithChildren, useMemo, useReducer} from 'react';
import MyDrawer from '../../components/drawer/MyDrawer';
import {DrawerContext} from './Drawer.context';
import {DrawerAction, DrawerState} from './types';

function drawerReducer(state: DrawerState, action: DrawerAction): DrawerState {
  switch (action.type) {
    case 'SHOW':
      return {
        visible: true,
      };
    case 'HIDE':
      return {
        visible: false,
      };
  }
}

function DrawerProvider({children}: PropsWithChildren) {
  // const isDarkMode = useColorScheme() === 'dark';
  const [drawerState, dispatch] = useReducer(drawerReducer, {
    visible: false,
  });

  const drawerContext = useMemo(
    () => ({
      state: drawerState,
      show: () => {
        dispatch({type: 'SHOW'});
      },
      hide: () => dispatch({type: 'HIDE'}),
    }),
    [drawerState],
  );

  return (
    <DrawerContext.Provider value={drawerContext}>
      <MyDrawer
        isOpen={drawerContext.state.visible}
        onClose={() => {
          if (drawerContext.state.visible) {
            drawerContext.hide();
          }
        }}
        onOpen={() => {
          if (!drawerContext.state.visible) {
            drawerContext.show();
          }
        }}
        onPressItem={() => {
          // console.log('press item');
          if (drawerContext.state.visible) {
            drawerContext.hide();
          }
        }}>
        {children}
      </MyDrawer>
    </DrawerContext.Provider>
  );
}

export default DrawerProvider;
