import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  ThreadDetail: {threadHash: string};
  Home: NavigatorScreenParams<TabParamList>;
  CreateThread: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type TabParamList = {
  PersonalProfile: {userFid: string};
  Discover: undefined;
  Notifications: undefined;
  FeedRoot: NavigatorScreenParams<FeedStackParamList>;
};

export type HomeTabScreenProps<T extends keyof TabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, T>,
    RootStackScreenProps<'Home'>
  >;

export type FeedStackParamList = {
  Profile: {userFid: string};
  Feed: undefined;
  ThreadDetail: {threadHash: string};
  Channel: {channelId: string; showDrawer?: boolean};
  ChannelDetail: {channelId: string};
};

export type FeedStackScreenProps<T extends keyof FeedStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<FeedStackParamList, T>,
    HomeTabScreenProps<'FeedRoot'>
  >;
// export type DiscoverStackParamList = {
//   Discover: undefined;
//   ThreadDetail: {threadHash: string};
//   Channel: {channelId: string; showDrawer?: boolean};
//   ChannelDetail: {channelId: string};
// };

// export type DiscoverStackScreenProps<T extends keyof DiscoverStackParamList> =
//   CompositeScreenProps<
//     NativeStackScreenProps<DiscoverStackParamList, T>,
//     HomeTabScreenProps<'Discover'>
//   >;
