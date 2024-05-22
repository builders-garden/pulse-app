import axios from 'axios';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {Channel, ChannelResponse} from '../../api/channel/types';
import {FeedItem, FeedResponse} from '../../api/feed/types';
import {RequestStatus} from '../../api/types';
import PenImg from '../../assets/images/icons/pen.svg';
import MyButton from '../../components/MyButton';
import MyFloatingButton from '../../components/MyFloatingButton';
import MyLoader from '../../components/MyLoader';
import MyPlaceholderLoader from '../../components/MyPlaceholderLoader';
import MyPost from '../../components/post/MyPost';
import {AuthContext} from '../../contexts/auth/Auth.context';
import {TransformFeedItem} from '../../libs/post';
import {FeedStackScreenProps} from '../../routing/types';
import {ENDPOINT_CHANNEL} from '../../variables';
import Header from './components/Header';

function ChannelScreen({route, navigation}: FeedStackScreenProps<'Channel'>) {
  const authContext = useContext(AuthContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedFetchStatus, setFeedFetchStatus] = useState<RequestStatus>('idle');
  const [newThreadsFetchStatus, setNewThreadsFetchStatus] =
    useState<RequestStatus>('idle');
  const [channelFetchStatus, setChannelFetchStatus] =
    useState<RequestStatus>('idle');
  const [channel, setChannel] = useState<Channel>();
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [cursor, setCursor] = useState<string>();

  const fetchChannel = useCallback(async () => {
    setChannelFetchStatus('loading');
    // route.params.channelId
    try {
      console.log('fetching channel...');
      const finalUrl = ENDPOINT_CHANNEL + route.params.channelId;
      const res = await axios.get<ChannelResponse>(finalUrl, {
        headers: {Authorization: `Bearer ${authContext.state.token}`},
      });
      setChannel(res.data.result);
      setChannelFetchStatus('success');
    } catch (error) {
      console.error(error);
      setChannelFetchStatus('error');
    }
  }, [authContext.state.token, route.params.channelId]);

  const fetchFeed = useCallback(async () => {
    setFeedFetchStatus('loading');
    try {
      console.log('fetching feed...');
      const finalUrl =
        ENDPOINT_CHANNEL + route.params.channelId + '/feed?limit=10';
      console.log('finalUrl', finalUrl);
      const res = await axios.get<FeedResponse>(finalUrl, {
        headers: {Authorization: `Bearer ${authContext.state.token}`},
      });
      setFeed(res.data.result);
      setCursor(res.data.cursor);
      setFeedFetchStatus('success');
    } catch (error) {
      console.error(error);
      setFeedFetchStatus('error');
    }
  }, [authContext.state.token, route.params.channelId]);

  const refreshFeed = useCallback(async () => {
    setIsRefreshing(true);
    await fetchFeed();
    setIsRefreshing(false);
  }, [fetchFeed]);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed, authContext]);
  useEffect(() => {
    fetchChannel();
  }, [fetchChannel, authContext]);

  async function fetchNewItems() {
    try {
      setNewThreadsFetchStatus('loading');
      console.log('fetching new threads');
      const finalUrl =
        ENDPOINT_CHANNEL + route.params.channelId + '/feed?limit=10';
      const res = await axios.get<FeedResponse>(
        `${finalUrl}&cursor=${cursor}`,
        {
          headers: {Authorization: `Bearer ${authContext.state.token}`},
        },
      );
      // console.log('got response');
      setFeed([...feed, ...res.data.result]);
      setCursor(res.data.cursor);
      setNewThreadsFetchStatus('success');
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Error fetching new items',
      });
      setNewThreadsFetchStatus('error');
    }
  }

  const renderItem = useCallback(
    ({item}: {item: FeedItem}) => {
      const transformedItem = TransformFeedItem(item);

      return (
        <MyPost
          headerImg={transformedItem.headerImg}
          postTime={transformedItem.postTime}
          headerTitle={transformedItem.headerTitle}
          headerSubtitle={transformedItem.headerSubtitle}
          content={transformedItem.content}
          image={transformedItem.image}
          customStyle={{marginHorizontal: 15}}
          upvotesCount={transformedItem.upvotesCount}
          commentsCount={transformedItem.commentsCount}
          quotesCount={transformedItem.quotesCount}
          onContentBodyPress={() => {
            navigation.navigate('ThreadDetail', {
              threadHash: item.hash,
            });
          }}
        />
      );
    },
    [navigation],
  );

  if (channelFetchStatus === 'loading') {
    return (
      <View style={{width: '100%', padding: 20}}>
        <MyPlaceholderLoader customStyle={{marginBottom: 20}} />
        <MyPlaceholderLoader />
      </View>
    );
  } else if (channelFetchStatus === 'error') {
    return (
      <View style={{width: '100%', padding: 20}}>
        <Text>Error fetching channel</Text>
        <MyButton
          title="Retry"
          onPress={() => {
            fetchChannel();
          }}
        />
      </View>
    );
  }

  return (
    <View>
      {feedFetchStatus === 'success' ||
      (feed.length > 0 &&
        (isRefreshing || newThreadsFetchStatus == 'loading')) ? (
        <>
          <MyFloatingButton
            icon={<PenImg width={25} height={25} color="white" />}
            onPress={() => {
              navigation.navigate('CreateThread');
            }}
          />
          <FlatList
            data={feed}
            windowSize={10}
            onEndReachedThreshold={1}
            onEndReached={fetchNewItems}
            onRefresh={refreshFeed}
            refreshing={feedFetchStatus === 'loading'}
            ListHeaderComponent={
              <Header
                customStyle={{marginBottom: 15}}
                channel={channel!}
                onSeeMorePress={() => {
                  navigation.navigate('ChannelDetail', {
                    channel: channel!,
                  });
                }}
              />
            }
            ListFooterComponent={
              newThreadsFetchStatus === 'loading' ? (
                <View
                  style={{width: '100%', padding: 20, alignItems: 'center'}}>
                  <MyLoader />
                </View>
              ) : null
            }
            ItemSeparatorComponent={() => <View style={{height: 15}} />}
            renderItem={renderItem}
            keyExtractor={(item, _) => item.hash}
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

export default ChannelScreen;
