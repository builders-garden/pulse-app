/* eslint-disable react/no-unstable-nested-components */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import DiagonalArrowImg from '../assets/images/icons/diagonal_arrow.svg';
import MyButtonNew from '../components/buttons/MyButtonNew';
import MyHeaderLeftSimple from '../components/header/MyHeaderLeftSimple';
import {AuthContext} from '../contexts/auth/Auth.context';
import {UserStatus} from '../contexts/auth/types';
import SignInScreen from '../screens/auth/signIn/SignInScreen';
import CreateCommentScreen from '../screens/createComment/CreateCommentScreen';
import CreateThreadScreen from '../screens/createThread/CreateThreadScreen';
import SearchScreen from '../screens/search/SearchScreen';
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
            options={({navigation}) => {
              return {
                headerStyle: {backgroundColor: 'white'},
                headerTintColor: 'black',
                headerShadowVisible: false,
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
                headerLeft: () => (
                  <MyHeaderLeftSimple
                    title="New thread"
                    useCloseIcon
                    onIconPress={() => {
                      navigation.goBack();
                    }}
                  />
                ),
              };
            }}
            name="CreateThread"
            component={CreateThreadScreen}
          />
          <Stack.Screen
            options={({navigation}) => {
              return {
                headerStyle: {backgroundColor: 'white'},
                headerTintColor: 'black',
                headerShadowVisible: false,
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
                headerLeft: () => (
                  <MyHeaderLeftSimple
                    title="Reply"
                    useCloseIcon
                    onIconPress={() => {
                      navigation.goBack();
                    }}
                  />
                ),
              };
            }}
            name="CreateComment"
            component={CreateCommentScreen}
          />
          <Stack.Screen
            options={{
              headerStyle: {backgroundColor: 'white'},
              headerTintColor: 'black',
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerTitle: '',
            }}
            name="Search"
            component={SearchScreen}
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
