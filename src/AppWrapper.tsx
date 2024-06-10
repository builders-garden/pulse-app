import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import BootSplash from 'react-native-bootsplash';
import EncryptedStorage from 'react-native-encrypted-storage';
import {AuthContext} from './contexts/auth/Auth.context';
function AppWrapper({children}: PropsWithChildren): React.JSX.Element {
  const authContext = useContext(AuthContext);

  const checkUserToken = useCallback(async () => {
    if (authContext) {
      console.log('AuthProvider useEffect', authContext);
      const storedToken = await retrieveUserToken();
      console.log('token', storedToken);

      if (storedToken !== null && storedToken !== undefined) {
        const parsed = JSON.parse(storedToken) as {token: string; fid: string};
        authContext.signIn({token: parsed.token, fid: parsed.fid});
      }
    }
  }, [authContext]);

  useEffect(() => {
    const init = async () => {
      await checkUserToken();
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

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

  return <>{children}</>;
}

export default AppWrapper;
