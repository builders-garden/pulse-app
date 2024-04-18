import React, {createRef, useEffect, useState} from 'react';
import {
  FlatList,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import BottomBar from './components/BottomBar';
import ThreadItem from './components/ThreadItem';
import {Thread} from './types';
const maxImagesCount = 2;
const inputLimit = 20;

function CreateThreadScreen() {
  const [threads, setThreads] = useState<Thread[]>([
    {id: uuid.v4().toString(), body: '', images: [], video: '', links: []},
  ]);
  const [currentThreadIndex, setCurrentThreadIndex] = useState(0);
  const inputRef = createRef<TextInput>();

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current?.focus();
    }
  }, [inputRef]);

  // const threadsHtml = threads.map((thread, i) => (
  //   <ThreadItem
  //     key={i}
  //     thread={thread}
  //     onChangeText={newText => {
  //       const newThreads = threads.slice();
  //       newThreads[i] = {...newThreads[i], body: newText};
  //       setThreads(newThreads);
  //     }}
  //   />
  // ));

  async function onAddMediaPress() {
    if (threads[currentThreadIndex].images.length < maxImagesCount) {
      const res = await launchImageLibrary({mediaType: 'photo'});
      console.log(res);
      const imageUri = res.assets?.[0]?.uri;
      if (imageUri !== undefined && imageUri !== null) {
        const newThreads = threads.slice();
        newThreads[currentThreadIndex] = {
          ...newThreads[currentThreadIndex],
          images: [...newThreads[currentThreadIndex].images, imageUri],
        };
        setThreads(newThreads);
      }
    } else {
      Toast.show({
        type: 'info',
        text1: "You can't upload more than 2 images!",
        text2: 'Create another thread to upload more images.',
        topOffset: 50,
      });
    }
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
        let newThreads = threads.slice();
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

  return (
    <View style={styles.root}>
      {/* <Text>Selected index: {currentThreadIndex}</Text> */}
      <FlatList
        style={styles.threadsCtn}
        data={threads}
        renderItem={({item, index}) => (
          <ThreadItem
            key={item.id}
            textInputRef={index === currentThreadIndex ? inputRef : undefined}
            thread={item}
            maxLength={inputLimit}
            onFocus={() => setCurrentThreadIndex(index)}
            onKeyPress={e => onKeyPress(e, index)}
            onChangeText={newText => onThreadChangeText(newText, index)}
          />
        )}
      />
      <BottomBar onAddMediaPress={onAddMediaPress} onSendPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1},
  threadsCtn: {padding: 20},
});

export default CreateThreadScreen;
