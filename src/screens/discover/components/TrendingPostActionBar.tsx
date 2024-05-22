import React from 'react';
import {StyleSheet, View} from 'react-native';
import CommentImg from '../../../assets/images/icons/comment.svg';
import QuoteImg from '../../../assets/images/icons/quote.svg';
import UpvoteImg from '../../../assets/images/icons/upvote.svg';
import VerticalDotsImg from '../../../assets/images/icons/vertical_dots.svg';
import MyChipBase from '../../../components/MyChipBase';
import MyIconButtonBase from '../../../components/MyIconButtonBase';
import {MyTheme} from '../../../theme';
type TrendingPostItemActionBarProps = {
  commentsCount: number;
  quotesCount: number;
  upvotesCount: number;
  onCommentsPress?: () => void;
  onQuotesPress?: () => void;
  onUpvotesPress?: () => void;
  onTipPress?: () => void;
  onBookmarkPress?: () => void;
  onSharePress?: () => void;
};

const TrendingPostItemActionBar = ({
  commentsCount,
  quotesCount,
  upvotesCount,
  onCommentsPress,
  onQuotesPress,
  onUpvotesPress,
  onSharePress,
}: TrendingPostItemActionBarProps) => {
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

      <MyIconButtonBase
        onPress={() => {
          onSharePress && onSharePress();
        }}
        filling="clear"
        customStyle={{marginLeft: 'auto'}}
        icon={
          <VerticalDotsImg width={18} height={18} color={MyTheme.grey400} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  verticalDivider: {width: 1, backgroundColor: MyTheme.grey400, height: '100%'},
  postActionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    justifyContent: 'flex-start',
  },
});

export default TrendingPostItemActionBar;
