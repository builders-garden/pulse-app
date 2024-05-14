import React, {ReactNode} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {MyTheme} from '../theme';

export interface MyButtonNewProps {
  onPress: () => void;
  title: string;
  style?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
  filling?: 'solid' | 'outline' | 'clear';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  customStyle?: StyleProp<ViewStyle>;
  textCustomStyle?: StyleProp<TextStyle>;
}

const MyButtonNew = ({
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
}: MyButtonNewProps) => {
  let btnStyle = stylesMap[style][filling].button;
  let textStyle = stylesMap[style][filling].text;

  let btnSize = styles.buttonMedium;
  let textSize = styles.buttonTextMedium;
  if (size === 'small') {
    btnSize = styles.buttonSmall;
    textSize = styles.buttonTextSmall;
  } else if (size === 'large') {
    btnSize = styles.buttonLarge;
    textSize = styles.buttonTextLarge;
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.button,
        btnStyle,
        btnSize,
        pressed && styles.pressedButton,
        disabled && styles.disabledbutton,
        customStyle,
      ]}>
      {iconLeft && iconLeft}
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={[textSize, styles.buttonText, textStyle, textCustomStyle]}>
          {title}
        </Text>
      )}
      {iconRight && iconRight}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressedButton: {
    opacity: 0.7,
  },
  buttonSmall: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  buttonMedium: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonLarge: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonPrimarySolid: {
    backgroundColor: MyTheme.primaryColor,
  },
  buttonPrimaryOutline: {
    borderColor: MyTheme.primaryColor,
    borderWidth: 2,
  },
  buttonPrimaryClear: {
    backgroundColor: 'transparent',
  },
  buttonSecondarySolid: {
    backgroundColor: MyTheme.grey300,
  },
  buttonSecondaryOutline: {
    borderColor: MyTheme.grey300,
    borderWidth: 2,
  },
  buttonSecondaryClear: {
    backgroundColor: 'transparent',
  },
  buttonTertiarySolid: {
    backgroundColor: MyTheme.grey100,
  },
  buttonTertiaryOutline: {
    borderColor: MyTheme.grey100,
    borderWidth: 2,
  },
  buttonTertiaryClear: {
    backgroundColor: 'transparent',
  },
  buttonQuaternarySolid: {
    backgroundColor: MyTheme.grey100,
  },
  buttonQuaternaryOutline: {
    borderColor: MyTheme.grey100,
    borderWidth: 2,
  },
  buttonQuaternaryClear: {
    backgroundColor: 'transparent',
  },
  disabledbutton: {
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: 'BeVietnamPro-SemiBold',
  },
  buttonTextSmall: {
    fontSize: 12,
  },
  buttonTextMedium: {
    fontSize: 16,
  },
  buttonTextLarge: {
    fontSize: 20,
  },
  buttonTextPrimarySolid: {
    color: MyTheme.white,
  },
  buttonTextPrimaryOutline: {
    color: MyTheme.primaryColor,
  },
  buttonTextPrimaryClear: {
    color: MyTheme.primaryColor,
  },
  buttonTextSecondarySolid: {
    color: MyTheme.white,
  },
  buttonTextSecondaryOutline: {
    color: MyTheme.grey300,
  },
  buttonTextSecondaryClear: {
    color: MyTheme.grey300,
  },
  buttonTextTertiarySolid: {
    color: MyTheme.black,
  },
  buttonTextTertiaryOutline: {
    color: MyTheme.black,
  },
  buttonTextTertiaryClear: {
    color: MyTheme.black,
  },
  buttonTextQuaternarySolid: {
    color: MyTheme.grey400,
  },
  buttonTextQuaternaryOutline: {
    color: MyTheme.grey400,
  },
  buttonTextQuaternaryClear: {
    color: MyTheme.grey400,
  },
});

const stylesMap = {
  primary: {
    solid: {
      button: styles.buttonPrimarySolid,
      text: styles.buttonTextPrimarySolid,
    },
    outline: {
      button: styles.buttonPrimaryOutline,
      text: styles.buttonTextPrimaryOutline,
    },
    clear: {
      button: styles.buttonPrimaryClear,
      text: styles.buttonTextPrimaryClear,
    },
  },
  secondary: {
    solid: {
      button: styles.buttonSecondarySolid,
      text: styles.buttonTextSecondarySolid,
    },
    outline: {
      button: styles.buttonSecondaryOutline,
      text: styles.buttonTextSecondaryOutline,
    },
    clear: {
      button: styles.buttonSecondaryClear,
      text: styles.buttonTextSecondaryClear,
    },
  },
  tertiary: {
    solid: {
      button: styles.buttonTertiarySolid,
      text: styles.buttonTextTertiarySolid,
    },
    outline: {
      button: styles.buttonTertiaryOutline,
      text: styles.buttonTextTertiaryOutline,
    },
    clear: {
      button: styles.buttonTertiaryClear,
      text: styles.buttonTextTertiaryClear,
    },
  },
  quaternary: {
    solid: {
      button: styles.buttonQuaternarySolid,
      text: styles.buttonTextQuaternarySolid,
    },
    outline: {
      button: styles.buttonQuaternaryOutline,
      text: styles.buttonTextQuaternaryOutline,
    },
    clear: {
      button: styles.buttonQuaternaryClear,
      text: styles.buttonTextQuaternaryClear,
    },
  },
};

export default MyButtonNew;
