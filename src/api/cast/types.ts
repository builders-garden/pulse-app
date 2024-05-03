import {FeedItem, Reaction} from '../feed/types';

export type CastConversationResponse = {
  result: {
    conversation: {
      cast: Cast;
    };
  };
};
export type CommentResponse = {
  result: Comment[];
  cursor: string;
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
export type Comment = Omit<FeedItem, 'reactions'> & {
  reactions: {
    likes: Reaction[];
    recasts: Reaction[];
    likes_count: number;
    recasts_count: number;
  };
};

export type CastWithDepth = Omit<Cast, 'direct_replies'> & {depth: number};
