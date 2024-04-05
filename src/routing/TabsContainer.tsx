/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image, Text} from 'react-native';
import DiscoverScreen from '../screens/discover/DiscoverScreen';
import FeedScreen from '../screens/feed/FeedScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

function TabsContainer() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarLabel: ({focused, color}) => {
          if (focused && route.name !== 'Profile') {
            return <Text style={{color}}>aaaaa</Text>;
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
        }}
      />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default TabsContainer;
