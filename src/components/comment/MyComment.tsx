import axios from 'axios';
import React, {useCallback, useContext, useMemo, useState} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {ReactionResponse} from '../../api/cast/types';
import {Embed} from '../../api/feed/types';
import BorderLineImg from '../../assets/images/thread/quote_border_line.svg';
import {AuthContext} from '../../contexts/auth/Auth.context';
import {LightboxContext} from '../../contexts/lightbox/Lightbox.context';
import {OptionsContext} from '../../contexts/options/Options.context';
import {MyTheme} from '../../theme';
import {ENDPOINT_CAST} from '../../variables';
import HighlightedText from '../HighlightedText';
import MyIconButton from '../MyIconButton';
import UrlViewer from '../UrlViewer';
import CommentActionBar from './CommentActionBar';

export type MyCommentProps = {
  commentHash: string;
  indentLevel?: number;
  headerImg: string;
  headerTitle: string;
  postTime: string;
  headerSubtitle: string;
  upvoted: boolean;
  recasted: boolean;
  quoteTitle?: string;
  quote?: string;
  content: string;
  images?: Embed[];
  quotesCount: number;
  upvotesCount: number;
  hideActionBar?: boolean;
  commentCustomStyle?: StyleProp<ViewStyle>;
  rootCustomStyle?: StyleProp<ViewStyle>;
  onContentBodyPress?: () => void;
  onHeaderTitlePress?: () => void;
  onHeaderSubtitlePress?: () => void;
  onHeaderImagePress?: () => void;
  onReplyPress?: () => void;
};
const indentSize = 5;

const MyComment = ({
  commentHash,
  indentLevel = 0,
  headerImg,
  postTime,
  upvoted,
  recasted,
  headerTitle,
  headerSubtitle,
  quoteTitle,
  quote,
  content,
  images,
  quotesCount,
  upvotesCount,
  hideActionBar,
  commentCustomStyle,
  rootCustomStyle,
  onContentBodyPress,
  onHeaderTitlePress,
  onHeaderSubtitlePress,
  onHeaderImagePress,
  onReplyPress,
}: MyCommentProps) => {
  const authContext = useContext(AuthContext);
  const optionsContext = useContext(OptionsContext);
  const lightboxContext = useContext(LightboxContext);
  const [isUpvoted, setIsUpvoted] = useState(0);
  const [isRecasted, setIsRecasted] = useState(0);

  const indentsHtml = useMemo(
    () =>
      Array.from({length: indentLevel}).map((_, i) => (
        <View key={i} style={[styles.indent, {width: `${indentSize}%`}]} />
      )),
    [indentLevel],
  );

  const mediaHtml = useMemo(() => {
    if (images) {
      return images.map((image, index) => (
        <UrlViewer
          key={index}
          url={image.url}
          linkPreview={image.linkPreview}
          onImagePress={() => {
            lightboxContext.show({
              urls: images.map(el => el.url),
              imageIndex: index,
            });
          }}
        />
      ));
    }

    return [];
  }, [images]);

  const toggleUpvote = useCallback(async () => {
    try {
      const finalUrl = `${ENDPOINT_CAST}/${commentHash}/reactions`;
      if ((upvoted && isUpvoted === 0) || isUpvoted === 1) {
        // console.log('deleting', finalUrl);
        const res = await axios.delete<ReactionResponse>(finalUrl, {
          data: {
            reactionType: 'like',
          },
          headers: {Authorization: `Bearer ${authContext.state.token}`},
        });
        // console.log('got response', res.data);
        if (res.data.result.success) {
          if (isUpvoted === 1) {
            setIsUpvoted(0);
          } else if (isUpvoted === 0) {
            setIsUpvoted(-1);
          }
        }
      } else if ((!upvoted && isUpvoted === 0) || isUpvoted === -1) {
        // console.log('upvoting', finalUrl);
        const res = await axios.post<ReactionResponse>(
          finalUrl,
          {
            reactionType: 'like',
          },
          {
            headers: {Authorization: `Bearer ${authContext.state.token}`},
          },
        );
        // console.log('got response', res.data);
        if (res.data.result.success) {
          if (isUpvoted === -1) {
            setIsUpvoted(0);
          } else if (isUpvoted === 0) {
            setIsUpvoted(1);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [authContext.state.token, commentHash, isUpvoted, upvoted]);
  const toggleRecast = useCallback(async () => {
    try {
      const finalUrl = `${ENDPOINT_CAST}/${commentHash}/reactions`;
      if ((recasted && isRecasted === 0) || isRecasted === 1) {
        // console.log('deleting recast', finalUrl);
        const res = await axios.delete<ReactionResponse>(finalUrl, {
          data: {
            reactionType: 'recast',
          },
          headers: {Authorization: `Bearer ${authContext.state.token}`},
        });
        // console.log('got response', res.data);
        if (res.data.result.success) {
          if (isRecasted === 1) {
            setIsRecasted(0);
          } else if (isRecasted === 0) {
            setIsRecasted(-1);
          }
        }
      } else if ((!recasted && isRecasted === 0) || isRecasted === -1) {
        // console.log('recasting', finalUrl);
        const res = await axios.post<ReactionResponse>(
          finalUrl,
          {
            reactionType: 'recast',
          },
          {
            headers: {Authorization: `Bearer ${authContext.state.token}`},
          },
        );
        // console.log('got response', res.data);
        if (res.data.result.success) {
          if (isRecasted === -1) {
            setIsRecasted(0);
          } else if (isRecasted === 0) {
            setIsRecasted(1);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [authContext.state.token, commentHash, isRecasted, recasted]);

  return (
    <View style={[styles.root, rootCustomStyle]}>
      {indentsHtml}
      <View
        style={[
          {
            width: `${100 - indentSize * indentLevel}%`,
          },
          commentCustomStyle,
        ]}>
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              if (onHeaderImagePress) {
                onHeaderImagePress();
              }
            }}>
            <FastImage style={styles.headerImg} source={{uri: headerImg}} />
          </Pressable>
          <View style={styles.headerTextCtn}>
            <Text
              onPress={() => {
                if (onHeaderTitlePress) {
                  onHeaderTitlePress();
                }
              }}
              suppressHighlighting
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.headerTitle}>
              {headerTitle}
            </Text>
            <Text
              onPress={() => {
                if (onHeaderSubtitlePress) {
                  onHeaderSubtitlePress();
                }
              }}
              numberOfLines={1}
              suppressHighlighting
              ellipsizeMode="tail"
              style={styles.headerSubtitle}>
              {' '}
              • {headerSubtitle}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.headerTime}>
              {' '}
              • {postTime}
            </Text>
          </View>
          <MyIconButton
            iconSize={22}
            filling="clear"
            style="secondary"
            icon={require('../../assets/images/icons/vertical_dots.png')}
            onPress={() => {
              optionsContext.show({
                hash: commentHash,
              });
            }}
          />
          {/* <Entypo
            name="dots-three-horizontal"
            size={16}
            color="gray"
            style={{marginLeft: 'auto'}}
          /> */}
        </View>
        {quote && (
          <View style={styles.quoteRoot}>
            <View style={{alignItems: 'flex-end'}}>
              <BorderLineImg />
              <LinearGradient
                style={styles.quoteBorder}
                colors={[
                  MyTheme.primaryGradientFirst,
                  MyTheme.primaryGradientSecond,
                ]}
              />
            </View>
            <View style={styles.quoteContent}>
              {quoteTitle && (
                <Text
                  style={styles.quoteTitle}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {quoteTitle}
                </Text>
              )}
              <Text
                style={styles.quoteText}
                numberOfLines={2}
                ellipsizeMode="tail">
                {quote}
              </Text>
            </View>
          </View>
        )}
        <View style={styles.contentCtn}>
          <HighlightedText
            customStyle={[
              styles.contentText,
              {
                marginBottom: images ? 20 : 0,
              },
            ]}
            onPress={() => {
              onContentBodyPress && onContentBodyPress();
            }}
            text={content}
          />

          {/* {image && <Image style={styles.contentImage} source={{uri: image}} />} */}
          {images && <View style={styles.mediaCtn}>{mediaHtml}</View>}
        </View>
        {!hideActionBar && (
          <CommentActionBar
            isUpvoted={isUpvoted === 0 ? upvoted : isUpvoted === 1}
            isRecasted={isRecasted === 0 ? recasted : isRecasted === 1}
            upvotesCount={upvotesCount + isUpvoted}
            quotesCount={quotesCount + isRecasted}
            onReplyPress={() => {
              onReplyPress && onReplyPress();
            }}
            onUpvotesPress={toggleUpvote}
            onQuotesPress={toggleRecast}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    // height: 300,
    flexDirection: 'row',
    paddingHorizontal: 15,
    backgroundColor: MyTheme.white,
  },
  indent: {
    borderLeftColor: 'lightgray',
    borderLeftWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerImg: {
    width: 22,
    height: 22,
    borderRadius: 2,
    marginRight: 8,
  },
  headerTextCtn: {
    width: '80%',
    marginRight: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    maxWidth: '35%',
    fontWeight: 'normal',
    fontSize: 12,
    fontFamily: MyTheme.fontRegular,
    color: MyTheme.black,
  },
  headerSubtitle: {
    color: MyTheme.grey400,
    maxWidth: '30%',
    fontSize: 12,
    fontFamily: MyTheme.fontRegular,
    fontWeight: 'normal',
  },
  headerTime: {
    color: MyTheme.grey400,
    maxWidth: '35%',
    fontSize: 12,
    fontFamily: MyTheme.fontRegular,
    fontWeight: 'normal',
  },
  quoteRoot: {flexDirection: 'row', width: '100%'},
  quoteBorder: {
    width: 2,
    flex: 1,
  },
  quoteContent: {
    padding: 10,
    flex: 1,
    backgroundColor: MyTheme.grey100,
    borderRadius: 2,
  },
  quoteTitle: {
    fontFamily: 'BeVietnamPro-Bold',
    color: MyTheme.grey500,
    marginBottom: 3,
  },
  quoteText: {
    fontFamily: MyTheme.fontRegular,
    color: MyTheme.grey500,
  },
  contentCtn: {
    marginTop: 10,
    flexDirection: 'column',
  },
  contentText: {
    fontFamily: MyTheme.fontRegular,
    color: MyTheme.black,
  },
  mediaCtn: {
    flexDirection: 'row',
    width: '100%',
  },
  contentImage: {
    // aspectRatio: 16 / 9,
    height: 200,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default MyComment;
