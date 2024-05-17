import {Profile} from '../profile/types';

export type ChannelsResponse = {
  result: ChannelActivity[];
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
};
