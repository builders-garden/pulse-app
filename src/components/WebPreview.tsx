import React from 'react';
import {
  Alert,
  Image,
  Linking,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import {LinkPreview} from '../types';

interface WebPreviewProps {
  url: string;
  linkPreview?: LinkPreview;
  customStyle?: StyleProp<ViewStyle>;
}

const WebPreview = ({url, linkPreview, customStyle}: WebPreviewProps) => {
  let title = url;
  console.log('title:', title);
  let description = '';
  let image = '';
  if (linkPreview) {
    if ('title' in linkPreview) {
      title = linkPreview.title;
      if ('description' in linkPreview) {
        description = linkPreview.description ?? '';
      }
      if ('images' in linkPreview) {
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
        <Text style={styles.titleOnly} ellipsizeMode="tail" numberOfLines={1}>
          {title}
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable style={[styles.container, customStyle]} onPress={OpenURL}>
      {image !== '' && <Image source={{uri: image}} style={styles.image} />}
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
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 18,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
  },
  titleOnly: {
    fontSize: 16,
  },
  description: {
    marginTop: 5,
  },
});

export default WebPreview;