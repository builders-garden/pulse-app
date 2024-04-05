/* eslint-disable react/no-unstable-nested-components */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import LoginScreen from '../screens/auth/login/LoginScreen';
import TabsContainer from './TabsContainer';

const Stack = createNativeStackNavigator();

function AuthContainer() {
  const [isSignedIn] = useState(false);

  return (
    <Stack.Navigator initialRouteName="Login">
      {isSignedIn ? (
        <Stack.Screen name="Feed" component={TabsContainer} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default AuthContainer;
