import axios from 'axios';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {FeedItem, FeedResponse} from '../../api/feed/types';
import {RequestStatus} from '../../api/types';
import PenImg from '../../assets/images/icons/pen.svg';
import MyFloatingButton from '../../components/MyFloatingButton';
import MyLoader from '../../components/MyLoader';
import MyPlaceholderLoader from '../../components/MyPlaceholderLoader';
import MyPost from '../../components/post/MyPost';
import {AuthContext} from '../../contexts/auth/Auth.context';
import {TransformFeedItem} from '../../libs/post';
import {FeedStackScreenProps} from '../../routing/types';
import {ENDPOINT_FEED} from '../../variables';

function FeedScreen({navigation}: FeedStackScreenProps<'Feed'>) {
  const authContext = useContext(AuthContext);
  const [feedFetchStatus, setFeedFetchStatus] = useState<RequestStatus>('idle');
  const [newThreadsFetchStatus, setNewThreadsFetchStatus] =
    useState<RequestStatus>('idle');
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [cursor, setCursor] = useState<string>();

  const fetchFeed = useCallback(async () => {
    setFeedFetchStatus('loading');
    try {
      console.log('fetching feed', authContext.state.token);
      const res = await axios.get<FeedResponse>(ENDPOINT_FEED, {
        headers: {Authorization: `Bearer ${authContext.state.token}`},
      });
      console.log('got response', JSON.stringify(res.data));
      // TODO: da rimuovere, fix temporaneo per i cast che arrivano duplicati
      const filtered = res.data.result.filter((value, index, self) => {
        return index === self.findIndex(item => item.hash === value.hash);
      });
      setFeed(filtered);
      setCursor(res.data.cursor);
      setFeedFetchStatus('success');
    } catch (error) {
      console.error(error);
      setFeedFetchStatus('error');
    }
  }, [authContext.state.token]);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed, authContext]);

  const fetchNewItems = useCallback(async () => {
    if (newThreadsFetchStatus !== 'loading' && cursor) {
      try {
        setNewThreadsFetchStatus('loading');
        console.log('fetching new threads');
        const res = await axios.get<FeedResponse>(
          `${ENDPOINT_FEED}&cursor=${cursor}`,
          {
            headers: {Authorization: `Bearer ${authContext.state.token}`},
          },
        );
        // console.log('got response');
        // TODO: da rimuovere, fix temporaneo per i cast che arrivano duplicati
        const filtered = res.data.result.filter((value, index, self) => {
          return index === self.findIndex(item => item.hash === value.hash);
        });
        setFeed([...feed, ...filtered]);
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
  }, [authContext.state.token, cursor, feed, newThreadsFetchStatus]);

  const renderItem = useCallback(
    ({item}: {item: FeedItem}) => {
      const transformedItem = TransformFeedItem(item);

      return (
        <MyPost
          upvoted={item.viewer_context.liked}
          recasted={item.viewer_context.recasted}
          postHash={item.hash}
          headerImg={transformedItem.headerImg}
          postTime={transformedItem.postTime}
          headerTitle={transformedItem.headerTitle}
          headerSubtitle={transformedItem.headerSubtitle}
          content={transformedItem.content}
          image={transformedItem.image}
          upvotesCount={transformedItem.upvotesCount}
          commentsCount={transformedItem.commentsCount}
          quotesCount={transformedItem.quotesCount}
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
        />
      );
    },
    [navigation],
  );

  return (
    <View>
      {feedFetchStatus === 'success' || feed.length > 0 ? (
        <>
          <MyFloatingButton
            icon={<PenImg width={25} height={25} color="white" />}
            onPress={() => {
              navigation.navigate('CreateThread');
            }}
          />
          <FlatList
            style={{paddingHorizontal: 15, paddingTop: 15}}
            data={feed}
            windowSize={14}
            onEndReachedThreshold={1}
            onEndReached={fetchNewItems}
            onRefresh={fetchFeed}
            refreshing={feedFetchStatus === 'loading'}
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
            keyExtractor={(item, index) => item.hash + index.toString()} // TODO: da rimuovere, fix temporaneo per i cast che arrivano duplicati
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
