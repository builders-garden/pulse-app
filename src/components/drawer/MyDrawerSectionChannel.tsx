import React, {PropsWithChildren} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {MyTheme} from '../../theme';
interface MyDrawerSectionChannelProps {
  channelId: string;
  channelName: string;
  channelImageUrl: string;
  onPressItem?: () => void;
}

const MyDrawerSectionChannel = ({
  channelId,
  channelName,
  channelImageUrl,
  onPressItem,
}: PropsWithChildren<MyDrawerSectionChannelProps>) => {
  return (
    <Pressable
      style={styles.sectionChannelRoot}
      onPress={() => {
        onPressItem && onPressItem();
      }}
      key={channelId}>
      <View style={styles.sectionChannel}>
        <Image
          source={{uri: channelImageUrl}}
          style={styles.sectionChannelImg}
        />
        <Text style={styles.sectionChannelText} numberOfLines={2}>
          {channelName}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  sectionChannelRoot: {
    width: '25%',
  },
  sectionChannel: {
    alignItems: 'center',
    width: '100%',
  },
  sectionChannelImg: {width: 30, height: 30, borderRadius: 3},
  sectionChannelText: {
    fontFamily: MyTheme.fontRegular,
    fontSize: 12,
    marginTop: 5,
    width: 55,
    color: MyTheme.black,
    textAlign: 'center',
  },
});

export default MyDrawerSectionChannel;
