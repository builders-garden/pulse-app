/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image, Text} from 'react-native';
import MyIconButton from '../components/MyIconButton';
import DiscoverScreen from '../screens/discover/DiscoverScreen';
import FeedScreen from '../screens/feed/FeedScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import {TabParamList} from './types';

const Tab = createBottomTabNavigator<TabParamList>();

function TabsContainer() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarLabel: ({focused, color}) => {
          if (focused) {
            switch (route.name) {
              case 'Feed':
                return <Text style={{color}}>Feed</Text>;
              case 'Discover':
                return <Text style={{color}}>Discover</Text>;
              case 'Notifications':
                return <Text style={{color}}>Notifications</Text>;
              default:
                return;
            }
          } else {
            return;
          }
        },
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: 'black',
        tabBarIcon: ({}) => {
          let icon;
          let size = 25;

          if (route.name === 'Feed') {
            icon = require('../assets/images/icons/feed.png');
          } else if (route.name === 'Discover') {
            icon = require('../assets/images/icons/discover.png');
          } else if (route.name === 'Notifications') {
            icon = require('../assets/images/icons/notification.png');
          } else if (route.name === 'Profile') {
            icon = require('../assets/images/icons/avatar.png');
            size = 35;
          }

          return (
            <Image
              source={icon}
              style={{
                width: size,
                height: size,
              }}
            />
          );
        },
      })}
      initialRouteName="Feed">
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          title: 'Personal feed',
          headerLeft: () => (
            <MyIconButton
              style="secondary"
              customStyle={{width: '100%'}}
              onPress={() => {}}
              icon={require('../assets/images/icons/channels.png')}
            />
          ),
        }}
      />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default TabsContainer;
