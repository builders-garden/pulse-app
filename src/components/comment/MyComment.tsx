import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BorderLineImg from '../../assets/images/thread/quote_border_line.svg';
import {MyTheme} from '../../theme';
import MyIconButton from '../MyIconButton';
import UrlViewer from '../UrlViewer';
import CommentActionBar from './CommentActionBar';

export type MyCommentProps = {
  indentLevel?: number;
  headerImg: string;
  headerTitle: string;
  postTime: string;
  headerSubtitle: string;
  quote?: string;
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
  quote,
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
            iconSize={22}
            onPress={() => {}}
            filling="clear"
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
        {quote && (
          <View style={styles.quoteRoot}>
            <View style={{alignItems: 'flex-end'}}>
              <BorderLineImg />
              <LinearGradient
                style={styles.quoteBorder}
                colors={[
                  MyTheme.primaryGradientFirst,
                  MyTheme.primaryGradientSecond,
                ]}
              />
            </View>
            <View style={styles.quoteContent}>
              <Text
                style={styles.quoteText}
                numberOfLines={2}
                ellipsizeMode="tail">
                {quote}
              </Text>
            </View>
          </View>
        )}
        <View style={styles.contentCtn}>
          <Text
            style={[
              styles.contentText,
              {
                marginBottom: image ? 20 : 0,
              },
            ]}>
            {content}
          </Text>
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
    flexDirection: 'row',
    paddingHorizontal: 15,
    backgroundColor: MyTheme.white,
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
    width: 22,
    height: 22,
    borderRadius: 2,
    marginRight: 8,
  },
  headerTextCtn: {
    width: '80%',
    marginRight: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    maxWidth: '35%',
    fontWeight: 'normal',
    fontSize: 12,
    fontFamily: 'BeVietnamPro-Regular',
    color: MyTheme.black,
  },
  headerSubtitle: {
    color: 'gray',
    maxWidth: '30%',
    fontSize: 12,
    fontFamily: 'BeVietnamPro-Regular',
    fontWeight: 'normal',
  },
  headerTime: {
    color: 'gray',
    maxWidth: '35%',
    fontSize: 12,
    fontFamily: 'BeVietnamPro-Regular',
    fontWeight: 'normal',
  },
  quoteRoot: {flexDirection: 'row', width: '100%'},
  quoteBorder: {
    width: 2,
    flex: 1,
  },
  quoteContent: {
    padding: 10,
    flex: 1,
    backgroundColor: MyTheme.grey100,
    borderRadius: 2,
  },
  quoteText: {
    fontFamily: 'BeVietnamPro-Regular',
    color: MyTheme.grey500,
  },
  contentCtn: {
    marginTop: 10,
    flexDirection: 'column',
  },
  contentText: {
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
});

export default MyComment;
