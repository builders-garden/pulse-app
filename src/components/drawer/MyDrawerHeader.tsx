import {useNavigation} from '@react-navigation/native';
import React, {PropsWithChildren} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ChannelActivity, MostRecentChannel} from '../../api/channel/types';
import ChatImg from '../../assets/images/icons/chat.svg';
import {MyTheme} from '../../theme';
import MyChipBase from '../MyChipBase';
import MyDrawerSectionChannel from './MyDrawerSectionChannel';
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
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'FeedRoot',
                params: {
                  screen: 'Feed',
                },
              },
            ],
          });
        }}>
        <View style={styles.followingBox}>
          <ChatImg width={24} height={24} color={MyTheme.primaryLight} />
          <Text style={styles.followingText}>Following</Text>
        </View>
      </Pressable>
      <View style={styles.section}>
        <Text style={styles.headingText}>Favorites</Text>
        <View style={styles.favoriteSectionItemsCtn}>
          {/* Replace with your actual images */}
          {favoriteChannels.map(item => (
            <MyDrawerSectionChannel
              key={item.channel.id}
              channelId={item.channel.id}
              channelName={item.channel.name}
              channelImageUrl={item.channel.image_url}
              onPressItem={() => {
                onPressItem && onPressItem();
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'FeedRoot',
                      params: {
                        screen: 'Channel',
                        params: {
                          channelId: item.channel.id,
                          showDrawer: true,
                        },
                      },
                    },
                  ],
                });
              }}
            />
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.headingText}>Recent</Text>
        <View style={styles.recentSectionItemsCtn}>
          {/* Replace with your actual images */}
          {recentChannels.map(item => (
            <MyChipBase
              key={item.id}
              title={`/${item.id}`}
              size="small"
              iconLeft={
                <FastImage
                  style={styles.channelChipImg}
                  source={{uri: item.image_url}}
                />
              }
              style="tertiary"
              customStyle={styles.channelChip}
              textCustomStyle={{color: MyTheme.grey500}}
              onPress={() => {
                onPressItem && onPressItem();
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'FeedRoot',
                      params: {
                        screen: 'Channel',
                        params: {
                          channelId: item.id,
                          showDrawer: true,
                        },
                      },
                    },
                  ],
                });
              }}
            />
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
  favoriteSectionItemsCtn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  recentSectionItemsCtn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: 6,
  },
  channelChip: {
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  channelChipImg: {
    width: 20,
    height: 20,
    borderRadius: 3,
    marginRight: 5,
  },
});

export default MyDrawerHeader;
