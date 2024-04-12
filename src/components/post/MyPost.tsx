import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import MyIconButton from '../MyIconButton';
import PostActionBar from './PostActionBar';

type MyPostProps = {
  headerImg: ImageSourcePropType;
  headerTitle: string;
  postTime: string;
  headerSubtitle: string;
  content: string;
  image?: ImageSourcePropType;
  commentsCount: number;
  quotesCount: number;
  upvotesCount: number;
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
  onContentBodyPress,
}: MyPostProps) => {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Image style={styles.headerImg} source={headerImg} />
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
        {image && <Image style={styles.contentImage} source={image} />}
      </View>
      <PostActionBar
        commentsCount={commentsCount}
        quotesCount={quotesCount}
        upvotesCount={upvotesCount}
      />
      <View style={styles.bottomBorder} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    // height: 300,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerImg: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginRight: 14,
  },
  headerTextCtn: {
    width: '80%',
    marginRight: 4,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  headerTime: {
    color: 'gray',
  },
  headerSubtitle: {
    color: 'gray',
    maxWidth: '100%',
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
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginTop: 20,
  },
});

export default MyPost;
