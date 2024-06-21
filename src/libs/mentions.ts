import {Channel} from '../api/channel/types';
import {Profile} from '../api/profile/types';
import {Mention} from '../types';

export function profile2Mention(profile: Profile): Mention {
  return {
    id: profile.username,
    prefix: '@',
    imageUrl: profile.pfp_url,
  };
}

export function channel2Mention(channel: Channel): Mention {
  return {
    id: channel.id,
    prefix: '/',
    imageUrl: channel.image_url,
  };
}
