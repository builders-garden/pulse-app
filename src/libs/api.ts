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
      return contentType;
    }
  } catch (error) {
    console.error('Error fetching media type from here:', error);
    return 'error';
  }
}
