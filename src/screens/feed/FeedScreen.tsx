import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {FeedItem, FeedResponse} from '../../api/feed/types';
import {RequestStatus} from '../../api/types';
import MyFloatingButton from '../../components/MyFloatingButton';
import MyPlaceholderLoader from '../../components/MyPlaceholderLoader';
import MyPost from '../../components/post/MyPost';
import {AuthContext} from '../../contexts/auth/Auth.context';
import {TransformFeedItem} from '../../libs/post';
import {HomeTabScreenProps} from '../../routing/types';
import {ENDPOINT_FEED} from '../../variables';

function FeedScreen({navigation}: HomeTabScreenProps<'Feed'>) {
  const authContext = useContext(AuthContext);
  const [feedFetchStatus, setFeedFetchStatus] = useState<RequestStatus>('idle');
  const [feed, setFeed] = useState<FeedItem[]>();
  useEffect(() => {
    async function fetchFeed() {
      setFeedFetchStatus('loading');
      try {
        console.log(ENDPOINT_FEED);
        const res = await axios.get<FeedResponse>(ENDPOINT_FEED, {
          headers: {Authorization: `Bearer ${authContext.state.token}`},
        });
        // console.log('got response');
        console.log(JSON.stringify(res.data));
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
            renderItem={({item}) => {
              const transformedItem = TransformFeedItem(item);

              return (
                <MyPost
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
                />
              );
            }}
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
