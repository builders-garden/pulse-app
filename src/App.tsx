import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React from 'react';
import TabsContainer from './routing/TabsContainer';

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
    <NavigationContainer theme={MyTheme}>
      <TabsContainer />
    </NavigationContainer>
  );
}

export default App;
