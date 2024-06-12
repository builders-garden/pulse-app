import React from 'react';
import {
  Linking,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
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
      } else if ('favicons' in linkPreview && linkPreview.favicons.length > 0) {
        image = linkPreview.favicons[0];
      }
    }
  }

  async function OpenURL() {
    // const supported = await Linking.canOpenURL(url);

    // if (!supported) {
    //   Alert.alert(`Don't know how to open this URL: ${url}`);
    //   return;
    // }

    // SignerPollLoop(signerRes);
    await Linking.openURL(url);
  }

  if (title !== '' && description === '' && image === '') {
    return (
      <View style={styles.root}>
        <Pressable style={[styles.container, customStyle]} onPress={OpenURL}>
          <View style={styles.placeholderBox}>
            <LinkImg width={30} height={30} />
          </View>
          <Text style={styles.titleOnly} ellipsizeMode="tail" numberOfLines={1}>
            {title}
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Pressable style={[styles.container, customStyle]} onPress={OpenURL}>
        {image !== '' ? (
          <FastImage
            source={{uri: image}}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderBox}>
            <LinkImg width={30} height={30} />
          </View>
        )}
        <View style={styles.textsCtn}>
          {title !== '' && (
            <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
              {title}
            </Text>
          )}
          {description !== '' && (
            <Text
              style={styles.description}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {description}
            </Text>
          )}
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    width: '100%',
  },
  container: {
    backgroundColor: MyTheme.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: MyTheme.greyTransparent,
    borderWidth: 1,
    borderRadius: 3,
    width: '100%',
  },
  image: {
    width: 55,
    height: 55,
    resizeMode: 'cover',
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  placeholderBox: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MyTheme.white,
  },
  textsCtn: {
    flex: 1,
  },
  title: {
    paddingHorizontal: 10,
    fontFamily: MyTheme.fontSemiBold,
    color: MyTheme.black,
  },
  titleOnly: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: MyTheme.fontRegular,
    color: MyTheme.black,
  },
  description: {
    fontSize: 12,
    paddingHorizontal: 10,
    fontFamily: MyTheme.fontRegular,
    color: MyTheme.black,
  },
});

export default WebPreview;
