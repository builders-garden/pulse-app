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
import {ReactionResponse} from '../../api/cast/types';
import {Embed} from '../../api/feed/types';
import {AuthContext} from '../../contexts/auth/Auth.context';
import {MyTheme} from '../../theme';
import {ENDPOINT_CAST} from '../../variables';
import HighlightedText from '../HighlightedText';
import UrlViewer from '../UrlViewer';
import PostActionBar from './PostActionBar';

type MyPostProps = {
  headerImg: string;
  postHash: string;
  headerTitle: string;
  postTime: string;
  headerSubtitle: string;
  content: string;
  images?: Embed[];
  upvoted: boolean;
  recasted: boolean;
  commentsCount: number;
  quotesCount: number;
  upvotesCount: number;
  customStyle?: StyleProp<ViewStyle>;
  onContentBodyPress?: () => void;
  onHeaderTitlePress?: () => void;
  onHeaderSubtitlePress?: () => void;
  onHeaderImagePress?: () => void;
  onCommentPress?: () => void;
};

const MyPost = ({
  headerImg,
  postTime,
  postHash,
  headerTitle,
  headerSubtitle,
  content,
  images,
  upvoted,
  recasted,
  commentsCount,
  quotesCount,
  upvotesCount,
  customStyle,
  onContentBodyPress,
  onHeaderTitlePress,
  onHeaderSubtitlePress,
  onHeaderImagePress,
  onCommentPress,
}: MyPostProps) => {
  const authContext = useContext(AuthContext);
  const [isUpvoted, setIsUpvoted] = useState(0);
  const [isRecasted, setIsRecasted] = useState(0);

  const toggleUpvote = useCallback(async () => {
    try {
      const finalUrl = `${ENDPOINT_CAST}/${postHash}/reactions`;
      if ((upvoted && isUpvoted === 0) || isUpvoted === 1) {
        console.log('deleting', finalUrl);
        const res = await axios.delete<ReactionResponse>(finalUrl, {
          data: {
            reactionType: 'like',
          },
          headers: {Authorization: `Bearer ${authContext.state.token}`},
        });
        console.log('got response', res.data);
        if (res.data.result.success) {
          if (isUpvoted === 1) {
            setIsUpvoted(0);
          } else if (isUpvoted === 0) {
            setIsUpvoted(-1);
          }
        }
      } else if ((!upvoted && isUpvoted === 0) || isUpvoted === -1) {
        console.log('upvoting', finalUrl);
        const res = await axios.post<ReactionResponse>(
          finalUrl,
          {
            reactionType: 'like',
          },
          {
            headers: {Authorization: `Bearer ${authContext.state.token}`},
          },
        );
        console.log('got response', res.data);
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
  }, [authContext.state.token, postHash, isUpvoted, upvoted]);
  const toggleRecast = useCallback(async () => {
    try {
      const finalUrl = `${ENDPOINT_CAST}/${postHash}/reactions`;
      if ((recasted && isRecasted === 0) || isRecasted === 1) {
        console.log('deleting recast', finalUrl);
        const res = await axios.delete<ReactionResponse>(finalUrl, {
          data: {
            reactionType: 'recast',
          },
          headers: {Authorization: `Bearer ${authContext.state.token}`},
        });
        console.log('got response', res.data);
        if (res.data.result.success) {
          if (isRecasted === 1) {
            setIsRecasted(0);
          } else if (isRecasted === 0) {
            setIsRecasted(-1);
          }
        }
      } else if ((!recasted && isRecasted === 0) || isRecasted === -1) {
        console.log('recasting', finalUrl);
        const res = await axios.post<ReactionResponse>(
          finalUrl,
          {
            reactionType: 'recast',
          },
          {
            headers: {Authorization: `Bearer ${authContext.state.token}`},
          },
        );
        console.log('got response', res.data);
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
  }, [authContext.state.token, postHash, isRecasted, recasted]);

  const mediaHtml = useMemo(() => {
    if (images) {
      return images.map((image, index) => (
        <UrlViewer key={index} url={image.url} />
      ));
    }

    return [];
  }, [images]);

  return (
    <View style={[styles.root, customStyle && customStyle]}>
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
          <Pressable
            onPress={() => {
              if (onHeaderTitlePress) {
                onHeaderTitlePress();
              }
            }}
            style={{flexDirection: 'row', flex: 1}}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {headerTitle}
            </Text>
            <Text style={styles.headerTime} numberOfLines={1}>
              {' '}
              • {postTime}
            </Text>
          </Pressable>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            suppressHighlighting
            onPress={() => {
              if (onHeaderSubtitlePress) {
                onHeaderSubtitlePress();
              }
            }}
            style={styles.headerSubtitle}>
            {headerSubtitle}
          </Text>
        </View>
        {/* <MyIconButton
          iconSize={25}
          onPress={() => {}}
          style="secondary"
          filling="clear"
          icon={require('../../assets/images/icons/vertical_dots.png')}
        /> */}
        {/* <Entypo
            name="dots-three-horizontal"
            size={16}
            color="gray"
            style={{marginLeft: 'auto'}}
          /> */}
      </View>
      <View style={styles.contentCtn}>
        <HighlightedText
          onPress={() => {
            if (onContentBodyPress) {
              onContentBodyPress();
            }
          }}
          customStyle={styles.contentBody}
          text={content}
        />

        {images && <View style={styles.mediaCtn}>{mediaHtml}</View>}
        {/* {image && <UrlViewer url={image} />} */}
      </View>
      <PostActionBar
        isUpvoted={isUpvoted === 0 ? upvoted : isUpvoted === 1}
        isRecasted={isRecasted === 0 ? recasted : isRecasted === 1}
        commentsCount={commentsCount}
        quotesCount={quotesCount + isRecasted}
        upvotesCount={upvotesCount + isUpvoted}
        customStyle={styles.footer}
        onUpvotesPress={() => {
          toggleUpvote();
        }}
        onQuotesPress={() => {
          toggleRecast();
        }}
        onCommentsPress={onCommentPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    // height: 300,
    borderRadius: 4,
    backgroundColor: MyTheme.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerImg: {
    width: 30,
    height: 30,
    borderRadius: 4,
    marginRight: 14,
  },
  headerTextCtn: {
    width: '80%',
    marginRight: 4,
  },
  headerTitle: {
    fontFamily: MyTheme.fontBold,
    color: MyTheme.black,
    maxWidth: '60%',
  },
  headerTime: {
    color: MyTheme.grey400,
    fontFamily: MyTheme.fontRegular,
    maxWidth: '40%',
  },
  headerSubtitle: {
    color: MyTheme.grey400,
    maxWidth: '100%',
    fontFamily: MyTheme.fontRegular,
  },
  contentCtn: {
    flexDirection: 'column',
  },
  contentBody: {
    marginBottom: 20,
    fontFamily: MyTheme.fontRegular,
    color: MyTheme.black,
    paddingHorizontal: 20,
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
  mediaCtn: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    rowGap: 10,
  },
  footer: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default MyPost;
