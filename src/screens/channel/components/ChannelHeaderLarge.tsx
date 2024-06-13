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
import {Channel} from '../../../api/channel/types';
import FollowCounter from '../../../components/FollowCounter';
import HighlightedText from '../../../components/HighlightedText';
import {MyTheme} from '../../../theme';

interface ChannelHeaderLargeProps {
  channel: Channel;
  customStyle?: StyleProp<ViewStyle>;
  onSeeMorePress?: () => void;
}

function ChannelHeaderLarge({
  channel,
  customStyle,
  onSeeMorePress,
}: ChannelHeaderLargeProps) {
  return (
    <View style={[styles.upperSection, customStyle && customStyle]}>
      <View style={styles.channelInfo}>
        <FastImage
          style={styles.channelImage}
          source={{uri: channel.image_url}}
        />
        <View style={{marginLeft: 15, width: '50%'}}>
          <Text style={styles.nameText} numberOfLines={2}>
            {channel.name}
          </Text>
          <View style={styles.urlCtn}>
            <Text style={styles.subtitle} numberOfLines={1}>
              /{channel.id}
            </Text>
            <Text style={[styles.dotSeparator]}> · </Text>
            <FollowCounter
              count={channel.follower_count}
              label="Followers"
              style="secondary"
              customStyle={{marginRight: 10, flex: 1}}
              countCustomStyle={{
                fontFamily: 'BeVietnamPro-Regular',
                color: MyTheme.grey400,
              }}
            />
          </View>
        </View>
      </View>
      <HighlightedText
        customStyle={styles.description}
        text={channel.description}
      />
      <Pressable onPress={onSeeMorePress}>
        <Text style={styles.seeMoreText}>See more</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  upperSection: {
    padding: 20,
    backgroundColor: MyTheme.white,
  },
  channelInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  channelImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  nameText: {
    fontSize: 16,
    color: MyTheme.black,
    fontFamily: 'BeVietnamPro-Bold',
    flex: 1,
  },
  urlCtn: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '100%',
  },
  subtitle: {
    color: MyTheme.grey400,
    fontFamily: 'BeVietnamPro-Regular',
    maxWidth: '60%',
  },
  dotSeparator: {
    marginHorizontal: 5,
    color: MyTheme.grey400,
    fontFamily: 'BeVietnamPro-Regular',
  },
  description: {
    marginTop: 15,
    color: MyTheme.grey500,
    fontFamily: 'BeVietnamPro-Regular',
  },
  countersCtn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 15,
  },
  seeMoreText: {
    color: MyTheme.primaryColor,
    fontFamily: 'BeVietnamPro-Bold',
    marginTop: 10,
  },
});

export default ChannelHeaderLarge;
