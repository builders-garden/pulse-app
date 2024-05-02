import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {MyTheme} from '../theme';

export interface MyIconButtonBaseProps {
  onPress: () => void;
  disabled?: boolean;
  icon: ReactNode;
  style?: 'primary' | 'secondary';
  filling?: 'solid' | 'outline' | 'clear';
  customStyle?: StyleProp<ViewStyle>;
}

const MyIconButtonBase = ({
  disabled,
  style = 'primary',
  filling = 'solid',
  icon,
  customStyle,
  onPress,
}: MyIconButtonBaseProps) => {
  const btnStyle = stylesMap[style][filling];

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
      {icon}
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
  buttonPrimarySolid: {
    backgroundColor: MyTheme.primaryColor,
  },
  buttonPrimaryOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: MyTheme.primaryColor,
  },
  buttonPrimaryClear: {
    backgroundColor: 'transparent',
  },
  buttonSecondarySolid: {
    backgroundColor: MyTheme.grey400,
  },
  buttonSecondaryOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: MyTheme.grey400,
  },
  buttonSecondaryClear: {
    backgroundColor: 'transparent',
  },
});

const stylesMap = {
  primary: {
    solid: styles.buttonPrimarySolid,
    outline: styles.buttonPrimaryOutline,
    clear: styles.buttonPrimaryClear,
  },
  secondary: {
    solid: styles.buttonSecondarySolid,
    outline: styles.buttonSecondaryOutline,
    clear: styles.buttonSecondaryClear,
  },
};

export default MyIconButtonBase;
