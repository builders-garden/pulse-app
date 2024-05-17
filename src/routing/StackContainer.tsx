/* eslint-disable react/no-unstable-nested-components */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import DiagonalArrowImg from '../assets/images/icons/diagonal_arrow.svg';
import MyButtonNew from '../components/MyButtonNew';
import {AuthContext} from '../contexts/auth/Auth.context';
import {UserStatus} from '../contexts/auth/types';
import SignInScreen from '../screens/auth/signIn/SignInScreen';
import CreateThreadScreen from '../screens/createThread/CreateThreadScreen';
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
              headerBackImageSource: require('../assets/images/icons/close.png'),
              headerBackTitleVisible: false,
              headerTitle: '',
              headerRight: () => (
                <MyButtonNew
                  style="primary"
                  iconRight={<DiagonalArrowImg style={{marginLeft: 3}} />}
                  onPress={() => {}}
                  title="Publish"
                  customStyle={{marginBottom: 10}}
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
