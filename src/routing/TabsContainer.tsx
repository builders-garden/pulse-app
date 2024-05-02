/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useContext} from 'react';
import {Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BellImg from '../assets/images/icons/bell.svg';
import FeedImg from '../assets/images/icons/feed.svg';
import MenuLinesImg from '../assets/images/icons/menu_lines.svg';
import RadarImg from '../assets/images/icons/radar.svg';
import MyIconButtonBase from '../components/MyIconButtonBase';
import {DrawerContext} from '../contexts/drawer/Drawer.context';
import DiscoverScreen from '../screens/discover/DiscoverScreen';
import FeedScreen from '../screens/feed/FeedScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import {MyTheme} from '../theme';
import {TabParamList} from './types';

const Tab = createBottomTabNavigator<TabParamList>();

function TabsContainer() {
  const drawerContext = useContext(DrawerContext);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: MyTheme.white,
        },
        headerTintColor: MyTheme.black,
        tabBarIcon: ({focused}) => {
          let icon;
          let size = 25;
          const color = focused ? MyTheme.white : MyTheme.black;

          if (route.name === 'Feed') {
            icon = <FeedImg color={color} />;
          } else if (route.name === 'Discover') {
            icon = <RadarImg color={color} />;
          } else if (route.name === 'Notifications') {
            icon = <BellImg color={color} />;
          } else if (route.name === 'Profile') {
            size = 35;
            icon = (
              <Image
                source={require('../assets/images/icons/avatar.png')}
                style={{
                  width: size,
                  height: size,
                }}
              />
            );
          }

          if (focused) {
            return (
              <LinearGradient
                style={styles.selectedTabBarBtn}
                colors={[
                  MyTheme.primaryGradientFirst,
                  MyTheme.primaryGradientSecond,
                ]}>
                {icon}
              </LinearGradient>
            );
          }

          return icon;
        },
      })}
      initialRouteName="Feed">
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          title: 'Following',
          headerLeft: () => (
            <>
              <MyIconButtonBase
                style="secondary"
                filling="clear"
                customStyle={{marginLeft: 15}}
                onPress={() => {
                  console.log(drawerContext.state.visible);
                  drawerContext.show();
                }}
                icon={<MenuLinesImg color={MyTheme.black} />}
              />
            </>
          ),
        }}
      />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  selectedTabBarBtn: {
    padding: 7,
    borderRadius: 12,
  },
});

export default TabsContainer;
