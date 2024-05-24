import axios from 'axios';
import React, {useCallback, useContext, useState} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ReactionResponse} from '../../api/cast/types';
import BorderLineImg from '../../assets/images/thread/border_line.svg';
import {AuthContext} from '../../contexts/auth/Auth.context';
import {MyTheme} from '../../theme';
import {ENDPOINT_CAST} from '../../variables';
import UrlViewer from '../UrlViewer';
import PostActionBar from '../post/PostActionBar';

type MyThreadProps = {
  content: string;
  postHash: string;
  upvoted: boolean;
  recasted: boolean;
  image?: string;
  commentsCount: number;
  quotesCount: number;
  upvotesCount: number;
  customStyle?: StyleProp<ViewStyle>;
  onContentBodyPress?: () => void;
};

const MyThread = ({
  content,
  postHash,
  upvoted,
  recasted,
  image,
  commentsCount,
  quotesCount,
  upvotesCount,
  customStyle,
  onContentBodyPress,
}: MyThreadProps) => {
  const authContext = useContext(AuthContext);
  const [isUpvoted, setIsUpvoted] = useState(0);
  const [isRecasted, setIsRecasted] = useState(0);

  const toggleUpvote = useCallback(async () => {
    try {
      const finalUrl = `${ENDPOINT_CAST}${postHash}/reactions`;
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
      const finalUrl = `${ENDPOINT_CAST}${postHash}/reactions`;
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

  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{alignItems: 'flex-end'}}>
        <BorderLineImg color={MyTheme.primaryColor} />
        <LinearGradient
          style={styles.border}
          colors={[MyTheme.primaryGradientFirst, MyTheme.primaryGradientSecond]}
        />
      </View>
      <View style={[styles.root, customStyle && customStyle]}>
        <View style={styles.contentCtn}>
          <Text
            onPress={() => {
              if (onContentBodyPress) {
                onContentBodyPress();
              }
            }}
            style={styles.contentBody}>
            {content}
          </Text>
          {image && <UrlViewer url={image} />}
        </View>
        <PostActionBar
          commentsCount={commentsCount}
          quotesCount={quotesCount + isRecasted}
          upvotesCount={upvotesCount + isUpvoted}
          isUpvoted={isUpvoted === 0 ? upvoted : isUpvoted === 1}
          isRecasted={isRecasted === 0 ? recasted : isRecasted === 1}
          onUpvotesPress={() => {
            toggleUpvote();
          }}
          onQuotesPress={() => {
            toggleRecast();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    // height: 300,
    padding: 20,
    flex: 1,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: MyTheme.white,
  },
  border: {
    width: 2,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
  contentCtn: {
    flexDirection: 'column',
  },
  contentBody: {
    marginBottom: 20,
    fontFamily: 'BeVietnamPro-Regular',
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    justifyContent: 'flex-start',
  },
});

export default MyThread;
