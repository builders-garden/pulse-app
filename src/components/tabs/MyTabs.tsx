import React from 'react';
import {StyleSheet, View} from 'react-native';
import {MyTheme} from '../../theme';
import MyTabsItem from './MyTabsItem';

interface MyTabsProps {
  tabs: string[];
  selectedTab: number;
  onPress: (tab: number) => void;
}
const MyTabs = ({tabs, selectedTab, onPress}: MyTabsProps) => {
  const tabsHtml = tabs.map((tab, index) => {
    return (
      <MyTabsItem
        active={selectedTab === index}
        title={tab}
        onPress={() => {
          onPress(index);
        }}
      />
    );
  });

  return <View style={styles.tabsCtn}>{tabsHtml}</View>;
};

const styles = StyleSheet.create({
  tabsCtn: {
    flexDirection: 'row',
    borderBottomColor: MyTheme.primaryColor,
    borderBottomWidth: 4,
  },
});
export default MyTabs;
