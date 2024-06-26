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
import {OptionsContext} from '../../contexts/options/Options.context';
import {fetchLinkPreview} from '../../libs/api';
import {TransformCast} from '../../libs/post';
import {
  DiscoverStackScreenProps,
  FeedStackScreenProps,
  NotificationsStackScreenProps,
  PersonalProfileStackScreenProps,
} from '../../routing/types';
import {MyTheme} from '../../theme';
import {ENDPOINT_CAST} from '../../variables';

function ThreadDetailScreen({
  route,
  navigation,
}:
  | DiscoverStackScreenProps<'ThreadDetail'>
  | NotificationsStackScreenProps<'ThreadDetail'>
  | PersonalProfileStackScreenProps<'ThreadDetail'>
  | FeedStackScreenProps<'ThreadDetail'>) {
  const authContext = useContext(AuthContext);
  const optionsContext = useContext(OptionsContext);
  const [threadFetchStatus, setThreadFetchStatus] =
    useState<RequestStatus>('idle');
  const [thread, setThread] = useState<ConversationSectionList>();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchCast = useCallback(async () => {
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
      // console.log(res.data);

      const resCastsList = [...res.data.result.casts];
      for (let i = 0; i < resCastsList.length; i++) {
        // console.log('cast', resCastsList[i]);
        for (let j = 0; j < resCastsList[i].embeds.length; j++) {
          if (resCastsList[i].embeds[j].url) {
            const linkPreview = await fetchLinkPreview(
              resCastsList[i].embeds[j].url,
            );
            resCastsList[i].embeds[j].linkPreview = linkPreview;
          }
        }
      }
      const resSectionsList = [...res.data.result.sections];
      for (let i = 0; i < resSectionsList.length; i++) {
        // console.log('cast', resSectionsList[i]);
        for (let j = 0; j < resSectionsList[i].header.embeds.length; j++) {
          if (resSectionsList[i].header.embeds[j].url) {
            const linkPreview = await fetchLinkPreview(
              resSectionsList[i].header.embeds[j].url,
            );
            resSectionsList[i].header.embeds[j].linkPreview = linkPreview;
          }
        }
        for (let j = 0; j < resSectionsList[i].data.length; j++) {
          for (let k = 0; k < resSectionsList[i].data[j].embeds.length; k++) {
            if (resSectionsList[i].data[j].embeds[k].url) {
              const linkPreview = await fetchLinkPreview(
                resSectionsList[i].data[j].embeds[k].url,
              );
              resSectionsList[i].data[j].embeds[k].linkPreview = linkPreview;
            }
          }
        }
      }

      setThread({
        casts: resCastsList,
        sections: resSectionsList,
      });
      setThreadFetchStatus('success');
    } catch (error) {
      console.error(error);
      setThreadFetchStatus('error');
    }
  }, [authContext, route.params.threadHash]);

  useEffect(() => {
    fetchCast();
  }, [fetchCast]);

  const threadsHtml = useMemo(
    () =>
      thread
        ? thread.casts.map((item, index) => {
            const transformedCast = TransformCast(item);
            return (
              <MyThread
                key={index}
                content={transformedCast.content}
                images={transformedCast.images}
                postHash={item.hash}
                recasted={item.viewer_context.recasted}
                upvoted={item.viewer_context.liked}
                upvotesCount={transformedCast.upvotesCount}
                commentsCount={transformedCast.commentsCount}
                quotesCount={transformedCast.quotesCount}
                rootCustomStyle={{
                  marginTop: index === 0 ? 0 : 15,
                }}
                onCommentPress={() => {
                  navigation.navigate('CreateComment', {
                    cast: item,
                  });
                }}
              />
            );
          })
        : [],
    [thread, navigation],
  );

  const renderComment = useCallback(
    ({item, index}: {item: CastWithDepth; index: number}) => {
      const transformedComment = TransformCast(item);
      return (
        <MyComment
          key={index}
          commentHash={item.hash}
          upvoted={item.viewer_context.liked}
          recasted={item.viewer_context.recasted}
          headerImg={transformedComment.headerImg}
          postTime={transformedComment.postTime}
          headerTitle={transformedComment.headerTitle}
          headerSubtitle={transformedComment.headerSubtitle}
          indentLevel={item.depth}
          content={transformedComment.content}
          images={transformedComment.images}
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

  const refreshPage = useCallback(async () => {
    setIsRefreshing(true);
    await fetchCast();
    setIsRefreshing(false);
  }, [fetchCast]);

  if (threadFetchStatus === 'loading' && !isRefreshing) {
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
        onRefresh={refreshPage}
        refreshing={isRefreshing}
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
              onOptionsPress={() => {
                optionsContext.show({
                  hash: thread.casts[0].hash,
                  showMint: true,
                  analytics: {
                    recasts: transformedCast.quotesCount,
                    upvotes: transformedCast.upvotesCount,
                    replies: transformedCast.commentsCount,
                    author: thread.casts[0].author,
                    channel: thread?.casts[0]?.channel ?? undefined,
                  },
                });
              }}
            />
            {threadsHtml}
          </View>
        }
        renderSectionHeader={({section}) => {
          const transformedCast = TransformCast(section.header);

          return (
            <MyComment
              commentHash={section.header.hash}
              upvoted={section.header.viewer_context.liked}
              recasted={section.header.viewer_context.recasted}
              headerImg={transformedCast.headerImg}
              postTime={transformedCast.postTime}
              quote={
                thread.casts.length > 1
                  ? thread.casts[section.castIndex].text
                  : undefined
              }
              headerTitle={transformedCast.headerTitle}
              headerSubtitle={transformedCast.headerSubtitle}
              images={transformedCast.images}
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
                navigation.push('ThreadDetail', {
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
