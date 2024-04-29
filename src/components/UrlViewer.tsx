import {getLinkPreview} from 'link-preview-js';
import React, {useContext, useEffect, useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import YoutubePlayer from 'react-native-youtube-iframe';
import {LightboxContext} from '../contexts/lightbox/Lightbox.context';
import {LinkPreview} from '../types';
import WebPreview from './WebPreview';
interface UrlViewerProps {
  url: string;
}

const UrlViewer = ({url}: UrlViewerProps) => {
  const [linkPreview, setLinkPreview] = useState<LinkPreview>();
  const lightboxContext = useContext(LightboxContext);

  useEffect(() => {
    const fetchMediaType = async () => {
      console.log('Checking media type for:', url);
      try {
        const res: LinkPreview = await getLinkPreview(url);
        setLinkPreview(res);
      } catch (error) {
        console.log('Failed to fetch media type:', url, JSON.stringify(error));
      }
    };

    fetchMediaType();
  }, [url]);

  if (linkPreview?.mediaType === 'image') {
    return (
      <Pressable onPress={() => lightboxContext.show({urls: [url]})}>
        <FastImage source={{uri: url}} style={styles.viewer} />
      </Pressable>
    );
  } else if (linkPreview?.mediaType === 'video') {
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
  } else if (linkPreview?.mediaType === 'website') {
    return <WebPreview url={url} linkPreview={linkPreview} />;
  } else {
    return <WebPreview url={url} />;
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