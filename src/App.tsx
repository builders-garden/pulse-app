import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Toast from 'react-native-toast-message';
import MyInfoToast from './components/toasts/MyInfoToast';
import AuthProvider from './contexts/auth/AuthProvider';
import DrawerProvider from './contexts/drawer/DrawerProvider';
import LightboxProvider from './contexts/lightbox/LightboxProvider';
import StackContainer from './routing/StackContainer';
import {MyTheme} from './theme';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://7557a7f2a56ad29b7d17e918574585da@o4507152584933376.ingest.de.sentry.io/4507248348954704',
});
function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  const NavigationTheme = {
    ...DefaultTheme,
    colors: {
      primary: MyTheme.white,
      background: MyTheme.grey100,
      card: MyTheme.white,
      text: MyTheme.white,
      border: MyTheme.grey400,
      notification: MyTheme.primaryColor,
    },
  };

  const toastConfig = {
    info: (props: any) => <MyInfoToast {...props} />,
  };

  return (
    <AuthProvider>
      <LightboxProvider>
        <DrawerProvider>
          <NavigationContainer theme={NavigationTheme}>
            <StackContainer />
          </NavigationContainer>
        </DrawerProvider>
      </LightboxProvider>
      <Toast config={toastConfig} />
    </AuthProvider>
  );
}

export default App;
