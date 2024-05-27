import axios from 'axios';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Channel, ChannelResponse} from '../../api/channel/types';
import {RequestStatus} from '../../api/types';
import MyLoader from '../../components/MyLoader';
import {AuthContext} from '../../contexts/auth/Auth.context';
import {ChannelStackScreenProps} from '../../routing/types';
import {MyTheme} from '../../theme';
import {ENDPOINT_CHANNELS} from '../../variables';
import Header from './components/Header';
import ProfileLine from './components/ProfileLine';

function ChannelDetailScreen({
  route,
}: ChannelStackScreenProps<'ChannelDetail'>) {
  const authContext = useContext(AuthContext);
  const [channelFetchStatus, setChannelFetchStatus] =
    useState<RequestStatus>('idle');
  const [channel, setChannel] = useState<Channel>();

  const fetchChannel = useCallback(async () => {
    setChannelFetchStatus('loading');
    // route.params.channelId
    try {
      console.log('fetching channel...');
      const finalUrl = ENDPOINT_CHANNELS + '/' + route.params.channelId;
      const res = await axios.get<ChannelResponse>(finalUrl, {
        headers: {Authorization: `Bearer ${authContext.state.token}`},
      });
      setChannel(res.data.result);
      setChannelFetchStatus('success');
    } catch (error) {
      console.error(error);
      setChannelFetchStatus('error');
    }
  }, [authContext.state.token, route.params.channelId]);

  useEffect(() => {
    fetchChannel();
  }, [fetchChannel, authContext]);

  const hostsHtml = useMemo(
    () =>
      channel?.hosts.map(host => {
        return (
          <ProfileLine
            key={host.fid}
            profile={host}
            customStyle={{marginTop: 15}}
          />
        );
      }),
    [channel],
  );

  if (channelFetchStatus === 'loading') {
    return (
      <View
        style={{
          width: '100%',
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <MyLoader />
      </View>
    );
  } else if (channel == null || channel === undefined) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: MyTheme.fontRegular,
          }}>
          No thread visible
        </Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Header channel={channel} />
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
