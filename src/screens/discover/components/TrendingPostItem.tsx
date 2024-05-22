import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import MyButtonNew from '../../../components/MyButtonNew';
import {MyTheme} from '../../../theme';
import TrendingPostActionBar from './TrendingPostActionBar';

type TrendingPostItemProps = {
  headerImg: string;
  headerTitle: string;
  postTime: string;
  headerSubtitle: string;
  content: string;
  image?: string;
  commentsCount: number;
  quotesCount: number;
  upvotesCount: number;
  customStyle?: StyleProp<ViewStyle>;
  onContentBodyPress?: () => void;
  onButtonPress?: () => void;
};

const TrendingPostItem = ({
  headerImg,
  postTime,
  headerTitle,
  headerSubtitle,
  content,
  image,
  commentsCount,
  quotesCount,
  upvotesCount,
  customStyle,
  onContentBodyPress,
}: TrendingPostItemProps) => {
  return (
    <View style={[styles.root, customStyle]}>
      <View style={styles.ctn}>
        <View style={styles.header}>
          <FastImage source={{uri: headerImg}} style={styles.headerImg} />
          <View style={styles.headerTextCtn}>
            <Text numberOfLines={1} style={styles.headerTitle}>
              {headerTitle}
            </Text>
            <View style={styles.headerSubtitleCtn}>
              <Text numberOfLines={1} style={styles.headerSubtitle}>
                /{headerSubtitle} • {postTime}
              </Text>
            </View>
          </View>
          <MyButtonNew
            customStyle={[styles.actionButton]}
            onPress={() => {}}
            title="Follow"
          />
        </View>
        <View style={styles.contentCtn}>
          <Text
            numberOfLines={3}
            ellipsizeMode="tail"
            onPress={() => {
              if (onContentBodyPress) {
                onContentBodyPress();
              }
            }}
            style={styles.contentBody}>
            {content}
          </Text>
        </View>
        <TrendingPostActionBar
          commentsCount={commentsCount}
          quotesCount={quotesCount}
          upvotesCount={upvotesCount}
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
