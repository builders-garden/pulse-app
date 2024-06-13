import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import {PostHogProvider} from 'posthog-react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import AppWrapper from './AppWrapper';
import MyInfoToast from './components/toasts/MyInfoToast';
import AuthProvider from './contexts/auth/AuthProvider';
import DrawerProvider from './contexts/drawer/DrawerProvider';
import LightboxProvider from './contexts/lightbox/LightboxProvider';
import StackContainer from './routing/StackContainer';
import {MyTheme} from './theme';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
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
        <SafeAreaProvider>
          <NavigationContainer theme={NavigationTheme}>
            <PostHogProvider apiKey={process.env.POSTHOG_API_KEY} autocapture>
              <DrawerProvider>
                <AppWrapper>
                  <StackContainer />
                </AppWrapper>
              </DrawerProvider>
            </PostHogProvider>
          </NavigationContainer>
        </SafeAreaProvider>
      </LightboxProvider>
      <Toast config={toastConfig} />
    </AuthProvider>
  );
}

export default App;
