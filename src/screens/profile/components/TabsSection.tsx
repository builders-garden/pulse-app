import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Comment, CommentResponse} from '../../../api/cast/types';
import {Profile} from '../../../api/profile/types';
import MyTabs from '../../../components/tabs/MyTabs';
import {AuthContext} from '../../../contexts/auth/Auth.context';
import {ENDPOINT_PROFILE} from '../../../variables';

// const FirstRoute = () => (
//   <View style={{backgroundColor: '#ff4081', width: '100%', height: 200}} />
// );

// const SecondRoute = () => (
//   <View style={{backgroundColor: '#673ab7', width: '100%', height: 100}} />
// );
// const ThirdRoute = () => (
//   <View style={{backgroundColor: '#00ff00', width: '100%', height: 100}} />
// );

interface TabsSectionProps {
  profile: Profile;
}

function TabsSection({profile}: TabsSectionProps) {
  const authContext = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState(0);
  const [commentsFetchStatus, setCommentsFetchStatus] = useState('idle');
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (profile) {
      fetchComments();
    }
  }, [profile]);

  async function fetchComments() {
    setCommentsFetchStatus('loading');
    try {
      const finalUrl =
        ENDPOINT_PROFILE + profile.fid + '/replies-and-recasts?limit=10';
      const res = await axios.get<CommentResponse>(finalUrl, {
        headers: {Authorization: `Bearer ${authContext.state.token}`},
      });
      console.log('got response');
      setComments(res.data.result);
      setCommentsFetchStatus('success');
    } catch (error) {
      console.error(error);
      setCommentsFetchStatus('error');
    }
  }

  return (
    <View style={{marginTop: 30}}>
      <MyTabs
        tabs={['Threads', 'Comments', 'About']}
        selectedTab={selectedTab}
        onPress={setSelectedTab}
      />
      {/* {selectedTab === 0 && <FirstRoute />} */}
      {/* {selectedTab === 1 && <SecondRoute />} */}
      {/* {selectedTab === 2 && <ThirdRoute />} */}
    </View>
  );
}

// const styles = StyleSheet.create({

// });

export default TabsSection;
