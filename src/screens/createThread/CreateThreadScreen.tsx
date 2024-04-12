import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import BottomBar from './components/BottomBar';
import ThreadItem from './components/Thread';
import {Thread} from './types';

function CreateThreadScreen() {
  const [threads, setThreads] = useState<Thread[]>([
    {body: '', images: [], video: '', links: []},
  ]);

  const threadsHtml = threads.map((thread, i) => (
    <ThreadItem
      key={i}
      body={thread.body}
      onChangeText={newText => {
        const newThreads = threads.slice();
        newThreads[i] = {...newThreads[i], body: newText};
        setThreads(newThreads);
      }}
    />
  ));

  async function onAddMediaPress() {
    const res = await launchImageLibrary({mediaType: 'photo'});
    console.log(res);
  }

  return (
    <View style={styles.root}>
      <View style={styles.threadsCtn}>{threadsHtml}</View>
      <BottomBar onAddMediaPress={onAddMediaPress} onSendPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1},
  threadsCtn: {padding: 20},
});

export default CreateThreadScreen;
