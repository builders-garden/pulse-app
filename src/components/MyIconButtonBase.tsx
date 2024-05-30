import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {MyTheme} from '../theme';

export interface MyIconButtonBaseProps {
  onPress: () => void;
  disabled?: boolean;
  icon: ReactNode;
  style?: 'primary' | 'secondary' | 'tertiary';
  filling?: 'solid' | 'outline' | 'clear';
  shape?: 'round' | 'square';
  customStyle?: StyleProp<ViewStyle>;
}

const MyIconButtonBase = ({
  disabled,
  style = 'primary',
  filling = 'solid',
  shape = 'round',
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
        shape === 'round' ? styles.rounded : styles.square,
      ]}>
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rounded: {
    borderRadius: 100,
  },
  square: {
    borderRadius: 3,
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
  buttonClear: {
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

  buttonTertiarySolid: {
    backgroundColor: MyTheme.grey100,
  },
  buttonTertiaryOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: MyTheme.grey100,
  },
});

const stylesMap = {
  primary: {
    solid: styles.buttonPrimarySolid,
    outline: styles.buttonPrimaryOutline,
    clear: styles.buttonClear,
  },
  secondary: {
    solid: styles.buttonSecondarySolid,
    outline: styles.buttonSecondaryOutline,
    clear: styles.buttonClear,
  },
  tertiary: {
    solid: styles.buttonTertiarySolid,
    outline: styles.buttonTertiaryOutline,
    clear: styles.buttonClear,
  },
};

export default MyIconButtonBase;
