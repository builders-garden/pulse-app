import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
import YoutubePlayer from 'react-native-youtube-iframe';
import {LightboxContext} from '../contexts/lightbox/Lightbox.context';
import WebPreview from './WebPreview';
interface UrlViewerProps {
  url: string;
}

const UrlViewer = ({url}: UrlViewerProps) => {
  const [mediaType, setMediaType] = useState<string>();
  const lightboxContext = useContext(LightboxContext);

  useEffect(() => {
    const fetchMediaType = async () => {
      console.log('Checking media type for:', url);
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        setMediaType('youtube');
      } else {
        try {
          const response = await axios.head(url);
          const contentType = response.headers['content-type'];
          if (contentType.startsWith('image')) {
            setMediaType('image');
          } else if (contentType.startsWith('video')) {
            setMediaType('video');
          } else {
            setMediaType('web');
          }
        } catch (error) {
          console.error('Failed to fetch media type:', error);
        }
      }
    };

    fetchMediaType();
  }, [url]);

  if (mediaType === 'image') {
    return (
      <Pressable onPress={() => lightboxContext.show({urls: [url]})}>
        <Image source={{uri: url}} style={styles.viewer} />
      </Pressable>
    );
  } else if (mediaType === 'video') {
    return <Video paused controls source={{uri: url}} style={styles.viewer} />;
  } else if (mediaType === 'youtube') {
    const videoId = url.split('v=')[1];
    return (
      <YoutubePlayer
        videoId={videoId}
        height={200}
        webViewStyle={styles.youtubePlayer}
      />
    );
  } else if (mediaType === 'web') {
    return <WebPreview url={url} />;
  } else {
    return <View />;
  }
};

const styles = StyleSheet.create({
  viewer: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'lightgray',
  },
  youtubePlayer: {
    width: '100%',
  },
});

export default UrlViewer;
