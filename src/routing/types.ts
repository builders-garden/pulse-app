import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EssentialCast} from '../api/cast/types';
import {Channel} from '../api/channel/types';

export type RootStackParamList = {
  Home: NavigatorScreenParams<TabParamList>;
  CreateThread: {channel?: Channel};
  CreateComment: {cast: EssentialCast};
  Search: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type TabParamList = {
  PersonalProfileRoot: NavigatorScreenParams<PersonalProfileStackParamList>;
  DiscoverRoot: NavigatorScreenParams<DiscoverStackParamList>;
  NotificationsRoot: NavigatorScreenParams<NotificationsStackParamList>;
  FeedRoot: NavigatorScreenParams<FeedStackParamList>;
};

export type HomeTabScreenProps<T extends keyof TabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, T>,
    RootStackScreenProps<'Home'>
  >;

export type FeedStackParamList = {
  Profile: {userFid?: string; username?: string};
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
export type DiscoverStackParamList = {
  Discover: undefined;
  Profile: {userFid?: string; username?: string};
  ThreadDetail: {threadHash: string};
  Channel: {channelId: string; showDrawer?: boolean};
  ChannelDetail: {channelId: string};
};

export type DiscoverStackScreenProps<T extends keyof DiscoverStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<DiscoverStackParamList, T>,
    HomeTabScreenProps<'DiscoverRoot'>
  >;
export type NotificationsStackParamList = {
  Notifications: undefined;
  Profile: {userFid?: string; username?: string};
  ThreadDetail: {threadHash: string};
  Channel: {channelId: string; showDrawer?: boolean};
  ChannelDetail: {channelId: string};
};

export type NotificationsStackScreenProps<
  T extends keyof NotificationsStackParamList,
> = CompositeScreenProps<
  NativeStackScreenProps<NotificationsStackParamList, T>,
  HomeTabScreenProps<'NotificationsRoot'>
>;
export type PersonalProfileStackParamList = {
  PersonalProfile: {userFid?: string; username?: string};
  Profile: {userFid?: string; username?: string};
  ThreadDetail: {threadHash: string};
  Channel: {channelId: string; showDrawer?: boolean};
  ChannelDetail: {channelId: string};
};

export type PersonalProfileStackScreenProps<
  T extends keyof PersonalProfileStackParamList,
> = CompositeScreenProps<
  NativeStackScreenProps<PersonalProfileStackParamList, T>,
  HomeTabScreenProps<'PersonalProfileRoot'>
>;
