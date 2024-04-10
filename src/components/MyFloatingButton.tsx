import React from 'react';
import {Image, ImageSourcePropType, Pressable, StyleSheet} from 'react-native';

interface MyFloatingButtonProps {
  onPress: () => void;
  style?: 'primary' | 'secondary';
  disabled?: boolean;
  icon: ImageSourcePropType;
}

const MyFloatingButton = ({
  style = 'primary',
  disabled,
  icon,
  onPress,
}: MyFloatingButtonProps) => {
  const btnStyle =
    style === 'primary' ? styles.buttonPrimary : styles.buttonSecondary;

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
      <Image style={{width: 25, height: 25}} source={icon} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 55,
    height: 55,
    borderRadius: 100,
    position: 'absolute',
    bottom: 15,
    right: 15,
    zIndex: 2,
  },
  buttonPrimary: {
    backgroundColor: 'black',
  },
  buttonSecondary: {
    backgroundColor: 'white',
  },
  pressedBtn: {
    backgroundColor: '#444',
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

export default MyFloatingButton;
