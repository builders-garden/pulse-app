import axios from 'axios';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TrendingCastResult, TrendingCastsResponse} from '../../api/cast/types';
import {ChannelActivity, ChannelsResponse} from '../../api/channel/types';
import {RequestStatus} from '../../api/types';
import PenImg from '../../assets/images/icons/pen.svg';
import MyButton from '../../components/MyButton';
import MyFloatingButton from '../../components/MyFloatingButton';
import MyLoader from '../../components/MyLoader';
import {AuthContext} from '../../contexts/auth/Auth.context';
import {TransformTopChannels} from '../../libs/channels';
import {formatDate} from '../../libs/date';
import {HomeTabScreenProps} from '../../routing/types';
import {MyTheme} from '../../theme';
import {
  ENDPOINT_TRENDING_CASTS,
  ENDPOINT_TRENDING_CHANNELS,
} from '../../variables';
import ChannelCard from './components/ChannelCard';
import TrendingPostItem from './components/TrendingPostItem';

const placeholderCards = [
  {
    title: 'test title',
    subtitle: '66.4k followers',
    body: 'Lorem ipsum dolor sit amet consectetur. Mauris tincidunt pellentesque sit vitae magna.',
    buttonText: 'Follow',
  },
  {
    title: 'test title',
    subtitle: '66.4k followers',
    body: 'Lorem ipsum dolor sit amet consectetur.',
    buttonText: 'Follow',
  },
  {
    title: 'test title',
    subtitle: '66.4k followers',
    body: 'Lorem ipsum dolor sit amet consectetur.',
    buttonText: 'Follow',
  },
  {
    title: 'test title',
    subtitle: '66.4k followers',
    body: 'Lorem ipsum dolor sit amet consectetur. Mauris tincidunt pellentesque sit vitae magna.',
    buttonText: 'Follow',
  },
  {
    title: 'test title',
    subtitle: '66.4k followers',
    body: 'Lorem ipsum dolor sit amet consectetur. Mauris tincidunt pellentesque sit vitae magna.',
    buttonText: 'Follow',
  },
];

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

function DiscoverScreen({navigation}: HomeTabScreenProps<'Discover'>) {
  const authContext = useContext(AuthContext);
  const [channelsForYouFetchStatus, setChannelsForYouFetchStatus] =
    useState<RequestStatus>('idle');
  const [channelsForYou, setChannelsForYou] = useState<ChannelActivity[]>([]);
  const [topChannelsFetchStatus, setTopChannelsFetchStatus] =
    useState<RequestStatus>('idle');
  const [topChannels, setTopChannels] = useState<
    {
      item1: ChannelActivity;
      item2?: ChannelActivity;
      item3?: ChannelActivity;
    }[]
  >([]);
  const [trendingPostsFetchStatus, setTrendingPostsFetchStatus] =
    useState<RequestStatus>('idle');
  const [trendingPosts, setTrendingPosts] = useState<TrendingCastResult[]>([]);

  const fetchChannelsForYou = useCallback(async () => {
    setChannelsForYouFetchStatus('loading');
    try {
      console.log('fetching channels...');
      const finalUrl = ENDPOINT_TRENDING_CHANNELS;
      const res = await axios.get<ChannelsResponse>(finalUrl, {
        headers: {Authorization: `Bearer ${authContext.state.token}`},
      });
      setChannelsForYou(res.data.result.slice(0, 5));
      setChannelsForYouFetchStatus('success');
    } catch (error) {
      console.error(error);
      setChannelsForYouFetchStatus('error');
    }
  }, [authContext.state.token]);
  const fetchTrendingPosts = useCallback(async () => {
    setTrendingPostsFetchStatus('loading');
    try {
      console.log('fetching trending posts...');
      const finalUrl = ENDPOINT_TRENDING_CASTS;
      const res = await axios.get<TrendingCastsResponse>(finalUrl, {
        headers: {Authorization: `Bearer ${authContext.state.token}`},
      });
      console.log(res.data.result);
      setTrendingPosts(res.data.result);
      setTrendingPostsFetchStatus('success');
    } catch (error) {
      console.error(error);
      setTrendingPostsFetchStatus('error');
    }
  }, [authContext.state.token]);
  const fetchTopChannels = useCallback(async () => {
    setTopChannelsFetchStatus('loading');
    try {
      console.log('fetching channels...');
      const finalUrl = ENDPOINT_TRENDING_CHANNELS;
      const res = await axios.get<ChannelsResponse>(finalUrl, {
        headers: {Authorization: `Bearer ${authContext.state.token}`},
      });
      const transformed = TransformTopChannels(res.data.result);
      setTopChannels(transformed);
      setTopChannelsFetchStatus('success');
    } catch (error) {
      console.error(error);
      setTopChannelsFetchStatus('error');
    }
  }, [authContext.state.token]);

  useEffect(() => {
    fetchChannelsForYou();
  }, [fetchChannelsForYou, authContext]);
  useEffect(() => {
    fetchTopChannels();
  }, [fetchTopChannels, authContext]);
  useEffect(() => {
    fetchTrendingPosts();
  }, [fetchTrendingPosts, authContext]);

  const renderForYouItem = useCallback(
    ({item, index}: {item: ChannelActivity; index: number}) => (
      <ChannelCard
        channel={item.channel}
        customStyle={{
          marginLeft: index == 0 ? 20 : 10,
          marginRight: index == channelsForYou.length - 1 ? 20 : 0,
        }}
        onPress={() => {}}
        onButtonPress={() => {}}
      />
    ),
    [channelsForYou],
  );

  const renderTrendingPostItem = useCallback(
    ({item, index}: {item: TrendingCastResult; index: number}) => {
      console.log(item.cast.castedAtTimestamp);
      const castedDate = new Date(item.cast.castedAtTimestamp);
      const formattedDate = formatDate(castedDate);
      return (
        <TrendingPostItem
          headerTitle={item.cast.castedBy.profileDisplayName}
          headerSubtitle={item.cast.castedBy.profileHandle}
          headerImg={item.cast.castedBy.profileImage}
          content={item.cast.text}
          image={item.cast.embeds?.[0]?.url}
          upvotesCount={item.cast.numberOfLikes}
          commentsCount={item.cast.numberOfReplies}
          quotesCount={item.cast.numberOfRecasts}
          postTime={formattedDate}
          customStyle={{
            marginLeft: index == 0 ? 20 : 10,
            marginRight: index == trendingPosts.length - 1 ? 20 : 0,
          }}
          onContentBodyPress={() => {}}
          onButtonPress={() => {}}
        />
      );
    },
    [trendingPosts],
  );

  const renderTopChannelItem = useCallback(
    ({
      item,
      index,
    }: {
      item: {
        item1: ChannelActivity;
        item2?: ChannelActivity;
        item3?: ChannelActivity;
      };
      index: number;
    }) => (
      <View
        style={{
          marginLeft: index == 0 ? 20 : 10,
          marginRight: index == topChannels.length - 1 ? 20 : 0,
        }}>
        <ChannelCard
          channel={item.item1.channel}
          customStyle={{
            marginRight: index == topChannels.length - 1 ? 20 : 0,
            height: 130,
          }}
          onPress={() => {}}
          onButtonPress={() => {}}
        />
        {item.item2 && (
          <ChannelCard
            channel={item.item2.channel}
            customStyle={{
              marginRight: index == topChannels.length - 1 ? 20 : 0,
              marginTop: 10,
              height: 130,
            }}
            onPress={() => {}}
            onButtonPress={() => {}}
          />
        )}
        {item.item3 && (
          <ChannelCard
            channel={item.item3.channel}
            customStyle={{
              marginRight: index == topChannels.length - 1 ? 20 : 0,
              marginTop: 10,
              height: 130,
            }}
            onPress={() => {}}
            onButtonPress={() => {}}
          />
        )}
      </View>
    ),
    [topChannels],
  );

  // const transformedTopChannels = placeholderCards.reduce(
  //   (acc, curr, index, array) => {
  //     if (index % 2 === 0) {
  //       if (index === array.length - 1) {
  //         acc.push({item1: curr});
  //       } else {
  //         acc.push({item1: curr, item2: array[index + 1]});
  //       }
  //     }
  //     return acc;
  //   },
  //   [] as Array<{
  //     item1: (typeof placeholderCards)[0];
  //     item2?: (typeof placeholderCards)[0];
  //   }>,
  // );

  if (
    channelsForYouFetchStatus === 'loading' ||
    trendingPostsFetchStatus === 'loading'
  ) {
    return (
      <View style={styles.loadingCtn}>
        <MyLoader />
      </View>
    );
  } else if (
    channelsForYouFetchStatus === 'error' ||
    trendingPostsFetchStatus === 'error'
  ) {
    return (
      <View style={styles.errorCtn}>
        <MyButton
          title="Retry"
          width={'auto'}
          onPress={() => {
            if (channelsForYouFetchStatus === 'error') {
              fetchChannelsForYou();
            } else {
              fetchTrendingPosts();
            }
          }}
        />
      </View>
    );
  }

  return (
    <View>
      <MyFloatingButton
        icon={<PenImg width={25} height={25} color="white" />}
        onPress={() => {
          navigation.navigate('CreateThread');
        }}
      />
      <ScrollView style={styles.root}>
        <View>
          <Text style={styles.sectionLabel}>For you</Text>
          <FlatList
            horizontal
            data={channelsForYou}
            renderItem={renderForYouItem}
          />
        </View>
        <View style={{marginTop: 30}}>
          <Text style={styles.sectionLabel}>Trending threads</Text>
          <FlatList
            horizontal
            data={trendingPosts}
            renderItem={renderTrendingPostItem}
          />
        </View>
        {/* <View style={{marginTop: 30}}>
          <Text style={styles.sectionLabel}>Top channels</Text>
          <FlatList
            horizontal
            data={topChannels}
            renderItem={renderTopChannelItem}
          />
        </View> */}
        <View style={{marginTop: 30, marginBottom: 20}}>
          <Text style={styles.sectionLabel}>Top channels</Text>
          <FlatList
            horizontal
            data={topChannels}
            renderItem={renderTopChannelItem}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginTop: 20,
  },
  loadingCtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingBottom: 100,
  },
  errorCtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingBottom: 100,
  },
  sectionLabel: {
    fontFamily: MyTheme.fontBold,
    color: MyTheme.grey400,
    fontSize: 14,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});

export default DiscoverScreen;
