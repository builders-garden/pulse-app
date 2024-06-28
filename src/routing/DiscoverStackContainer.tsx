/* eslint-disable react/no-unstable-nested-components */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import RadarImg from '../assets/images/icons/radar.svg';
import MyHeaderLeft from '../components/header/MyHeaderLeft';
import ChannelScreen from '../screens/channel/ChannelScreen';
import ChannelDetailScreen from '../screens/channelDetail/ChannelDetailScreen';
import DiscoverScreen from '../screens/discover/DiscoverScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ThreadDetailScreen from '../screens/threadDetail/ThreadDetailScreen';
import {MyTheme} from '../theme';
import {DiscoverStackParamList} from './types';

const Stack = createNativeStackNavigator<DiscoverStackParamList>();

function DiscoverStackContainer() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: MyTheme.white,
        },
        headerTintColor: MyTheme.black,
        headerShadowVisible: false,
      }}
      initialRouteName="Discover">
      <Stack.Screen
        name="Discover"
        options={{
          title: '',
          headerLeft: () => (
            <MyHeaderLeft
              title="Discover"
              icon={<RadarImg color={MyTheme.primaryColor} />}
            />
          ),
        }}
        component={DiscoverScreen}
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

export default DiscoverStackContainer;
