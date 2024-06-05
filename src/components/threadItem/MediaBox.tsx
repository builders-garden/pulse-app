import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import CloseImg from '../../assets/images/icons/close.svg';
import {MyTheme} from '../../theme';
import MyIconButtonBase from '../MyIconButtonBase';

type MediaBoxProps = {
  isVideo?: boolean;
  uri: string;
  onCancelPress: () => void;
};

function MediaBox({isVideo, uri, onCancelPress}: MediaBoxProps) {
  return (
    <Pressable style={styles.mediaBox}>
      <MyIconButtonBase
        customStyle={styles.closeBtn}
        icon={<CloseImg color={MyTheme.black} />}
        onPress={onCancelPress}
      />
      {isVideo ? (
        <Video controls paused style={styles.video} source={{uri}} />
      ) : (
        <Image style={styles.image} source={{uri}} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mediaBox: {
    flex: 1,
    height: 200,
  },
  image: {
    overflow: 'hidden',
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: MyTheme.grey200,
    borderRadius: 4,
    height: '100%',
    width: '100%',
  },
  video: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: MyTheme.grey200,
    borderRadius: 4,
    height: '100%',
    width: '100%',
  },
  closeBtn: {
    backgroundColor: '#ffffff88',
    position: 'absolute',
    top: 5,
    right: 5,
    elevation: 10,
    zIndex: 10,
  },
});

export default MediaBox;
