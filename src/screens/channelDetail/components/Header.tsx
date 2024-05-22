import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Channel} from '../../../api/channel/types';
import FollowCounter from '../../../components/FollowCounter';
import {MyTheme} from '../../../theme';

interface HeaderProps {
  channel: Channel;
  customStyle?: StyleProp<ViewStyle>;
}

function Header({channel, customStyle}: HeaderProps) {
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
          <Text style={styles.subtitle} numberOfLines={1}>
            /{channel.id}
          </Text>
        </View>
      </View>
      <View style={styles.countersCtn}>
        <FollowCounter
          count={channel.follower_count}
          label="Followers"
          style="secondary"
          countCustomStyle={{
            fontFamily: 'BeVietnamPro-Bold',
            color: MyTheme.grey500,
          }}
        />
        <Text style={[styles.dotSeparator]}> · </Text>
        <Text style={styles.mutualsCount}>50</Text>
        <Text style={styles.mutualsLabel}> Mutuals</Text>
      </View>
      <Text style={styles.description}>{channel.description}</Text>
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
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  nameText: {
    fontSize: 16,
    color: MyTheme.black,
    fontFamily: 'BeVietnamPro-Bold',
  },
  subtitle: {
    marginTop: 5,
    color: MyTheme.grey400,
    fontFamily: 'BeVietnamPro-Regular',
    maxWidth: '60%',
  },
  countersCtn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 15,
  },
  dotSeparator: {
    marginHorizontal: 3,
    color: MyTheme.grey400,
    fontFamily: 'BeVietnamPro-Bold',
  },
  mutualsCount: {
    fontFamily: 'BeVietnamPro-Bold',
    color: MyTheme.grey500,
  },
  mutualsLabel: {
    fontFamily: 'BeVietnamPro-Regular',
    color: MyTheme.grey400,
  },
  description: {
    marginTop: 15,
    color: MyTheme.grey500,
    fontFamily: 'BeVietnamPro-Regular',
  },
  seeMoreText: {
    color: MyTheme.primaryColor,
    fontFamily: 'BeVietnamPro-Bold',
    marginTop: 10,
  },
});

export default Header;
