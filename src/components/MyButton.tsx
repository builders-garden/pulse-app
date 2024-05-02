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

interface MyButtonProps {
  onPress: () => void;
  title: string;
  style?: 'primary' | 'secondary' | 'tertiary';
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
    backgroundColor: 'black',
  },
  buttonSecondary: {
    backgroundColor: 'white',
  },
  buttonTertiary: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
  },
  pressedBtn: {
    opacity: 0.7,
  },
  disabledBtn: {
    backgroundColor: 'grey',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextPrimary: {
    color: 'white',
  },
  buttonTextSecondary: {
    color: 'black',
  },
  buttonTextTertiary: {
    color: 'black',
  },
});

export default MyButton;
