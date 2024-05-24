import {StackActions, useNavigation} from '@react-navigation/native';
import React, {PropsWithChildren} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {ChannelActivity, MostRecentChannel} from '../../api/channel/types';
import ChatImg from '../../assets/images/icons/chat.svg';
import {MyTheme} from '../../theme';
interface MyDrawerHeaderProps {
  favoriteChannels: ChannelActivity[];
  recentChannels: MostRecentChannel[];
  onPressItem?: () => void;
}

const MyDrawerHeader = ({
  favoriteChannels,
  recentChannels,
  onPressItem,
}: PropsWithChildren<MyDrawerHeaderProps>) => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          onPressItem && onPressItem();
          navigation.dispatch(StackActions.replace('Feed'));
        }}>
        <View style={styles.followingBox}>
          <ChatImg width={24} height={24} color={MyTheme.primaryLight} />
          <Text style={styles.followingText}>Following</Text>
        </View>
      </Pressable>
      <View style={styles.section}>
        <Text style={styles.headingText}>Favorites</Text>
        <View style={styles.sectionItemsCtn}>
          {/* Replace with your actual images */}
          {favoriteChannels.map(item => (
            <Pressable
              onPress={() => {
                onPressItem && onPressItem();
                navigation.dispatch(
                  StackActions.replace('Channel', {
                    channelId: item.channel.id,
                  }),
                );
                // navigation.navigate('Channel', {
                //   channelId: item.channel.id,
                // });
              }}
              key={item.channel.id}>
              <View style={styles.sectionItem}>
                <Image
                  source={{uri: item.channel.image_url}}
                  style={styles.sectionItemImg}
                />
                <Text style={styles.sectionItemText} numberOfLines={2}>
                  {item.channel.name}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.headingText}>Recent</Text>
        <View style={styles.sectionItemsCtn}>
          {/* Replace with your actual images */}
          {recentChannels.map(item => (
            <Pressable
              onPress={() => {
                onPressItem && onPressItem();
                navigation.dispatch(
                  StackActions.replace('Channel', {
                    channelId: item.channelId,
                  }),
                );
                // navigation.navigate('Channel', {
                //   channelId: item.channel.id,
                // });
              }}
              key={item.channelId}>
              <View style={styles.sectionItem}>
                <Image
                  source={{uri: item.imageUrl}}
                  style={styles.sectionItemImg}
                />
                <Text style={styles.sectionItemText} numberOfLines={2}>
                  {item.name}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.headingText}>All</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
  },

  followingBox: {
    backgroundColor: MyTheme.primaryLightOpacity,
    borderRadius: 4,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  followingText: {
    color: MyTheme.primaryLight,
    fontSize: 16,
    fontFamily: MyTheme.fontRegular,
    marginLeft: 6,
  },
  section: {
    marginTop: 20,
  },
  headingText: {
    color: MyTheme.grey300,
    fontFamily: MyTheme.fontBold,
    marginBottom: 10,
  },
  sectionItemsCtn: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  sectionItem: {
    alignItems: 'center',
  },
  sectionItemImg: {width: 30, height: 30, borderRadius: 3},
  sectionItemText: {
    fontFamily: MyTheme.fontRegular,
    fontSize: 12,
    marginTop: 5,
    width: 55,
    color: MyTheme.black,
    textAlign: 'center',
  },
});

export default MyDrawerHeader;
