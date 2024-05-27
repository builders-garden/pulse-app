import {CastWithoutReplies} from '../cast/types';
import {Profile} from '../profile/types';

export type NotificationsResponse = {
  result: Notification[];
  cursor: string;
};

export type Notification = {
  object: string;
  most_recent_timestamp: string;
  type: 'follows' | 'recasts' | 'likes' | 'mention' | 'reply';
  follows?: Follow[];
  cast?: CastWithoutReplies;
  reactions?: Reaction[];
};

export type NotificationSection = {title: string; data: Notification[]};

export type Follow = {
  object: string;
  user: Profile;
};

export type Reaction = {
  object: string;
  cast: {
    object: string;
    hash: string;
  };
  user: Profile;
};
