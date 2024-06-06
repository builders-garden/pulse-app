import {useScrollToTop} from '@react-navigation/native';
import axios from 'axios';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TrendingCastResult, TrendingCastsResponse} from '../../api/cast/types';
import {
  ChannelActivity,
  MostFollowedChannel,
  MostFollowedChannelsResponse,
  NewChannel,
  NewChannelsResponse,
  TrendingChannelsResponse,
} from '../../api/channel/types';
import {RequestStatus} from '../../api/types';
import PenImg from '../../assets/images/icons/pen.svg';
import MyFloatingButton from '../../components/MyFloatingButton';
import MyLoader from '../../components/MyLoader';
import MyButton from '../../components/buttons/MyButton';
import {AuthContext} from '../../contexts/auth/Auth.context';
import {TransformArrayTo3x3} from '../../libs/arrays';
import {HomeTabScreenProps} from '../../routing/types';
import {MyTheme} from '../../theme';
import {
  ENDPOINT_MOST_FOLLOWED_CHANNELS,
  ENDPOINT_MOST_RECENT_CHANNELS,
  ENDPOINT_TRENDING_CASTS,
  ENDPOINT_TRENDING_CHANNELS,
} from '../../variables';
import ChannelCard from './components/ChannelCard';
import TrendingPostItem from './components/TrendingPostItem';

function DiscoverScreen({navigation}: HomeTabScreenProps<'Discover'>) {
  const authContext = useContext(AuthContext);
  const [channelsForYouFetchStatus, setChannelsForYouFetchStatus] =
    useState<RequestStatus>('idle');
  const [channelsForYou, setChannelsForYou] = useState<ChannelActivity[]>([]);
  const [topChannelsFetchStatus, setTopChannelsFetchStatus] =
    useState<RequestStatus>('idle');
  const [topChannels, setTopChannels] = useState<MostFollowedChannel[][]>([]);
  const [newChannelsFetchStatus, setNewChannelsFetchStatus] =
    useState<RequestStatus>('idle');
  const [newChannels, setNewChannels] = useState<NewChannel[][]>([]);
  const [trendingPostsFetchStatus, setTrendingPostsFetchStatus] =
    useState<RequestStatus>('idle');
  const [trendingPosts, setTrendingPosts] = useState<TrendingCastResult[]>([]);
  const listRef = useRef(null);

  useScrollToTop(listRef);

  // FETCH FUNCTIONS
  const fetchChannelsForYou = useCallback(async () => {
    setChannelsForYouFetchStatus('loading');
    try {
      console.log('fetching trending channels...');
      const finalUrl = ENDPOINT_TRENDING_CHANNELS;
      const res = await axios.get<TrendingChannelsResponse>(finalUrl, {
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
      console.log('trending cast', JSON.stringify(res.data.result));
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
      console.log('fetching top channels...');
      const finalUrl = ENDPOINT_MOST_FOLLOWED_CHANNELS;
      const res = await axios.get<MostFollowedChannelsResponse>(finalUrl, {
        headers: {Authorization: `Bearer ${authContext.state.token}`},
      });
      const transformed = TransformArrayTo3x3<MostFollowedChannel>(
        res.data.result,
      );
      setTopChannels(transformed);
      setTopChannelsFetchStatus('success');
    } catch (error) {
      console.error(error);
      setTopChannelsFetchStatus('error');
    }
  }, [authContext.state.token]);
  const fetchNewChannels = useCallback(async () => {
    setNewChannelsFetchStatus('loading');
    try {
      console.log('fetching most recent channels...');
      const finalUrl = ENDPOINT_MOST_RECENT_CHANNELS + '?limit=9';
      const res = await axios.get<NewChannelsResponse>(finalUrl, {
        headers: {Authorization: `Bearer ${authContext.state.token}`},
      });
      console.log('new channels', JSON.stringify(res.data));
      const transformed = TransformArrayTo3x3<NewChannel>(
        res?.data?.result ?? [],
      );
      setNewChannels(transformed);
      setNewChannelsFetchStatus('success');
    } catch (error) {
      console.error(error);
      setNewChannelsFetchStatus('error');
    }
  }, [authContext.state.token]);

  // EFFECTS
  useEffect(() => {
    fetchChannelsForYou();
  }, [fetchChannelsForYou, authContext]);
  useEffect(() => {
    fetchTopChannels();
  }, [fetchTopChannels, authContext]);
  useEffect(() => {
    fetchTrendingPosts();
  }, [fetchTrendingPosts, authContext]);
  useEffect(() => {
    fetchNewChannels();
  }, [fetchNewChannels, authContext]);

  // RENDER FUNCTIONS
  const renderForYouItem = useCallback(
    ({item, index}: {item: ChannelActivity; index: number}) => (
      <ChannelCard
        description={item.channel.description}
        followerCount={item.channel.follower_count}
        imageUrl={item.channel.image_url}
        id={item.channel.id}
        name={item.channel.name}
        customStyle={{
          marginLeft: index == 0 ? 20 : 10,
          marginRight: index == channelsForYou.length - 1 ? 20 : 0,
        }}
        onPress={() => {
          navigation.navigate('FeedRoot', {
            screen: 'Channel',
            params: {channelId: item.channel.id, showDrawer: true},
          });
        }}
        onButtonPress={() => {}}
      />
    ),
    [channelsForYou, navigation],
  );
  const renderTrendingPostItem = useCallback(
    ({item, index}: {item: TrendingCastResult; index: number}) => {
      return (
        <TrendingPostItem
          trendingCast={item}
          customStyle={{
            marginLeft: index == 0 ? 20 : 10,
            marginRight: index == trendingPosts.length - 1 ? 20 : 0,
          }}
          onContentBodyPress={() => {
            navigation.navigate('FeedRoot', {
              screen: 'ThreadDetail',
              params: {threadHash: item.cast.hash},
            });
          }}
          onButtonPress={() => {}}
        />
      );
    },
    [trendingPosts, navigation],
  );
  const renderTopChannelItem = useCallback(
    ({item, index}: {item: MostFollowedChannel[]; index: number}) => (
      <View
        style={{
          marginLeft: index == 0 ? 20 : 10,
          marginRight: index == topChannels.length - 1 ? 20 : 0,
        }}>
        {item.map((channel, subIndex) => {
          return (
            <ChannelCard
              key={channel.channelId}
              name={channel.name}
              description={'description'}
              followerCount={channel.followerCount}
              imageUrl={channel.imageUrl}
              id={channel.channelId}
              customStyle={{
                marginRight: index == topChannels.length - 1 ? 20 : 0,
                marginTop: subIndex == 0 ? 0 : 10,
                height: 130,
              }}
              onPress={() => {
                navigation.navigate('FeedRoot', {
                  screen: 'Channel',
                  params: {channelId: channel.channelId, showDrawer: true},
                });
              }}
              onButtonPress={() => {}}
            />
          );
        })}
      </View>
    ),
    [topChannels, navigation],
  );
  const renderNewChannelItem = useCallback(
    ({item, index}: {item: NewChannel[]; index: number}) => (
      <View
        style={{
          marginLeft: index == 0 ? 20 : 10,
          marginRight: index == topChannels.length - 1 ? 20 : 0,
        }}>
        {item.map((channel, subIndex) => {
          return (
            <ChannelCard
              key={channel.channelId}
              name={channel.name}
              description={'description'}
              imageUrl={channel.imageUrl}
              id={channel.channelId}
              customStyle={{
                marginRight: index == topChannels.length - 1 ? 20 : 0,
                marginTop: subIndex == 0 ? 0 : 10,
                height: 130,
              }}
              onPress={() => {
                navigation.navigate('FeedRoot', {
                  screen: 'Channel',
                  params: {channelId: channel.channelId, showDrawer: true},
                });
              }}
              onButtonPress={() => {}}
            />
          );
        })}
      </View>
    ),
    [topChannels, navigation],
  );

  if (
    channelsForYouFetchStatus === 'loading' ||
    trendingPostsFetchStatus === 'loading' ||
    topChannelsFetchStatus === 'loading' ||
    newChannelsFetchStatus === 'loading'
  ) {
    return (
      <View style={styles.loadingCtn}>
        <MyLoader />
      </View>
    );
  } else if (
    channelsForYouFetchStatus === 'error' ||
    trendingPostsFetchStatus === 'error' ||
    topChannelsFetchStatus === 'error' ||
    newChannelsFetchStatus === 'error'
  ) {
    return (
      <View style={styles.errorCtn}>
        <MyButton
          title="Retry"
          width={'auto'}
          onPress={() => {
            if (channelsForYouFetchStatus === 'error') {
              fetchChannelsForYou();
            } else if (trendingPostsFetchStatus === 'error') {
              fetchTrendingPosts();
            } else if (topChannelsFetchStatus === 'error') {
              fetchTopChannels();
            } else if (newChannelsFetchStatus === 'error') {
              fetchNewChannels();
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
          navigation.navigate('CreateThread', {});
        }}
      />
      <ScrollView ref={listRef} style={styles.root}>
        <View>
          <Text style={styles.sectionLabel}>Trending channels</Text>
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
        <View style={{marginTop: 30}}>
          <Text style={styles.sectionLabel}>Top channels</Text>
          <FlatList
            horizontal
            data={topChannels}
            renderItem={renderTopChannelItem}
          />
        </View>
        <View style={{marginTop: 30, marginBottom: 20}}>
          <Text style={styles.sectionLabel}>New channels</Text>
          <FlatList
            horizontal
            data={newChannels}
            renderItem={renderNewChannelItem}
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
