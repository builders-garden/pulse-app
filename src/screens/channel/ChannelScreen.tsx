import {
  FlatListWithHeaders,
  Header,
  LargeHeader,
  ScalingView,
} from '@codeherence/react-native-header';
import {useScrollToTop} from '@react-navigation/native';
import axios from 'axios';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import {Channel, ChannelResponse} from '../../api/channel/types';
import {FeedItem, FeedResponse} from '../../api/feed/types';
import {RequestStatus} from '../../api/types';
import MenuLinesImg from '../../assets/images/icons/menu_lines.svg';
import PenImg from '../../assets/images/icons/pen.svg';
import MyFloatingButton from '../../components/MyFloatingButton';
import MyIconButtonBase from '../../components/MyIconButtonBase';
import MyLoader from '../../components/MyLoader';
import MyPlaceholderLoader from '../../components/MyPlaceholderLoader';
import MyButton from '../../components/buttons/MyButton';
import MyHeaderLeft from '../../components/header/MyHeaderLeft';
import MyHeaderRight from '../../components/header/MyHeaderRight';
import MyPost from '../../components/post/MyPost';
import {AuthContext} from '../../contexts/auth/Auth.context';
import {DrawerContext} from '../../contexts/drawer/Drawer.context';
import {fetchLinkPreview} from '../../libs/api';
import {TransformFeedItem} from '../../libs/post';
import {FeedStackScreenProps} from '../../routing/types';
import {MyTheme} from '../../theme';
import {ENDPOINT_CHANNELS} from '../../variables';
import ChannelHeader from './components/ChannelHeader';
import ChannelHeaderLarge from './components/ChannelHeaderLarge';

function ChannelScreen({route, navigation}: FeedStackScreenProps<'Channel'>) {
  const authContext = useContext(AuthContext);
  const drawerContext = useContext(DrawerContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedFetchStatus, setFeedFetchStatus] = useState<RequestStatus>('idle');
  const [newThreadsFetchStatus, setNewThreadsFetchStatus] =
    useState<RequestStatus>('idle');
  const [, setChannelFetchStatus] = useState<RequestStatus>('idle');
  const [channel, setChannel] = useState<Channel>();
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [cursor, setCursor] = useState<string>();
  const listRef = useRef(null);

  useScrollToTop(listRef);

  const fetchChannel = useCallback(async () => {
    setChannelFetchStatus('loading');
    // route.params.channelId
    try {
      // console.log('fetching channel...');
      const finalUrl = ENDPOINT_CHANNELS + '/' + route.params.channelId;
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
      // console.log('fetching feed...');
      const finalUrl =
        ENDPOINT_CHANNELS + '/' + route.params.channelId + '/feed?limit=10';
      // console.log('finalUrl', finalUrl);
      const res = await axios.get<FeedResponse>(finalUrl, {
        headers: {Authorization: `Bearer ${authContext.state.token}`},
      });

      const resList = [...res.data.result];
      for (let i = 0; i < resList.length; i++) {
        // console.log('cast', resList[i]);
        for (let j = 0; j < resList[i].embeds.length; j++) {
          if (resList[i].embeds[j].url) {
            const linkPreview = await fetchLinkPreview(
              resList[i].embeds[j].url,
            );

            resList[i].embeds[j].linkPreview = linkPreview;
          }
        }
      }

      setFeed(resList);
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
    if (route.params.showDrawer) {
      navigation.setOptions({
        headerLeft: () => (
          <>
            <MyIconButtonBase
              style="secondary"
              filling="clear"
              customStyle={{marginLeft: 15}}
              onPress={() => {
                drawerContext.show();
              }}
              icon={<MenuLinesImg color={MyTheme.black} />}
            />
          </>
        ),
      });
    }
  }, [navigation, route.params.showDrawer, drawerContext]);
  useEffect(() => {
    fetchFeed();
  }, [fetchFeed, authContext]);
  useEffect(() => {
    fetchChannel();
  }, [fetchChannel, authContext]);

  async function fetchNewItems() {
    try {
      setNewThreadsFetchStatus('loading');
      // console.log('fetching new threads');
      const finalUrl =
        ENDPOINT_CHANNELS + '/' + route.params.channelId + '/feed?limit=10';
      const res = await axios.get<FeedResponse>(
        `${finalUrl}&cursor=${cursor}`,
        {
          headers: {Authorization: `Bearer ${authContext.state.token}`},
        },
      );

      const resList = [...res.data.result];
      for (let i = 0; i < resList.length; i++) {
        // console.log('cast', resList[i]);
        for (let j = 0; j < resList[i].embeds.length; j++) {
          if (resList[i].embeds[j].url) {
            const linkPreview = await fetchLinkPreview(
              resList[i].embeds[j].url,
            );

            resList[i].embeds[j].linkPreview = linkPreview;
          }
        }
      }

      // console.log('got response');
      setFeed([...feed, ...resList]);
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
          postHash={item.hash}
          headerImg={transformedItem.headerImg}
          postTime={transformedItem.postTime}
          headerTitle={transformedItem.headerTitle}
          headerSubtitle={transformedItem.headerSubtitle}
          content={transformedItem.content}
          images={transformedItem.images}
          customStyle={{marginHorizontal: 15}}
          upvotesCount={transformedItem.upvotesCount}
          commentsCount={transformedItem.commentsCount}
          quotesCount={transformedItem.quotesCount}
          recasted={item?.viewer_context?.recasted}
          upvoted={item?.viewer_context?.liked}
          author={item.author}
          channel={item.channel ?? undefined}
          onContentBodyPress={() => {
            navigation.navigate('ThreadDetail', {
              threadHash: item.hash,
            });
          }}
          onHeaderTitlePress={() => {
            if (transformedItem.channel !== '') {
              navigation.navigate('Channel', {
                channelId: transformedItem.channel,
              });
            } else {
              navigation.navigate('Profile', {
                userFid: item.author.fid.toString(),
              });
            }
          }}
          onHeaderSubtitlePress={() => {
            navigation.navigate('Profile', {
              userFid: item.author.fid.toString(),
            });
          }}
          onHeaderImagePress={() => {
            if (transformedItem.channel !== '') {
              navigation.navigate('Channel', {
                channelId: transformedItem.channel,
              });
            } else {
              navigation.navigate('Profile', {
                userFid: item.author.fid.toString(),
              });
            }
          }}
          onCommentPress={() => {
            navigation.navigate('CreateComment', {
              cast: item,
            });
          }}
        />
      );
    },
    [navigation],
  );

  const HeaderComponent = useCallback(
    ({showNavBar}) => (
      <Header
        showNavBar={showNavBar}
        headerStyle={{
          backgroundColor: MyTheme.white,
        }}
        ignoreTopSafeArea
        headerLeft={
          <>
            <MyHeaderLeft />
            {channel && (
              <Animated.View style={{opacity: showNavBar}}>
                <ChannelHeader
                  title={channel?.name!}
                  subtitle={channel?.id!}
                  image={channel?.image_url!}
                  customStyle={{marginLeft: 10}}
                />
              </Animated.View>
            )}
          </>
        }
        headerRight={<MyHeaderRight />}
      />
    ),
    [channel],
  );

  const LargeHeaderComponent = useCallback(
    ({scrollY}) => (
      <>
        {
          <LargeHeader
            headerStyle={{
              paddingVertical: 0,
              paddingHorizontal: 0,
            }}>
            <ScalingView scrollY={scrollY} style={{width: '100%'}}>
              {channel && (
                <ChannelHeaderLarge
                  customStyle={{marginBottom: 15, width: '100%'}}
                  channel={channel}
                  onSeeMorePress={() => {
                    navigation.navigate('ChannelDetail', {
                      channelId: channel?.id!,
                    });
                  }}
                />
              )}
            </ScalingView>
          </LargeHeader>
        }
        {feedFetchStatus === 'loading' && !isRefreshing ? (
          <View style={{width: '100%', padding: 20}}>
            <MyPlaceholderLoader customStyle={{marginBottom: 20}} />
            <MyPlaceholderLoader />
          </View>
        ) : (
          feedFetchStatus === 'error' && (
            <View style={{width: '100%', padding: 20}}>
              <Text>Error fetching channel</Text>
              <MyButton
                title="Retry"
                onPress={() => {
                  fetchChannel();
                }}
              />
            </View>
          )
        )}
      </>
    ),
    [navigation, channel, fetchChannel, feedFetchStatus],
  );

  return (
    <>
      <MyFloatingButton
        icon={<PenImg width={25} height={25} color="white" />}
        onPress={() => {
          navigation.navigate('CreateThread', {channel: channel});
        }}
      />
      <FlatListWithHeaders
        ref={listRef}
        HeaderComponent={HeaderComponent}
        LargeHeaderComponent={LargeHeaderComponent}
        data={feed}
        showsVerticalScrollIndicator={false}
        windowSize={10}
        onEndReachedThreshold={1}
        onEndReached={() => {
          if (
            feedFetchStatus === 'success' &&
            newThreadsFetchStatus === 'idle' &&
            cursor
          ) {
            fetchNewItems();
          }
        }}
        onRefresh={refreshFeed}
        refreshing={isRefreshing}
        ListFooterComponent={
          newThreadsFetchStatus === 'loading' ? (
            <View
              style={{
                width: '100%',
                padding: 20,
                alignItems: 'center',
              }}>
              <MyLoader />
            </View>
          ) : null
        }
        ItemSeparatorComponent={() => <View style={{height: 15}} />}
        renderItem={renderItem}
        keyExtractor={(item, _) => item.hash}
      />
    </>
  );
}

export default ChannelScreen;
