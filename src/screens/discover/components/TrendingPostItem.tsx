import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import MyChip from '../../../components/MyChip';
import TrendingPostActionBar from './TrendingPostActionBar';

type TrendingPostItemProps = {
  channel: string;
  headerImg: ImageSourcePropType;
  headerTitle: string;
  postTime: string;
  headerSubtitle: string;
  content: string;
  buttonText: string;
  image?: ImageSourcePropType;
  commentsCount: number;
  quotesCount: number;
  upvotesCount: number;
  customStyle?: StyleProp<ViewStyle>;
  onContentBodyPress?: () => void;
  onButtonPress?: () => void;
};

const TrendingPostItem = ({
  channel,
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
      <MyChip
        onPress={() => {}}
        title={channel}
        size="small"
        style="tertiary"
        iconLeft={require('../../../assets/images/placeholders/profile_pic.png')}
        customStyle={{marginBottom: 10, marginRight: 'auto', paddingLeft: 4}}
        textCustomStyle={{fontWeight: 'normal'}}
      />
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
        <MyChip
          onPress={() => {}}
          title="Follow"
          customStyle={styles.headerFollowBtn}
        />
        {/* <MyIconButton
          iconSize={25}
          onPress={() => {}}
          style="secondary"
          icon={require('../../assets/images/icons/vertical_dots.png')}
        /> */}
        {/* <Entypo
            name="dots-three-horizontal"
            size={16}
            color="gray"
            style={{marginLeft: 'auto'}}
          /> */}
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
        {image && <Image style={styles.contentImage} source={image} />}
      </View>
      <TrendingPostActionBar
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
    width: 300,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 4,
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
    width: '50%',
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
  headerFollowBtn: {
    marginLeft: 'auto',
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
    borderWidth: 2,
    borderColor: 'grey',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    justifyContent: 'flex-start',
  },
});

export default TrendingPostItem;
