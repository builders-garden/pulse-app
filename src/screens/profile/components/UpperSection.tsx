import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Profile} from '../../../api/profile/types';
import MyButton from '../../../components/MyButton';

interface UpperSectionProps {
  profile: Profile;
}

function UpperSection({profile}: UpperSectionProps) {
  return (
    <View style={styles.upperSection}>
      <FastImage style={styles.profileImage} source={{uri: profile?.pfp_url}} />
      <MyButton
        title="Edit profile"
        style="tertiary"
        width={'auto'}
        onPress={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  upperSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});

export default UpperSection;
