import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TrendingCastResult} from '../../../api/cast/types';
import HighlightedText from '../../../components/HighlightedText';
import {formatDate} from '../../../libs/date';
import {MyTheme} from '../../../theme';
import TrendingPostActionBar from './TrendingPostActionBar';

type TrendingPostItemProps = {
  trendingCast: TrendingCastResult;
  customStyle?: StyleProp<ViewStyle>;
  onContentBodyPress?: () => void;
  onHeaderPress?: () => void;
  onCommentPress?: () => void;
};

const TrendingPostItem = ({
  trendingCast,
  customStyle,
  onContentBodyPress,
  onHeaderPress,
  onCommentPress,
}: TrendingPostItemProps) => {
  const castedDate = new Date(trendingCast.cast.castedAtTimestamp);
  const formattedDate = formatDate(castedDate);

  return (
    <View style={customStyle}>
      <View style={styles.ctn}>
        <View>
          <View style={styles.header}>
            <FastImage
              source={{uri: trendingCast.cast.castedBy.profileImage}}
              style={styles.headerImg}
            />
            <Pressable
              onPress={() => {
                onHeaderPress && onHeaderPress();
              }}
              style={styles.headerTextCtn}>
              <Text numberOfLines={1} style={styles.headerTitle}>
                {trendingCast.cast.castedBy.profileDisplayName}
              </Text>
              <View style={styles.headerSubtitleCtn}>
                <Text numberOfLines={1} style={styles.headerSubtitle}>
                  @{trendingCast.cast.castedBy.profileHandle} • {formattedDate}
                </Text>
              </View>
            </Pressable>
            {/* <FollowButton
              customStyle={[styles.actionButton]}
              fid={trendingCast.fid}
              followingInitialValue={false} // TODO: ask API
            /> */}
          </View>
          <View style={styles.contentCtn}>
            <HighlightedText
              numberOfLines={3}
              onPress={() => {
                if (onContentBodyPress) {
                  onContentBodyPress();
                }
              }}
              customStyle={styles.contentBody}
              text={trendingCast.cast.text}
            />
          </View>
        </View>
        <TrendingPostActionBar
          commentsCount={trendingCast.cast.numberOfReplies}
          quotesCount={trendingCast.cast.numberOfRecasts}
          upvotesCount={trendingCast.cast.numberOfLikes}
          onCommentsPress={onCommentPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ctn: {
    // height: 300,
    padding: 20,
    width: 300,
    borderRadius: 4,
    backgroundColor: MyTheme.white,
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 16,
  },
  headerTextCtn: {
    marginLeft: 10,
    flex: 1,
  },
  headerTitle: {
    fontFamily: MyTheme.fontBold,
    color: MyTheme.black,
    maxWidth: '90%',
  },
  headerSubtitleCtn: {
    flexDirection: 'row',
  },
  headerSubtitle: {
    fontFamily: MyTheme.fontRegular,
    color: MyTheme.grey400,
    maxWidth: '90%',
  },
  headerImg: {
    width: 30,
    height: 30,
    borderRadius: 3,
  },
  contentCtn: {
    flexDirection: 'column',
  },
  contentBody: {
    marginBottom: 20,
    color: MyTheme.grey600,
  },
  contentImage: {
    // aspectRatio: 16 / 9,
    height: 200,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    justifyContent: 'flex-start',
  },
  actionButton: {
    marginLeft: 'auto',
    // paddingVertical: 6,
    // paddingHorizontal: 10,
    // alignSelf: 'flex-end',
  },
});

export default TrendingPostItem;
