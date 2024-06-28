import React, {createRef, useEffect} from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BorderLineImg from '../../assets/images/thread/border_line.svg';
import {MyTheme} from '../../theme';
import {Thread} from '../../types';
import BottomSection from './BottomSection';
import MediaBox from './MediaBox';

type ThreadItemProps = {
  thread: Thread;
  // textInputRef?: RefObject<TextInput>;
  active: boolean;
  maxLength: number;
  customStyle?: StyleProp<ViewStyle>;
  onChangeText: (text: string) => void;
  onKeyPress?: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
  onSelectionChange?: (selection: {start: number; end: number}) => void;
  onFocus?: () => void;
  onAddMediaPress: () => void;
  onCancelMediaPress: (index: number) => void;
};

function ThreadItem({
  thread,
  active,
  // textInputRef = undefined,
  maxLength,
  customStyle,
  onChangeText,
  onKeyPress,
  onSelectionChange,
  onFocus,
  onAddMediaPress,
  onCancelMediaPress,
}: ThreadItemProps) {
  const inputRef = createRef<TextInput>();

  const imagesHtml = thread.images
    ?.filter(el => el !== undefined && el !== null)
    .map((image, i) => (
      <MediaBox
        key={image + '_' + i}
        uri={image.uri ?? ''}
        onCancelPress={() => {
          onCancelMediaPress(i);
        }}
      />
    ));

  useEffect(() => {
    if (inputRef.current && active) {
      inputRef.current?.focus();
    }
  }, [inputRef.current, active]);

  return (
    <View style={[styles.root, customStyle && customStyle]}>
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
          ref={inputRef}
          onFocus={() => {
            onFocus && onFocus();
          }}
          autoFocus
          placeholderTextColor={MyTheme.grey200}
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
          onSelectionChange={e => {
            onSelectionChange && onSelectionChange(e.nativeEvent.selection);
          }}
        />
        {thread.images && thread.images.length > 0 && (
          <View style={styles.imagesCtn}>{imagesHtml}</View>
        )}

        {thread.video && (
          <MediaBox
            isVideo
            uri={thread.video.uri ?? ''}
            onCancelPress={() => {
              onCancelMediaPress(0);
            }}
          />
        )}
        <BottomSection
          characterCount={thread.body.length}
          maxCharacters={maxLength}
          maxMedia={2}
          mediaCount={thread.images?.length || 0}
          onAddMediaPress={onAddMediaPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    paddingRight: 20,
    paddingLeft: 10,
  },
  border: {
    width: 2,
    flex: 1,
  },
  contentCtn: {
    backgroundColor: MyTheme.white,
    flex: 1,
    padding: 15,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  inputField: {
    fontSize: 16,
    paddingVertical: 10,
    fontFamily: MyTheme.fontRegular,
    color: MyTheme.grey600,
  },
  imagesCtn: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 20,
  },
});

export default ThreadItem;
