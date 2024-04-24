import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Feed, FeedItem} from '../../api/feed/types';
import {RequestStatus} from '../../api/types';
import MyFloatingButton from '../../components/MyFloatingButton';
import MyPlaceholderLoader from '../../components/MyPlaceholderLoader';
import MyPost from '../../components/post/MyPost';
import {AuthContext} from '../../contexts/auth/Auth.context';
import {HomeTabScreenProps} from '../../routing/types';
import {ENDPOINT_FEED} from '../../variables';

// const placeholderPosts = [
//   {
//     headerImg: require('../../assets/images/placeholders/profile_pic.png'),
//     headerTitle: '/degen',
//     headerSubtitle: 'limone.eth - serial frame hacker • @limone.eth',
//     content:
//       'time to share what we built this weekend in london!fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- social login- pay your friends- send request links- create virtual cards- connect your @gnosispaycc @frankk @orbulo',
//     image: require('../../assets/images/placeholders/picture.png'),
//     upvotesCount: 10,
//     commentsCount: 3,
//     quotesCount: 2,
//     postTime: '2h',
//   },
//   {
//     headerImg: require('../../assets/images/placeholders/profile_pic.png'),
//     headerTitle: '/degen',
//     headerSubtitle: 'limone.eth - serial frame hacker • @limone.eth',
//     content:
//       'time to share what we built this weekend in london!fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- social login- pay your friends- send request links- create virtual cards- connect your @gnosispaycc @frankk @orbulo',
//     upvotesCount: 10,
//     commentsCount: 3,
//     quotesCount: 2,
//     postTime: '2h',
//   },
//   {
//     headerImg: require('../../assets/images/placeholders/profile_pic.png'),
//     headerTitle: '/degen',
//     headerSubtitle: 'limone.eth - serial frame hacker • @limone.eth',
//     content:
//       'time to share what we built this weekend in london!fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- social login- pay your friends- send request links- create virtual cards- connect your @gnosispaycc @frankk @orbulo',
//     image: require('../../assets/images/placeholders/picture.png'),
//     upvotesCount: 10,
//     commentsCount: 3,
//     quotesCount: 2,
//     postTime: '2h',
//   },
//   {
//     headerImg: require('../../assets/images/placeholders/profile_pic.png'),
//     headerTitle: '/degen',
//     headerSubtitle: 'limone.eth - serial frame hacker • @limone.eth',
//     content:
//       'time to share what we built this weekend in london!fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- social login- pay your friends- send request links- create virtual cards- connect your @gnosispaycc @frankk @orbulo',
//     image: require('../../assets/images/placeholders/picture.png'),
//     upvotesCount: 10,
//     commentsCount: 3,
//     quotesCount: 2,
//     postTime: '2h',
//   },
//   {
//     headerImg: require('../../assets/images/placeholders/profile_pic.png'),
//     headerTitle: '/degen',
//     headerSubtitle: 'limone.eth - serial frame hacker • @limone.eth',
//     content:
//       'time to share what we built this weekend in london!fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- social login- pay your friends- send request links- create virtual cards- connect your @gnosispaycc @frankk @orbulo',
//     image: require('../../assets/images/placeholders/picture.png'),
//     upvotesCount: 10,
//     commentsCount: 3,
//     quotesCount: 2,
//     postTime: '2h',
//   },
//   {
//     headerImg: require('../../assets/images/placeholders/profile_pic.png'),
//     headerTitle: '/degen',
//     headerSubtitle: 'limone.eth - serial frame hacker • @limone.eth',
//     content:
//       'time to share what we built this weekend in london!fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- social login- pay your friends- send request links- create virtual cards- connect your @gnosispaycc @frankk @orbulo',
//     image: require('../../assets/images/placeholders/picture.png'),
//     upvotesCount: 10,
//     commentsCount: 3,
//     quotesCount: 2,
//     postTime: '2h',
//   },
//   {
//     headerImg: require('../../assets/images/placeholders/profile_pic.png'),
//     headerTitle: '/degen',
//     headerSubtitle: 'limone.eth - serial frame hacker • @limone.eth',
//     content:
//       'time to share what we built this weekend in london!fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- social login- pay your friends- send request links- create virtual cards- connect your @gnosispaycc @frankk @orbulo',
//     image: require('../../assets/images/placeholders/picture.png'),
//     upvotesCount: 10,
//     commentsCount: 3,
//     quotesCount: 2,
//     postTime: '2h',
//   },
// ];

function FeedScreen({navigation}: HomeTabScreenProps<'Feed'>) {
  const authContext = useContext(AuthContext);
  const [feedFetchStatus, setFeedFetchStatus] = useState<RequestStatus>('idle');
  const [feed, setFeed] = useState<FeedItem[]>();
  useEffect(() => {
    async function fetchFeed() {
      setFeedFetchStatus('loading');
      try {
        console.log(ENDPOINT_FEED);
        const res = await axios.get<Feed>(ENDPOINT_FEED, {
          headers: {Authorization: `Bearer ${authContext.state.token}`},
        });
        // console.log('got response');
        console.log(JSON.stringify(res.data));
        setFeed(res.data.result);
        setFeedFetchStatus('success');
      } catch (error) {
        console.error(error);
        setFeedFetchStatus('error');
      }
    }

    fetchFeed();
  }, [authContext]);

  function formatDate(date: Date): string {
    const now = new Date();
    const diffInMilliseconds = now.getTime() - date.getTime();
    const diffInMinutes = diffInMilliseconds / (1000 * 60);
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

    if (diffInMinutes < 1) {
      return 'just now';
    } else if (diffInHours < 1) {
      return `${Math.floor(diffInMinutes)}m`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else if (diffInDays < 3) {
      return `${Math.floor(diffInDays)}d`;
    } else {
      const day = date.getDate();
      const month = date.getMonth() + 1; // Months are zero based
      const year = date.getFullYear();
      return `${month < 10 ? '0' + month : month}-${
        day < 10 ? '0' + day : day
      }-${year}`;
    }
  }

  return (
    <View>
      {feedFetchStatus === 'success' ? (
        <>
          <MyFloatingButton
            icon={require('../../assets/images/icons/feather.png')}
            onPress={() => {
              navigation.navigate('CreateThread');
            }}
          />
          <FlatList
            data={feed}
            renderItem={({item}) => {
              let headerTitle = '';
              let headerSubtitle = '';
              const content = item.text;
              if (
                item.root_parent_url &&
                item.root_parent_url.startsWith(
                  'https://warpcast.com/~/channel/',
                )
              ) {
                headerTitle = item.root_parent_url.replace(
                  'https://warpcast.com/~/channel',
                  '',
                );
                headerSubtitle =
                  item.author.display_name + ' • @' + item.author.username;
              } else {
                headerTitle = item.author.display_name;
                headerSubtitle = '@' + item.author.username;
              }

              const postTime = formatDate(new Date(item.timestamp));
              let embed = item.embeds.find(
                el => el.url !== '' && el.url !== null && el.url !== undefined,
              );

              return (
                <MyPost
                  headerImg={item.author.pfp_url}
                  postTime={postTime}
                  headerTitle={headerTitle}
                  headerSubtitle={headerSubtitle}
                  content={content}
                  image={embed?.url ?? undefined}
                  upvotesCount={item.reactions.likes.length}
                  commentsCount={item.replies.count}
                  quotesCount={item.reactions.recasts.length}
                  onContentBodyPress={() => {
                    navigation.navigate('ThreadDetail', {
                      threadId: 1,
                    });
                  }}
                />
              );
            }}
          />
        </>
      ) : (
        <View style={{width: '100%', padding: 20}}>
          <MyPlaceholderLoader customStyle={{marginBottom: 20}} />
          <MyPlaceholderLoader />
        </View>
      )}
    </View>
  );
}

export default FeedScreen;
