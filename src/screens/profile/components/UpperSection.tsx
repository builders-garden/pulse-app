import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Profile} from '../../../api/profile/types';
import FidImg from '../../../assets/images/icons/fid.svg';
import MapPinImg from '../../../assets/images/icons/map_pin.svg';
import FollowCounter from '../../../components/FollowCounter';
import MyButtonNew from '../../../components/MyButtonNew';
import {MyTheme} from '../../../theme';

interface UpperSectionProps {
  profile: Profile;
}

function UpperSection({profile}: UpperSectionProps) {
  return (
    <View style={styles.upperSection}>
      <View style={styles.profileInfo}>
        <FastImage
          style={styles.profileImage}
          source={{uri: profile?.pfp_url}}
        />
        <View style={{marginLeft: 15}}>
          <Text style={styles.displayName}>{profile.display_name}</Text>
          <View style={styles.usernameCtn}>
            <Text style={styles.subtitle}>@{profile.username}</Text>
            <Text style={[styles.subtitle, styles.dotSeparator]}> · </Text>
            <FidImg style={{marginRight: 3}} />
            <Text style={styles.subtitle}>{profile.fid}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.bio}>{profile.profile.bio.text}</Text>
      <View style={styles.countersCtn}>
        <FollowCounter
          count={profile.following_count}
          label="Following"
          style="secondary"
          customStyle={{marginRight: 10}}
        />
        <FollowCounter
          count={profile.follower_count}
          label="Followers"
          style="secondary"
        />
      </View>
      <View style={styles.locationBox}>
        <MapPinImg style={{marginRight: 3}} color={MyTheme.grey300} />
        <Text style={styles.locationText}>Placeholder location</Text>
      </View>
      <MyButtonNew
        title="Follow"
        onPress={() => {}}
        style="primary"
        customStyle={{marginTop: 15}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  upperSection: {
    padding: 20,
    backgroundColor: MyTheme.white,
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  displayName: {
    fontSize: 20,
    color: MyTheme.black,
    fontFamily: 'BeVietnamPro-Bold',
  },
  usernameCtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    color: MyTheme.grey400,
    fontFamily: 'BeVietnamPro-Regular',
  },
  dotSeparator: {
    marginHorizontal: 5,
  },
  bio: {
    marginTop: 15,
    color: MyTheme.grey500,
    fontFamily: 'BeVietnamPro-Regular',
  },
  countersCtn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 15,
  },
  locationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  locationText: {
    color: MyTheme.grey400,
    fontFamily: 'BeVietnamPro-Regular',
  },
});

export default UpperSection;
