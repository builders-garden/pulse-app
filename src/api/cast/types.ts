import {FeedItem, Reaction} from '../feed/types';
import {Author, EssentialAuthor} from '../user/types';

export type CastConversationResponse = {
  result: ConversationSectionList;
};
export type CommentResponse = {
  result: Comment[];
  cursor: string;
};
export type TrendingCastsResponse = {
  result: TrendingCastResult[];
  cursor: string;
};
export type ReactionResponse = {
  result: {
    success: boolean;
  };
};

export type UploadMediaBody = {
  uri: string;
  name: string;
  type: string;
}[];

export type UploadEmbedResult = {
  result: UploadedEmbed[];
};

export type UploadCastBody = {
  text: string;
  embeds: {url: string}[];
  channelId?: string;
  parent?: string;
  idem?: string;
  parentAuthorFid?: number;
};

export type UploadCastResult = {
  result: {
    hash: string;
    author: Author;
    text: string;
  };
};

export type UploadedEmbed = {
  fileId: string;
  name: string;
  size: number;
  versionInfo: {
    id: string;
    name: string;
  };
  filePath: string;
  url: string;
  fileType: string;
  height: number;
  width: number;
  thumbnailUrl: string;
  AITags?: any;
};

export type EssentialCast = {
  hash: string;
  text: string;
  timestamp: string;
  author: EssentialAuthor;
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

export type CastWithoutReplies = Omit<Cast, 'direct_replies'>;

export type CastWithDepth = CastWithoutReplies & {
  depth: number;
};

export type ConversationSection = {
  header: CastWithoutReplies;
  data: CastWithDepth[];
  castIndex: number;
};

export type ConversationSectionList = {
  casts: CastWithoutReplies[];
  sections: ConversationSection[];
};

export type TrendingCastResult = {
  criteria: string;
  criteriaCount: number;
  hash: string;
  id: string;
  socialCapitalValueFormatted: number;
  socialCapitalValueRaw: string;
  timeFrom: Date;
  timeTo: Date;
  fid: number;
  cast: TrendingCast;
};

export type TrendingCast = {
  text: string;
  mentions: TrendingCastMention[];
  embeds: TrendingCastEmbed[];
  url: string;
  fid: string;
  castedAtTimestamp: string;
  hash: string;
  numberOfLikes: number;
  numberOfRecasts: number;
  numberOfReplies: number;
  castedBy: TrendingCastAuthor;
};

export type TrendingCastAuthor = {
  fnames: string[];
  id: string;
  identity: string;
  isFarcasterPowerUser: boolean;
  profileBio: string;
  profileDisplayName: string;
  profileHandle: string;
  profileImage: string;
  profileName: string;
  profileUrl: string;
  userId: string;
};

export type TrendingCastEmbed = {
  url?: string;
  castId?: {
    fid: number;
    hash: string;
  };
};

export type TrendingCastMention = {
  fid: string;
  position: number;
  profile: {
    fnames: string[];
  };
};
