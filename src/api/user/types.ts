export type UserCastsResponse = {
  result: UserCast[];
  cursor: string;
};

export type UserCast = {
  hash: string;
  parentHash: null | string;
  parentUrl: null;
  rootParentUrl: null | string;
  threadHash: string;
  parentAuthor: {
    fid: number | null;
  };
  author: Author;
  text: string;
  timestamp: string;
  embeds: {
    url: string;
  }[];
  mentionedProfiles: Author[];
  reactions: Reaction;
  recasts: Reaction;
  recasters: any[];
  viewerContext: {
    liked: boolean;
    recasted: boolean;
  };
  replies: {
    count: number;
  };
};

export type Author = {
  fid: number;
  custodyAddress: string;
  username: string;
  displayName: string;
  pfp: {
    url: string;
  };
  profile: {
    bio: {
      text: string;
      mentionedProfiles: any[];
    };
  };
  followerCount: number;
  followingCount: number;
  verifications: string[];
  verifiedAddresses: {
    eth_addresses: string[];
    sol_addresses: string[];
  };
  activeStatus: string;
  powerBadge: boolean;
};

export type Reaction = {
  count: number;
  fids: any[];
};
