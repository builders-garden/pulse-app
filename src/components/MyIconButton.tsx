import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface MyIconButtonProps {
  onPress: () => void;
  disabled?: boolean;
  icon: ImageSourcePropType;
  iconSize?: number;
  style?: 'primary' | 'secondary';
  customStyle?: StyleProp<ViewStyle>;
}

const MyIconButton = ({
  disabled,
  style = 'primary',
  icon,
  iconSize = 32,
  customStyle,
  onPress,
}: MyIconButtonProps) => {
  const btnStyle =
    style === 'primary' ? styles.buttonPrimary : styles.buttonSecondary;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.button,
        btnStyle,
        disabled && styles.disabledButton,
        customStyle,
      ]}>
      <Image style={{width: iconSize, height: iconSize}} source={icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 4,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: 'grey',
  },
  buttonPrimary: {
    backgroundColor: 'black',
  },
  buttonSecondary: {
    backgroundColor: 'white',
  },
});

export default MyIconButton;
