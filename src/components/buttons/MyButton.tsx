import React from 'react';
import {
  ActivityIndicator,
  DimensionValue,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import {MyTheme} from '../../theme';

interface MyButtonProps {
  onPress: () => void;
  title: string;
  style?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: ImageSourcePropType;
  iconRight?: ImageSourcePropType;
  customStyle?: StyleProp<ViewStyle>;
  width?: DimensionValue;
}

const MyButton = ({
  title,
  style = 'primary',
  disabled,
  loading,
  iconLeft,
  iconRight,
  width = '100%',
  customStyle,
  onPress,
}: MyButtonProps) => {
  let btnStyle = styles.buttonPrimary;
  let textStyle = styles.buttonTextPrimary;
  if (style === 'secondary') {
    btnStyle = styles.buttonSecondary;
    textStyle = styles.buttonTextSecondary;
  } else if (style === 'tertiary') {
    btnStyle = styles.buttonTertiary;
    textStyle = styles.buttonTextTertiary;
  } else if (style === 'quaternary') {
    btnStyle = styles.buttonQuaternary;
    textStyle = styles.buttonTextQuaternary;
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.button,
        btnStyle,
        pressed && styles.pressedBtn,
        disabled && styles.disabledBtn,
        customStyle && customStyle,
        {width: width},
      ]}>
      {iconLeft && !loading && (
        <Image
          style={{width: 25, height: 25, marginRight: 10}}
          source={iconLeft}
        />
      )}
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
      {iconRight && !loading && (
        <Image
          style={{width: 25, height: 25, marginLeft: 10}}
          source={iconRight}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPrimary: {
    backgroundColor: MyTheme.black,
  },
  buttonSecondary: {
    backgroundColor: MyTheme.white,
  },
  buttonTertiary: {
    backgroundColor: MyTheme.white,
    borderWidth: 2,
    borderColor: MyTheme.black,
  },
  buttonQuaternary: {
    backgroundColor: MyTheme.grey100,
    borderWidth: 2,
    borderColor: MyTheme.grey100,
  },
  pressedBtn: {
    opacity: 0.7,
  },
  disabledBtn: {
    backgroundColor: 'grey',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: MyTheme.fontBold,
  },
  buttonTextPrimary: {
    color: MyTheme.white,
  },
  buttonTextSecondary: {
    color: MyTheme.black,
  },
  buttonTextTertiary: {
    color: MyTheme.black,
  },
  buttonTextQuaternary: {
    color: MyTheme.grey500,
    fontFamily: MyTheme.fontRegular,
  },
});

export default MyButton;
