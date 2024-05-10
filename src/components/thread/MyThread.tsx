import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BorderLineImg from '../../assets/images/thread/border_line.svg';
import {MyTheme} from '../../theme';
import UrlViewer from '../UrlViewer';
import PostActionBar from '../post/PostActionBar';

type MyThreadProps = {
  content: string;
  image?: string;
  commentsCount: number;
  quotesCount: number;
  upvotesCount: number;
  customStyle?: StyleProp<ViewStyle>;
  onContentBodyPress?: () => void;
};

const MyThread = ({
  content,
  image,
  commentsCount,
  quotesCount,
  upvotesCount,
  customStyle,
  onContentBodyPress,
}: MyThreadProps) => {
  return (
    <View style={{flexDirection: 'row', left: -10}}>
      <View style={{alignItems: 'flex-end'}}>
        <BorderLineImg />
        <LinearGradient
          style={styles.border}
          colors={[MyTheme.primaryGradientFirst, MyTheme.primaryGradientSecond]}
        />
      </View>
      <View style={[styles.root, customStyle && customStyle]}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    // height: 300,
    padding: 20,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: MyTheme.white,
  },
  border: {
    width: 2,
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
    borderRadius: 4,
    marginRight: 14,
  },
  headerTextCtn: {
    width: '80%',
    marginRight: 4,
  },
  headerTitle: {
    fontWeight: '600',
    fontFamily: 'BeVietnamPro-Regular',
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

export default MyThread;
