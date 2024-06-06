import axios from 'axios';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {SectionList, Text, View} from 'react-native';
import {
  CastConversationResponse,
  CastWithDepth,
  ConversationSectionList,
} from '../../api/cast/types';
import {RequestStatus} from '../../api/types';
import MyPlaceholderLoader from '../../components/MyPlaceholderLoader';
import UserInfo from '../../components/UserInfo';
import MyComment from '../../components/comment/MyComment';
import MyThread from '../../components/thread/MyThread';
import {AuthContext} from '../../contexts/auth/Auth.context';
import {TransformCast} from '../../libs/post';
import {FeedStackScreenProps} from '../../routing/types';
import {MyTheme} from '../../theme';
import {ENDPOINT_CAST} from '../../variables';

function ThreadDetailScreen({
  route,
  navigation,
}: FeedStackScreenProps<'ThreadDetail'>) {
  const authContext = useContext(AuthContext);
  const [threadFetchStatus, setThreadFetchStatus] =
    useState<RequestStatus>('idle');
  const [thread, setThread] = useState<ConversationSectionList>();
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
        console.log(res.data);
        const transformed = res.data.result;
        setThread(transformed);
        setThreadFetchStatus('success');
      } catch (error) {
        console.error(error);
        setThreadFetchStatus('error');
      }
    }

    fetchCast();
  }, [authContext, route.params.threadHash]);

  const threadsHtml = useMemo(
    () =>
      thread
        ? thread.casts.map((item, index) => {
            const transformedCast = TransformCast(item);
            return (
              <MyThread
                key={index}
                content={transformedCast.content}
                image={transformedCast.image}
                postHash={item.hash}
                recasted={item.viewer_context.recasted}
                upvoted={item.viewer_context.liked}
                upvotesCount={transformedCast.upvotesCount}
                commentsCount={transformedCast.commentsCount}
                quotesCount={transformedCast.quotesCount}
                rootCustomStyle={{
                  marginTop: index === 0 ? 0 : 15,
                }}
              />
            );
          })
        : [],
    [thread],
  );

  const renderComment = useCallback(
    ({item, index}: {item: CastWithDepth; index: number}) => {
      const transformedComment = TransformCast(item);
      return (
        <MyComment
          key={index}
          headerImg={transformedComment.headerImg}
          postTime={transformedComment.postTime}
          headerTitle={transformedComment.headerTitle}
          headerSubtitle={transformedComment.headerSubtitle}
          indentLevel={item.depth}
          content={transformedComment.content}
          image={transformedComment.image}
          upvotesCount={transformedComment.upvotesCount}
          quotesCount={transformedComment.quotesCount}
          rootCustomStyle={{
            marginLeft: 10,
          }}
          onContentBodyPress={() => {
            navigation.push('ThreadDetail', {
              threadHash: item.hash,
            });
          }}
          onHeaderTitlePress={() => {
            if (transformedComment.channel !== '') {
              navigation.navigate('Channel', {
                channelId: transformedComment.channel,
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
            if (transformedComment.channel !== '') {
              navigation.navigate('Channel', {
                channelId: transformedComment.channel,
              });
            } else {
              navigation.navigate('Profile', {
                userFid: item.author.fid.toString(),
              });
            }
          }}
          onReplyPress={() => {
            navigation.navigate('CreateComment', {
              cast: item,
            });
          }}
        />
      );
    },
    [navigation],
  );

  const transformedCast = useMemo(
    () => (thread ? TransformCast(thread.casts[0]) : undefined),
    [thread],
  );

  if (threadFetchStatus === 'loading') {
    return (
      <View style={{width: '100%', padding: 20}}>
        <MyPlaceholderLoader customStyle={{marginBottom: 20}} />
      </View>
    );
  } else if (
    thread == null ||
    thread === undefined ||
    transformedCast === undefined
  ) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: MyTheme.fontRegular,
          }}>
          No thread visible
        </Text>
      </View>
    );
  }

  return (
    <View>
      <SectionList
        sections={thread.sections}
        style={{
          paddingRight: 15,
          paddingLeft: 5,
        }}
        ListHeaderComponent={
          <View
            style={{
              paddingBottom: 15,
              paddingTop: 10,
            }}>
            <UserInfo
              title={transformedCast.headerTitle}
              subtitle={transformedCast.headerSubtitle}
              icon={transformedCast.headerImg}
              customStyle={{
                marginLeft: 10,
              }}
              titleRight={transformedCast.postTime}
              onTitlePress={() => {
                if (transformedCast.channel !== '') {
                  navigation.navigate('Channel', {
                    channelId: transformedCast.channel,
                  });
                } else {
                  navigation.navigate('Profile', {
                    userFid: thread.casts[0].author.fid.toString(),
                  });
                }
              }}
              onSubtitlePress={() => {
                navigation.navigate('Profile', {
                  userFid: thread.casts[0].author.fid.toString(),
                });
              }}
              onImagePress={() => {
                if (transformedCast.channel !== '') {
                  navigation.navigate('Channel', {
                    channelId: transformedCast.channel,
                  });
                } else {
                  navigation.navigate('Profile', {
                    userFid: thread.casts[0].author.fid.toString(),
                  });
                }
              }}
            />
            {threadsHtml}
          </View>
        }
        renderSectionHeader={({section}) => {
          const transformedCast = TransformCast(section.header);

          return (
            <MyComment
              headerImg={transformedCast.headerImg}
              postTime={transformedCast.postTime}
              quote={thread.casts[section.castIndex].text}
              headerTitle={transformedCast.headerTitle}
              headerSubtitle={transformedCast.headerSubtitle}
              content={transformedCast.content}
              upvotesCount={transformedCast.upvotesCount}
              quotesCount={transformedCast.quotesCount}
              rootCustomStyle={{
                paddingTop: 10,
                marginLeft: 10,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
              }}
              onContentBodyPress={() => {
                navigation.navigate('ThreadDetail', {
                  threadHash: section.header.hash,
                });
              }}
              onHeaderTitlePress={() => {
                if (transformedCast.channel !== '') {
                  navigation.navigate('Channel', {
                    channelId: transformedCast.channel,
                  });
                } else {
                  navigation.navigate('Profile', {
                    userFid: section.header.author.fid.toString(),
                  });
                }
              }}
              onHeaderSubtitlePress={() => {
                navigation.navigate('Profile', {
                  userFid: section.header.author.fid.toString(),
                });
              }}
              onHeaderImagePress={() => {
                if (transformedCast.channel !== '') {
                  navigation.navigate('Channel', {
                    channelId: transformedCast.channel,
                  });
                } else {
                  navigation.navigate('Profile', {
                    userFid: section.header.author.fid.toString(),
                  });
                }
              }}
              onReplyPress={() => {
                navigation.navigate('CreateComment', {
                  cast: section.header,
                });
              }}
            />
          );
        }}
        renderItem={renderComment}
        stickySectionHeadersEnabled={false}
        renderSectionFooter={() => (
          <View
            style={{
              height: 10,
              marginTop: -1,
              marginLeft: 10,
              backgroundColor: 'white',
              marginBottom: 20,
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
              paddingTop: 10,
            }}
          />
        )}
        ListFooterComponent={<View style={{height: 40}} />}
      />
    </View>
  );
}

export default ThreadDetailScreen;
