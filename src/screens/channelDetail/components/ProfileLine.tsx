import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Profile} from '../../../api/profile/types';
import {MyTheme} from '../../../theme';

interface ProfileLineProps {
  profile: Profile;
  customStyle?: StyleProp<ViewStyle>;
  onFollowPress?: () => void;
  onProfilePress: () => void;
}

function ProfileLine({
  profile,
  customStyle,
  onProfilePress,
  onFollowPress,
}: ProfileLineProps) {
  return (
    <View style={[styles.root, customStyle && customStyle]}>
      <FastImage style={styles.profileImage} source={{uri: profile.pfp_url}} />
      <Pressable style={styles.infoCtn} onPress={onProfilePress}>
        <Text style={styles.nameText} numberOfLines={1}>
          {profile.display_name}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          @{profile.username}
        </Text>
      </Pressable>
      {/* <FollowButton
        fid={profile.fid}
        followingInitialValue={profile.viewer_context?.following!}
      />
      <MyButtonNew
        title="Follow"
        onPress={() => {
          onFollowPress && onFollowPress();
        }}
        style="quaternary"
        size="medium"
        customStyle={{marginLeft: 'auto'}}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: MyTheme.white,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 3,
  },
  infoCtn: {marginLeft: 10, width: '50%'},
  nameText: {
    color: MyTheme.black,
    fontSize: 12,
    fontFamily: 'BeVietnamPro-Bold',
  },
  subtitle: {
    color: MyTheme.grey400,
    fontSize: 12,
    fontFamily: 'BeVietnamPro-Regular',
  },
  countersCtn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 15,
  },
  dotSeparator: {
    marginHorizontal: 3,
    color: MyTheme.grey400,
    fontFamily: 'BeVietnamPro-Bold',
  },
  mutualsCount: {
    fontFamily: 'BeVietnamPro-Bold',
    color: MyTheme.grey500,
  },
  mutualsLabel: {
    fontFamily: 'BeVietnamPro-Regular',
    color: MyTheme.grey400,
  },
  description: {
    marginTop: 15,
    color: MyTheme.grey500,
    fontFamily: 'BeVietnamPro-Regular',
  },
  seeMoreText: {
    color: MyTheme.primaryColor,
    fontFamily: 'BeVietnamPro-Bold',
    marginTop: 10,
  },
});

export default ProfileLine;
