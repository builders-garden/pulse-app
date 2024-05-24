import {StackActions, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Drawer} from 'react-native-drawer-layout';
import Toast from 'react-native-toast-message';
import {
  Channel,
  ChannelActivity,
  ChannelsResponse,
  FavoriteChannelsResponse,
  MostRecentChannel,
  MostRecentChannelsResponse,
} from '../../api/channel/types';
import {RequestStatus} from '../../api/types';
import {AuthContext} from '../../contexts/auth/Auth.context';
import {MyTheme} from '../../theme';
import {
  ENDPOINT_CHANNELS,
  ENDPOINT_FAVORITE_CHANNELS,
  ENDPOINT_MOST_RECENT_CHANNELS,
} from '../../variables';
import MyButton from '../MyButton';
import MyLoader from '../MyLoader';
import MyDrawerHeader from './MyDrawerHeader';
interface MyDrawerProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onPressItem?: () => void;
}

const MyDrawer = ({
  isOpen,
  onOpen,
  onClose,
  onPressItem,
  children,
}: PropsWithChildren<MyDrawerProps>) => {
  const authContext = useContext(AuthContext);
  const navigation = useNavigation<any>();
  const [favoriteChannels, setFavoriteChannels] = useState<ChannelActivity[]>(
    [],
  );
  const [favoriteChannelsFetchStatus, setFavoriteChannelsFetchStatus] =
    useState<RequestStatus>('idle');
  const [recentChannels, setRecentChannels] = useState<MostRecentChannel[]>([]);
  const [recentChannelsFetchStatus, setRecentChannelsFetchStatus] =
    useState<RequestStatus>('idle');
  const [allChannels, setAllChannels] = useState<Channel[]>([]);
  const [allChannelsFetchStatus, setAllChannelsFetchStatus] =
    useState<RequestStatus>('idle');
  const [newAllChannelsFetchStatus, setNewAllChannelsFetchStatus] =
    useState<RequestStatus>('idle');
  const [cursor, setCursor] = useState<string>();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // FETCH FUNCTIONS
  const fetchFavoritesChannels = useCallback(async () => {
    console.log('fetching favorites');
    setFavoriteChannelsFetchStatus('loading');
    try {
      const finalUrl = ENDPOINT_FAVORITE_CHANNELS;
      const res = await axios.get<FavoriteChannelsResponse>(finalUrl, {
        headers: {Authorization: `Bearer ${authContext.state.token}`},
      });
      console.log('got response');
      setFavoriteChannels(res.data.result.splice(0, 4));
      setFavoriteChannelsFetchStatus('success');
    } catch (error) {
      console.error(error);
      setFavoriteChannelsFetchStatus('error');
    }
  }, [authContext.state.token]);
  const fetchRecentChannels = useCallback(async () => {
    console.log('fetching recents');
    setRecentChannelsFetchStatus('loading');
    try {
      const finalUrl = ENDPOINT_MOST_RECENT_CHANNELS + '?limit=4';
      const res = await axios.get<MostRecentChannelsResponse>(finalUrl, {
        headers: {Authorization: `Bearer ${authContext.state.token}`},
      });
      console.log('got response');
      setRecentChannels(res.data.result);
      setRecentChannelsFetchStatus('success');
    } catch (error) {
      console.error(error);
      setRecentChannelsFetchStatus('error');
    }
  }, [authContext.state.token]);
  const fetchAllChannels = useCallback(async () => {
    console.log('fetching all');
    setAllChannelsFetchStatus('loading');
    try {
      const finalUrl = ENDPOINT_CHANNELS + '?limit=15';
      const res = await axios.get<ChannelsResponse>(finalUrl, {
        headers: {Authorization: `Bearer ${authContext.state.token}`},
      });
      console.log('got response');
      setAllChannels(res.data.result.channels);
      setCursor(res.data.result.next.cursor);
      setAllChannelsFetchStatus('success');
    } catch (error) {
      console.error(error);
      setAllChannelsFetchStatus('error');
    }
  }, [authContext.state.token]);
  const fetchNewAllChannels = useCallback(async () => {
    if (
      newAllChannelsFetchStatus !== 'loading' &&
      allChannelsFetchStatus === 'success'
    ) {
      try {
        setNewAllChannelsFetchStatus('loading');
        console.log('fetching new channels');
        const finalUrl = `${ENDPOINT_CHANNELS}?limit=20&cursor=${cursor}`;
        const res = await axios.get<ChannelsResponse>(finalUrl, {
          headers: {Authorization: `Bearer ${authContext.state.token}`},
        });
        // console.log('got response');
        setAllChannels([...allChannels, ...res.data.result.channels]);
        setCursor(res.data.result.next.cursor);
        setNewAllChannelsFetchStatus('success');
      } catch (error) {
        console.error(error);
        Toast.show({
          type: 'error',
          text1: 'Error fetching new items',
        });
        setNewAllChannelsFetchStatus('error');
      }
    } else {
      console.log('already fetching');
    }
  }, [
    authContext.state.token,
    cursor,
    allChannels,
    allChannelsFetchStatus,
    newAllChannelsFetchStatus,
  ]);
  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchAllChannels();
    await fetchRecentChannels();
    await fetchFavoritesChannels();
    setIsRefreshing(false);
  }, [fetchAllChannels, fetchRecentChannels, fetchFavoritesChannels]);

  // EFFECTS
  useEffect(() => {
    if (authContext.state.token) {
      fetchFavoritesChannels();
    }
  }, [authContext.state.token, fetchFavoritesChannels]);
  useEffect(() => {
    if (authContext.state.token) {
      fetchRecentChannels();
    }
  }, [authContext.state.token, fetchRecentChannels]);
  useEffect(() => {
    if (authContext.state.token) {
      fetchAllChannels();
    }
  }, [authContext.state.token, fetchAllChannels]);

  // RENDER FUNCTIONS
  const renderChannelItem = useCallback(
    ({item}: {item: Channel}) => {
      return (
        <Pressable
          onPress={() => {
            onPressItem && onPressItem();
            navigation.dispatch(
              StackActions.replace('Channel', {
                channelId: item.id,
              }),
            );
          }}
          key={item.id}>
          <View style={styles.sectionItemHorizontal}>
            <Image
              source={{uri: item.image_url}}
              style={styles.sectionItemImg}
            />
            <Text style={styles.sectionItemHorizontalText} numberOfLines={2}>
              {item.name}
            </Text>
          </View>
        </Pressable>
      );
    },
    [navigation, onPressItem],
  );
  const renderNavigationView = useCallback(() => {
    if (
      (favoriteChannelsFetchStatus === 'loading' ||
        recentChannelsFetchStatus === 'loading' ||
        allChannelsFetchStatus === 'loading') &&
      !isRefreshing
    ) {
      return (
        <View style={styles.loadingCtn}>
          <MyLoader />
        </View>
      );
    } else if (
      favoriteChannelsFetchStatus === 'error' ||
      recentChannelsFetchStatus === 'error' ||
      allChannelsFetchStatus === 'error'
    ) {
      return (
        <View style={styles.errorCtn}>
          <MyButton
            title="Retry"
            width={'auto'}
            onPress={() => {
              if (favoriteChannelsFetchStatus === 'error') {
                fetchFavoritesChannels();
              } else if (recentChannelsFetchStatus === 'error') {
                fetchRecentChannels();
              } else {
                fetchAllChannels();
              }
            }}
          />
        </View>
      );
    }

    return (
      ((favoriteChannelsFetchStatus === 'success' &&
        recentChannelsFetchStatus === 'success' &&
        allChannelsFetchStatus === 'success') ||
        isRefreshing) && (
        <SafeAreaView>
          <FlatList
            style={{paddingHorizontal: 15, paddingTop: 15}}
            data={allChannels}
            windowSize={20}
            onEndReachedThreshold={0.1}
            onEndReached={fetchNewAllChannels}
            onRefresh={refresh}
            refreshing={isRefreshing}
            ListHeaderComponent={
              <MyDrawerHeader
                favoriteChannels={favoriteChannels}
                recentChannels={recentChannels}
                onPressItem={onPressItem}
              />
            }
            ListFooterComponent={
              newAllChannelsFetchStatus === 'loading' ? (
                <View
                  style={{width: '100%', padding: 20, alignItems: 'center'}}>
                  <MyLoader />
                </View>
              ) : null
            }
            ItemSeparatorComponent={() => <View style={{height: 15}} />}
            renderItem={renderChannelItem}
            keyExtractor={(item, _) => item.id}
          />
        </SafeAreaView>
      )
    );
  }, [
    favoriteChannels,
    favoriteChannelsFetchStatus,
    recentChannels,
    recentChannelsFetchStatus,
    allChannels,
    allChannelsFetchStatus,
    newAllChannelsFetchStatus,
    isRefreshing,
    fetchFavoritesChannels,
    fetchRecentChannels,
    fetchAllChannels,
    onPressItem,
    fetchNewAllChannels,
    renderChannelItem,
    refresh,
  ]);

  return (
    <Drawer
      renderDrawerContent={renderNavigationView}
      open={isOpen}
      swipeEnabled={false}
      onOpen={() => {
        onOpen && onOpen();
      }}
      onClose={() => {
        onClose && onClose();
      }}>
      {children}
    </Drawer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
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
  followingBox: {
    backgroundColor: MyTheme.primaryLightOpacity,
    borderRadius: 4,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  followingText: {
    color: MyTheme.primaryLight,
    fontSize: 16,
    fontFamily: MyTheme.fontRegular,
    marginLeft: 6,
  },
  section: {
    marginTop: 20,
  },
  headingText: {
    color: MyTheme.grey300,
    fontFamily: MyTheme.fontBold,
    marginBottom: 10,
  },
  sectionItemsCtn: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  sectionItem: {
    alignItems: 'center',
  },
  sectionItemImg: {width: 30, height: 30, borderRadius: 3},
  sectionItemText: {
    fontFamily: MyTheme.fontRegular,
    fontSize: 12,
    marginTop: 5,
    width: 55,
    color: MyTheme.black,
    textAlign: 'center',
  },
  sectionItemHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionItemHorizontalText: {
    fontFamily: MyTheme.fontRegular,
    flex: 1,
    fontSize: 13,
    marginLeft: 5,
    color: MyTheme.black,
  },
});

export default MyDrawer;
