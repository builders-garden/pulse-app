import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import {View} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DevMarquee from './components/DevMarquee';
import {AuthContext} from './contexts/auth/Auth.context';
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
  const insets = useSafeAreaInsets();

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
  }, []);

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
