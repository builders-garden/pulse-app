import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import AvatarImg from '../../../assets/images/icons/avatar.svg';
import {MyTheme} from '../../../theme';

interface FollowCounterProps {
  count: number;
  label: string;
  style: 'primary' | 'secondary';
  customStyle?: StyleProp<ViewStyle>;
}

function FollowCounter({count, label, style, customStyle}: FollowCounterProps) {
  let counterTextStyle = styles.counterTextPrimary;
  if (style === 'secondary') {
    counterTextStyle = styles.counterTextSecondary;
  }

  return (
    <View style={[styles.ctn, customStyle]}>
      <AvatarImg style={styles.icon} />
      <Text style={styles.countStyle}>{count}</Text>
      <Text style={counterTextStyle}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ctn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {width: 18, height: 18, marginRight: 3},
  countStyle: {
    marginRight: 2,
    fontFamily: 'BeVietnamPro-Bold',
    color: MyTheme.black,
  },
  counterTextPrimary: {color: 'black'},
  counterTextSecondary: {
    color: MyTheme.grey400,
    fontFamily: 'BeVietnamPro-Regular',
  },
});

export default FollowCounter;
