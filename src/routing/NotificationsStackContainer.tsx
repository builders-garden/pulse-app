/* eslint-disable react/no-unstable-nested-components */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BellImg from '../assets/images/icons/bell.svg';
import MyHeaderLeft from '../components/header/MyHeaderLeft';
import ChannelScreen from '../screens/channel/ChannelScreen';
import ChannelDetailScreen from '../screens/channelDetail/ChannelDetailScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ThreadDetailScreen from '../screens/threadDetail/ThreadDetailScreen';
import {MyTheme} from '../theme';
import {NotificationsStackParamList} from './types';

const Stack = createNativeStackNavigator<NotificationsStackParamList>();

function NotificationsStackContainer() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: MyTheme.white,
        },
        headerTintColor: MyTheme.black,
        headerShadowVisible: false,
      }}
      initialRouteName="Notifications">
      <Stack.Screen
        name="Notifications"
        options={{
          title: '',
          headerLeft: () => (
            <MyHeaderLeft
              title="Notifications"
              icon={<BellImg color={MyTheme.primaryColor} />}
            />
          ),
          headerShadowVisible: false,
        }}
        component={NotificationsScreen}
      />
      <Stack.Screen
        name="ThreadDetail"
        options={{
          title: '',
        }}
        component={ThreadDetailScreen}
      />
      <Stack.Screen
        name="Channel"
        component={ChannelScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="ChannelDetail" component={ChannelDetailScreen} />
      <Stack.Screen
        name="Profile"
        options={{
          title: '',
        }}
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
}

export default NotificationsStackContainer;
