export type ProfileResponse = {
  result: Profile;
};
export type ProfileSearchResponse = {
  result: Profile[];
  cursor: string;
};

export type ProfileFollowResponse = {
  result: {
    success: boolean;
    details: ProfileFollowDetail[];
  };
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
      mentioned_profiles?: [];
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
  notes?: any[];
  viewer_context?: {
    following: boolean;
    followed_by: boolean;
  };
};

export type ProfileFollowDetail = {
  success: boolean;
  target_fid: number;
};
