import React, {useMemo} from 'react';
import {Alert, Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {MostRecentChannel} from '../../../api/channel/types';
import {Profile} from '../../../api/profile/types';
import FlashlightImg from '../../../assets/images/icons/flashlight.svg';
import ScoreImg from '../../../assets/images/icons/score.svg';
import {MyTheme} from '../../../theme';

interface AboutProps {
  recentChannels: MostRecentChannel[];
  profile: Profile;
  onChannelPress: (channelId: string) => void;
}

function About({recentChannels, profile, onChannelPress}: AboutProps) {
  async function OpenLearnMore() {
    const learnMoreUrl =
      'https://docs.airstack.xyz/airstack-docs-and-faqs/farcaster/farcaster/social-capital';

    const supported = await Linking.canOpenURL(learnMoreUrl);

    if (!supported) {
      Alert.alert(`Don't know how to open this URL: ${learnMoreUrl}`);
      return;
    }

    // SignerPollLoop(signerRes);
    await Linking.openURL(learnMoreUrl);
  }

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

  const flooredScore = useMemo(
    () =>
      profile.socialCapital
        ? Math.floor(profile.socialCapital?.socialCapitalScore * 100000) /
          100000
        : 'N/A',
    [profile.socialCapital],
  );

  return (
    <View>
      <View>
        <View style={styles.header}>
          <FlashlightImg color={MyTheme.grey400} />
          <Text style={styles.headerText}>ACTIVE IN</Text>
        </View>
        <View style={styles.channelsCtn}>{channelsHtml}</View>
      </View>
      <View>
        <View style={styles.header}>
          <ScoreImg color={MyTheme.grey400} />
          <Text style={styles.headerText}>ANALYTICS</Text>
        </View>
        <View style={styles.socialCapitalRoot}>
          <View style={styles.socialCapitalBox}>
            <View
              style={[
                styles.socialCapitalBoxSection,
                {
                  justifyContent: 'flex-end',
                },
              ]}>
              <Text style={styles.socialCapitalRank}>
                n.
                {profile.socialCapital?.socialCapitalRank}
              </Text>
            </View>
            <View
              style={[
                styles.socialCapitalBoxSection,
                {
                  justifyContent: 'center',
                },
              ]}>
              <Text style={styles.socialCapitalScore}>{flooredScore}</Text>
            </View>
            <View
              style={[
                styles.socialCapitalBoxSection,
                {
                  justifyContent: 'flex-start',
                },
              ]}>
              <Text style={styles.socialCapitalLabel}>
                Social Capital Score
              </Text>
              <Text
                style={styles.socialCapitalSubLabel}
                onPress={OpenLearnMore}
                suppressHighlighting>
                powered by Airstack
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    marginBottom: 10,
    marginTop: 20,
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
  socialCapitalRoot: {
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  socialCapitalBox: {
    width: '100%',
    height: 150,
    backgroundColor: MyTheme.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  socialCapitalBoxSection: {
    alignItems: 'center',
    height: '25%',
  },
  learnMoreBox: {position: 'absolute', bottom: 5},
  learnMoreText: {
    color: MyTheme.primaryColor,
    fontFamily: MyTheme.fontRegular,
    fontSize: 10,
    textDecorationLine: 'underline',
  },
  socialCapitalRank: {
    color: MyTheme.primaryColor,
    fontFamily: MyTheme.fontSemiBold,
  },
  socialCapitalScore: {
    color: MyTheme.primaryColor,
    fontSize: 24,
    fontFamily: MyTheme.fontBold,
  },
  socialCapitalLabel: {
    color: MyTheme.grey400,
    fontFamily: MyTheme.fontRegular,
  },
  socialCapitalSubLabel: {
    color: MyTheme.primaryColor,
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontFamily: MyTheme.fontRegular,
    fontSize: 10,
    marginBottom: -11,
  },
});

export default About;
