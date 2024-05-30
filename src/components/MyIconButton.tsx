import React from 'react';
import {Image, ImageSourcePropType} from 'react-native';
import MyIconButtonBase, {MyIconButtonBaseProps} from './MyIconButtonBase';

type MyIconButtonProps = Omit<MyIconButtonBaseProps, 'icon'> & {
  iconSize?: number;
  icon: ImageSourcePropType;
};

const MyIconButton = ({
  disabled,
  style = 'primary',
  filling = 'solid',
  shape = 'round',
  icon,
  iconSize = 32,
  customStyle,
  onPress,
}: MyIconButtonProps) => {
  return (
    <MyIconButtonBase
      onPress={onPress}
      shape={shape}
      disabled={disabled}
      style={style}
      filling={filling}
      customStyle={customStyle}
      icon={<Image style={{width: iconSize, height: iconSize}} source={icon} />}
    />
  );
};

export default MyIconButton;
