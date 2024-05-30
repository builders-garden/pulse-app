import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {MyTheme} from '../../theme';
import MyTabsItem from './MyTabsItem';

interface MyTabsProps {
  tabs: string[];
  selectedTab: number;
  customStyle?: StyleProp<ViewStyle>;
  onPress: (tab: number) => void;
}
const MyTabs = ({tabs, selectedTab, customStyle, onPress}: MyTabsProps) => {
  const tabsHtml = tabs.map((tab, index) => {
    return (
      <MyTabsItem
        key={index}
        active={selectedTab === index}
        title={tab}
        onPress={() => {
          onPress(index);
        }}
      />
    );
  });

  return (
    <View style={[styles.tabsCtn, customStyle && customStyle]}>{tabsHtml}</View>
  );
};

const styles = StyleSheet.create({
  tabsCtn: {
    flexDirection: 'row',
    backgroundColor: MyTheme.white,
    borderRadius: 8,
  },
});
export default MyTabs;
