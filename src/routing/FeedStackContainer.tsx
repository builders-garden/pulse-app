/* eslint-disable react/no-unstable-nested-components */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ChatImg from '../assets/images/icons/chat.svg';
import MyHeaderLeft from '../components/header/MyHeaderLeft';
import MyHeaderRight from '../components/header/MyHeaderRight';
import ChannelScreen from '../screens/channel/ChannelScreen';
import ChannelDetailScreen from '../screens/channelDetail/ChannelDetailScreen';
import FeedScreen from '../screens/feed/FeedScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ThreadDetailScreen from '../screens/threadDetail/ThreadDetailScreen';
import {MyTheme} from '../theme';
import {FeedStackParamList} from './types';

const Stack = createNativeStackNavigator<FeedStackParamList>();

function FeedStackContainer() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: MyTheme.white,
        },
        headerTintColor: MyTheme.black,
        headerShadowVisible: false,
      }}
      initialRouteName="Feed">
      <Stack.Screen
        name="Feed"
        options={{
          title: '',
          headerLeft: () => (
            <MyHeaderLeft
              title="Following"
              icon={<ChatImg color={MyTheme.primaryColor} />}
            />
          ),
          headerRight: () => <MyHeaderRight />,
        }}
        component={FeedScreen}
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

export default FeedStackContainer;
