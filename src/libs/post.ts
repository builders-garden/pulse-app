import {
  Cast,
  CastWithDepth,
  CastWithoutReplies,
  Comment,
  ConversationSection,
  ConversationSectionList,
  EssentialCast,
  TrendingCastResult,
} from '../api/cast/types';
import {FeedItem} from '../api/feed/types';
import {Profile} from '../api/profile/types';
import {UserCast} from '../api/user/types';
import {formatDate} from './date';

export function TransformUserCast(item: UserCast, profile: Profile) {
  let headerTitle = '';
  let headerSubtitle = '';
  let headerImg = '';
  let channel: string = '';
  const content = item.text;
  if (item.channel) {
    channel = item.channel.id;
    headerTitle = '/' + channel;
    headerSubtitle = profile.display_name + ' • @' + profile.username;
    headerImg = item.channel.image_url;
  } else {
    headerTitle = profile.display_name;
    headerSubtitle = '@' + profile.username;
    headerImg = profile.pfp_url;
  }

  const postTime = formatDate(new Date(item.timestamp));
  let embeds = item.embeds.filter(
    el => el?.url !== '' && el?.url !== null && el?.url !== undefined,
  );
  return {
    channel,
    headerImg,
    postTime: postTime,
    headerTitle: headerTitle,
    headerSubtitle: headerSubtitle,
    content: content,
    images: embeds ?? [],
    upvotesCount: item.reactions.likes_count,
    commentsCount: item.replies.count,
    quotesCount: item.reactions.recasts_count,
  };
}
// export function TransformUserCast(item: UserCast) {
//   let headerTitle = '';
//   let headerSubtitle = '';
//   let channel: string = '';
//   const content = item.text;
//   if (
//     item.root_parent_url &&
//     item.root_parent_url.startsWith('https://warpcast.com/~/channel/')
//   ) {
//     channel = item.root_parent_url.replace(
//       'https://warpcast.com/~/channel/',
//       '',
//     );
//     headerTitle = '/' + channel;
//     headerSubtitle = item.author.display_name + ' • @' + item.author.username;
//   } else {
//     headerTitle = item.author.display_name;
//     headerSubtitle = '@' + item.author.username;
//   }

//   const postTime = formatDate(new Date(item.timestamp));
//   let embed = item.embeds.find(
//     el => el?.url !== '' && el?.url !== null && el?.url !== undefined,
//   );

//   return {
//     channel,
//     headerImg: item.author.pfp_url,
//     postTime: postTime,
//     headerTitle: headerTitle,
//     headerSubtitle: headerSubtitle,
//     content: content,
//     image: embed?.url ?? undefined,
//     upvotesCount: item.reactions.likes_count,
//     commentsCount: item.replies.count,
//     quotesCount: item.reactions.recasts_count,
//   };
// }
// TODO: Implementare TransformComment e separare le due funzioni
export function TransformFeedItem(item: FeedItem | Comment) {
  let headerTitle = '';
  let headerSubtitle = '';
  let headerImg = '';
  let channel: string = '';
  const content = item.text;
  if (item.channel) {
    channel = item.channel.id;
    headerTitle = '/' + channel;
    headerSubtitle = item.author.display_name + ' • @' + item.author.username;
    headerImg = item.channel.image_url;
  } else {
    headerTitle = item.author.display_name;
    headerSubtitle = '@' + item.author.username;
    headerImg = item.author.pfp_url;
  }

  const postTime = formatDate(new Date(item.timestamp));
  let embeds = item.embeds.filter(
    el => el.url !== '' && el.url !== null && el.url !== undefined,
  );

  return {
    channel,
    headerImg,
    postTime: postTime,
    headerTitle: headerTitle,
    headerSubtitle: headerSubtitle,
    content: content,
    images: embeds ?? [],
    upvotesCount: item.reactions.likes.length,
    commentsCount: item.replies.count,
    quotesCount: item.reactions.recasts.length,
  };
}
export function TransformCast(
  item: Cast | CastWithDepth | CastWithoutReplies,
  useChannel = false,
) {
  let headerTitle = '';
  let headerSubtitle = '';
  let headerImg = '';
  let channel = '';
  const content = item.text;
  if (useChannel && item.channel) {
    channel = item.channel.id;
    headerTitle = '/' + channel;
    headerSubtitle = item.author.display_name + ' • @' + item.author.username;
    headerImg = item.channel.image_url;
  } else {
    headerTitle = item.author.display_name;
    headerSubtitle = '@' + item.author.username;
    headerImg = item.author.pfp_url;
  }

  const postTime = formatDate(new Date(item.timestamp));
  let embeds = item.embeds.filter(
    el => el.url !== '' && el.url !== null && el.url !== undefined,
  );

  return {
    channel,
    headerImg,
    postTime: postTime,
    headerTitle: headerTitle,
    headerSubtitle: headerSubtitle,
    content: content,
    images: embeds ?? [],
    upvotesCount: item.reactions.likes_count,
    commentsCount: item.replies.count,
    quotesCount: item.reactions.recasts_count,
  };
}

//
export function TransformConversation(items: Cast[]): ConversationSectionList {
  const casts: CastWithoutReplies[] = [];
  const sections: ConversationSection[] = [];

  for (let i = 0; i < items.length; i++) {
    const {direct_replies, ...other} = items[i];
    casts.push(other);

    for (let j = 0; j < direct_replies.length; j++) {
      const flattened = FlattenConversation(direct_replies[j], 0);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {depth, ...rest} = flattened[0];
      sections.push({
        header: rest,
        castIndex: i,
        data: flattened.slice(1),
      });
    }
  }
  return {
    casts: casts,
    sections: sections,
  };
}
export function FlattenConversation(item: Cast, depth: number = 0) {
  const flattened: CastWithDepth[] = [];
  const {direct_replies, ...other} = item;
  flattened.push({...other, depth: depth});

  for (let i = 0; i < direct_replies.length; i++) {
    const nextLevel = FlattenConversation(direct_replies[i], depth + 1);
    flattened.push(...nextLevel);
  }

  return flattened;
}
export function TrendingCastResult2EssentialCast(
  item: TrendingCastResult,
): EssentialCast {
  return {
    hash: item.cast.hash,
    text: item.cast.text,
    timestamp: item.cast.castedAtTimestamp,
    author: {
      display_name: item.cast.castedBy.profileDisplayName,
      username: item.cast.castedBy.profileHandle,
      pfp_url: item.cast.castedBy.profileImage,
      fid: item.fid,
    },
  };
}
