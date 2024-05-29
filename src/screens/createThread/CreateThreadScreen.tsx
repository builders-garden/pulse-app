import React, {createRef, useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import {MediaType, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import DiagonalArrowImg from '../../assets/images/icons/diagonal_arrow.svg';
import PlusImg from '../../assets/images/icons/plus.svg';
import MyButtonNew from '../../components/MyButtonNew';
import {RootStackScreenProps} from '../../routing/types';
import {MyTheme} from '../../theme';
import ChannelButton from './components/ChannelButton';
import ThreadItem from './components/threadItem/ThreadItem';
import {Thread} from './types';
const maxImagesCount = 2;
const inputLimit = 20;

function CreateThreadScreen({
  navigation,
}: RootStackScreenProps<'CreateThread'>) {
  const [threads, setThreads] = useState<Thread[]>([
    {id: uuid.v4().toString(), body: '', images: [], links: []},
  ]);
  const [currentThreadIndex, setCurrentThreadIndex] = useState(0);
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

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current?.focus();
    }
  }, [inputRef]);

  async function onAddMediaPress(threadIndex: number) {
    if (
      threads[threadIndex].images.length < maxImagesCount &&
      !threads[threadIndex].video
    ) {
      let mediaType: MediaType = 'mixed';
      if (threads[threadIndex].images.length > 0) {
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
          const newThreads = [...threads];
          if (isVideo) {
            newThreads[threadIndex] = {
              ...newThreads[threadIndex],
              video: mediaUri,
            };
          } else {
            newThreads[threadIndex] = {
              ...newThreads[threadIndex],
              images: [...newThreads[threadIndex].images, mediaUri],
            };
          }
          setThreads(newThreads);
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
  async function onCancelMediaPress(threadIndex: number, mediaIndex: number) {
    const newThreads = [...threads];
    if (newThreads[threadIndex].video) {
      delete newThreads[threadIndex].video;
    } else {
      newThreads[threadIndex].images = newThreads[threadIndex].images.filter(
        (el, i) => i !== mediaIndex,
      );
    }
    setThreads(newThreads);
  }

  async function onAddThreadPress() {
    let newThreads = [...threads];
    newThreads = insertThread(newThreads, newThreads.length);
    // console.log(newThreads);
    setThreads(newThreads);
    setCurrentThreadIndex(newThreads.length - 1);
  }

  function insertThread(threadsList: Thread[], index: number) {
    const newThreads = [...threadsList];
    const left = newThreads.slice(0, index);
    const right = newThreads.slice(index);
    left.push({
      id: uuid.v4().toString(),
      body: '',
      images: [],
      video: '',
      links: [],
    });
    return [...left, ...right];
  }

  function onThreadChangeText(newText: string, index: number) {
    // console.log('onChangeText:', newText.endsWith('\n\n\n'));
    if (newText.endsWith('\n\n\n')) {
      // let slicedText = newText.replace(/\n\n\n$/, '');
      const slicedText = newText.trimEnd();
      let newThreads = [...threads];
      newThreads[index] = {...newThreads[index], body: slicedText};
      newThreads = insertThread(newThreads, index + 1);
      setThreads(newThreads);
      setCurrentThreadIndex(index + 1);
    } else {
      const newThreads = threads.slice();
      newThreads[index] = {...newThreads[index], body: newText};
      setThreads(newThreads);
    }
  }

  function onKeyPress(
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) {
    // console.log('---------');
    // console.log('onKeyPress:', e.nativeEvent.key);
    if (index === currentThreadIndex && threads[index].body.length === 0) {
      // console.log('onKeyPress triggered');
      if (e.nativeEvent.key === 'Backspace' && threads.length > 1) {
        const newThreads = threads.slice();
        newThreads.splice(index, 1);
        setThreads(newThreads);
        if (index > 0) {
          setCurrentThreadIndex(index - 1);
        }
      }
    } else if (threads[index].body.length === inputLimit) {
      if (e.nativeEvent.key === 'Enter') {
        let newThreads = [...threads];
        newThreads = insertThread(newThreads, index + 1);
        // console.log(newThreads);
        setThreads(newThreads);
        setCurrentThreadIndex(index + 1);
      } else {
        Toast.show({
          type: 'info',
          text1: 'Input limit reached!',
          text2: 'Please create another thread to continue.',
          topOffset: 50,
        });
      }
    }
  }

  function onPublishPress() {}

  return (
    <View>
      {/* <Text>Selected index: {currentThreadIndex}</Text> */}
      <FlatList
        style={styles.threadsCtn}
        data={threads}
        ListHeaderComponent={
          <View style={{marginBottom: 20}}>
            <ChannelButton placeholder="Choose a channel" onPress={() => {}} />
          </View>
        }
        renderItem={({item, index}) => (
          <ThreadItem
            key={item.id}
            active={index === currentThreadIndex}
            textInputRef={index === currentThreadIndex ? inputRef : undefined}
            thread={item}
            maxLength={inputLimit}
            onFocus={() => setCurrentThreadIndex(index)}
            onKeyPress={e => onKeyPress(e, index)}
            onChangeText={newText => onThreadChangeText(newText, index)}
            onAddMediaPress={() => {
              onAddMediaPress(index);
            }}
            onCancelMediaPress={mediaIndex => {
              onCancelMediaPress(index, mediaIndex);
            }}
          />
        )}
        ItemSeparatorComponent={() => <View style={{height: 20}} />}
        ListFooterComponent={
          <MyButtonNew
            style="secondary"
            title="Add new cast"
            iconLeft={
              <PlusImg
                width={14}
                height={14}
                color={MyTheme.white}
                style={{marginRight: 5}}
              />
            }
            customStyle={{alignSelf: 'center', marginBottom: 60, marginTop: 20}}
            onPress={onAddThreadPress}
          />
        }
      />

      {/* <BottomBar onAddMediaPress={onAddMediaPress} onSendPress={() => {}} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  threadsCtn: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

export default CreateThreadScreen;
