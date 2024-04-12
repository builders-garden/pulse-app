/* eslint-disable react/no-unstable-nested-components */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import MyIconButton from '../components/MyIconButton';
import {AuthContext} from '../contexts/auth/Auth.context';
import {UserStatus} from '../contexts/auth/types';
import SignInScreen from '../screens/auth/signIn/SignInScreen';
import CreateThreadScreen from '../screens/createThread/CreateThreadScreen';
import ThreadDetailScreen from '../screens/threadDetail/ThreadDetailScreen';
import TabsContainer from './TabsContainer';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function StackContainer() {
  const authContext = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {authContext.state.status === UserStatus.LOGGED ? (
        <>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Home"
            component={TabsContainer}
          />
          <Stack.Screen
            options={{
              headerStyle: {backgroundColor: 'white'},
              headerTintColor: 'black',
              headerShadowVisible: false,
            }}
            name="ThreadDetail"
            component={ThreadDetailScreen}
          />
          <Stack.Screen
            options={{
              headerStyle: {backgroundColor: 'white'},
              headerTintColor: 'black',
              headerShadowVisible: false,
              headerBackImageSource: require('../assets/images/icons/close.png'),
              headerBackTitleVisible: false,
              headerTitle: '',
              headerRight: () => (
                <MyIconButton
                  icon={require('../assets/images/icons/help.png')}
                  iconSize={25}
                  onPress={() => {}}
                />
              ),
            }}
            name="CreateThread"
            component={CreateThreadScreen}
          />
        </>
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
