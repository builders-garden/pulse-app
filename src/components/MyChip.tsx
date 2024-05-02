import React from 'react';
import {Image, ImageSourcePropType} from 'react-native';
import MyChipBase, {MyChipBaseProps} from './MyChipBase';

type MyChipProps = Omit<Omit<MyChipBaseProps, 'iconLeft'>, 'iconRight'> & {
  iconLeft?: ImageSourcePropType;
  iconRight?: ImageSourcePropType;
};

const MyChip = ({
  title,
  style = 'primary',
  size = 'medium',
  filling = 'solid',
  disabled,
  loading,
  iconLeft,
  iconRight,
  customStyle,
  textCustomStyle,
  onPress,
}: MyChipProps) => {
  return (
    <MyChipBase
      title={title}
      style={style}
      filling={filling}
      size={size}
      disabled={disabled}
      loading={loading}
      iconLeft={
        iconLeft && (
          <Image
            style={{width: 18, height: 18, marginRight: 3}}
            source={iconLeft}
          />
        )
      }
      iconRight={
        iconRight && (
          <Image
            style={{width: 18, height: 18, marginLeft: 3}}
            source={iconRight}
          />
        )
      }
      customStyle={customStyle}
      textCustomStyle={textCustomStyle}
      onPress={onPress}
    />
  );
};

export default MyChip;
