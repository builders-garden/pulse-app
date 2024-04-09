import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import MyChip from './MyChip';
import MyIconButton from './MyIconButton';

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
}: MyPostProps) => {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Image style={styles.headerImg} source={headerImg} />
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text>{headerTitle}</Text>
            <Text> • {postTime}</Text>
          </View>
          <Text>{headerSubtitle}</Text>
        </View>
        {/* <Entypo
            name="dots-three-horizontal"
            size={16}
            color="gray"
            style={{marginLeft: 'auto'}}
          /> */}
      </View>
      <View style={styles.contentCtn}>
        <Text>{content}</Text>
        {image && <Image source={image} />}
      </View>
      <View style={styles.footer}>
        <MyChip
          iconLeft={require('../assets/images/icons/upvote.png')}
          title={`${upvotesCount}`}
          onPress={() => {}}
          customStyle={{marginRight: 5}}
        />
        <MyChip
          iconLeft={require('../assets/images/icons/comment.png')}
          title={`${commentsCount} comments`}
          onPress={() => {}}
          customStyle={{marginRight: 5}}
        />
        <MyChip
          iconLeft={require('../assets/images/icons/quote.png')}
          title={`${quotesCount} quotes`}
          onPress={() => {}}
          customStyle={{marginRight: 5}}
        />
        <MyChip
          iconLeft={require('../assets/images/icons/quote.png')}
          title="Tip"
          onPress={() => {}}
          customStyle={{marginRight: 5}}
        />
        <MyIconButton
          iconSize={18}
          onPress={() => {}}
          icon={require('../assets/images/icons/share.png')}
        />
      </View>
      <View style={styles.bottomBorder} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    // height: 300,
    padding: 20,
    flex: 1,
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
  contentCtn: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    justifyContent: 'flex-start',
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginTop: 20,
  },
});

export default MyPost;
