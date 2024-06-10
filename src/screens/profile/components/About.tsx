import React, {useMemo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {MostRecentChannel} from '../../../api/channel/types';
import FlashlightImg from '../../../assets/images/icons/flashlight.svg';
import {MyTheme} from '../../../theme';

interface AboutProps {
  recentChannels: MostRecentChannel[];
  onChannelPress: (channelId: string) => void;
}

function About({recentChannels, onChannelPress}: AboutProps) {
  const channelsHtml = useMemo(
    () =>
      recentChannels.map(el => (
        <Pressable
          onPress={() => {
            onChannelPress(el.id);
          }}
          key={el.id}
          style={styles.channelCard}>
          <FastImage
            style={styles.channelCardImg}
            source={{uri: el.image_url}}
          />
          <Text style={styles.channelCardText} numberOfLines={1}>
            /{el.id}
          </Text>
        </Pressable>
      )),
    [recentChannels, onChannelPress],
  );

  return (
    <View>
      <View style={styles.header}>
        <FlashlightImg color={MyTheme.grey400} />
        <Text style={styles.headerText}>ACTIVE IN</Text>
      </View>
      <View style={styles.channelsCtn}>{channelsHtml}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    marginBottom: 10,
    alignItems: 'center',
  },
  headerText: {
    color: MyTheme.grey400,
    marginLeft: 6,
    fontFamily: MyTheme.fontSemiBold,
  },
  channelsCtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
  },
  channelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 3,
    padding: 10,
    backgroundColor: MyTheme.white,
    width: '48%',
    marginBottom: 10,
  },
  channelCardImg: {
    width: 36,
    height: 36,
    borderRadius: 3,
    marginRight: 10,
  },
  channelCardText: {
    color: MyTheme.grey600,
    fontSize: 16,
    fontFamily: MyTheme.fontRegular,
    flex: 1,
  },
});

export default About;
