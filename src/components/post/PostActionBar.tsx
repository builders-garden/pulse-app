import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
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
  customStyle?: StyleProp<ViewStyle>;
  onCommentsPress?: () => void;
  onQuotesPress?: () => void;
  onUpvotesPress?: () => void;
  onTipPress?: () => void;
  // onBookmarkPress?: () => void;
  onSharePress?: () => void;
};

const PostActionBar = ({
  commentsCount,
  quotesCount,
  upvotesCount,
  isUpvoted,
  isRecasted,
  customStyle,
  onCommentsPress,
  onQuotesPress,
  onUpvotesPress,
  onTipPress,
  // onBookmarkPress,
  onSharePress,
}: PostActionBarProps) => {
  return (
    <View style={[styles.postActionBar, customStyle && customStyle]}>
      <MyChipBase
        iconLeft={
          isUpvoted ? (
            <UpvoteFillImg
              style={styles.chipIcon}
              width={18}
              height={18}
              color={MyTheme.primaryColor}
            />
          ) : (
            <UpvoteImg
              style={styles.chipIcon}
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
        customStyle={styles.leftChip}
        textCustomStyle={styles.leftChipText}
      />
      <MyChipBase
        iconLeft={
          <CommentImg
            color={MyTheme.grey300}
            style={styles.chipIcon}
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
        customStyle={styles.leftChip}
        textCustomStyle={styles.leftChipText}
      />
      <MyChipBase
        iconLeft={
          isRecasted ? (
            <QuoteImg
              color={MyTheme.primaryColor}
              style={styles.chipIcon}
              width={18}
              height={18}
            />
          ) : (
            <QuoteImg
              color={MyTheme.grey300}
              style={styles.chipIcon}
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
        customStyle={styles.leftChip}
        textCustomStyle={styles.leftChipText}
      />
      <View style={styles.verticalDivider} />
      <MyChipBase
        iconLeft={
          <HatImg
            color={MyTheme.grey300}
            style={styles.chipIcon}
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
        customStyle={styles.tipChip}
      />
      {/* <MyIconButtonBase
        onPress={() => {
          onBookmarkPress && onBookmarkPress();
        }}
        filling="clear"
        icon={<BookmarkImg width={18} height={18} color={MyTheme.grey300} />}
        customStyle={{marginLeft: 'auto', marginRight: 8}}
      /> */}
      <MyIconButtonBase
        onPress={() => {
          onSharePress && onSharePress();
        }}
        filling="clear"
        icon={<ShareImg width={18} height={18} color={MyTheme.grey300} />}
        customStyle={styles.shareBtn}
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
  },
  leftChip: {
    marginRight: 5,
  },
  leftChipText: {
    // width: 25,
  },
  tipChip: {
    marginLeft: 5,
  },
  shareBtn: {
    marginLeft: 'auto',
  },
  chipIcon: {
    marginRight: 3,
  },
});

export default PostActionBar;
