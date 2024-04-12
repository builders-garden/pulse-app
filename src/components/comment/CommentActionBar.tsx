import React from 'react';
import {StyleSheet, View} from 'react-native';
import MyChip from '../MyChip';
import MyIconButton from '../MyIconButton';

type CommentActionBarProps = {
  quotesCount: number;
  upvotesCount: number;
  onQuotesPress?: () => void;
  onReplyPress?: () => void;
  onUpvotesPress?: () => void;
  onSharePress?: () => void;
};

const CommentActionBar = ({
  quotesCount,
  upvotesCount,
  onQuotesPress,
  onReplyPress,
  onUpvotesPress,
  onSharePress,
}: CommentActionBarProps) => {
  return (
    <View style={styles.CommentActionBar}>
      <MyChip
        size="small"
        iconLeft={require('../../assets/images/icons/upvote.png')}
        title={`${upvotesCount}`}
        onPress={() => {
          onUpvotesPress && onUpvotesPress();
        }}
        customStyle={{marginRight: 5}}
      />
      <MyChip
        size="small"
        iconLeft={require('../../assets/images/icons/reply.png')}
        title="Reply"
        onPress={() => {
          onReplyPress && onReplyPress();
        }}
        customStyle={{marginRight: 5}}
      />
      <MyChip
        size="small"
        iconLeft={require('../../assets/images/icons/quote.png')}
        title={`${quotesCount}`}
        onPress={() => {
          onQuotesPress && onQuotesPress();
        }}
        customStyle={{marginRight: 5}}
      />
      <MyIconButton
        iconSize={18}
        onPress={() => {
          onSharePress && onSharePress();
        }}
        icon={require('../../assets/images/icons/share.png')}
        customStyle={{marginLeft: 'auto'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  CommentActionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    justifyContent: 'flex-start',
  },
});

export default CommentActionBar;
