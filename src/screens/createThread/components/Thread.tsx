import React from 'react';
import {Image, Pressable, StyleSheet, TextInput, View} from 'react-native';
import {Thread} from '../types';

type ThreadItemProps = {
  thread: Thread;
  onChangeText: (text: string) => void;
  onImagePress?: (index: number) => void;
};

const inputLimit = 1000;

function ThreadItem({thread, onChangeText, onImagePress}: ThreadItemProps) {
  const imagesHtml = thread.images
    ?.filter(el => el !== undefined && el !== null)
    .map((image, i) => (
      <Pressable
        key={i}
        style={styles.imageBox}
        onPress={() => {
          onImagePress && onImagePress(i);
        }}>
        <Image style={styles.image} source={{uri: image}} />
      </Pressable>
    ));

  return (
    <View style={styles.root}>
      <TextInput
        multiline
        maxLength={inputLimit}
        placeholder="Type here!"
        defaultValue={thread.body}
        onChangeText={onChangeText}
      />
      <View style={styles.imagesCtn}>{imagesHtml}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderLeftWidth: 3,
    borderLeftColor: 'lightgray',
    paddingLeft: 10,
  },
  imagesCtn: {
    flexDirection: 'row',
    gap: 10,
  },
  imageBox: {
    flex: 1,
    height: 200,
  },
  image: {
    overflow: 'hidden',
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: 'lightgray',
    borderRadius: 8,
    height: '100%',
    width: '100%',
  },
});

export default ThreadItem;
