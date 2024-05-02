import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Profile} from '../../../api/profile/types';
import FollowCounter from './FollowCounter';

interface InfoSectionProps {
  profile: Profile;
}

function InfoSection({profile}: InfoSectionProps) {
  return (
    <View style={styles.infoSection}>
      <Text style={styles.displayName}>{profile.display_name}</Text>
      <Text style={styles.username}>@{profile.username}</Text>
      <Text style={styles.bio}>{profile.profile.bio.text}</Text>
      <View style={styles.countersCtn}>
        <FollowCounter
          count={profile.following_count}
          label="Following"
          style="primary"
          customStyle={{marginRight: 10}}
        />
        <FollowCounter
          count={profile.follower_count}
          label="Followers"
          style="secondary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoSection: {
    marginTop: 20,
  },
  displayName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  username: {
    marginTop: 5,
    color: 'gray',
  },
  bio: {
    marginTop: 10,
    color: 'gray',
  },
  countersCtn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
});

export default InfoSection;
