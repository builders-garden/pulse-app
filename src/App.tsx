import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AuthProvider from './contexts/auth/AuthProvider';
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

  return (
    <AuthProvider>
      <NavigationContainer theme={MyTheme}>
        <StackContainer />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
