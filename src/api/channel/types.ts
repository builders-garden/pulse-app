import {Profile} from '../profile/types';

export type TrendingChannelsResponse = {
  result: ChannelActivity[];
};
export type FavoriteChannelsResponse = TrendingChannelsResponse;
export type MostFollowedChannelsResponse = {
  result: MostFollowedChannel[];
  cursor: string;
};
export type MostRecentChannelsResponse = {
  result: MostRecentChannel[];
};
export type NewChannelsResponse = {
  result: NewChannel[];
  cursor: string;
};
export type ChannelsResponse = {
  result: {
    channels: Channel[];
    next: {
      cursor: string;
    };
  };
};
export type ChannelResponse = {
  result: Channel;
};
export type ChannelActivity = {
  object: string;
  cast_count_1d: string;
  cast_count_7d: string;
  cast_count_30d: string;
  channel: Channel;
};

export type Channel = {
  id: string;
  url: string;
  name: string;
  description: string;
  follower_count: number;
  object: string;
  image_url: string;
  created_at: number;
  parent_url: string;
  lead: Profile;
  hosts: Profile[];
  moderator?: any;
  viewer_context?: {
    following: boolean;
  };
};

export type MostFollowedChannel = {
  name: string;
  channelId: string;
  followerCount: number;
  imageUrl: string;
  url: string;
};

export type NewChannel = Omit<MostFollowedChannel, 'followerCount'> & {
  createdAtTimestamp: string;
};
export type MostRecentChannel = Channel;
