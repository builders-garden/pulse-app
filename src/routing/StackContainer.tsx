/* eslint-disable react/no-unstable-nested-components */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {AuthContext} from '../contexts/auth/Auth.context';
import {UserStatus} from '../contexts/auth/Auth.model';
import SignInScreen from '../screens/auth/signIn/SignInScreen';
import TabsContainer from './TabsContainer';

const Stack = createNativeStackNavigator();

function StackContainer() {
  const authContext = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {authContext.state.status === UserStatus.LOGGED ? (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={TabsContainer}
        />
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            options={{
              headerShown: false,
            }}
            component={SignInScreen}
          />
          <Stack.Screen name="SignUp" component={SignInScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default StackContainer;
