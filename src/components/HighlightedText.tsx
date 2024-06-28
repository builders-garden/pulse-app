import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Linking, StyleProp, TextStyle} from 'react-native';
import ParsedText from 'react-native-parsed-text';
import {MyTheme} from '../theme';

interface HighlightedTextProps {
  text: string;
  numberOfLines?: number;
  customStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const HighlightedText = ({
  text,
  numberOfLines,
  customStyle,
  onPress,
}: HighlightedTextProps) => {
  const navigation = useNavigation();

  const parsePatterns = [
    {
      type: 'url',
      style: {color: MyTheme.primaryColor},
      suppressHighlighting: true,
      onPress: url => {
        Linking.openURL(url);
      },
    },
    {
      pattern: /(^|[\s\n])(@[a-zA-Z0-9_.-]+|\/[a-zA-Z0-9_.-]+)/,
      style: {color: MyTheme.primaryColor},
      suppressHighlighting: true,
      onPress: (url: string) => {
        const firstSplit = url.split('/');
        if (firstSplit.length > 1) {
          navigation.push('Channel', {channelId: firstSplit[1]});
        } else {
          const secondSplit = url.split('@')[1];
          navigation.push('Profile', {username: secondSplit});
        }
      },
    },
  ];

  return (
    <ParsedText
      onPress={onPress}
      numberOfLines={numberOfLines}
      suppressHighlighting
      style={customStyle}
      parse={parsePatterns}>
      {text}
    </ParsedText>
  );
};

export default HighlightedText;
