import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Channel} from '../../../api/channel/types';
import FollowCounter from '../../../components/FollowCounter';
import {MyTheme} from '../../../theme';

interface ChannelLineProps {
  channel: Channel;
  onPress: () => void;
}

function ChannelLine({channel, onPress}: ChannelLineProps) {
  return (
    <Pressable style={styles.root} onPress={onPress}>
      <View style={styles.profileInfo}>
        <FastImage
          style={styles.profileImage}
          source={{uri: channel.image_url}}
        />
        <View style={{marginLeft: 15}}>
          <Text style={styles.displayName}>{channel.name}</Text>
          <View style={styles.usernameCtn}>
            <Text style={styles.subtitle}>/{channel.id}</Text>
            <Text style={[styles.subtitle, styles.dotSeparator]}> · </Text>
            <FollowCounter
              count={channel.follower_count}
              label=""
              size="small"
              customStyle={{marginRight: 10}}
              countCustomStyle={styles.followCount}
            />
          </View>
        </View>
      </View>
      <View style={styles.countersCtn}></View>
      {channel.description && (
        <Text style={styles.bio} numberOfLines={2} ellipsizeMode="tail">
          {channel.description}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: MyTheme.white,
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 3,
  },
  displayName: {
    color: MyTheme.black,
    fontSize: 13,
    fontFamily: MyTheme.fontBold,
  },
  usernameCtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    color: MyTheme.grey400,
    fontSize: 13,
    fontFamily: MyTheme.fontRegular,
  },
  dotSeparator: {
    marginHorizontal: 5,
  },
  bio: {
    marginTop: 10,
    fontSize: 13,
    color: MyTheme.grey500,
    fontFamily: MyTheme.fontRegular,
  },
  countersCtn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  followCount: {
    fontFamily: MyTheme.fontRegular,
    color: MyTheme.grey400,
  },
});

export default ChannelLine;
