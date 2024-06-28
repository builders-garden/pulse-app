/* eslint-disable react/no-unstable-nested-components */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import MyHeaderLeft from '../components/header/MyHeaderLeft';
import MyHeaderRight from '../components/header/MyHeaderRight';
import {AuthContext} from '../contexts/auth/Auth.context';
import ChannelScreen from '../screens/channel/ChannelScreen';
import ChannelDetailScreen from '../screens/channelDetail/ChannelDetailScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ThreadDetailScreen from '../screens/threadDetail/ThreadDetailScreen';
import {MyTheme} from '../theme';
import {PersonalProfileStackParamList} from './types';

const Stack = createNativeStackNavigator<PersonalProfileStackParamList>();

function PersonalProfileStackContainer() {
  const authContext = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: MyTheme.white,
        },
        headerTintColor: MyTheme.black,
        headerShadowVisible: false,
      }}
      initialRouteName="PersonalProfile">
      <Stack.Screen
        name="PersonalProfile"
        options={{
          title: '',
          headerShadowVisible: false,
          headerLeft: () => <MyHeaderLeft />,
          headerRight: () => (
            <MyHeaderRight
              customStyle={{
                marginRight: 16,
              }}
            />
          ),
        }}
        initialParams={{userFid: authContext.state.fid}}
        component={ProfileScreen}
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

export default PersonalProfileStackContainer;
