import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Toast from 'react-native-toast-message';
import MyInfoToast from './components/toasts/MyInfoToast';
import AuthProvider from './contexts/auth/AuthProvider';
import LightboxProvider from './contexts/lightbox/LightboxProvider';
import StackContainer from './routing/StackContainer';
function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      primary: 'white',
      background: 'white',
      card: 'black',
      text: 'white',
      border: 'white',
      notification: 'red',
    },
  };

  const toastConfig = {
    info: (props: any) => <MyInfoToast {...props} />,
  };

  return (
    <AuthProvider>
      <LightboxProvider>
        <NavigationContainer theme={MyTheme}>
          <StackContainer />
        </NavigationContainer>
      </LightboxProvider>
      <Toast config={toastConfig} />
    </AuthProvider>
  );
}

export default App;
