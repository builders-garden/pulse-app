import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {MyTheme} from '../../../theme';

interface ChannelHeaderProps {
  title: string;
  subtitle: string;
  image: string;
  customStyle?: StyleProp<ViewStyle>;
}

const ChannelHeader = ({
  title,
  subtitle,
  image,
  customStyle,
}: ChannelHeaderProps) => {
  return (
    <View style={[styles.headerRoot, customStyle && customStyle]}>
      <FastImage style={styles.headerIcon} source={{uri: image}} />
      <View>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSubtitle}>/{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerIcon: {
    marginRight: 10,
    borderRadius: 3,
    width: 30,
    height: 30,
  },
  headerTitle: {
    fontFamily: MyTheme.fontBold,
    textAlign: 'left',
    color: MyTheme.black,
  },
  headerSubtitle: {
    fontFamily: MyTheme.fontRegular,
    fontSize: 12,
    color: MyTheme.grey400,
  },
});

export default ChannelHeader;
