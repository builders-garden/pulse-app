import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {MyTheme} from '../../theme';

interface MyTabsItemProps {
  title: string;
  active: boolean;
  onPress: () => void;
}
const MyTabsItem = ({title, active, onPress}: MyTabsItemProps) => {
  return (
    <Pressable style={[styles.tabItem]} onPress={onPress}>
      <Text
        style={[
          styles.tabItemText,
          active ? styles.activeTabText : styles.inactiveTabText,
        ]}>
        {title}
      </Text>
      {active && <View style={styles.activeTabIndicator} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTabText: {
    color: MyTheme.primaryColor,
    fontFamily: MyTheme.fontBold,
  },
  inactiveTabText: {
    color: MyTheme.grey400,
  },
  tabItemText: {
    fontSize: 16,
    fontFamily: MyTheme.fontRegular,
  },
  activeTabIndicator: {
    width: 30,
    height: 2,
    backgroundColor: MyTheme.primaryColor,
    position: 'absolute',
    bottom: 7,
  },
});

export default MyTabsItem;
