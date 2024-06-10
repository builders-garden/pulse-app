export type UserCastsResponse = {
  result: UserCast[];
  cursor: string;
};

export type UserCast = {
  hash: string;
  parentHash: null | string;
  parentCast: UserCastParent | null;
  text: string;
  castedAtTimestamp: string;
  embeds: {
    url: string;
  }[];
  mentions: any[];
  numberOfRecasts: number;
  numberOfLikes: number;
  numberOfReplies: number;
  channel: UserCastChannel | null;
};

export type UserCastParent = {
  hash: string;
  text: string;
  numberOfLikes: number;
  numberOfRecasts: number;
  numberOfReplies: number;
  parentHash: string;
  castedBy: UserCastParentAuthor;
};
export type UserCastParentAuthor = {
  profileBio: string;
  profileDisplayName: string;
  profileHandle: string;
  profileImage: string;
  profileName: string;
  userId: string;
};

export type UserCastChannel = {
  channelId: string;
  name: string;
  imageUrl: string;
  description: string;
};
// export type UserCast = {
//   hash: string;
//   thread_hash: string;
//   parent_hash: null | string;
//   parent_url: null;
//   root_parent_url: null | string;
//   parent_author: {
//     fid: number | null;
//   };
//   author: Author;
//   text: string;
//   timestamp: string;
//   embeds: {
//     url: string;
//   }[];
//   mentioned_profiles: Author[];
//   reactions: {
//     likes_count: number;
//     recasts_count: number;
//   };
//   replies: {
//     count: number;
//   };
// };

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

export type EssentialAuthor = {
  fid: number;
  username: string;
  display_name: string;
  pfp_url: string;
};

export type Reaction = {
  count: number;
  fids: any[];
};
