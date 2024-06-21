import {ReactNode} from 'react';
import {ImageSourcePropType} from 'react-native';
import {Asset} from 'react-native-image-picker';

export type LinkPreview =
  | {
      url: string;
      title: string;
      siteName: string | undefined;
      description: string | undefined;
      mediaType: string;
      contentType: string | undefined;
      images: string[];
      videos: {
        url: string | undefined;
        secureUrl: string | null | undefined;
        type: string | null | undefined;
        width: string | undefined;
        height: string | undefined;
      }[];
      favicons: string[];
    }
  | {
      charset: string | null;
      url: string;
      mediaType: string;
      contentType: string;
      favicons: string[];
    }
  | {
      charset: string | null;
      url: string;
      title: string;
      siteName: string | undefined;
      description: string | undefined;
      mediaType: string;
      contentType: string | undefined;
      images: string[];
      videos: {
        url: string | undefined;
        secureUrl: string | null | undefined;
        type: string | null | undefined;
        width: string | undefined;
        height: string | undefined;
      }[];
      favicons: string[];
    };

export type OnboardingSlide = {
  title: ReactNode;
  body: string;
  image: ImageSourcePropType;
  inverted?: boolean;
};

export type Thread = {
  id: string;
  body: string;
  images: Asset[];
  video?: Asset;
  links: string[];
};

export type Mention = {
  id: string;
  prefix: string;
  imageUrl: string;
};
