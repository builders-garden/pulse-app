import {getLinkPreview} from 'link-preview-js';
import React, {useEffect, useState} from 'react';
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

interface WebPreviewProps {
  url: string;
  customStyle?: StyleProp<ViewStyle>;
}

const WebPreview = ({url, customStyle}: WebPreviewProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    async function fetchOpenGraph() {
      const ogRes = await getLinkPreview(url);
      console.log('Open Graph daata:', ogRes);
      if ('title' in ogRes) {
        setTitle(ogRes.title);
      }
      if ('description' in ogRes) {
        setDescription(ogRes.description ?? '');
      }
      if ('images' in ogRes) {
        setImage(ogRes.images[0]);
      }
    }
    fetchOpenGraph();
  }, [url]);

  async function OpenURL() {
    const supported = await Linking.canOpenURL(url);

    if (!supported) {
      Alert.alert(`Don't know how to open this URL: ${url}`);
      return;
    }

    // SignerPollLoop(signerRes);
    await Linking.openURL(url);
  }

  return (
    <Pressable style={[styles.container, customStyle]} onPress={OpenURL}>
      {image && <Image source={{uri: image}} style={styles.image} />}
      {title && <Text style={styles.title}>{title}</Text>}
      {description && (
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
  description: {
    marginTop: 5,
  },
});

export default WebPreview;
