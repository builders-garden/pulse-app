import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
import YoutubePlayer from 'react-native-youtube-iframe';
import WebPreview from './WebPreview';

interface UrlViewerProps {
  url: string;
}

const UrlViewer = ({url}: UrlViewerProps) => {
  const [mediaType, setMediaType] = useState<string>();

  useEffect(() => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      setMediaType('youtube');
    } else {
      axios
        .head(url)
        .then(response => {
          const contentType = response.headers['content-type'];
          if (contentType.startsWith('image')) {
            setMediaType('image');
          } else if (contentType.startsWith('video')) {
            setMediaType('video');
          } else {
            setMediaType('web');
          }
        })
        .catch(error => {
          console.error('Failed to fetch media type:', error);
        });
    }
  }, [url]);

  if (mediaType === 'image') {
    return <Image source={{uri: url}} style={styles.viewer} />;
  } else if (mediaType === 'video') {
    return <Video controls source={{uri: url}} style={styles.viewer} />;
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
  },
  youtubePlayer: {
    width: '100%',
  },
});

export default UrlViewer;
