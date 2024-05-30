import {Channel} from '../channel/types';
import {Profile} from '../profile/types';

export type FeedResponse = {
  result: FeedItem[];
  cursor: string;
};

export type FeedItem = {
  object: string;
  hash: string;
  thread_hash: string;
  parent_hash: any;
  parent_url: string;
  root_parent_url: string;
  parent_author: {
    fid: number;
  };
  author: Profile;
  text: string;
  timestamp: string;
  embeds: Embed[];
  reactions: {
    likes: Reaction[];
    recasts: Reaction[];
  };
  replies: {
    count: number;
  };
  mentioned_profiles: Profile[];
  viewer_context: {
    liked: boolean;
    recasted: boolean;
  };
  frames?: Frame[];
  channel?: Channel;
};

export type Embed = {
  url: string;
};

export type Frame = {
  version: string;
  title: string;
  image: string;
  image_aspect_ratio: string;
  buttons: Button[];
  input: {};
  state: {};
  frames_url: string;
};

export type Reaction = {
  fid: number;
  fname: string;
};

export interface Button {
  index: number;
  title: string;
  action_type: string;
  target: string;
}
