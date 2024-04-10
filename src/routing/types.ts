import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  ThreadDetail: {threadId: number};
  Home: NavigatorScreenParams<TabParamList>;
  SignIn: undefined;
  SignUp: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type TabParamList = {
  Profile: undefined;
  Discover: undefined;
  Notifications: undefined;
  Feed: undefined;
};

export type HomeTabScreenProps<T extends keyof TabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, T>,
    RootStackScreenProps<'Home'>
  >;
