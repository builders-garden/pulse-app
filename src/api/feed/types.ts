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
};

export type Profile = {
  object: string;
  fid: number;
  custody_address: string;
  username: string;
  display_name: string;
  pfp_url: string;
  profile: {
    bio: {
      text: string;
      mentioned_profiles: [];
    };
  };
  follower_count: number;
  following_count: number;
  verifications: string[];
  verified_addresses: {
    eth_addresses: string[];
    sol_addresses: string[];
  };
  active_status: string;
  power_badge: boolean;
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
