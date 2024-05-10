import React from 'react';
import {StyleSheet, View} from 'react-native';
import QuoteImg from '../../assets/images/icons/quote.svg';
import ReplyImg from '../../assets/images/icons/reply.svg';
import UpvoteImg from '../../assets/images/icons/upvote.svg';
import {MyTheme} from '../../theme';
import MyChipBase from '../MyChipBase';
type CommentActionBarProps = {
  quotesCount: number;
  upvotesCount: number;
  onQuotesPress?: () => void;
  onReplyPress?: () => void;
  onUpvotesPress?: () => void;
};

const CommentActionBar = ({
  quotesCount,
  upvotesCount,
  onQuotesPress,
  onReplyPress,
  onUpvotesPress,
}: CommentActionBarProps) => {
  return (
    <View style={styles.CommentActionBar}>
      <MyChipBase
        iconLeft={
          <UpvoteImg
            style={{marginRight: 3}}
            width={18}
            height={18}
            color={MyTheme.grey300}
          />
        }
        title={upvotesCount === 0 ? '' : upvotesCount.toString()}
        size="small"
        style="secondary"
        filling="clear"
        onPress={() => {
          onUpvotesPress && onUpvotesPress();
        }}
        customStyle={{marginRight: 5}}
      />
      <MyChipBase
        size="small"
        iconLeft={
          <QuoteImg
            style={{marginRight: 3}}
            width={18}
            height={18}
            color={MyTheme.grey300}
          />
        }
        filling="clear"
        style="secondary"
        title={quotesCount === 0 ? '' : quotesCount.toString()}
        onPress={() => {
          onQuotesPress && onQuotesPress();
        }}
        customStyle={{marginRight: 5}}
      />
      <MyChipBase
        size="small"
        iconLeft={
          <ReplyImg
            style={{marginRight: 3}}
            width={18}
            height={18}
            color={MyTheme.grey300}
          />
        }
        filling="clear"
        style="secondary"
        title="Reply"
        onPress={() => {
          onReplyPress && onReplyPress();
        }}
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
    justifyContent: 'flex-end',
  },
});

export default CommentActionBar;
