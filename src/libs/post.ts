import {Cast, CastWithDepth} from '../api/cast/types';
import {FeedItem} from '../api/feed/types';
import {formatDate} from './date';

export function TransformFeedItem(item: FeedItem) {
  let headerTitle = '';
  let headerSubtitle = '';
  const content = item.text;
  if (
    item.root_parent_url &&
    item.root_parent_url.startsWith('https://warpcast.com/~/channel/')
  ) {
    headerTitle = item.root_parent_url.replace(
      'https://warpcast.com/~/channel',
      '',
    );
    headerSubtitle = item.author.display_name + ' • @' + item.author.username;
  } else {
    headerTitle = item.author.display_name;
    headerSubtitle = '@' + item.author.username;
  }

  const postTime = formatDate(new Date(item.timestamp));
  let embed = item.embeds.find(
    el => el.url !== '' && el.url !== null && el.url !== undefined,
  );

  return {
    headerImg: item.author.pfp_url,
    postTime: postTime,
    headerTitle: headerTitle,
    headerSubtitle: headerSubtitle,
    content: content,
    image: embed?.url ?? undefined,
    upvotesCount: item.reactions.likes.length,
    commentsCount: item.replies.count,
    quotesCount: item.reactions.recasts.length,
  };
}
export function TransformCast(item: Cast | CastWithDepth) {
  let headerTitle = '';
  let headerSubtitle = '';
  const content = item.text;
  if (
    item.root_parent_url &&
    item.root_parent_url.startsWith('https://warpcast.com/~/channel/')
  ) {
    headerTitle = item.root_parent_url.replace(
      'https://warpcast.com/~/channel',
      '',
    );
    headerSubtitle = item.author.display_name + ' • @' + item.author.username;
  } else {
    headerTitle = item.author.display_name;
    headerSubtitle = '@' + item.author.username;
  }

  const postTime = formatDate(new Date(item.timestamp));
  let embed = item.embeds.find(
    el => el.url !== '' && el.url !== null && el.url !== undefined,
  );

  return {
    headerImg: item.author.pfp_url,
    postTime: postTime,
    headerTitle: headerTitle,
    headerSubtitle: headerSubtitle,
    content: content,
    image: embed?.url ?? undefined,
    upvotesCount: item.reactions.likes_count,
    commentsCount: item.replies.count,
    quotesCount: item.reactions.recasts_count,
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
