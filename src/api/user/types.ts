export type UserCastsResponse = {
  result: UserCast[];
  cursor: string;
};

export type UserCast = {
  hash: string;
  thread_hash: string;
  parent_hash: null | string;
  parent_url: null;
  root_parent_url: null | string;
  parent_author: {
    fid: number | null;
  };
  author: Author;
  text: string;
  timestamp: string;
  embeds: {
    url: string;
  }[];
  mentioned_profiles: Author[];
  reactions: {
    likes_count: number;
    recasts_count: number;
  };
  replies: {
    count: number;
  };
};

export type Author = {
  fid: number;
  custody_address: string;
  username: string;
  display_name: string;
  pfp_url: string;
  profile: {
    bio: {
      text: string;
      mentioned_profiles: any[];
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

export type Reaction = {
  count: number;
  fids: any[];
};
