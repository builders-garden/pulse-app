import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import YoutubePlayer from 'react-native-youtube-iframe';
import {LinkPreview} from '../types';
import WebPreview from './WebPreview';
interface UrlViewerProps {
  url: string;
  linkPreview?: LinkPreview;
  onImagePress?: () => void;
}

const UrlViewer = ({url, linkPreview, onImagePress}: UrlViewerProps) => {
  if (linkPreview?.mediaType === 'image') {
    return (
      <Pressable
        style={styles.viewerCtn}
        onPress={() => {
          onImagePress && onImagePress();
        }}>
        <FastImage
          source={{uri: url}}
          resizeMode="contain"
          style={styles.imageViewer}
        />
      </Pressable>
    );
  } else if (
    linkPreview?.mediaType === 'video' ||
    linkPreview?.contentType === 'application/x-mpegURL'
  ) {
    return <Video paused controls source={{uri: url}} style={styles.viewer} />;
  } else if (linkPreview?.mediaType === 'youtube') {
    const videoId = url.split('v=')[1];
    return (
      <YoutubePlayer
        videoId={videoId}
        height={200}
        webViewStyle={styles.youtubePlayer}
      />
    );
  } else {
    return <WebPreview url={url} linkPreview={linkPreview} />;
  }
};

const styles = StyleSheet.create({
  viewerCtn: {
    flex: 1,
  },
  viewer: {
    width: '100%',
    minHeight: 200,
  },
  imageViewer: {
    width: '100%',
    minHeight: 200,
    // aspectRatio: 1,
    // alignSelf: 'center',
  },
  youtubePlayer: {
    width: '100%',
  },
});

export default UrlViewer;
