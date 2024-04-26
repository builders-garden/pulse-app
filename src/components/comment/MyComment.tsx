import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import MyIconButton from '../MyIconButton';
import UrlViewer from '../UrlViewer';
import CommentActionBar from './CommentActionBar';

type MyCommentProps = {
  indentLevel?: number;
  headerImg: string;
  headerTitle: string;
  postTime: string;
  headerSubtitle: string;
  content: string;
  image?: string;
  quotesCount: number;
  upvotesCount: number;
  commentCustomStyle?: StyleProp<ViewStyle>;
  rootCustomStyle?: StyleProp<ViewStyle>;
};

const MyComment = ({
  indentLevel = 0,
  headerImg,
  postTime,
  headerTitle,
  headerSubtitle,
  content,
  image,
  quotesCount,
  upvotesCount,
  commentCustomStyle,
  rootCustomStyle,
}: MyCommentProps) => {
  const indentSize = 5;

  const indentsHtml = Array.from({length: indentLevel}).map((_, i) => (
    <View key={i} style={[styles.indent, {width: `${indentSize}%`}]} />
  ));

  return (
    <View style={[styles.root, rootCustomStyle]}>
      {indentsHtml}
      <View
        style={[
          {
            width: `${100 - indentSize * indentLevel}%`,
          },
          commentCustomStyle,
        ]}>
        <View style={styles.header}>
          <Image style={styles.headerImg} source={{uri: headerImg}} />
          <View style={styles.headerTextCtn}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.headerTitle}>
              {headerTitle}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.headerSubtitle}>
              {' '}
              • {headerSubtitle}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.headerTime}>
              {' '}
              • {postTime}
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
          <Text style={{marginBottom: image ? 20 : 0}}>{content}</Text>
          {/* {image && <Image style={styles.contentImage} source={{uri: image}} />} */}
          {image && <UrlViewer url={image} />}
        </View>
        <CommentActionBar
          quotesCount={quotesCount}
          upvotesCount={upvotesCount}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    // height: 300,
    paddingHorizontal: 20,
    flexDirection: 'row',
    width: '100%',
  },
  indent: {
    borderLeftColor: 'lightgray',
    borderLeftWidth: 1,
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
    flexDirection: 'row',
  },
  headerTitle: {
    fontWeight: 'bold',
    maxWidth: '50%',
  },
  headerSubtitle: {
    color: 'gray',
    maxWidth: '30%',
  },
  headerTime: {
    color: 'gray',
  },
  contentCtn: {
    flexDirection: 'column',
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
});

export default MyComment;
