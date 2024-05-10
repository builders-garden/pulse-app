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

export interface MyChipBaseProps {
  onPress: () => void;
  title: string;
  style?: 'primary' | 'secondary' | 'tertiary';
  filling?: 'solid' | 'outline' | 'clear';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  customStyle?: StyleProp<ViewStyle>;
  textCustomStyle?: StyleProp<TextStyle>;
}

const MyChipBase = ({
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
}: MyChipBaseProps) => {
  let btnStyle = stylesMap[style][filling].chip;
  let textStyle = stylesMap[style][filling].text;

  let btnSize = styles.chipMedium;
  let textSize = styles.chipTextMedium;
  if (size === 'small') {
    btnSize = styles.chipSmall;
    textSize = styles.chipTextSmall;
  } else if (size === 'large') {
    btnSize = styles.chipLarge;
    textSize = styles.chipTextLarge;
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.chip,
        btnStyle,
        btnSize,
        pressed && styles.pressedChip,
        disabled && styles.disabledchip,
        customStyle,
      ]}>
      {iconLeft && iconLeft}
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={[textSize, styles.chipText, textStyle, textCustomStyle]}>
          {title}
        </Text>
      )}
      {iconRight && iconRight}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressedChip: {
    opacity: 0.7,
  },
  chipSmall: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  chipMedium: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  chipLarge: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  chipPrimarySolid: {
    backgroundColor: MyTheme.primaryColor,
  },
  chipPrimaryOutline: {
    borderColor: MyTheme.primaryColor,
    borderWidth: 2,
  },
  chipPrimaryClear: {
    backgroundColor: 'transparent',
  },
  chipSecondarySolid: {
    backgroundColor: MyTheme.grey300,
  },
  chipSecondaryOutline: {
    borderColor: MyTheme.grey300,
    borderWidth: 2,
  },
  chipSecondaryClear: {
    backgroundColor: 'transparent',
  },
  chipTertiarySolid: {
    backgroundColor: MyTheme.grey100,
  },
  chipTertiaryOutline: {
    borderColor: MyTheme.grey100,
    borderWidth: 2,
  },
  chipTertiaryClear: {
    backgroundColor: 'transparent',
  },
  disabledchip: {
    opacity: 0.5,
  },
  chipText: {
    fontFamily: 'BeVietnamPro-Regular',
  },
  chipTextSmall: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  chipTextMedium: {
    fontSize: 16,
  },
  chipTextLarge: {
    fontSize: 20,
  },
  chipTextPrimarySolid: {
    color: MyTheme.white,
  },
  chipTextPrimaryOutline: {
    color: MyTheme.primaryColor,
  },
  chipTextPrimaryClear: {
    color: MyTheme.primaryColor,
  },
  chipTextSecondarySolid: {
    color: MyTheme.white,
  },
  chipTextSecondaryOutline: {
    color: MyTheme.grey300,
  },
  chipTextSecondaryClear: {
    color: MyTheme.grey300,
  },
  chipTextTertiarySolid: {
    color: MyTheme.black,
  },
  chipTextTertiaryOutline: {
    color: MyTheme.black,
  },
  chipTextTertiaryClear: {
    color: MyTheme.black,
  },
});

const stylesMap = {
  primary: {
    solid: {
      chip: styles.chipPrimarySolid,
      text: styles.chipTextPrimarySolid,
    },
    outline: {
      chip: styles.chipPrimaryOutline,
      text: styles.chipTextPrimaryOutline,
    },
    clear: {
      chip: styles.chipPrimaryClear,
      text: styles.chipTextPrimaryClear,
    },
  },
  secondary: {
    solid: {
      chip: styles.chipSecondarySolid,
      text: styles.chipTextSecondarySolid,
    },
    outline: {
      chip: styles.chipSecondaryOutline,
      text: styles.chipTextSecondaryOutline,
    },
    clear: {
      chip: styles.chipSecondaryClear,
      text: styles.chipTextSecondaryClear,
    },
  },
  tertiary: {
    solid: {
      chip: styles.chipTertiarySolid,
      text: styles.chipTextTertiarySolid,
    },
    outline: {
      chip: styles.chipTertiaryOutline,
      text: styles.chipTextTertiaryOutline,
    },
    clear: {
      chip: styles.chipTertiaryClear,
      text: styles.chipTextTertiaryClear,
    },
  },
};

export default MyChipBase;
