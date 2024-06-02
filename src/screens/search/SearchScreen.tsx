import axios, {CancelToken} from 'axios';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {Channel, ChannelsResponse} from '../../api/channel/types';
import {Profile, ProfileSearchResponse} from '../../api/profile/types';
import {RequestStatus} from '../../api/types';
import BackImg from '../../assets/images/icons/back.svg';
import MyButton from '../../components/MyButton';
import MyIconButtonBase from '../../components/MyIconButtonBase';
import MyLoader from '../../components/MyLoader';
import MyPlaceholderLoader from '../../components/MyPlaceholderLoader';
import MySearchField from '../../components/inputs/MySearchField';
import MyTabs from '../../components/tabs/MyTabs';
import {AuthContext} from '../../contexts/auth/Auth.context';
import {RootStackScreenProps} from '../../routing/types';
import {MyTheme} from '../../theme';
import {ENDPOINT_CHANNELS, ENDPOINT_PROFILE} from '../../variables';
import ChannelLine from './components/ChannelLine';
import ProfileLine from './components/ProfileLine';

function SearchScreen({navigation}: RootStackScreenProps<'Search'>) {
  const authContext = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [profilesSearchFetchStatus, setProfilesSearchFetchStatus] =
    useState<RequestStatus>('idle');
  const [channelsSearchFetchStatus, setChannelsSearchFetchStatus] =
    useState<RequestStatus>('idle');
  const [newProfilesSearchFetchStatus, setNewProfilesSearchFetchStatus] =
    useState<RequestStatus>('idle');
  const [newChannelsSearchFetchStatus, setNewChannelsSearchFetchStatus] =
    useState<RequestStatus>('idle');
  const [searchedProfiles, setSearchedProfiles] = useState<Profile[]>([]);
  const [searchedChannels, setSearchedChannels] = useState<Channel[]>([]);
  const [profilesCursor, setProfilesCursor] = useState<string>();
  const [channelsCursor, setChannelsCursor] = useState<string>();
  const [lastSearches, setLastSearches] = useState<{
    profiles: string;
    channels: string;
  }>({
    profiles: '',
    channels: '',
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {width} = useWindowDimensions();

  const drawHeaderLeft = useCallback(
    () => (
      <MyIconButtonBase
        filling="clear"
        icon={<BackImg />}
        onPress={() => navigation.goBack()}
      />
    ),
    [navigation],
  );

  const drawHeaderRight = useCallback(
    () => (
      <MySearchField
        width={width * 0.7}
        value={searchText}
        dismissKeyboardOnCancel
        onCancelPress={() => {
          setSearchText('');
        }}
        onChangeText={setSearchText}
      />
    ),
    [width, searchText],
  );

  const handleSearchUser = useCallback(
    async (cancelToken: CancelToken | undefined = undefined) => {
      if (authContext.state?.fid && searchText !== lastSearches.profiles) {
        setProfilesSearchFetchStatus('loading');
        try {
          const finalUrl = ENDPOINT_PROFILE + '?q=' + searchText;
          console.log('searching profiles', finalUrl);
          const res = await axios.get<ProfileSearchResponse>(finalUrl, {
            headers: {Authorization: `Bearer ${authContext.state.token}`},
            cancelToken: cancelToken,
          });
          console.log('got response', res.data.result);
          // console.log('got response');
          setLastSearches({...lastSearches, profiles: searchText});
          setSearchedProfiles(res.data.result);
          setProfilesCursor(res.data.cursor);
          setProfilesSearchFetchStatus('success');
        } catch (error) {
          if (!axios.isCancel(error)) {
            console.error(error);
            setProfilesSearchFetchStatus('error');
          }
        }
      }
    },
    [authContext, searchText, lastSearches],
  );
  const handleSearchChannel = useCallback(
    async (cancelToken: CancelToken | undefined = undefined) => {
      if (authContext.state?.fid && searchText !== lastSearches.channels) {
        setChannelsSearchFetchStatus('loading');
        try {
          const finalUrl =
            ENDPOINT_CHANNELS + '?limit=10&idOrName=' + searchText;
          console.log('searching profiles', finalUrl);
          const res = await axios.get<ChannelsResponse>(finalUrl, {
            headers: {Authorization: `Bearer ${authContext.state.token}`},
            cancelToken: cancelToken,
          });
          console.log('got response', res.data.result);
          // console.log('got response');
          setLastSearches({...lastSearches, channels: searchText});
          setSearchedChannels(res.data.result.channels);
          // TODO: serve cursor dal BE
          // setChannelsCursor(res.data.result.next.cursor);
          setChannelsSearchFetchStatus('success');
        } catch (error) {
          if (!axios.isCancel(error)) {
            console.error(error);
            setChannelsSearchFetchStatus('error');
          }
        }
      }
    },
    [authContext, searchText, lastSearches],
  );

  const handleSearch = useCallback(() => {
    if (searchText.length > 0) {
      const source = axios.CancelToken.source();
      const timeout = setTimeout(() => {
        if (selectedTab === 0) {
          handleSearchUser(source.token);
        } else {
          handleSearchChannel(source.token);
        }
      }, 500);
      return () => {
        clearTimeout(timeout);
        source.cancel();
      };
    } else {
      setSearchedProfiles([]);
      setSearchedChannels([]);
      setProfilesSearchFetchStatus('idle');
      setChannelsSearchFetchStatus('idle');
    }
  }, [searchText, selectedTab, handleSearchUser, handleSearchChannel]);

  const fetchNewProfiles = useCallback(async () => {
    if (newProfilesSearchFetchStatus !== 'loading' && profilesCursor) {
      try {
        setNewProfilesSearchFetchStatus('loading');
        const finalUrl =
          ENDPOINT_PROFILE + '?q=' + searchText + '&cursor=' + profilesCursor;
        const res = await axios.get<ProfileSearchResponse>(finalUrl, {
          headers: {Authorization: `Bearer ${authContext.state.token}`},
        });

        // console.log('got response');
        setSearchedProfiles([...searchedProfiles, ...res.data.result]);
        setProfilesCursor(res.data.cursor);
        setNewProfilesSearchFetchStatus('success');
      } catch (error) {
        console.error(error);
        Toast.show({
          type: 'error',
          text1: 'Error fetching new items',
        });
        setNewProfilesSearchFetchStatus('error');
      }
    }
  }, [
    authContext.state.token,
    searchText,
    profilesCursor,
    searchedProfiles,
    newProfilesSearchFetchStatus,
  ]);
  const fetchNewChannels = useCallback(async () => {
    console.log('fetching new channels');
    if (newChannelsSearchFetchStatus !== 'loading' && channelsCursor) {
      try {
        setNewChannelsSearchFetchStatus('loading');
        const finalUrl =
          ENDPOINT_PROFILE + '?q=' + searchText + '&cursor=' + channelsCursor;
        const res = await axios.get<ChannelsResponse>(finalUrl, {
          headers: {Authorization: `Bearer ${authContext.state.token}`},
        });

        // console.log('got response');
        setSearchedChannels([...searchedChannels, ...res.data.result.channels]);
        setChannelsCursor(res.data.result.next.cursor);
        setNewChannelsSearchFetchStatus('success');
      } catch (error) {
        console.error(error);
        Toast.show({
          type: 'error',
          text1: 'Error fetching new items',
        });
        setNewChannelsSearchFetchStatus('error');
      }
    }
  }, [
    authContext.state.token,
    searchText,
    channelsCursor,
    searchedChannels,
    newChannelsSearchFetchStatus,
  ]);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    if (selectedTab === 0) {
      setLastSearches({...lastSearches, profiles: ''});
      handleSearch();
    } else {
      setLastSearches({...lastSearches, channels: ''});
      handleSearch();
    }
    setIsRefreshing(false);
  }, [handleSearch, selectedTab, lastSearches]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: drawHeaderLeft,
      headerRight: drawHeaderRight,
    });
  }, [navigation, drawHeaderLeft, drawHeaderRight]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const renderItem = useCallback(
    ({item}: {item: Profile | Channel}) => {
      if (selectedTab === 0) {
        const casted = item as Profile;
        return (
          <ProfileLine
            profile={casted}
            onPress={() => {
              // navigation.reset({
              //   index: 0,
              //   routes: [
              //     {
              //       name: 'Home',
              //       params: {
              //         screen: 'FeedRoot',
              //         params: {
              //           screen: 'Profile',
              //           params: {userFid: item.fid.toString()},
              //         },
              //       },
              //     },
              //   ],
              // });
              navigation.navigate('Home', {
                screen: 'FeedRoot',
                params: {
                  screen: 'Profile',
                  params: {userFid: casted.fid.toString()},
                },
              });
            }}
          />
        );
      } else {
        const casted = item as Channel;
        return (
          <ChannelLine
            channel={casted}
            onPress={() => {
              navigation.navigate('Home', {
                screen: 'FeedRoot',
                params: {
                  screen: 'Channel',
                  params: {
                    channelId: casted.id,
                    showDrawer: true,
                  },
                },
              });
            }}
          />
        );
      }
    },
    [navigation, selectedTab],
  );

  return (
    <View>
      <MyTabs
        tabs={['Users', 'Channels']}
        selectedTab={selectedTab}
        onPress={setSelectedTab}
      />
      {(searchedProfiles.length > 0 && selectedTab === 0) ||
      (searchedChannels.length > 0 && selectedTab === 1) ? (
        <FlatList
          style={{paddingHorizontal: 15, paddingTop: 15}}
          data={selectedTab === 0 ? searchedProfiles : searchedChannels}
          windowSize={14}
          onEndReachedThreshold={1}
          onRefresh={refresh}
          onEndReached={selectedTab === 0 ? fetchNewProfiles : fetchNewChannels}
          refreshing={isRefreshing}
          ListFooterComponent={
            newProfilesSearchFetchStatus === 'loading' ||
            newChannelsSearchFetchStatus === 'loading' ? (
              <View
                style={{
                  width: '100%',
                  padding: 20,
                  marginBottom: 60,
                  alignItems: 'center',
                }}>
                <MyLoader />
              </View>
            ) : (
              <View style={{height: 100}} />
            )
          }
          ItemSeparatorComponent={() => <View style={{height: 15}} />}
          renderItem={renderItem}
        />
      ) : (profilesSearchFetchStatus === 'loading' && selectedTab === 0) ||
        (channelsSearchFetchStatus === 'loading' && selectedTab === 1) ? (
        <View style={{width: '100%', padding: 20}}>
          <MyPlaceholderLoader customStyle={{marginBottom: 20}} />
          <MyPlaceholderLoader />
        </View>
      ) : (profilesSearchFetchStatus === 'error' && selectedTab === 0) ||
        (channelsSearchFetchStatus === 'error' && selectedTab === 1) ? (
        <View style={styles.infoCtn}>
          <Text style={styles.infoText}>Error while fetching items</Text>
          <MyButton
            customStyle={{marginTop: 20}}
            title="Retry"
            width={'auto'}
            onPress={() => {
              if (profilesSearchFetchStatus === 'error') {
                handleSearchUser();
              } else {
                handleSearchChannel();
              }
            }}
          />
        </View>
      ) : (
        <View style={styles.infoCtn}>
          <Text style={styles.infoText}>
            Type something to search {selectedTab === 0 ? 'users' : 'channels'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  infoCtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  infoText: {
    fontFamily: MyTheme.fontRegular,
    color: MyTheme.grey300,
  },
});

export default SearchScreen;
