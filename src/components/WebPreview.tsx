import axios from 'axios';
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
  const [ogData, setOgData] = useState({
    title: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        const html = response.data;
        const titleMatch = html.match(
          /<meta property="og:title" content="(.*?)"/,
        );
        const descriptionMatch = html.match(
          /<meta property="og:description" content="(.*?)"/,
        );
        const imageMatch = html.match(
          /<meta property="og:image" content="(.*?)"/,
        );
        const title = titleMatch ? titleMatch[1] : '';
        const description = descriptionMatch ? descriptionMatch[1] : '';
        const image = imageMatch ? imageMatch[1] : '';
        setOgData({title, description, image});
      })
      .catch(error => {
        console.error('Failed to fetch Open Graph data:', error);
      });
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
      {ogData.image && (
        <Image source={{uri: ogData.image}} style={styles.image} />
      )}
      {ogData.title && <Text style={styles.title}>{ogData.title}</Text>}
      {ogData.description && (
        <Text style={styles.description} ellipsizeMode="tail" numberOfLines={1}>
          {ogData.description}
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
