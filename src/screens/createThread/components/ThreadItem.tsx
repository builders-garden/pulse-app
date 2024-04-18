import React, {RefObject} from 'react';
import {
  Image,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import {Thread} from '../types';

type ThreadItemProps = {
  thread: Thread;
  textInputRef?: RefObject<TextInput>;
  maxLength: number;
  onChangeText: (text: string) => void;
  onImagePress?: (index: number) => void;
  onKeyPress?: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
  onFocus: () => void;
};

function ThreadItem({
  thread,
  textInputRef = undefined,
  maxLength,
  onChangeText,
  onKeyPress,
  onFocus,
  onImagePress,
}: ThreadItemProps) {
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
      <Text style={styles.counter}>
        {thread.body.length}/{maxLength}
      </Text>
      <TextInput
        ref={textInputRef}
        onFocus={onFocus}
        placeholderTextColor={'lightgray'}
        multiline
        placeholder="Type here!"
        defaultValue={thread.body}
        value={thread.body}
        onChangeText={onChangeText}
        style={styles.inputField}
        maxLength={maxLength}
        onKeyPress={e => {
          onKeyPress && onKeyPress(e);
        }}
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
    marginTop: 15,
  },
  counter: {
    fontSize: 12,
    color: 'gray',
    position: 'absolute',
    right: 0,
    top: -15,
  },
  inputField: {
    fontSize: 16,
    paddingVertical: 10,
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
