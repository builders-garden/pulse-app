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
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Drawer} from 'react-native-drawer-layout';
import {
  ChannelActivity,
  ChannelsResponse,
  MostRecentChannel,
  MostRecentChannelsResponse,
} from '../api/channel/types';
import {RequestStatus} from '../api/types';
import ChatImg from '../assets/images/icons/chat.svg';
import {AuthContext} from '../contexts/auth/Auth.context';
import {MyTheme} from '../theme';
import {
  ENDPOINT_FAVORITE_CHANNELS,
  ENDPOINT_MOST_RECENT_CHANNELS,
} from '../variables';
import MyButton from './MyButton';
import MyLoader from './MyLoader';
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
  const [favoritesChannels, setFavoriteChannels] = useState<ChannelActivity[]>(
    [],
  );
  const [favoritesChannelsFetchStatus, setFavoriteChannelsFetchStatus] =
    useState<RequestStatus>('idle');
  const [recentChannels, setRecentChannels] = useState<MostRecentChannel[]>([]);
  const [recentChannelsFetchStatus, setRecentChannelsFetchStatus] =
    useState<RequestStatus>('idle');

  // FETCH FUNCTIONS
  const fetchFavoritesChannels = useCallback(async () => {
    console.log('fetching favorites');
    setFavoriteChannelsFetchStatus('loading');
    try {
      const finalUrl = ENDPOINT_FAVORITE_CHANNELS;
      const res = await axios.get<ChannelsResponse>(finalUrl, {
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

  // RENDER FUNCTIONS
  const renderNavigationView = useCallback(() => {
    if (
      favoritesChannelsFetchStatus === 'loading' ||
      recentChannelsFetchStatus === 'loading'
    ) {
      return (
        <View style={styles.loadingCtn}>
          <MyLoader />
        </View>
      );
    } else if (
      favoritesChannelsFetchStatus === 'error' ||
      recentChannelsFetchStatus === 'error'
    ) {
      return (
        <View style={styles.errorCtn}>
          <MyButton
            title="Retry"
            width={'auto'}
            onPress={() => {
              if (favoritesChannelsFetchStatus === 'error') {
                fetchFavoritesChannels();
              } else {
                fetchRecentChannels();
              }
            }}
          />
        </View>
      );
    }

    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Pressable
            onPress={() => {
              onPressItem && onPressItem();
              navigation.dispatch(StackActions.replace('Feed'));
            }}>
            <View style={styles.followingBox}>
              <ChatImg width={24} height={24} color={MyTheme.primaryLight} />
              <Text style={styles.followingText}>Following</Text>
            </View>
          </Pressable>
          <View style={styles.section}>
            <Text style={styles.headingText}>Favorites</Text>
            <View style={styles.sectionItemsCtn}>
              {/* Replace with your actual images */}
              {favoritesChannels.map(item => (
                <Pressable
                  onPress={() => {
                    onPressItem && onPressItem();
                    navigation.dispatch(
                      StackActions.replace('Channel', {
                        channelId: item.channel.id,
                      }),
                    );
                    // navigation.navigate('Channel', {
                    //   channelId: item.channel.id,
                    // });
                  }}
                  key={item.channel.id}>
                  <View style={styles.sectionItem}>
                    <Image
                      source={{uri: item.channel.image_url}}
                      style={styles.sectionItemImg}
                    />
                    <Text style={styles.sectionItemText} numberOfLines={2}>
                      {item.channel.name}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.headingText}>Recent</Text>
            <View style={styles.sectionItemsCtn}>
              {/* Replace with your actual images */}
              {recentChannels.map(item => (
                <Pressable
                  onPress={() => {
                    onPressItem && onPressItem();
                    navigation.dispatch(
                      StackActions.replace('Channel', {
                        channelId: item.channelId,
                      }),
                    );
                    // navigation.navigate('Channel', {
                    //   channelId: item.channel.id,
                    // });
                  }}
                  key={item.channelId}>
                  <View style={styles.sectionItem}>
                    <Image
                      source={{uri: item.imageUrl}}
                      style={styles.sectionItemImg}
                    />
                    <Text style={styles.sectionItemText} numberOfLines={2}>
                      {item.name}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.headingText}>All</Text>
            {[1, 2, 3, 4].map((item, index) => (
              <View
                style={[
                  styles.sectionItemHorizontal,
                  index < 3 && {marginBottom: 10},
                ]}
                key={item}>
                <Image
                  source={{uri: 'https://picsum.photos/200/300'}}
                  style={styles.sectionItemImg}
                />
                <Text style={styles.sectionItemHorizontalText}>Text</Text>
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  }, [
    favoritesChannels,
    favoritesChannelsFetchStatus,
    navigation,
    fetchFavoritesChannels,
    onPressItem,
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
    fontSize: 14,
    marginLeft: 5,
    color: MyTheme.black,
  },
});

export default MyDrawer;
