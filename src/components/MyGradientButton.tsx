import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {MyTheme} from '../theme';

export interface MyGradientButtonProps {
  onPress: () => void;
  disabled?: boolean;
  icon: ReactNode;
  customStyle?: StyleProp<ViewStyle>;
}

const MyGradientButton = ({
  disabled,
  icon,
  customStyle,
  onPress,
}: MyGradientButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[styles.button, disabled && styles.disabledButton, customStyle]}>
      <LinearGradient
        colors={[MyTheme.primaryGradientFirst, MyTheme.primaryGradientSecond]}>
        {icon}
      </LinearGradient>
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
    borderColor: MyTheme.primaryBorder,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default MyGradientButton;
