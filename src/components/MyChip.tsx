import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface MyChipProps {
  onPress: () => void;
  title: string;
  style?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: ImageSourcePropType;
  iconRight?: ImageSourcePropType;
  customStyle?: StyleProp<ViewStyle>;
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
  onPress,
}: MyChipProps) => {
  const btnStyle =
    style === 'primary' ? styles.chipPrimary : styles.chipSecondary;
  const btnSize =
    size === 'small'
      ? styles.chipSmall
      : size === 'medium'
      ? styles.chipMedium
      : styles.chipLarge;
  const textStyle =
    style === 'primary' ? styles.chipTextPrimary : styles.chipTextSecondary;
  const textSize =
    size === 'small'
      ? styles.chipTextSmall
      : size === 'medium'
      ? styles.chipTextMedium
      : styles.chipTextLarge;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.chip,
        btnSize,
        btnStyle,
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
        <Text style={[textSize, textStyle]}>{title}</Text>
      )}
      {iconRight && (
        <Image
          style={{width: 18, height: 18, marginLeft: 3}}
          source={iconRight}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default MyChip;
