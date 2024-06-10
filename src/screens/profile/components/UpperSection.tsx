import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Profile} from '../../../api/profile/types';
import FidImg from '../../../assets/images/icons/fid.svg';
import FollowCounter from '../../../components/FollowCounter';
import FollowButton from '../../../components/buttons/FollowButton';
import {MyTheme} from '../../../theme';

interface UpperSectionProps {
  profile: Profile;
  isLoggedUser: boolean;
}

function UpperSection({profile, isLoggedUser}: UpperSectionProps) {
  return (
    <View style={styles.upperSection}>
      <View style={styles.profileInfo}>
        <FastImage
          style={styles.profileImage}
          source={{uri: profile?.pfp_url}}
        />
        <View style={{marginLeft: 15}}>
          <Text
            style={styles.displayName}
            numberOfLines={1}
            ellipsizeMode="tail">
            {profile.display_name}
          </Text>
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

      {!isLoggedUser && profile.viewer_context && (
        <FollowButton
          followingInitialValue={profile.viewer_context?.following}
          fid={profile.fid}
          customStyle={{marginTop: 15}}
        />
      )}
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
    fontFamily: MyTheme.fontBold,
    width: '90%',
  },
  usernameCtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    color: MyTheme.grey400,
    fontFamily: MyTheme.fontRegular,
  },
  dotSeparator: {
    marginHorizontal: 5,
  },
  bio: {
    marginTop: 15,
    color: MyTheme.grey500,
    fontFamily: MyTheme.fontRegular,
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
    fontFamily: MyTheme.fontRegular,
  },
});

export default UpperSection;
