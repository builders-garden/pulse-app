import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {MyTheme} from '../../theme';

interface MyTabsItemProps {
  title: string;
  active: boolean;
  onPress: () => void;
}
const MyTabsItem = ({title, active, onPress}: MyTabsItemProps) => {
  return (
    <Pressable
      style={[styles.tabItem, active ? styles.activeTab : styles.inactiveTab]}
      onPress={onPress}>
      <Text
        style={[
          styles.tabItemText,
          active ? styles.activeTabText : styles.inactiveTabText,
        ]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: MyTheme.primaryColor,
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
  },
  inactiveTab: {
    backgroundColor: 'transparent',
  },
  activeTabText: {
    color: MyTheme.white,
  },
  inactiveTabText: {
    color: MyTheme.grey400,
  },
  tabItemText: {
    fontSize: 16,
    fontFamily: 'BeVietnamPro-Bold',
  },
});

export default MyTabsItem;
