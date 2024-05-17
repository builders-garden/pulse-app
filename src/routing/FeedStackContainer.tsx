/* eslint-disable react/no-unstable-nested-components */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {Text} from 'react-native';
import MenuLinesImg from '../assets/images/icons/menu_lines.svg';
import MyIconButtonBase from '../components/MyIconButtonBase';
import {DrawerContext} from '../contexts/drawer/Drawer.context';
import ChannelScreen from '../screens/channel/ChannelScreen';
import ChannelDetailScreen from '../screens/channelDetail/ChannelDetailScreen';
import FeedScreen from '../screens/feed/FeedScreen';
import ThreadDetailScreen from '../screens/threadDetail/ThreadDetailScreen';
import {MyTheme} from '../theme';
import {FeedStackParamList} from './types';

const Stack = createNativeStackNavigator<FeedStackParamList>();

function FeedStackContainer() {
  const drawerContext = useContext(DrawerContext);
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
            <>
              <MyIconButtonBase
                style="secondary"
                filling="clear"
                customStyle={{marginLeft: 15}}
                onPress={() => {
                  drawerContext.show();
                }}
                icon={<MenuLinesImg color={MyTheme.black} />}
              />
              <Text
                style={{
                  fontFamily: MyTheme.fontRegular,
                  marginLeft: 15,
                  fontSize: 20,
                  textAlign: 'left',
                  color: MyTheme.black,
                }}>
                Following
              </Text>
            </>
          ),
        }}
        component={FeedScreen}
      />
      <Stack.Screen name="ThreadDetail" component={ThreadDetailScreen} />
      <Stack.Screen
        name="Channel"
        component={ChannelScreen}
        options={{
          title: '',
          headerLeft: () => (
            <>
              <MyIconButtonBase
                style="secondary"
                filling="clear"
                customStyle={{marginLeft: 15}}
                onPress={() => {
                  drawerContext.show();
                }}
                icon={<MenuLinesImg color={MyTheme.black} />}
              />
            </>
          ),
        }}
      />
      <Stack.Screen name="ChannelDetail" component={ChannelDetailScreen} />
    </Stack.Navigator>
  );
}

export default FeedStackContainer;
