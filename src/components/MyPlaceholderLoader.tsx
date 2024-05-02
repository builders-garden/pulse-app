import React from 'react';
import ContentLoader, {Circle, Rect} from 'react-content-loader/native';
import {StyleProp, View, ViewStyle} from 'react-native';
import {MyTheme} from '../theme';

interface MyPlaceholderLoaderProps {
  customStyle?: StyleProp<ViewStyle>;
}

const MyPlaceholderLoader = ({customStyle}: MyPlaceholderLoaderProps) => {
  return (
    <View style={customStyle}>
      <ContentLoader
        speed={2}
        style={{width: '100%'}}
        height={200}
        preserveAspectRatio="none"
        viewBox="0 0 360 200"
        backgroundColor={MyTheme.grey200}
        foregroundColor={MyTheme.grey100}>
        <Rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
        <Rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
        <Rect x="0" y="56" rx="3" ry="3" width="360" height="6" />
        <Rect x="0" y="72" rx="3" ry="3" width="300" height="6" />
        <Rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
        <Circle cx="20" cy="20" r="20" />
        <Rect x="0" y="108" rx="8" ry="8" width="360" height="88" />
      </ContentLoader>
    </View>
  );
};

export default MyPlaceholderLoader;
