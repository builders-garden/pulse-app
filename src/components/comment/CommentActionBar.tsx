import React from 'react';
import {StyleSheet, View} from 'react-native';
import CommentImg from '../../assets/images/icons/comment.svg';
import QuoteImg from '../../assets/images/icons/quote.svg';
import ShareImg from '../../assets/images/icons/share.svg';
import UpvoteImg from '../../assets/images/icons/upvote.svg';
import {MyTheme} from '../../theme';
import MyChipBase from '../MyChipBase';
import MyIconButtonBase from '../MyIconButtonBase';
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
      <MyChipBase
        iconLeft={
          <UpvoteImg
            style={{marginRight: 3}}
            width={18}
            height={18}
            color={MyTheme.grey400}
          />
        }
        title={upvotesCount.toString()}
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
          <CommentImg
            style={{marginRight: 3}}
            width={18}
            height={18}
            color={MyTheme.grey400}
          />
        }
        title="Reply"
        style="secondary"
        filling="clear"
        onPress={() => {
          onReplyPress && onReplyPress();
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
            color={MyTheme.grey400}
          />
        }
        filling="clear"
        style="secondary"
        title={`${quotesCount}`}
        onPress={() => {
          onQuotesPress && onQuotesPress();
        }}
        customStyle={{marginRight: 5}}
      />

      <MyIconButtonBase
        onPress={() => {
          onSharePress && onSharePress();
        }}
        filling="clear"
        icon={<ShareImg width={18} height={18} color={MyTheme.grey400} />}
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
