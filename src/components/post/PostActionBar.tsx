import React from 'react';
import {StyleSheet, View} from 'react-native';
import MyChip from '../MyChip';
import MyIconButton from '../MyIconButton';

type PostActionBarProps = {
  commentsCount: number;
  quotesCount: number;
  upvotesCount: number;
  onCommentsPress?: () => void;
  onQuotesPress?: () => void;
  onUpvotesPress?: () => void;
  onTipPress?: () => void;
  onSharePress?: () => void;
};

const PostActionBar = ({
  commentsCount,
  quotesCount,
  upvotesCount,
  onCommentsPress,
  onQuotesPress,
  onUpvotesPress,
  onTipPress,
  onSharePress,
}: PostActionBarProps) => {
  return (
    <View style={styles.postActionBar}>
      <MyChip
        iconLeft={require('../../assets/images/icons/upvote.png')}
        title={`${upvotesCount}`}
        size="small"
        onPress={() => {
          onUpvotesPress && onUpvotesPress();
        }}
        customStyle={{marginRight: 5}}
      />
      <MyChip
        iconLeft={require('../../assets/images/icons/comment.png')}
        size="small"
        title={`${commentsCount} comments`}
        onPress={() => {
          onCommentsPress && onCommentsPress();
        }}
        customStyle={{marginRight: 5}}
      />
      <MyChip
        iconLeft={require('../../assets/images/icons/quote.png')}
        size="small"
        title={`${quotesCount} quotes`}
        onPress={() => {
          onQuotesPress && onQuotesPress();
        }}
        customStyle={{marginRight: 5}}
      />
      <MyChip
        iconLeft={require('../../assets/images/icons/quote.png')}
        size="small"
        title="Tip"
        onPress={() => {
          onTipPress && onTipPress();
        }}
        customStyle={{marginRight: 5}}
      />
      <MyIconButton
        iconSize={18}
        onPress={() => {
          onSharePress && onSharePress();
        }}
        icon={require('../../assets/images/icons/share.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  postActionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    justifyContent: 'flex-start',
  },
});

export default PostActionBar;
