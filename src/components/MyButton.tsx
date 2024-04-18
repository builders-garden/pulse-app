import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

interface MyButtonProps {
  onPress: () => void;
  title: string;
  style?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: ImageSourcePropType;
  iconRight?: ImageSourcePropType;
}

const MyButton = ({
  title,
  style = 'primary',
  disabled,
  loading,
  iconLeft,
  iconRight,
  onPress,
}: MyButtonProps) => {
  const btnStyle =
    style === 'primary' ? styles.buttonPrimary : styles.buttonSecondary;
  const textStyle =
    style === 'primary' ? styles.buttonTextPrimary : styles.buttonTextSecondary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.button,
        btnStyle,
        pressed && styles.pressedBtn,
        disabled && styles.disabledBtn,
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
    width: '100%',
  },
  buttonPrimary: {
    backgroundColor: 'black',
  },
  buttonSecondary: {
    backgroundColor: 'white',
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
});

export default MyButton;
