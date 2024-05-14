import React, {RefObject} from 'react';
import {
  Image,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BorderLineImg from '../../../../assets/images/thread/border_line.svg';
import {MyTheme} from '../../../../theme';
import {Thread} from '../../types';
import BottomSection from './BottomSection';

type ThreadItemProps = {
  thread: Thread;
  textInputRef?: RefObject<TextInput>;
  active: boolean;
  maxLength: number;
  onChangeText: (text: string) => void;
  onImagePress?: (index: number) => void;
  onKeyPress?: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
  onFocus: () => void;
  onAddMediaPress: () => void;
};

function ThreadItem({
  thread,
  active,
  textInputRef = undefined,
  maxLength,
  onChangeText,
  onKeyPress,
  onFocus,
  onImagePress,
  onAddMediaPress,
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
      <View style={{alignItems: 'flex-end'}}>
        <BorderLineImg
          color={active ? MyTheme.primaryColor : MyTheme.grey300}
        />
        <LinearGradient
          style={styles.border}
          colors={
            active
              ? [MyTheme.primaryGradientFirst, MyTheme.primaryGradientSecond]
              : [MyTheme.grey300, MyTheme.grey300]
          }
        />
      </View>
      <View style={styles.contentCtn}>
        <TextInput
          ref={textInputRef}
          onFocus={onFocus}
          placeholderTextColor={'lightgray'}
          multiline
          placeholder="Write something interesting"
          defaultValue={thread.body}
          value={thread.body}
          onChangeText={onChangeText}
          style={styles.inputField}
          maxLength={maxLength}
          onKeyPress={e => {
            onKeyPress && onKeyPress(e);
          }}
        />
        <BottomSection
          characterCount={thread.body.length}
          maxCharacters={maxLength}
          maxMedia={3}
          mediaCount={thread.images?.length || 0}
          onAddMediaPress={onAddMediaPress}
        />
        <View style={styles.imagesCtn}>{imagesHtml}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    left: -10,
  },
  border: {
    width: 2,
    flex: 1,
  },
  contentCtn: {
    backgroundColor: MyTheme.white,
    width: '100%',
    padding: 15,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  counter: {
    fontSize: 12,
    color: 'gray',
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
