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

const placeholderPosts = [
  {
    headerImg: require('../../assets/images/placeholders/profile_pic.png'),
    headerTitle: '/degen',
    headerSubtitle: 'limone.eth - serial frame hacker • @limone.eth',
    content:
      'time to share what we built this weekend in london!fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- social login- pay your friends- send request links- create virtual cards- connect your @gnosispaycc @frankk @orbulo',
    image: require('../../assets/images/placeholders/picture.png'),
    upvotesCount: 10,
    commentsCount: 3,
    quotesCount: 2,
    postTime: '2h',
  },
  {
    headerImg: require('../../assets/images/placeholders/profile_pic.png'),
    headerTitle: '/degen',
    headerSubtitle: 'limone.eth - serial frame hacker • @limone.eth',
    content:
      'time to share what we built this weekend in london!fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- social login- pay your friends- send request links- create virtual cards- connect your @gnosispaycc @frankk @orbulo',
    upvotesCount: 10,
    commentsCount: 3,
    quotesCount: 2,
    postTime: '2h',
  },
  {
    headerImg: require('../../assets/images/placeholders/profile_pic.png'),
    headerTitle: '/degen',
    headerSubtitle: 'limone.eth - serial frame hacker • @limone.eth',
    content:
      'time to share what we built this weekend in london!fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- social login- pay your friends- send request links- create virtual cards- connect your @gnosispaycc @frankk @orbulo',
    image: require('../../assets/images/placeholders/picture.png'),
    upvotesCount: 10,
    commentsCount: 3,
    quotesCount: 2,
    postTime: '2h',
  },
  {
    headerImg: require('../../assets/images/placeholders/profile_pic.png'),
    headerTitle: '/degen',
    headerSubtitle: 'limone.eth - serial frame hacker • @limone.eth',
    content:
      'time to share what we built this weekend in london!fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- social login- pay your friends- send request links- create virtual cards- connect your @gnosispaycc @frankk @orbulo',
    image: require('../../assets/images/placeholders/picture.png'),
    upvotesCount: 10,
    commentsCount: 3,
    quotesCount: 2,
    postTime: '2h',
  },
  {
    headerImg: require('../../assets/images/placeholders/profile_pic.png'),
    headerTitle: '/degen',
    headerSubtitle: 'limone.eth - serial frame hacker • @limone.eth',
    content:
      'time to share what we built this weekend in london!fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- social login- pay your friends- send request links- create virtual cards- connect your @gnosispaycc @frankk @orbulo',
    image: require('../../assets/images/placeholders/picture.png'),
    upvotesCount: 10,
    commentsCount: 3,
    quotesCount: 2,
    postTime: '2h',
  },
  {
    headerImg: require('../../assets/images/placeholders/profile_pic.png'),
    headerTitle: '/degen',
    headerSubtitle: 'limone.eth - serial frame hacker • @limone.eth',
    content:
      'time to share what we built this weekend in london!fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- social login- pay your friends- send request links- create virtual cards- connect your @gnosispaycc @frankk @orbulo',
    image: require('../../assets/images/placeholders/picture.png'),
    upvotesCount: 10,
    commentsCount: 3,
    quotesCount: 2,
    postTime: '2h',
  },
  {
    headerImg: require('../../assets/images/placeholders/profile_pic.png'),
    headerTitle: '/degen',
    headerSubtitle: 'limone.eth - serial frame hacker • @limone.eth',
    content:
      'time to share what we built this weekend in london!fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- social login- pay your friends- send request links- create virtual cards- connect your @gnosispaycc @frankk @orbulo',
    image: require('../../assets/images/placeholders/picture.png'),
    upvotesCount: 10,
    commentsCount: 3,
    quotesCount: 2,
    postTime: '2h',
  },
];

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
        console.log(res.data);
        setFeed(res.data.result);
        setFeedFetchStatus('success');
      } catch (error) {
        console.error(error);
        setFeedFetchStatus('error');
      }
    }

    fetchFeed();
  }, [authContext]);

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
            renderItem={({item}) => (
              <MyPost
                headerImg={item.author.pfp_url}
                postTime={item.timestamp}
                headerTitle={placeholderPosts[0].headerTitle}
                headerSubtitle={placeholderPosts[0].headerSubtitle}
                content={placeholderPosts[0].content}
                image={placeholderPosts[0].image ?? null}
                upvotesCount={placeholderPosts[0].upvotesCount}
                commentsCount={placeholderPosts[0].commentsCount}
                quotesCount={placeholderPosts[0].quotesCount}
                onContentBodyPress={() => {
                  navigation.navigate('ThreadDetail', {
                    threadId: 1,
                  });
                }}
              />
            )}
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
