import React from 'react';
import {StyleSheet, View} from 'react-native';
import BookmarkImg from '../../assets/images/icons/bookmark.svg';
import CommentImg from '../../assets/images/icons/comment.svg';
import HatImg from '../../assets/images/icons/hat.svg';
import QuoteImg from '../../assets/images/icons/quote.svg';
import ShareImg from '../../assets/images/icons/share.svg';
import UpvoteImg from '../../assets/images/icons/upvote.svg';
import UpvoteFillImg from '../../assets/images/icons/upvote_fill.svg';
import {MyTheme} from '../../theme';
import MyChipBase from '../MyChipBase';
import MyIconButtonBase from '../MyIconButtonBase';
type PostActionBarProps = {
  commentsCount: number;
  quotesCount: number;
  upvotesCount: number;
  isUpvoted?: boolean;
  isRecasted?: boolean;
  onCommentsPress?: () => void;
  onQuotesPress?: () => void;
  onUpvotesPress?: () => void;
  onTipPress?: () => void;
  onBookmarkPress?: () => void;
  onSharePress?: () => void;
};

const PostActionBar = ({
  commentsCount,
  quotesCount,
  upvotesCount,
  isUpvoted,
  isRecasted,
  onCommentsPress,
  onQuotesPress,
  onUpvotesPress,
  onTipPress,
  onBookmarkPress,
  onSharePress,
}: PostActionBarProps) => {
  return (
    <View style={styles.postActionBar}>
      <MyChipBase
        iconLeft={
          isUpvoted ? (
            <UpvoteFillImg
              style={{marginRight: 3}}
              width={18}
              height={18}
              color={MyTheme.primaryColor}
            />
          ) : (
            <UpvoteImg
              style={{marginRight: 3}}
              width={18}
              height={18}
              color={MyTheme.grey300}
            />
          )
        }
        title={upvotesCount.toString()}
        size="small"
        style={isUpvoted ? 'primary' : 'secondary'}
        filling="clear"
        onPress={() => {
          onUpvotesPress && onUpvotesPress();
        }}
        customStyle={{marginRight: 5}}
      />
      <MyChipBase
        iconLeft={
          <CommentImg
            color={MyTheme.grey300}
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
          isRecasted ? (
            <QuoteImg
              color={MyTheme.primaryColor}
              style={{marginRight: 3}}
              width={18}
              height={18}
            />
          ) : (
            <QuoteImg
              color={MyTheme.grey300}
              style={{marginRight: 3}}
              width={18}
              height={18}
            />
          )
        }
        size="small"
        style={isRecasted ? 'primary' : 'secondary'}
        filling="clear"
        title={quotesCount.toString()}
        onPress={() => {
          onQuotesPress && onQuotesPress();
        }}
        customStyle={{marginRight: 5}}
      />
      <View style={styles.verticalDivider} />
      <MyChipBase
        iconLeft={
          <HatImg
            color={MyTheme.grey300}
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
        customStyle={{marginLeft: 5}}
      />
      <MyIconButtonBase
        onPress={() => {
          onBookmarkPress && onBookmarkPress();
        }}
        filling="clear"
        icon={<BookmarkImg width={18} height={18} color={MyTheme.grey300} />}
        customStyle={{marginLeft: 'auto', marginRight: 8}}
      />
      <MyIconButtonBase
        onPress={() => {
          onSharePress && onSharePress();
        }}
        filling="clear"
        icon={<ShareImg width={18} height={18} color={MyTheme.grey300} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  verticalDivider: {width: 1, backgroundColor: MyTheme.grey300, height: '100%'},
  postActionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default PostActionBar;
