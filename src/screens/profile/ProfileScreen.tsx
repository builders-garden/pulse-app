import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Profile, ProfileResponse} from '../../api/profile/types';
import {RequestStatus} from '../../api/types';
import MyButton from '../../components/MyButton';
import MyLoader from '../../components/MyLoader';
import {AuthContext} from '../../contexts/auth/Auth.context';
import {HomeTabScreenProps} from '../../routing/types';
import {ENDPOINT_PROFILE} from '../../variables';
import InfoSection from './components/InfoSection';
import TabsSection from './components/TabsSection';
import UpperSection from './components/UpperSection';

const HEADER_HEIGHT = 250;

function ProfileScreen({route}: HomeTabScreenProps<'Profile'>) {
  const authContext = useContext(AuthContext);
  const [profileFetchStatus, setProfileFetchStatus] =
    useState<RequestStatus>('idle');
  const [profile, setProfile] = useState<Profile>();
  useEffect(() => {
    fetchProfile();
  }, [authContext, route?.params?.userFid]);

  async function fetchProfile() {
    setProfileFetchStatus('loading');
    try {
      const finalUrl = ENDPOINT_PROFILE + (route?.params?.userFid ?? '409851');
      console.log(finalUrl);
      const res = await axios.get<ProfileResponse>(finalUrl, {
        headers: {Authorization: `Bearer ${authContext.state.token}`},
      });
      // console.log('got response');
      console.log(JSON.stringify(res.data));
      setProfile(res.data.result);
      setProfileFetchStatus('success');
    } catch (error) {
      console.error(error);
      setProfileFetchStatus('error');
    }
  }

  if (profileFetchStatus === 'loading') {
    return (
      <View style={styles.loadingCtn}>
        <MyLoader />
      </View>
    );
  } else if (profileFetchStatus === 'error') {
    return (
      <View style={styles.errorCtn}>
        <MyButton title="Retry" width={'auto'} onPress={() => fetchProfile()} />
      </View>
    );
  } else if (!profile) {
    return (
      <View style={styles.errorCtn}>
        <Text>Profile not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.profileCtn}>
      <UpperSection profile={profile} />
      <InfoSection profile={profile} />
      <TabsSection />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingCtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingBottom: 100,
  },
  errorCtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingBottom: 100,
  },
  profileCtn: {
    padding: 20,
    flex: 1,
  },
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
  box: {
    height: 250,
    width: '100%',
  },
  boxA: {
    backgroundColor: 'white',
  },
  boxB: {
    backgroundColor: '#D8D8D8',
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: '#2196f3',
  },
});

export default ProfileScreen;
