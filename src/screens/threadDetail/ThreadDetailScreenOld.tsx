import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {Cast, CastConversationResponse} from '../../api/cast/types';
import {RequestStatus} from '../../api/types';
import MyPlaceholderLoader from '../../components/MyPlaceholderLoader';
import UserInfo from '../../components/UserInfo';
import MyComment from '../../components/comment/MyComment';
import MyThread from '../../components/thread/MyThread';
import {AuthContext} from '../../contexts/auth/Auth.context';
import {FlattenConversation, TransformCast} from '../../libs/post';
import {RootStackScreenProps} from '../../routing/types';
import {ENDPOINT_CAST} from '../../variables';

function ThreadDetailScreenOld({route}: RootStackScreenProps<'ThreadDetail'>) {
  const authContext = useContext(AuthContext);
  const [threadFetchStatus, setThreadFetchStatus] =
    useState<RequestStatus>('idle');
  const [thread, setThread] = useState<Cast>();
  useEffect(() => {
    async function fetchCast() {
      setThreadFetchStatus('loading');
      try {
        const url =
          ENDPOINT_CAST +
          '/' +
          route.params.threadHash +
          '/conversation?replyDepth=5';
        const res = await axios.get<CastConversationResponse>(url, {
          headers: {Authorization: `Bearer ${authContext.state.token}`},
        });
        // console.log('got response');
        setThread(res.data.result.conversation.cast);
        setThreadFetchStatus('success');
      } catch (error) {
        console.error(error);
        setThreadFetchStatus('error');
      }
    }

    fetchCast();
  }, [authContext, route.params.threadHash]);

  if (threadFetchStatus === 'loading') {
    return (
      <View style={{width: '100%', padding: 20}}>
        <MyPlaceholderLoader customStyle={{marginBottom: 20}} />
      </View>
    );
  } else if (thread == null || thread === undefined) {
    return (
      <View>
        <Text>No thread visible</Text>
      </View>
    );
  }

  const flattenedConversation = FlattenConversation(thread);
  const transformedCast = TransformCast(flattenedConversation[0]);
  flattenedConversation.shift();
  return (
    <View>
      <FlatList
        data={flattenedConversation}
        style={{
          padding: 15,
        }}
        ListHeaderComponent={
          <View
            style={{
              paddingBottom: 15,
            }}>
            <UserInfo
              title={transformedCast.headerTitle}
              subtitle={transformedCast.headerSubtitle}
              icon={transformedCast.headerImg}
              titleRight={transformedCast.postTime}
            />
            <MyThread
              content={transformedCast.content}
              image={transformedCast.image}
              upvotesCount={transformedCast.upvotesCount}
              commentsCount={transformedCast.commentsCount}
              quotesCount={transformedCast.quotesCount}
            />
          </View>
        }
        renderItem={({item, index}) => {
          const transformedComment = TransformCast(item);
          return (
            <MyComment
              headerImg={transformedComment.headerImg}
              postTime={transformedComment.postTime}
              headerTitle={transformedComment.headerTitle}
              headerSubtitle={transformedComment.headerSubtitle}
              quote={item.depth === 1 ? transformedCast.content : undefined}
              indentLevel={item.depth}
              content={transformedComment.content}
              image={transformedComment.image}
              upvotesCount={transformedComment.upvotesCount}
              quotesCount={transformedComment.quotesCount}
              // eslint-disable-next-line react-native/no-inline-styles
              commentCustomStyle={{
                paddingBottom:
                  index < flattenedConversation.length - 1 &&
                  flattenedConversation[index + 1].depth >= item.depth
                    ? 20
                    : 0,
                paddingTop:
                  index > 0 &&
                  flattenedConversation[index - 1].depth > item.depth
                    ? 20
                    : 0,
              }}
            />
          );
        }}
      />
    </View>
  );
}

export default ThreadDetailScreenOld;
