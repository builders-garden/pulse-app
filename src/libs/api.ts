import {getLinkPreview} from 'link-preview-js';
import {LinkPreview} from '../types';

export async function getMediaType(url: string) {
  try {
    // Perform a HEAD request to get headers
    const response = await fetch(url, {method: 'HEAD'});
    // Retrieve the Content-Type header
    // console.log('response.headers:', JSON.stringify(response));
    const contentType = response.headers.get('Content-Type');
    // Determine the type of media
    console.log('Content-Type:', contentType);
    if (contentType?.startsWith('image/')) {
      return 'image';
    } else if (contentType?.startsWith('video/')) {
      return 'video';
    } else {
      // Add more checks as needed
      return 'other';
    }
  } catch (error) {
    console.log('Error fetching media type from here:', error);
    return 'error';
  }
}

export async function fetchLinkPreview(
  url: string,
): Promise<LinkPreview | {mediaType: 'image' | 'video'} | undefined> {
  try {
    if (url.match(/\.(jpeg|jpg|gif|png)$/)) {
      return {
        mediaType: 'image',
      };
    } else if (url.match(/\.(mp4|webm|ogg|m3u8)$/)) {
      return {
        mediaType: 'video',
      };
    }
    const linkPreview = await getLinkPreview(url);
    console.log('linkPreview:', linkPreview);
    if (
      linkPreview?.mediaType !== 'image' &&
      url.match(/\.(jpeg|jpg|gif|png)$/)
    ) {
      linkPreview.mediaType = 'image';
    } else if (
      linkPreview?.mediaType !== 'video' &&
      url.match(/\.(mp4|webm|ogg|m3u8)$/)
    ) {
      linkPreview.mediaType = 'video';
    }

    return linkPreview;
  } catch (err) {
    console.log('Error fetching link preview');
    return undefined;
  }
}
