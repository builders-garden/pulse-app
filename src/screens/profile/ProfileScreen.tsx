import {useScrollToTop} from '@react-navigation/native';
import axios from 'axios';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {Profile, ProfileResponse} from '../../api/profile/types';
import {RequestStatus} from '../../api/types';
import {UserCast, UserCastsResponse} from '../../api/user/types';
import MyLoader from '../../components/MyLoader';
import MyButton from '../../components/buttons/MyButton';
import MyComment from '../../components/comment/MyComment';
import MyPost from '../../components/post/MyPost';
import MyTabs from '../../components/tabs/MyTabs';
import {AuthContext} from '../../contexts/auth/Auth.context';
import {TransformUserCast} from '../../libs/post';
import {FeedStackScreenProps, HomeTabScreenProps} from '../../routing/types';
import {ENDPOINT_PROFILE} from '../../variables';
import UpperSection from './components/UpperSection';

const HEADER_HEIGHT = 250;

function ProfileScreen({
  route,
  navigation,
}: HomeTabScreenProps<'PersonalProfile'> | FeedStackScreenProps<'Profile'>) {
  const authContext = useContext(AuthContext);
  const [profileFetchStatus, setProfileFetchStatus] =
    useState<RequestStatus>('idle');
  const [profile, setProfile] = useState<Profile>();

  const [selectedTab, setSelectedTab] = useState(0);
  const [commentsFetchStatus, setCommentsFetchStatus] = useState('idle');
  const [newCommentsFetchStatus, setNewCommentsFetchStatus] = useState('idle');
  const [comments, setComments] = useState<UserCast[]>([]);
  const [userCastsFetchStatus, setUserCastsFetchStatus] = useState('idle');
  const [newUserCastsFetchStatus, setNewUserCastsFetchStatus] =
    useState('idle');
  const [userCasts, setUserCasts] = useState<UserCast[]>([]);
  const [userCastsCursor, setUserCastsCursor] = useState<string>();
  const [commentsCursor, setCommentsCursor] = useState<string>();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const listRef = useRef(null);

  useScrollToTop(listRef);

  const isLoggedUserProfile = useMemo(() => {
    if (!authContext.state?.fid) {
      return false;
    }
    return authContext.state?.fid === route.params.userFid.toString();
  }, [authContext.state?.fid, route.params.userFid]);

  const fetchProfile = useCallback(async () => {
    if (authContext.state?.fid) {
      setProfileFetchStatus('loading');
      try {
        const finalUrl = ENDPOINT_PROFILE + '/' + route.params.userFid;
        console.log('fetching profile', finalUrl);
        const res = await axios.get<ProfileResponse>(finalUrl, {
          headers: {Authorization: `Bearer ${authContext.state.token}`},
        });
        console.log('got response', res.data.result);
        // console.log('got response');
        setProfile(res.data.result);
        setProfileFetchStatus('success');
      } catch (error) {
        console.error(error);
        setProfileFetchStatus('error');
      }
    }
  }, [authContext.state.token, authContext.state?.fid, route.params.userFid]);

  const fetchComments = useCallback(async () => {
    if (profile?.fid) {
      setCommentsFetchStatus('loading');
      try {
        const finalUrl =
          ENDPOINT_PROFILE + '/' + profile?.fid + '/replies?limit=15';
        const res = await axios.get<UserCastsResponse>(finalUrl, {
          headers: {Authorization: `Bearer ${authContext.state.token}`},
        });
        console.log('got comments');
        setComments(res.data.result);
        setCommentsCursor(res.data.cursor);
        setCommentsFetchStatus('success');
      } catch (error) {
        console.error(error);
        setCommentsFetchStatus('error');
      }
    }
  }, [authContext.state.token, profile?.fid]);

  const fetchUserCasts = useCallback(async () => {
    if (profile?.fid) {
      setUserCastsFetchStatus('loading');
      try {
        const finalUrl =
          ENDPOINT_PROFILE + '/' + profile?.fid + '/tmp-casts?limit=15';
        const res = await axios.get<UserCastsResponse>(finalUrl, {
          headers: {Authorization: `Bearer ${authContext.state.token}`},
        });
        console.log('got threads');
        console.log(res.data.result);
        setUserCasts(res.data.result);
        setUserCastsCursor(res.data.cursor);
        setUserCastsFetchStatus('success');
      } catch (error) {
        console.error(error);
        setUserCastsFetchStatus('error');
      }
    }
  }, [authContext.state.token, profile?.fid]);

  const fetchNewComments = useCallback(async () => {
    if (newCommentsFetchStatus !== 'loading' && commentsCursor) {
      try {
        setNewCommentsFetchStatus('loading');
        console.log('fetching new threads');

        const finalUrl =
          ENDPOINT_PROFILE +
          '/' +
          profile?.fid +
          '/replies?limit=15&cursor=' +
          commentsCursor;
        const res = await axios.get<UserCastsResponse>(finalUrl, {
          headers: {Authorization: `Bearer ${authContext.state.token}`},
        });
        setComments([...comments, ...res.data.result]);
        setCommentsCursor(res.data.cursor);
        setNewCommentsFetchStatus('success');
      } catch (error) {
        console.error(error);
        Toast.show({
          type: 'error',
          text1: 'Error fetching new items',
        });
        setNewCommentsFetchStatus('error');
      }
    }
  }, [
    authContext.state.token,
    profile?.fid,
    commentsCursor,
    comments,
    newCommentsFetchStatus,
  ]);
  const fetchNewUserCasts = useCallback(async () => {
    if (newUserCastsFetchStatus !== 'loading' && userCastsCursor) {
      try {
        setNewUserCastsFetchStatus('loading');
        console.log('fetching new threads');
        const finalUrl =
          ENDPOINT_PROFILE +
          '/' +
          profile?.fid +
          '/tmp-casts?limit=15&cursor=' +
          userCastsCursor;
        const res = await axios.get<UserCastsResponse>(finalUrl, {
          headers: {Authorization: `Bearer ${authContext.state.token}`},
        });
        setUserCasts([...userCasts, ...res.data.result]);
        setUserCastsCursor(res.data.cursor);
        setNewUserCastsFetchStatus('success');
      } catch (error) {
        console.error(error);
        Toast.show({
          type: 'error',
          text1: 'Error fetching new items',
        });
        setNewUserCastsFetchStatus('error');
      }
    }
  }, [
    authContext.state.token,
    userCastsCursor,
    userCasts,
    newUserCastsFetchStatus,
    profile?.fid,
  ]);

  const refreshPage = useCallback(async () => {
    setIsRefreshing(true);
    await fetchProfile();
    await fetchUserCasts();
    await fetchComments();
    setIsRefreshing(false);
  }, [fetchProfile, fetchUserCasts, fetchComments]);

  const jumpToFeedRoot = useCallback(
    (screen: 'Profile' | 'ThreadDetail' | 'Channel', params: any) => {
      navigation.jumpTo('FeedRoot', {
        screen,
        params,
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({item, index}: {item: UserCast; index: number}) => {
      if (
        userCastsFetchStatus !== 'success' ||
        commentsFetchStatus !== 'success' ||
        !profile
      ) {
        return null;
      }
      if (selectedTab === 0) {
        const transformedItem = TransformUserCast(item, profile);

        return (
          <MyPost
            postHash={item.hash}
            headerImg={transformedItem.headerImg}
            postTime={transformedItem.postTime}
            headerTitle={transformedItem.headerTitle}
            headerSubtitle={transformedItem.headerSubtitle}
            content={transformedItem.content}
            images={transformedItem.images}
            // TODO: implement upvote and recast
            recasted={false}
            upvoted={false}
            upvotesCount={transformedItem.upvotesCount}
            commentsCount={transformedItem.commentsCount}
            quotesCount={transformedItem.quotesCount}
            customStyle={{
              marginHorizontal: 15,
              marginBottom: 15,
              marginTop: index === 0 ? 15 : 0,
            }}
            onContentBodyPress={() => {
              jumpToFeedRoot('ThreadDetail', {
                threadHash: item.hash,
              });
            }}
            onHeaderTitlePress={() => {
              if (transformedItem.channel !== '') {
                jumpToFeedRoot('Channel', {
                  channelId: transformedItem.channel,
                });
              } else {
                jumpToFeedRoot('Profile', {
                  userFid: profile.fid.toString(),
                });
              }
            }}
            onHeaderSubtitlePress={() => {
              jumpToFeedRoot('Profile', {
                userFid: profile.fid.toString(),
              });
            }}
            onHeaderImagePress={() => {
              if (transformedItem.channel !== '') {
                jumpToFeedRoot('Channel', {
                  channelId: transformedItem.channel,
                });
              } else {
                jumpToFeedRoot('Profile', {
                  userFid: profile.fid.toString(),
                });
              }
            }}
            onCommentPress={() => {
              navigation.push('CreateComment', {
                cast: {
                  author: profile,
                  text: transformedItem.content,
                  hash: item.hash,
                  timestamp: item.castedAtTimestamp,
                },
              });
            }}
          />
        );
      } else {
        const transformedItem = TransformUserCast(item, profile);

        return (
          <MyComment
            headerImg={transformedItem.headerImg}
            postTime={transformedItem.postTime}
            headerTitle={transformedItem.headerTitle}
            headerSubtitle={transformedItem.headerSubtitle}
            content={transformedItem.content}
            quote={item.parentCast?.text}
            quoteTitle={'@' + item.parentCast?.castedBy.profileHandle}
            images={transformedItem.images}
            upvotesCount={transformedItem.upvotesCount}
            quotesCount={transformedItem.quotesCount}
            rootCustomStyle={[
              styles.comment,
              {
                marginTop: index === 0 ? 15 : 0,
              },
            ]}
            hideActionBar
            onContentBodyPress={() => {
              jumpToFeedRoot('ThreadDetail', {
                threadHash: item.hash,
              });
            }}
            onHeaderTitlePress={() => {
              if (transformedItem.channel !== '') {
                jumpToFeedRoot('Channel', {
                  channelId: transformedItem.channel,
                });
              } else {
                jumpToFeedRoot('Profile', {
                  userFid: profile.fid.toString(),
                });
              }
            }}
            onHeaderSubtitlePress={() => {
              jumpToFeedRoot('Profile', {
                userFid: profile.fid.toString(),
              });
            }}
            onHeaderImagePress={() => {
              if (transformedItem.channel !== '') {
                jumpToFeedRoot('Channel', {
                  channelId: transformedItem.channel,
                });
              } else {
                jumpToFeedRoot('Profile', {
                  userFid: profile.fid.toString(),
                });
              }
            }}
          />
        );
      }
    },
    [
      selectedTab,
      userCastsFetchStatus,
      commentsFetchStatus,
      profile,
      navigation,
      jumpToFeedRoot,
    ],
  );

  useEffect(() => {
    fetchProfile();
  }, [authContext, authContext.state?.fid, fetchProfile]);

  useEffect(() => {
    if (profile) {
      fetchComments();
    }
  }, [profile, fetchComments]);
  useEffect(() => {
    if (profile) {
      fetchUserCasts();
    }
  }, [profile, fetchUserCasts]);

  if (profileFetchStatus === 'loading') {
    return (
      <View style={styles.loadingCtn}>
        <MyLoader />
      </View>
    );
  } else if (profileFetchStatus === 'error') {
    return (
      <View style={styles.errorCtn}>
        <MyButton title="Retry" width={'auto'} onPress={() => fetchProfile()} />
      </View>
    );
  } else if (!profile) {
    return (
      <View style={styles.errorCtn}>
        <Text>Profile not found</Text>
      </View>
    );
  }

  // if (userCastsFetchStatus === 'loading' || commentsFetchStatus === 'loading') {
  //   return (
  //     <View style={styles.loadingCtn}>
  //       <MyLoader />
  //     </View>
  //   );
  // } else if (
  //   userCastsFetchStatus === 'error' ||
  //   commentsFetchStatus === 'error'
  // ) {
  //   return (
  //     <View style={styles.errorCtn}>
  //       <MyButton
  //         title="Retry"
  //         width={'auto'}
  //         onPress={() => {
  //           if (userCastsFetchStatus === 'error') {
  //             fetchUserCasts();
  //           } else {
  //             fetchComments();
  //           }
  //         }}
  //       />
  //     </View>
  //   );
  // }

  return (
    <FlatList
      ref={listRef}
      data={selectedTab === 0 ? userCasts : comments}
      windowSize={10}
      onEndReachedThreshold={1}
      onEndReached={selectedTab === 0 ? fetchNewUserCasts : fetchNewComments}
      onRefresh={refreshPage}
      refreshing={isRefreshing}
      ListHeaderComponent={
        <View style={styles.profileCtn}>
          <UpperSection profile={profile} isLoggedUser={isLoggedUserProfile} />
          <View style={{padding: 15}}>
            <MyTabs
              tabs={['Threads', 'Comments', 'About']}
              selectedTab={selectedTab}
              onPress={setSelectedTab}
            />
          </View>
          {userCastsFetchStatus === 'loading' ||
          commentsFetchStatus === 'loading' ? (
            <View style={styles.loadingCtn}>
              <MyLoader />
            </View>
          ) : userCastsFetchStatus === 'error' ||
            commentsFetchStatus === 'error' ? (
            <View style={styles.errorCtn}>
              <MyButton
                title="Retry"
                width={'auto'}
                onPress={() => {
                  if (userCastsFetchStatus === 'error') {
                    fetchUserCasts();
                  } else {
                    fetchComments();
                  }
                }}
              />
            </View>
          ) : null}
        </View>
      }
      ListFooterComponent={
        (selectedTab === 0 && newUserCastsFetchStatus === 'loading') ||
        (selectedTab === 1 && newCommentsFetchStatus === 'loading') ? (
          <View style={{width: '100%', padding: 20, alignItems: 'center'}}>
            <MyLoader />
          </View>
        ) : null
      }
      renderItem={renderItem}
      keyExtractor={(item, _) => item.hash}
    />
  );
}

const styles = StyleSheet.create({
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
  profileCtn: {
    flex: 1,
  },
  upperSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  box: {
    height: 250,
    width: '100%',
  },
  boxA: {
    backgroundColor: 'white',
  },
  boxB: {
    backgroundColor: '#D8D8D8',
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: '#2196f3',
  },
  comment: {
    marginBottom: 15,
    marginHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 4,
  },
});

export default ProfileScreen;
