import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Channel} from '../api/channel/types';

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
  Profile: {userFid: number};
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
  Feed: undefined;
  ThreadDetail: {threadHash: string};
  Channel: {channelId: string};
  ChannelDetail: {channel: Channel};
};

export type FeedStackScreenProps<T extends keyof FeedStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<FeedStackParamList, T>,
    HomeTabScreenProps<'FeedRoot'>
  >;
