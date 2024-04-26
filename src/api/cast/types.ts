import {FeedItem, Reaction} from '../feed/types';

export type CastResponse = {
  result: {
    conversation: {
      cast: Cast;
    };
  };
};

export type Cast = Omit<FeedItem, 'reactions'> & {
  reactions: {
    likes: Reaction[];
    recasts: Reaction[];
    likes_count: number;
    recasts_count: number;
  };
  direct_replies: Cast[];
};

export type CastWithDepth = Omit<Cast, 'direct_replies'> & {depth: number};
