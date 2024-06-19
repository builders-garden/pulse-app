import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {AppState, View} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DevMarquee from './components/DevMarquee';
import {AuthContext} from './contexts/auth/Auth.context';
import {OptionsContext} from './contexts/options/Options.context';
import {MyTheme} from './theme';

async function retrieveUserToken() {
  try {
    const token = await EncryptedStorage.getItem('user');

    if (token !== undefined) {
      return token;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

function AppWrapper({children}: PropsWithChildren): React.JSX.Element {
  const authContext = useContext(AuthContext);
  const optionsContext = useContext(OptionsContext);
  const insets = useSafeAreaInsets();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const checkUserToken = useCallback(async () => {
    if (authContext) {
      const storedToken = await retrieveUserToken();

      if (storedToken !== null && storedToken !== undefined) {
        const parsed = JSON.parse(storedToken) as {token: string; fid: string};
        await authContext.signIn({token: parsed.token, fid: parsed.fid});
      }
    }
  }, [authContext]);

  useEffect(() => {
    const init = async () => {
      await checkUserToken();
      await BootSplash.hide({fade: true});
    };
    init();

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      } else if (
        appState.current.match(/active/) &&
        nextAppState !== 'active'
      ) {
        optionsContext.hide();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    console.log('AppState from effect', appState.current);
    if (appStateVisible !== 'active' && optionsContext.state.hash !== '') {
      optionsContext.hide();
    }
  }, [appStateVisible]);

  return (
    <>
      <View style={{paddingTop: insets.top, backgroundColor: MyTheme.white}}>
        <DevMarquee />
      </View>
      {children}
    </>
  );
}

export default AppWrapper;
