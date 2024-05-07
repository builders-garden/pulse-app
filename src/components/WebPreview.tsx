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
    console.log('PASSO DI QUI');
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
  console.log('WebPreview title', title);
  console.log('WebPreview description', description);
  console.log('WebPreview image', image);
  console.log('WebPreview linkPreview', linkPreview);

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
          <LinkImg width={100} height={100} />
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
  placeholderBox: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MyTheme.white,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    fontFamily: 'BeVietnamPro-Regular',
  },
  titleOnly: {
    fontSize: 16,
    fontFamily: 'BeVietnamPro-Regular',
  },
  description: {
    marginTop: 5,
    fontFamily: 'BeVietnamPro-Regular',
  },
});

export default WebPreview;
