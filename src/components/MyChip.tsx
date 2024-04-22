import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

interface MyChipProps {
  onPress: () => void;
  title: string;
  style?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: ImageSourcePropType;
  iconRight?: ImageSourcePropType;
  customStyle?: StyleProp<ViewStyle>;
  textCustomStyle?: StyleProp<TextStyle>;
}

const MyChip = ({
  title,
  style = 'primary',
  size = 'medium',
  disabled,
  loading,
  iconLeft,
  iconRight,
  customStyle,
  textCustomStyle,
  onPress,
}: MyChipProps) => {
  const btnStyle =
    style === 'primary'
      ? styles.chipPrimary
      : style === 'secondary'
      ? styles.chipSecondary
      : styles.chipTertiary;
  const btnSize =
    size === 'small'
      ? styles.chipSmall
      : size === 'medium'
      ? styles.chipMedium
      : styles.chipLarge;
  const textStyle =
    style === 'primary'
      ? styles.chipTextPrimary
      : style === 'secondary'
      ? styles.chipTextSecondary
      : styles.chipTextTertiary;
  const textSize =
    size === 'small'
      ? styles.chipTextSmall
      : size === 'medium'
      ? styles.chipTextMedium
      : styles.chipTextLarge;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.chip,
        btnSize,
        btnStyle,
        pressed && styles.pressedChip,
        disabled && styles.disabledchip,
        customStyle,
      ]}>
      {iconLeft && (
        <Image
          style={{width: 18, height: 18, marginRight: 3}}
          source={iconLeft}
        />
      )}
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={[textSize, textStyle, textCustomStyle]}>{title}</Text>
      )}
      {iconRight && (
        <Image
          style={{width: 18, height: 18, marginLeft: 3}}
          source={iconRight}
        />
      )}
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
  chipPrimary: {
    backgroundColor: 'black',
  },
  chipSecondary: {
    backgroundColor: 'white',
  },
  chipTertiary: {
    backgroundColor: 'lightgray',
  },
  disabledchip: {
    backgroundColor: 'grey',
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
  chipTextPrimary: {
    color: 'white',
  },
  chipTextSecondary: {
    color: 'black',
  },
  chipTextTertiary: {
    color: 'black',
  },
});

export default MyChip;
