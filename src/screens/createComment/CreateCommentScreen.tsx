import axios from 'axios';
import React, {
  createRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {MediaType, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import {RequestStatus} from '../../api/types';
import DiagonalArrowImg from '../../assets/images/icons/diagonal_arrow.svg';
import MyButtonNew from '../../components/buttons/MyButtonNew';
import ThreadItem from '../../components/threadItem/ThreadItem';
import {AuthContext} from '../../contexts/auth/Auth.context';
import {RootStackScreenProps} from '../../routing/types';
import {MyTheme} from '../../theme';
import {Thread} from '../../types';
import {ENDPOINT_CAST} from '../../variables';
import CastBox from './components/CastBox';
const maxImagesCount = 2;
const inputLimit = 320;

function CreateCommentScreen({
  navigation,
  route,
}: RootStackScreenProps<'CreateComment'>) {
  const authContext = useContext(AuthContext);
  const [publishStatus, setPublishStatus] = useState<RequestStatus>('idle');
  const [thread, setThread] = useState<Thread>({
    id: uuid.v4().toString(),
    body: '',
    images: [],
    links: [],
  });
  const inputRef = createRef<TextInput>();

  const renderHeader = useCallback(
    () => (
      <MyButtonNew
        style="primary"
        iconRight={<DiagonalArrowImg style={{marginLeft: 3}} />}
        onPress={() => {
          onPublishPress();
        }}
        title="Publish"
        customStyle={{marginBottom: 20}}
      />
    ),
    [],
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: renderHeader,
    });
  }, [navigation, renderHeader]);

  async function onAddMediaPress() {
    if (thread.images.length < maxImagesCount && !thread.video) {
      let mediaType: MediaType = 'mixed';
      if (thread.images.length > 0) {
        mediaType = 'photo';
      }
      const res = await launchImageLibrary({
        mediaType: mediaType,
        selectionLimit: 1,
        includeBase64: true,
      });
      console.log(res);
      if (!res.didCancel) {
        const isVideo = res.assets?.[0]?.type?.startsWith('video');
        const mediaUri = res.assets?.[0]?.uri;
        if (mediaUri !== undefined && mediaUri !== null) {
          const newThread = {...thread};
          if (isVideo) {
            newThread.video = mediaUri;
          } else {
            newThread.images = [...newThread.images, mediaUri];
          }
          setThread(newThread);
        }
      }
    } else {
      Toast.show({
        type: 'info',
        text1: "You can't upload more than 2 images or 1 video!",
        text2: 'Create another thread to upload more images.',
        topOffset: 50,
      });
    }
  }
  async function onCancelMediaPress(mediaIndex: number) {
    const newThread = {...thread};
    if (newThread.video) {
      delete newThread.video;
    } else {
      newThread.images = newThread.images.filter((el, i) => i !== mediaIndex);
    }
    setThread(newThread);
  }

  function onThreadChangeText(newText: string) {
    const newThread = {...thread};
    newThread.body = newText;
    setThread(newThread);
  }

  function onKeyPress() {
    if (thread.body.length === inputLimit) {
      Toast.show({
        type: 'info',
        text1: 'Input limit reached!',
        text2: 'Please create another thread to continue.',
        topOffset: 50,
      });
    }
  }

  const publish = useCallback(async () => {
    setPublishStatus('loading');
    // route.params.channelId
    try {
      console.log('publishing thread...');
      const data = new FormData();
      data.append('name', 'avatar');
      data.append('fileData', {
        uri: thread[0].video,
        name: 'upload.mp4',
      });

      try {
        const response = await axios.post(
          ENDPOINT_CAST,
          data,

          {
            headers: {Authorization: `Bearer ${authContext.state.token}`},
          },
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }

      // const res = await axios.post(
      //   ENDPOINT_CAST,
      //   {
      //     text: 'test text',
      //   },
      //   {
      //     headers: {Authorization: `Bearer ${authContext.state.token}`},
      //   },
      // );
      setPublishStatus('success');
    } catch (error) {
      console.error(error);
      setPublishStatus('error');
    }
  }, [authContext.state.token, thread]);

  function onPublishPress() {
    // publish();
  }

  return (
    <View style={styles.threadCtn}>
      <CastBox cast={route.params.cast} customStyle={{marginBottom: 15}} />
      <ThreadItem
        active={true}
        textInputRef={inputRef}
        thread={thread}
        maxLength={inputLimit}
        onKeyPress={() => onKeyPress()}
        onChangeText={newText => onThreadChangeText(newText)}
        onAddMediaPress={() => {
          onAddMediaPress();
        }}
        onCancelMediaPress={mediaIndex => {
          onCancelMediaPress(mediaIndex);
        }}
      />
      {/* <BottomBar onAddMediaPress={onAddMediaPress} onSendPress={() => {}} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  threadCtn: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  sectionItemHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  sectionItemImg: {width: 30, height: 30, borderRadius: 3},
  sectionItemHorizontalText: {
    fontFamily: MyTheme.fontRegular,
    flex: 1,
    fontSize: 13,
    marginLeft: 5,
    color: MyTheme.black,
  },
});

export default CreateCommentScreen;
