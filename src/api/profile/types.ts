import {Author} from '../user/types';

export type ProfileResponse = {
  result: Profile;
};
export type ProfileByUsernameResponse = {
  result: ProfileByUsername;
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

export type Profile = Author & {
  notes?: any[];
  viewer_context?: {
    following: boolean;
    followed_by: boolean;
  };
  socialCapital?: {
    socialCapitalScore: number;
    socialCapitalRank: number;
  };
};

export type ProfileByUsername = Omit<Profile, 'pfp_url'> & {
  pfp: {
    url: string;
  };
};

export type ProfileFollowDetail = {
  success: boolean;
  target_fid: number;
};
