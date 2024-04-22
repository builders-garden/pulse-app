import React from 'react';
import {StyleSheet, View} from 'react-native';
import MyChip from '../../../components/MyChip';
import MyIconButton from '../../../components/MyIconButton';

type TrendingPostActionBarProps = {
  commentsCount: number;
  quotesCount: number;
  upvotesCount: number;
  onCommentsPress?: () => void;
  onQuotesPress?: () => void;
  onUpvotesPress?: () => void;
  onTipPress?: () => void;
  onSharePress?: () => void;
};

const TrendingPostActionBar = ({
  commentsCount,
  quotesCount,
  upvotesCount,
  onCommentsPress,
  onQuotesPress,
  onUpvotesPress,
  onTipPress,
  onSharePress,
}: TrendingPostActionBarProps) => {
  return (
    <View style={styles.TrendingPostActionBar}>
      <MyChip
        iconLeft={require('../../../assets/images/icons/upvote.png')}
        title={`${upvotesCount}`}
        size="small"
        onPress={() => {
          onUpvotesPress && onUpvotesPress();
        }}
        customStyle={{marginRight: 5}}
      />
      <MyChip
        iconLeft={require('../../../assets/images/icons/comment.png')}
        size="small"
        title={`${commentsCount}`}
        onPress={() => {
          onCommentsPress && onCommentsPress();
        }}
        customStyle={{marginRight: 5}}
      />
      <MyChip
        iconLeft={require('../../../assets/images/icons/quote.png')}
        size="small"
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
        customStyle={{marginLeft: 'auto'}}
        icon={require('../../../assets/images/icons/share.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  TrendingPostActionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    justifyContent: 'flex-start',
  },
});

export default TrendingPostActionBar;
