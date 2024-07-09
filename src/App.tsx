import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import {PostHogProvider} from 'posthog-react-native';
import React from 'react';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import AppWrapper from './AppWrapper';
import MyInfoToast from './components/toasts/MyInfoToast';
import AuthProvider from './contexts/auth/AuthProvider';
import DrawerProvider from './contexts/drawer/DrawerProvider';
import LightboxProvider from './contexts/lightbox/LightboxProvider';
import OptionsProvider from './contexts/options/OptionsProvider';
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

  const linking = {
    prefixes: ['stringz://'],
    config: {
      screens: {
        Home: {
          screens: {
            FeedRoot: {
              initialRouteName: 'Feed',
              screens: {
                Channel: {
                  path: 'channel/:channelId/:showDrawer',
                  parse: {
                    showDrawer: (showDrawer: string) => showDrawer === 'true',
                  },
                },
                ThreadDetail: {
                  path: 'thread-detail/:threadHash',
                },
                Profile: {
                  path: 'profile/:userFid',
                },
                Feed: 'feed/',
              },
            },
          },
        },
      },
    },
  };

  return (
    <AuthProvider>
      <LightboxProvider>
        <SafeAreaProvider>
          <NavigationContainer theme={NavigationTheme} linking={linking}>
            <PostHogProvider
              apiKey={process.env.POSTHOG_API_KEY}
              options={{
                host: process.env.POSTHOG_HOST,
              }}
              autocapture>
              <DrawerProvider>
                <OptionsProvider>
                  <KeyboardProvider>
                    <AppWrapper>
                      <StackContainer />
                    </AppWrapper>
                  </KeyboardProvider>
                </OptionsProvider>
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
