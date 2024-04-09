import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
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
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[styles.button, btnStyle, disabled && styles.disabledButton]}>
      {iconLeft && (
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
      {iconRight && (
        <Image
          style={{width: 25, height: 25, marginLeft: 10}}
          source={iconRight}
        />
      )}
    </TouchableOpacity>
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
  disabledButton: {
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