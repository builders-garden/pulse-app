import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Cast, CastResponse} from '../../api/cast/types';
import {RequestStatus} from '../../api/types';
import MyComment from '../../components/comment/MyComment';
import MyPost from '../../components/post/MyPost';
import {AuthContext} from '../../contexts/auth/Auth.context';
import {FlattenConversation, TransformCast} from '../../libs/post';
import {RootStackScreenProps} from '../../routing/types';
import {ENDPOINT_CAST} from '../../variables';

function ThreadDetailScreen({route}: RootStackScreenProps<'ThreadDetail'>) {
  const authContext = useContext(AuthContext);
  const [threadFetchStatus, setThreadFetchStatus] =
    useState<RequestStatus>('idle');
  const [thread, setThread] = useState<Cast>();
  useEffect(() => {
    async function fetchCast() {
      setThreadFetchStatus('loading');
      try {
        console.log(ENDPOINT_CAST);
        const url =
          ENDPOINT_CAST +
          route.params.threadHash +
          '/conversation?replyDepth=5';
        const res = await axios.get<CastResponse>(url, {
          headers: {Authorization: `Bearer ${authContext.state.token}`},
        });
        // console.log('got response');
        console.log('--------CAST--------');
        console.log(JSON.stringify(res.data));
        setThread(res.data.result.conversation.cast);
        setThreadFetchStatus('success');
      } catch (error) {
        console.error(error);
        setThreadFetchStatus('error');
      }
    }

    fetchCast();
  }, [authContext, route.params.threadHash]);

  if (
    thread == null ||
    thread === undefined ||
    threadFetchStatus !== 'success'
  ) {
    return <View></View>;
  }

  const flattenedConversation = FlattenConversation(thread);
  const transformedCast = TransformCast(flattenedConversation[0]);
  flattenedConversation.shift();
  return (
    <View>
      <FlatList
        data={flattenedConversation}
        ListHeaderComponent={
          <MyPost
            headerImg={transformedCast.headerImg}
            postTime={transformedCast.postTime}
            headerTitle={transformedCast.headerTitle}
            headerSubtitle={transformedCast.headerSubtitle}
            content={transformedCast.content}
            image={transformedCast.image}
            upvotesCount={transformedCast.upvotesCount}
            commentsCount={transformedCast.commentsCount}
            quotesCount={transformedCast.quotesCount}
          />
        }
        renderItem={({item, index}) => {
          const transformedComment = TransformCast(item);
          return (
            <MyComment
              headerImg={transformedComment.headerImg}
              postTime={transformedComment.postTime}
              headerTitle={transformedComment.headerTitle}
              headerSubtitle={transformedComment.headerSubtitle}
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

export default ThreadDetailScreen;
