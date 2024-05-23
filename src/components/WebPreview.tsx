import React from 'react';
import {
  Alert,
  Image,
  Linking,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import LinkImg from '../assets/images/icons/link.svg';
import {MyTheme} from '../theme';
import {LinkPreview} from '../types';

interface WebPreviewProps {
  url: string;
  linkPreview?: LinkPreview;
  customStyle?: StyleProp<ViewStyle>;
}

const WebPreview = ({url, linkPreview, customStyle}: WebPreviewProps) => {
  let title = url;
  let description = '';
  let image = '';
  if (linkPreview) {
    if ('title' in linkPreview && linkPreview.title !== '') {
      title = linkPreview.title;
      if (
        'description' in linkPreview &&
        linkPreview.description !== '' &&
        linkPreview.description !== undefined &&
        linkPreview.description !== null
      ) {
        description = linkPreview.description ?? '';
      } else {
        description = url;
      }
      if ('images' in linkPreview && linkPreview.images.length > 0) {
        image = linkPreview.images[0];
      }
    }
  }

  async function OpenURL() {
    const supported = await Linking.canOpenURL(url);

    if (!supported) {
      Alert.alert(`Don't know how to open this URL: ${url}`);
      return;
    }

    // SignerPollLoop(signerRes);
    await Linking.openURL(url);
  }

  if (title !== '' && description === '' && image === '') {
    return (
      <Pressable style={[styles.container, customStyle]} onPress={OpenURL}>
        <View style={styles.placeholderBox}>
          <LinkImg width={50} height={50} />
        </View>
        <Text style={styles.titleOnly} ellipsizeMode="tail" numberOfLines={1}>
          {title}
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable style={[styles.container, customStyle]} onPress={OpenURL}>
      {image !== '' ? (
        <Image source={{uri: image}} style={styles.image} />
      ) : (
        <View style={styles.placeholderBox}>
          <LinkImg width={50} height={50} />
        </View>
      )}
      {title !== '' && <Text style={styles.title}>{title}</Text>}
      {description !== '' && (
        <Text style={styles.description} ellipsizeMode="tail" numberOfLines={1}>
          {description}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: MyTheme.white,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  placeholderBox: {
    width: '100%',
    height: 80,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: MyTheme.white,
  },
  title: {
    fontSize: 16,
    marginTop: 10,
    paddingHorizontal: 10,
    fontFamily: MyTheme.fontBold,
    color: MyTheme.black,
  },
  titleOnly: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontFamily: MyTheme.fontRegular,
    color: MyTheme.black,
  },
  description: {
    marginBottom: 10,
    paddingHorizontal: 10,
    fontFamily: MyTheme.fontRegular,
    color: MyTheme.black,
  },
});

export default WebPreview;
