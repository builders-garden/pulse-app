import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {MyTheme} from '../../theme';
import MyIconButton from '../MyIconButton';
import UrlViewer from '../UrlViewer';
import PostActionBar from './PostActionBar';

type MyPostProps = {
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
};

const MyPost = ({
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
}: MyPostProps) => {
  return (
    <View style={[styles.root, customStyle && customStyle]}>
      <View style={styles.header}>
        <FastImage style={styles.headerImg} source={{uri: headerImg}} />
        <View style={styles.headerTextCtn}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.headerTitle}>{headerTitle}</Text>
            <Text style={styles.headerTime}> • {postTime}</Text>
          </View>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.headerSubtitle}>
            {headerSubtitle}
          </Text>
        </View>
        <MyIconButton
          iconSize={25}
          onPress={() => {}}
          style="secondary"
          filling="clear"
          icon={require('../../assets/images/icons/vertical_dots.png')}
        />
        {/* <Entypo
            name="dots-three-horizontal"
            size={16}
            color="gray"
            style={{marginLeft: 'auto'}}
          /> */}
      </View>
      <View style={styles.contentCtn}>
        <Text
          onPress={() => {
            if (onContentBodyPress) {
              onContentBodyPress();
            }
          }}
          style={styles.contentBody}>
          {content}
        </Text>
        {image && <UrlViewer url={image} />}
      </View>
      <PostActionBar
        commentsCount={commentsCount}
        quotesCount={quotesCount}
        upvotesCount={upvotesCount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    // height: 300,
    padding: 20,
    borderRadius: 4,
    backgroundColor: MyTheme.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerImg: {
    width: 30,
    height: 30,
    borderRadius: 4,
    marginRight: 14,
  },
  headerTextCtn: {
    width: '80%',
    marginRight: 4,
  },
  headerTitle: {
    fontFamily: 'BeVietnamPro-Bold',
    color: MyTheme.black,
  },
  headerTime: {
    color: 'gray',
    fontFamily: 'BeVietnamPro-Regular',
  },
  headerSubtitle: {
    color: 'gray',
    maxWidth: '100%',
    fontFamily: 'BeVietnamPro-Regular',
  },
  contentCtn: {
    flexDirection: 'column',
  },
  contentBody: {
    marginBottom: 20,
    fontFamily: 'BeVietnamPro-Regular',
  },
  contentImage: {
    // aspectRatio: 16 / 9,
    height: 200,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    justifyContent: 'flex-start',
  },
});

export default MyPost;
