import {Author} from '../user/types';

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

export type Profile = Author & {
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
