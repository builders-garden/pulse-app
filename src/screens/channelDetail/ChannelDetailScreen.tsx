import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {FeedStackScreenProps} from '../../routing/types';
import {MyTheme} from '../../theme';
import Header from './components/Header';
import ProfileLine from './components/ProfileLine';

function ChannelDetailScreen({route}: FeedStackScreenProps<'ChannelDetail'>) {
  const hostsHtml = route.params.channel.hosts.map(host => {
    return (
      <ProfileLine
        key={host.fid}
        profile={host}
        customStyle={{marginTop: 15}}
      />
    );
  });

  return (
    <ScrollView>
      <Header channel={route.params.channel} />
      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>Channel hosts</Text>
        {hostsHtml}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionBox: {
    marginHorizontal: 15,
    marginTop: 15,
    padding: 15,
    backgroundColor: MyTheme.white,
    borderRadius: 4,
  },
  sectionTitle: {
    fontFamily: MyTheme.fontBold,
    color: MyTheme.grey300,
  },
});

export default ChannelDetailScreen;
