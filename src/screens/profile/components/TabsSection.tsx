import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Comment, CommentResponse} from '../../../api/cast/types';
import {Profile} from '../../../api/profile/types';
import {UserCast, UserCastsResponse} from '../../../api/user/types';
import MyPlaceholderLoader from '../../../components/MyPlaceholderLoader';
import MyTabs from '../../../components/tabs/MyTabs';
import {AuthContext} from '../../../contexts/auth/Auth.context';
import {ENDPOINT_PROFILE} from '../../../variables';
import CommentsSection from './CommentsSection';
import ThreadsSection from './ThreadsSection';

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
  const [userCastsFetchStatus, setUserCastsFetchStatus] = useState('idle');
  const [userCasts, setUserCasts] = useState<UserCast[]>([]);

  useEffect(() => {
    if (profile) {
      fetchComments();
      fetchThreads();
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
  async function fetchThreads() {
    setUserCastsFetchStatus('loading');
    try {
      const finalUrl =
        ENDPOINT_PROFILE + profile.fid + '/replies-and-recasts?limit=10';
      const res = await axios.get<UserCastsResponse>(finalUrl, {
        headers: {Authorization: `Bearer ${authContext.state.token}`},
      });
      console.log('got response');
      setUserCasts(res.data.result);
      setUserCastsFetchStatus('success');
    } catch (error) {
      console.error(error);
      setUserCastsFetchStatus('error');
    }
  }

  return (
    <View style={{padding: 20}}>
      <MyTabs
        tabs={['Threads', 'Comments', 'About']}
        selectedTab={selectedTab}
        onPress={setSelectedTab}
      />
      {/* {selectedTab === 0 && <FirstRoute />} */}
      {selectedTab === 1 &&
        (commentsFetchStatus === 'success' ? (
          <CommentsSection comments={comments} />
        ) : (
          <MyPlaceholderLoader customStyle={{marginTop: 15}} />
        ))}
      {selectedTab === 0 &&
        (commentsFetchStatus === 'success' ? (
          <ThreadsSection threads={userCasts} />
        ) : (
          <MyPlaceholderLoader customStyle={{marginTop: 15}} />
        ))}
      {/* {selectedTab === 2 && <ThirdRoute />} */}
    </View>
  );
}

// const styles = StyleSheet.create({

// });

export default TabsSection;
