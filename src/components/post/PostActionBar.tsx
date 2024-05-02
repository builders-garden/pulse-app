import React from 'react';
import {StyleSheet, View} from 'react-native';
import CommentImg from '../../assets/images/icons/comment.svg';
import HatImg from '../../assets/images/icons/hat.svg';
import QuoteImg from '../../assets/images/icons/quote.svg';
import ShareImg from '../../assets/images/icons/share.svg';
import UpvoteImg from '../../assets/images/icons/upvote.svg';
import {MyTheme} from '../../theme';
import MyChipBase from '../MyChipBase';
import MyIconButtonBase from '../MyIconButtonBase';
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
        iconLeft={
          <CommentImg
            color={MyTheme.grey400}
            style={{marginRight: 3}}
            width={18}
            height={18}
          />
        }
        size="small"
        style="secondary"
        filling="clear"
        title={commentsCount.toString()}
        onPress={() => {
          onCommentsPress && onCommentsPress();
        }}
        customStyle={{marginRight: 5}}
      />
      <MyChipBase
        iconLeft={
          <QuoteImg
            color={MyTheme.grey400}
            style={{marginRight: 3}}
            width={18}
            height={18}
          />
        }
        size="small"
        style="secondary"
        filling="clear"
        title={quotesCount.toString()}
        onPress={() => {
          onQuotesPress && onQuotesPress();
        }}
        customStyle={{marginRight: 5}}
      />
      <MyChipBase
        iconLeft={
          <HatImg
            color={MyTheme.grey400}
            style={{marginRight: 3}}
            width={18}
            height={18}
          />
        }
        size="small"
        title="Tip"
        filling="clear"
        style="secondary"
        onPress={() => {
          onTipPress && onTipPress();
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
  postActionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    justifyContent: 'flex-start',
  },
});

export default PostActionBar;
