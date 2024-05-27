/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import BellImg from '../assets/images/icons/bell.svg';
import FeedImg from '../assets/images/icons/feed.svg';
import MenuLinesImg from '../assets/images/icons/menu_lines.svg';
import RadarImg from '../assets/images/icons/radar.svg';
import MyIconButtonBase from '../components/MyIconButtonBase';
import {AuthContext} from '../contexts/auth/Auth.context';
import {DrawerContext} from '../contexts/drawer/Drawer.context';
import DiscoverScreen from '../screens/discover/DiscoverScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import {MyTheme} from '../theme';
import FeedStackContainer from './FeedStackContainer';
import {TabParamList} from './types';

const Tab = createBottomTabNavigator<TabParamList>();

function TabsContainer() {
  const authContext = useContext(AuthContext);
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

          if (route.name === 'FeedRoot') {
            icon = <FeedImg color={color} />;
          } else if (route.name === 'Discover') {
            icon = <RadarImg color={color} />;
          } else if (route.name === 'Notifications') {
            icon = <BellImg color={color} />;
          } else if (route.name === 'Profile') {
            icon = (
              <FastImage
                source={{uri: authContext.state.profile?.pfp_url}}
                style={{
                  width: size,
                  height: size,
                  borderRadius: 5,
                  zIndex: 1,
                }}
              />
            );

            if (focused) {
              return (
                <View>
                  {icon}
                  <LinearGradient
                    style={styles.selectedTabBarProfile}
                    colors={[
                      MyTheme.primaryGradientFirst,
                      MyTheme.primaryGradientSecond,
                    ]}
                  />
                </View>
              );
            }
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
      initialRouteName="FeedRoot">
      <Tab.Screen
        name="FeedRoot"
        component={FeedStackContainer}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen
        name="Notifications"
        options={{
          title: '',
          headerLeft: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MyIconButtonBase
                style="secondary"
                filling="clear"
                customStyle={{marginLeft: 15}}
                onPress={() => {
                  drawerContext.show();
                }}
                icon={<MenuLinesImg color={MyTheme.black} />}
              />
              <View style={styles.headerIcon}>
                <BellImg color={MyTheme.primaryColor} />
              </View>
              <Text
                style={{
                  fontFamily: MyTheme.fontRegular,
                  fontSize: 20,
                  textAlign: 'left',
                  color: MyTheme.black,
                }}>
                Notifications
              </Text>
            </View>
          ),
          headerShadowVisible: false,
        }}
        component={NotificationsScreen}
      />
      <Tab.Screen
        name="Profile"
        options={{
          headerShadowVisible: false,
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  selectedTabBarBtn: {
    padding: 7,
    borderRadius: 12,
  },
  selectedTabBarProfile: {
    borderRadius: 100,
    position: 'absolute',
    alignSelf: 'center',
    width: 14,
    height: 14,
    bottom: -8,
  },
  headerIcon: {
    padding: 4,
    backgroundColor: MyTheme.primaryLightOpacity,
    marginHorizontal: 10,
    borderRadius: 3,
  },
});

export default TabsContainer;
