import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Profile} from '../../../api/profile/types';
import FollowCounter from '../../../components/FollowCounter';
import MyButtonNew from '../../../components/MyButtonNew';
import {MyTheme} from '../../../theme';

interface ProfileLineProps {
  profile: Profile;
  onPress: () => void;
}

function ProfileLine({profile, onPress}: ProfileLineProps) {
  return (
    <Pressable style={styles.root} onPress={onPress}>
      <View style={styles.profileInfo}>
        <FastImage
          style={styles.profileImage}
          source={{uri: profile?.pfp_url}}
        />
        <View style={{marginLeft: 15}}>
          <Text style={styles.displayName}>{profile.display_name}</Text>
          <View style={styles.usernameCtn}>
            <Text style={styles.subtitle}>@{profile.username}</Text>
          </View>
        </View>
        <MyButtonNew
          title="Follow"
          onPress={() => {}}
          style="quaternary"
          size="medium"
          customStyle={{marginLeft: 'auto'}}
        />
      </View>
      <View style={styles.countersCtn}>
        <FollowCounter
          count={profile.following_count}
          label="Following"
          style="secondary"
          size="small"
          customStyle={{marginRight: 10}}
        />
        <FollowCounter
          count={profile.follower_count}
          label="Followers"
          style="secondary"
          size="small"
        />
      </View>
      <Text style={styles.bio} numberOfLines={2} ellipsizeMode="tail">
        {profile.profile.bio.text}
      </Text>
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
});

export default ProfileLine;
