/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import BellImg from '../assets/images/icons/bell.svg';
import FeedImg from '../assets/images/icons/feed.svg';
import RadarImg from '../assets/images/icons/radar.svg';
import {AuthContext} from '../contexts/auth/Auth.context';
import {MyTheme} from '../theme';
import DiscoverStackContainer from './DiscoverStackContainer';
import FeedStackContainer from './FeedStackContainer';
import NotificationsStackContainer from './NotificationsStackContainer';
import PersonalProfileStackContainer from './PersonalProfileStackContainer';
import {TabParamList} from './types';

const Tab = createBottomTabNavigator<TabParamList>();

function TabsContainer() {
  const authContext = useContext(AuthContext);

  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarShowLabel: false,
          headerStyle: {
            backgroundColor: MyTheme.white,
          },
          headerTintColor: MyTheme.black,
          headerStatusBarHeight: 0,
          tabBarIcon: ({focused}) => {
            let icon;
            let size = 25;
            const color = focused ? MyTheme.white : MyTheme.black;

            if (route.name === 'FeedRoot') {
              icon = <FeedImg color={color} />;
            } else if (route.name === 'DiscoverRoot') {
              icon = <RadarImg color={color} />;
            } else if (route.name === 'NotificationsRoot') {
              icon = <BellImg color={color} />;
            } else if (route.name === 'PersonalProfileRoot') {
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
        <Tab.Screen
          name="DiscoverRoot"
          options={{
            headerShown: false,
          }}
          component={DiscoverStackContainer}
        />
        <Tab.Screen
          name="NotificationsRoot"
          options={{
            headerShown: false,
          }}
          component={NotificationsStackContainer}
        />
        <Tab.Screen
          name="PersonalProfileRoot"
          options={{
            headerShown: false,
          }}
          component={PersonalProfileStackContainer}
        />
      </Tab.Navigator>
    </>
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
