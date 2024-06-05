import {ReactNode} from 'react';
import {ImageSourcePropType} from 'react-native';

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
  images: string[];
  video?: string;
  links: string[];
};
