import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import BottomBar from './components/BottomBar';
import ThreadItem from './components/Thread';
import {Thread} from './types';

const maxImagesCount = 2;

function CreateThreadScreen() {
  const [threads, setThreads] = useState<Thread[]>([
    {body: '', images: [], video: '', links: []},
  ]);
  const [currentThreadIndex, setCurrentThreadIndex] = useState(0);

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

  return (
    <View style={styles.root}>
      <FlatList
        style={styles.threadsCtn}
        data={threads}
        renderItem={({item, index}) => (
          <ThreadItem
            key={index}
            thread={item}
            onChangeText={newText => {
              const newThreads = threads.slice();
              newThreads[index] = {...newThreads[index], body: newText};
              setThreads(newThreads);
            }}
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
